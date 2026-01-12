import Link from "next/link";

import { ShieldCheck, Sparkles } from "lucide-react";

import styles from "./SiteFooter.module.scss";

import { SITE_NAME } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.brand}>
            <div className={styles.copy}>© {year} {SITE_NAME}. Built for exam-first clarity.</div>
            <div className={styles.badges}>
              <span className={styles.badge}>
                <ShieldCheck size={14} aria-hidden />
                SEO-first SSR
              </span>
              <span className={styles.badge}>
                <Sparkles size={14} aria-hidden />
                Modern UI
              </span>
            </div>
          </div>

          <div className={styles.links}>
            <Link href="/exams">All Exams</Link>
            <Link href="/domains">Browse Domains</Link>
            <Link href="/colleges">Colleges (Soon)</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
