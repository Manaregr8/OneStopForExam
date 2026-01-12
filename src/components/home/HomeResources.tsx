import { BookOpenCheck, Brain, Timer } from "lucide-react";

import styles from "@/app/page.module.scss";

export function HomeResources() {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Exam Preparation Resources</h2>
      <div className={styles.resourcesGrid}>
        <div className={`card ${styles.resourceCard}`}>
          <div className={styles.cardTop}>
            <span className={styles.cardIcon} aria-hidden>
              <Brain size={18} aria-hidden />
            </span>
            <h3 className={styles.trustTitle}>Revision strategy</h3>
          </div>
          <p className={styles.cardDesc}>
            Build a weekly revision loop: quick notes → PYQs → mock → error log → targeted practice.
          </p>
        </div>
        <div className={`card ${styles.resourceCard}`}>
          <div className={styles.cardTop}>
            <span className={styles.cardIcon} aria-hidden>
              <Timer size={18} aria-hidden />
            </span>
            <h3 className={styles.trustTitle}>Mock test framework</h3>
          </div>
          <p className={styles.cardDesc}>
            Attempt in exam conditions, analyze for 2× the time, then fix one weakness per cycle.
          </p>
        </div>
        <div className={`card ${styles.resourceCard}`}>
          <div className={styles.cardTop}>
            <span className={styles.cardIcon} aria-hidden>
              <BookOpenCheck size={18} aria-hidden />
            </span>
            <h3 className={styles.trustTitle}>PYQ-first learning</h3>
          </div>
          <p className={styles.cardDesc}>
            Use PYQs to identify what is actually asked — and prioritize those topics early.
          </p>
        </div>
      </div>
    </section>
  );
}
