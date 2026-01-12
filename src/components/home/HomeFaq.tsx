import styles from "@/app/page.module.scss";

import { Sparkles } from "lucide-react";

export type HomeFaqItem = { question: string; answer: string };

export function HomeFaq({ items }: { items: HomeFaqItem[] }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>FAQs</h2>
      <div className={styles.faqGrid}>
        {items.map((f) => (
          <div key={f.question} className={`card ${styles.faqCard}`}>
            <div className={styles.faqHead}>
              <span className={styles.cardIcon} aria-hidden>
                <Sparkles size={18} aria-hidden />
              </span>
              <h3 className={styles.faqQ}>{f.question}</h3>
            </div>
            <p className={styles.faqA}>{f.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
