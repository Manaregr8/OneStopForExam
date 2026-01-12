import Link from "next/link";
import type { Metadata } from "next";

import styles from "./page.module.scss";

import { getDomains } from "@/lib/data/exams";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Exam Domains",
  description:
    "Browse Indian competitive exams by domain: Engineering, Medical, Government, Banking, Law, Defence, Teaching, Design, and more.",
  alternates: { canonical: absoluteUrl("/domains") },
};

export default async function DomainsPage() {
  const domains = await getDomains();

  return (
    <div className={`container ${styles.page}`}>
      <h1 className={styles.h1}>Domains</h1>
      <p className={styles.lede}>
        Start from a domain to see all related exams. Each exam page links back to its domain(s).
      </p>

      <div className={styles.grid}>
        {domains.map((d) => (
          <Link
            key={d.id}
            href={`/domains/${d.slug}`}
            className="card"
            style={{ textDecoration: "none" , padding:"10px"}}
          >
            <div className={styles.name}>{d.name}</div>
            <div className={styles.desc}>
              {d.description ?? "Explore exams in this domain."}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
