import type { MetadataRoute } from "next";

import { createSupabasePublicClient } from "@/lib/supabase/public";
import { absoluteUrl } from "@/lib/site";
import { EXAM_SECTIONS } from "@/lib/data/exams";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, priority: 1 },
    { url: absoluteUrl("/exams"), lastModified: now, priority: 0.9 },
    { url: absoluteUrl("/domains"), lastModified: now, priority: 0.8 },
    { url: absoluteUrl("/colleges"), lastModified: now, priority: 0.2 },
  ];

  let domains: Array<{ slug: string; updated_at: string | null }> = [];
  let exams: Array<{ slug: string; updated_at: string }> = [];

  try {
    const supabase = createSupabasePublicClient();
    const [{ data: domainRows }, { data: examRows }] = await Promise.all([
      supabase.from("domains").select("slug,updated_at"),
      supabase.from("exams").select("slug,updated_at"),
    ]);

    domains = (domainRows ?? []) as Array<{ slug: string; updated_at: string | null }>;
    exams = (examRows ?? []) as Array<{ slug: string; updated_at: string }>;
  } catch {
    return staticRoutes;
  }

  const domainRoutes: MetadataRoute.Sitemap = (domains ?? []).map((d) => ({
    url: absoluteUrl(`/domains/${d.slug}`),
    lastModified: d.updated_at ? new Date(d.updated_at) : now,
    priority: 0.7,
  }));

  const examRoutes: MetadataRoute.Sitemap = (exams ?? []).flatMap((e) => {
    const base = {
      lastModified: e.updated_at ? new Date(e.updated_at) : now,
      priority: 0.85,
    };

    return EXAM_SECTIONS.map((s) => ({
      url:
        s.key === "overview"
          ? absoluteUrl(`/exams/${e.slug}`)
          : absoluteUrl(`/exams/${e.slug}/${s.key}`),
      ...base,
      priority: s.key === "overview" ? 0.85 : 0.75,
    }));
  });

  return [...staticRoutes, ...domainRoutes, ...examRoutes];
}
