/* eslint-disable no-console */

const fs = require("fs");
const path = require("path");

const { createClient } = require("@supabase/supabase-js");

function readJson(relPath) {
  const abs = path.join(process.cwd(), relPath);
  return JSON.parse(fs.readFileSync(abs, "utf8"));
}

function readJsonOptional(relPath) {
  const abs = path.join(process.cwd(), relPath);
  if (!fs.existsSync(abs)) return null;
  return JSON.parse(fs.readFileSync(abs, "utf8"));
}

function requireEnv(name) {
  const v = process.env[name];
  if (!v) {
    throw new Error(`Missing env var: ${name}`);
  }
  return v;
}

async function main() {
  const supabaseUrl = requireEnv("SUPABASE_URL");
  const serviceRoleKey = requireEnv("SUPABASE_SERVICE_ROLE_KEY");

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  const domains = readJson("data/catalog/domains.json");
  const exams = readJson("data/catalog/exams.json");
  const examContent = readJsonOptional("data/catalog/exam-content.json") || {};

  console.log(`Loaded ${domains.length} domains, ${exams.length} exams`);

  // 1) Upsert domains
  {
    const { error } = await supabase
      .from("domains")
      .upsert(domains, { onConflict: "slug" });

    if (error) throw error;
  }

  const { data: domainRows, error: domainErr } = await supabase
    .from("domains")
    .select("id,slug");
  if (domainErr) throw domainErr;

  const domainIdBySlug = new Map(domainRows.map((d) => [d.slug, d.id]));

  // 2) Upsert exams (strip domains array)
  {
    const examRows = exams.map((e) => {
      const { domains: _domains, ...rest } = e;
      return rest;
    });

    const { error } = await supabase
      .from("exams")
      .upsert(examRows, { onConflict: "slug" });
    if (error) throw error;
  }

  const { data: examRows, error: examErr } = await supabase
    .from("exams")
    .select("id,slug");
  if (examErr) throw examErr;

  const examIdBySlug = new Map(examRows.map((e) => [e.slug, e.id]));

  // 3) Upsert exam_domains
  const pairs = [];
  for (const e of exams) {
    const examId = examIdBySlug.get(e.slug);
    if (!examId) {
      console.warn(`Skipping mapping: exam not found for slug=${e.slug}`);
      continue;
    }

    for (const dSlug of e.domains || []) {
      const domainId = domainIdBySlug.get(dSlug);
      if (!domainId) {
        console.warn(`Skipping mapping: domain not found for slug=${dSlug} (exam=${e.slug})`);
        continue;
      }
      pairs.push({ exam_id: examId, domain_id: domainId });
    }
  }

  if (pairs.length) {
    const { error } = await supabase
      .from("exam_domains")
      .upsert(pairs, { onConflict: "exam_id,domain_id", ignoreDuplicates: true });
    if (error) throw error;
  }

  console.log(`Upserted exam_domains mappings: ${pairs.length}`);

  // 4) Upsert exam section content (optional)
  {
    const tableBySectionKey = {
      overview: "exam_overview",
      eligibility: "eligibility",
      syllabus: "syllabus",
      "exam-pattern": "pattern",
      "how-to-prepare": "preparation",
      "previous-year-question-papers": "pyq",
    };

    const rowsByTable = new Map();
    for (const [slug, sections] of Object.entries(examContent)) {
      const examId = examIdBySlug.get(slug);
      if (!examId) {
        console.warn(`Skipping content: exam not found for slug=${slug}`);
        continue;
      }

      for (const [sectionKey, contentMarkdown] of Object.entries(sections || {})) {
        const table = tableBySectionKey[sectionKey];
        if (!table) {
          console.warn(`Skipping content: unknown section=${sectionKey} (exam=${slug})`);
          continue;
        }
        if (typeof contentMarkdown !== "string" || !contentMarkdown.trim()) continue;

        const existing = rowsByTable.get(table) || [];
        existing.push({ exam_id: examId, content_markdown: contentMarkdown });
        rowsByTable.set(table, existing);
      }
    }

    for (const [table, rows] of rowsByTable.entries()) {
      if (!rows.length) continue;
      const { error } = await supabase.from(table).upsert(rows, { onConflict: "exam_id" });
      if (error) throw error;
      console.log(`Upserted ${rows.length} rows into ${table}`);
    }
  }

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
