import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Monitor, Rocket, Cpu, Terminal } from "lucide-react";

import styles from "./page.module.scss";

import { getDomainBySlug, getExamsForDomain } from "@/lib/data/exams";
import { CAREER_FIELDS } from "@/lib/data/careers";
import { absoluteUrl } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/seo/schema";

function CareerIcon({ name, size = 18 }: { name: string; size?: number }) {
  switch (name) {
    case "Monitor":
      return <Monitor size={size} />;
    case "Rocket":
      return <Rocket size={size} />;
    case "Cpu":
      return <Cpu size={size} />;
    case "Terminal":
      return <Terminal size={size} />;
    default:
      return <Monitor size={size} />;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ domainSlug: string }>;
}): Promise<Metadata> {
  const { domainSlug } = await params;
  const domain = await getDomainBySlug(domainSlug);
  if (!domain) return {};

  const title = `${domain.name} Exams`;
  const description =
    domain.description ??
    `Explore ${domain.name} exams with eligibility, syllabus, exam pattern, preparation strategy, and PYQs.`;

  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(`/domains/${domain.slug}`) },
  };
}

export default async function DomainPage({
  params,
}: {
  params: Promise<{ domainSlug: string }>;
}) {
  const { domainSlug } = await params;
  const domain = await getDomainBySlug(domainSlug);
  if (!domain) notFound();

  const exams = await getExamsForDomain(domain.id);

  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", url: absoluteUrl("/") },
    { name: "Domains", url: absoluteUrl("/domains") },
    { name: domain.name, url: absoluteUrl(`/domains/${domain.slug}`) },
  ]);

  // Map domain slugs to related career field slugs
  const domainCareerMap: Record<string, string[]> = {
    engineering: ["software-engineering", "aerospace-engineering", "ai-ml", "computer-science-engineering"],
    technology: ["software-engineering", "ai-ml", "computer-science-engineering"],
    science: ["aerospace-engineering", "ai-ml"],
    management: [],
    medical: [],
  };
  const relatedCareerSlugs = domainCareerMap[domain.slug] ?? [];
  const relatedCareers = CAREER_FIELDS.filter((f) => relatedCareerSlugs.includes(f.slug));

  return (
    <div className={`container ${styles.page}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
        <Link href="/">Home</Link> / <Link href="/domains">Domains</Link> / {domain.name}
      </nav>

      <h1 className={styles.h1}>{domain.name} Exams</h1>
      <p className={styles.lede}>
        {domain.description ??
          `Explore exams in ${domain.name}. Each exam page includes eligibility, syllabus, exam pattern, preparation strategy, and PYQs.`}
      </p>

      <div className={styles.grid}>
        {exams.map((e) => (
          <Link
            key={e.id}
            href={`/exams/${e.slug}`}
            className="card"
            style={{ textDecoration: "none" ,padding:"10px"}}
          >
            <div className={styles.name}>{e.name}</div>
            <div className={styles.meta}>
              {e.conducting_body ? `${e.conducting_body} • ` : ""}
              {e.exam_mode ?? "Exam"}
            </div>
          </Link>
        ))}
      </div>

      <section className={styles.quick}>
        <h2 className={styles.quickTitle}>Quick start</h2>
        <p className={styles.quickText}>
          Pick an exam, then use the tabs on the exam page to jump to Eligibility, Syllabus, Exam
          Pattern, How to Prepare and PYQs.
        </p>
      </section>

      {relatedCareers.length > 0 && (
        <section style={{ marginTop: 28 }}>
          <h2 className={styles.quickTitle}>Related B.Tech Career Fields</h2>
          <p className={styles.quickText} style={{ marginBottom: 14 }}>
            Explore bachelor's degree options in {domain.name} — subjects, career roles, salary and internships.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 10,
            }}
          >
            {relatedCareers.map((career) => (
              <Link
                key={career.slug}
                href={`/careers/${career.slug}`}
                style={{
                  display: "block",
                  padding: "14px 16px",
                  borderRadius: "var(--radius)",
                  border: "1px solid var(--border)",
                  background: "var(--card)",
                  color: "var(--text)",
                  textDecoration: "none",
                  overflow: "hidden",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <div style={{ height: 3, background: career.color, marginBottom: 10, borderRadius: 2 }} aria-hidden />
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ color: "var(--primary)" }}>
                    <CareerIcon name={career.iconName} />
                  </span>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 13 }}>{career.shortName}</div>
                    <div style={{ fontSize: 12, color: "var(--muted)" }}>{career.salaryFresher} starting</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
