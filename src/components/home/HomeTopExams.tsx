import Link from "next/link";

import styles from "@/app/page.module.scss";

import type { Exam } from "@/lib/data/types";

import { HomeExamGrid } from "@/components/home/HomeExamGrid";

export function HomeTopExams({ exams }: { exams: Exam[] }) {
  return (
    <section className={styles.section}>
      <div className={styles.splitHeader}>
        <h2 className={styles.sectionTitle}>Top Exams in India</h2>
        <Link href="/exams" className={styles.mutedLink}>
          View all
        </Link>
      </div>
      <HomeExamGrid exams={exams} />
    </section>
  );
}
