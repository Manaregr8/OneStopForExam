import { BadgeCheck, FileText, ShieldCheck } from "lucide-react";

import styles from "@/app/page.module.scss";

export function HomeTrust() {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Why trust this platform</h2>
      <div className={styles.trustGrid}>
        <div className={`card ${styles.trustCard}`}>
          <div className={styles.cardTop}>
            <span className={styles.cardIcon} aria-hidden>
              <ShieldCheck size={18} aria-hidden />
            </span>
            <h3 className={styles.trustTitle}>Accurate syllabus</h3>
          </div>
          <p className={styles.cardDesc}>
            Topic-wise, structured, and written for preparation — not copied as a raw PDF.
          </p>
        </div>
        <div className={`card ${styles.trustCard}`}>
          <div className={styles.cardTop}>
            <span className={styles.cardIcon} aria-hidden>
              <BadgeCheck size={18} aria-hidden />
            </span>
            <h3 className={styles.trustTitle}>Updated exam patterns</h3>
          </div>
          <p className={styles.cardDesc}>
            Marking scheme, sections, duration, and mode — kept aligned with official changes.
          </p>
        </div>
        <div className={`card ${styles.trustCard}`}>
          <div className={styles.cardTop}>
            <span className={styles.cardIcon} aria-hidden>
              <FileText size={18} aria-hidden />
            </span>
            <h3 className={styles.trustTitle}>PYQs + how to use them</h3>
          </div>
          <p className={styles.cardDesc}>
            Not just links — guidance on practice cycles and how to extract high-weightage topics.
          </p>
        </div>
      </div>
    </section>
  );
}
