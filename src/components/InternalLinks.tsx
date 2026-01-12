import Link from "next/link";

import styles from "./InternalLinks.module.scss";
import type { Exam } from "@/lib/data/types";

export function ExamInternalLinks({
  sameDomainExams,
}: {
  sameDomainExams: Exam[];
}) {
  if (!sameDomainExams.length) return null;

  return (
    <section className={styles.wrap} aria-label="Internal links">
      <h2 className={styles.title}>More exams you may want to check</h2>
      <div className={styles.grid}>
        {sameDomainExams.slice(0, 10).map((e) => (
          <Link key={e.id} href={`/exams/${e.slug}`} className={styles.link}>
            {e.name}
            <span className={styles.small}>Exam details • Eligibility • Syllabus • Pattern</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
