import Link from "next/link";

import styles from "./ExamShell.module.scss";
import type { Domain, Exam } from "@/lib/data/types";
import { EXAM_SECTIONS, type ExamSectionKey } from "@/lib/data/exams";
import { sectionLabel } from "@/lib/seo/metadata";

export function ExamShell({
  exam,
  domains,
  activeSection,
  children,
  sidebar,
}: {
  exam: Exam;
  domains: Domain[];
  activeSection: ExamSectionKey;
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <div className="container">
      <header className={styles.header}>
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/exams">Exams</Link>
          <span>/</span>
          <Link href={`/exams/${exam.slug}`}>{exam.name}</Link>
          {activeSection !== "overview" ? (
            <>
              <span>/</span>
              <span>{sectionLabel(activeSection)}</span>
            </>
          ) : null}
        </nav>

        <h1 className={styles.h1}>
          {exam.name}
          {activeSection !== "overview" ? ` – ${sectionLabel(activeSection)}` : ""}
        </h1>

        <div className={styles.meta}>
          {exam.conducting_body ? (
            <span>
              Conducting body: <strong>{exam.conducting_body}</strong>
            </span>
          ) : null}
          {exam.exam_mode ? (
            <span>
              Mode: <strong>{exam.exam_mode}</strong>
            </span>
          ) : null}
          {exam.frequency ? (
            <span>
              Frequency: <strong>{exam.frequency}</strong>
            </span>
          ) : null}
        </div>

        {domains.length ? (
          <div className={styles.chips} aria-label="Domains">
            {domains.map((d) => (
              <Link key={d.id} href={`/domains/${d.slug}`} className={styles.chip}>
                {d.name}
              </Link>
            ))}
          </div>
        ) : null}

        <div className={styles.tabs} aria-label="Exam sections">
          {EXAM_SECTIONS.map((s) => {
            const href =
              s.key === "overview"
                ? `/exams/${exam.slug}`
                : `/exams/${exam.slug}/${s.key}`;
            const active = s.key === activeSection;

            return (
              <Link
                key={s.key}
                href={href}
                className={`${styles.tab} ${active ? styles.active : ""}`}
              >
                {s.key === "overview" ? s.label : sectionLabel(s.key)}
              </Link>
            );
          })}
        </div>
      </header>

      <div className={styles.contentGrid}>
        <article className={`card prose ${styles.articleCard}`}>{children}</article>
        {sidebar}
      </div>
    </div>
  );
}
