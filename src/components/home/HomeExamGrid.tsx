import Link from "next/link";
import Image from "next/image";

import { BadgeCheck, FileText } from "lucide-react";

import styles from "@/app/page.module.scss";

import type { Exam } from "@/lib/data/types";

export function HomeExamGrid({ exams }: { exams: Exam[] }) {
  return (
    <div className={styles.examGrid}>
      {exams.map((e) => (
        <Link key={e.id} href={`/exams/${e.slug}`} className={styles.examCard}>
          <div className={styles.examCardInner}>
            <div className={styles.examCardMain}>
              <div className={styles.cardTop}>
                <span className={styles.cardIcon} aria-hidden>
                  <FileText size={18} aria-hidden />
                </span>
                <span className={styles.examName}>{e.name}</span>
              </div>

              <span className={styles.examMeta}>
                {e.conducting_body ? `${e.conducting_body} • ` : ""}
                {e.exam_mode ?? "Exam"}
              </span>

              <div className={styles.examBadges}>
                <span className={styles.pill}>
                  <BadgeCheck size={14} aria-hidden />
                  Structured pages
                </span>
              </div>
            </div>

            <span className={styles.cardThumb} aria-hidden>
              <Image src="/illustrations/cards/exam.svg" alt="" width={168} height={112} />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
