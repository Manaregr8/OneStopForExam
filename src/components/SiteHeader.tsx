"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

import styles from "./SiteHeader.module.scss";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";
import { ThemeToggle } from "@/components/ThemeToggle";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.brand}>
          <span className={styles.brandName}>{SITE_NAME}</span>
          <span className={styles.brandTagline}>{SITE_TAGLINE}</span>
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          <Link href="/exams">Exams</Link>
          <Link href="/domains">Domains</Link>
          <Link href="/colleges">Colleges (Coming Soon)</Link>
        </nav>

        <div className={styles.right}>
          <button
            type="button"
            className={styles.menuButton}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="primary-mobile-nav"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          <ThemeToggle />
        </div>
      </div>

      <div
        id="primary-mobile-nav"
        className={`${styles.mobileNav} ${mobileOpen ? styles.mobileNavOpen : ""}`}
        aria-label="Primary"
      >
        <div className={`container ${styles.mobileNavInner}`}>
          <Link href="/exams" className={styles.mobileLink}>
            Exams
          </Link>
          <Link href="/domains" className={styles.mobileLink}>
            Domains
          </Link>
          <Link href="/colleges" className={styles.mobileLink}>
            Colleges (Coming Soon)
          </Link>
        </div>
      </div>
    </header>
  );
}
