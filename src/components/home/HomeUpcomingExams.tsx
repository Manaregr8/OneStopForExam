import Link from "next/link";
import Image from "next/image";

import { CalendarClock } from "lucide-react";

import styles from "@/app/page.module.scss";

import type { Exam } from "@/lib/data/types";

export function HomeUpcomingExams({ exams }: { exams: Exam[] }) {
  return (
    <section className={styles.section}>
      <div className={styles.splitHeader}>
        <h2 className={styles.sectionTitle}>Upcoming Exams</h2>
        <Link href="/exams" className={styles.mutedLink}>
          View all
        </Link>
      </div>

      <div className={styles.examGrid}>
        {exams.map((e) => (
          <Link key={e.id} href={`/exams/${e.slug}`} className={styles.examCard}>
            <div className={styles.examCardInner}>
              <div className={styles.examCardMain}>
                <div className={styles.cardTop}>
                  <span className={styles.cardIcon} aria-hidden>
                    <CalendarClock size={18} aria-hidden />
                  </span>
                  <span className={styles.examName}>{e.name}</span>
                </div>

                <span className={styles.examMeta}>
                  {e.upcoming_from ? `From ${e.upcoming_from}` : "Check official dates"}
                </span>
              </div>

              <span className={styles.cardThumb} aria-hidden>
                <Image src="/illustrations/cards/exam.svg" alt="" width={168} height={112} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
