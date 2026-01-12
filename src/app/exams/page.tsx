import Link from "next/link";
import type { Metadata } from "next";

import styles from "./page.module.scss";

import { getDomains, getExams } from "@/lib/data/exams";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "All Exams",
  description:
    "Browse all Indian competitive exams by name or domain. Open any exam to view eligibility, syllabus, exam pattern, preparation strategy, and PYQs.",
  alternates: { canonical: absoluteUrl("/exams") },
};

export default async function ExamsIndexPage() {
  const [domains, exams] = await Promise.all([getDomains(), getExams()]);

  return (
    <div className={`container ${styles.page}`}>
      <h1 className={styles.h1}>All Exams</h1>
      <p className={styles.lede}>
        Explore exam pages built for preparation: eligibility, syllabus, exam pattern, how to
        prepare, and previous year question papers.
      </p>

      <section style={{ marginTop: 18 }}>
        <h2 style={{ margin: "0 0 10px", fontSize: 18 }}>Browse by domain</h2>
        <div className={styles.chips}>
          {domains.map((d) => (
            <Link
              key={d.id}
              href={`/domains/${d.slug}`}
              className={styles.chip}
            >
              {d.name}
            </Link>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 20 }}>
        <h2 style={{ margin: "0 0 10px", fontSize: 18 }}>Exam list</h2>
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
      </section>
    </div>
  );
}
