import styles from "./TocSidebar.module.scss";
import type { TocItem } from "@/lib/markdown";

export function TocSidebar({ toc }: { toc: TocItem[] }) {
  if (!toc.length) return null;

  return (
    <aside className={styles.aside} aria-label="Table of contents">
      <p className={styles.title}>On this page</p>
      <ol className={styles.list}>
        {toc.map((item) => (
          <li
            key={item.id}
            className={`${styles.item} ${item.depth === 3 ? styles.depth3 : ""}`}
          >
            <a href={`#${item.id}`}>{item.text}</a>
          </li>
        ))}
      </ol>
    </aside>
  );
}
