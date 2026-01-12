import styles from "./Faq.module.scss";

export function Faq({
  items,
}: {
  items: Array<{ question: string; answer: string }>;
}) {
  if (!items.length) return null;

  return (
    <section className={styles.wrap} aria-label="Frequently asked questions">
      <h2 className={styles.title}>FAQs</h2>
      {items.map((it, idx) => (
        <div key={`${it.question}-${idx}`} className={styles.item}>
          <p className={styles.q}>{it.question}</p>
          <p className={styles.a}>{it.answer}</p>
        </div>
      ))}
    </section>
  );
}
