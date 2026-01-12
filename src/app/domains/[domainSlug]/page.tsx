import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import styles from "./page.module.scss";

import { getDomainBySlug, getExamsForDomain } from "@/lib/data/exams";
import { absoluteUrl } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/seo/schema";

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
    </div>
  );
}
