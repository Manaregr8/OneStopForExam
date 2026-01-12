import Link from "next/link";
import Image from "next/image";

import { Sparkles } from "lucide-react";

import styles from "@/app/page.module.scss";

export function HomeCollegesSoon() {
  return (
    <section className={styles.section}>
      <div className={`card ${styles.comingSoon}`}>
        <div className={styles.comingSoonTitleRow}>
          <span className={styles.cardIcon} aria-hidden>
            <Sparkles size={18} aria-hidden />
          </span>
          <h2 className={styles.comingSoonTitle}>Coming Soon: Colleges</h2>
        </div>
        <p className={styles.trustText}>
          We’re building a college layer next. For now, this platform is intentionally exam-focused.
        </p>
        <Link href="/colleges" className={styles.primaryBtn}>
          See what’s coming
        </Link>

        <span className={styles.cardThumb} aria-hidden>
          <Image src="/illustrations/cards/exam.svg" alt="" width={168} height={112} />
        </span>
      </div>
    </section>
  );
}
