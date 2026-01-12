import Link from "next/link";
import Image from "next/image";

import { Layers, BadgeCheck, ShieldCheck, Sparkles } from "lucide-react";

import type { ReactNode } from "react";

import styles from "@/app/page.module.scss";

import type { Domain } from "@/lib/data/types";

function domainVisual(domainSlug: string): { icon: ReactNode; imageSrc: string } {
  switch (domainSlug) {
    case "engineering":
      return { icon: <Layers size={18} aria-hidden />, imageSrc: "/illustrations/domains/engineering.svg" };
    case "medical":
      return { icon: <BadgeCheck size={18} aria-hidden />, imageSrc: "/illustrations/domains/medical.svg" };
    case "government":
      return { icon: <ShieldCheck size={18} aria-hidden />, imageSrc: "/illustrations/domains/government.svg" };
    case "management":
      return { icon: <Sparkles size={18} aria-hidden />, imageSrc: "/illustrations/domains/management.svg" };
    default:
      return { icon: <Layers size={18} aria-hidden />, imageSrc: "/illustrations/cards/exam.svg" };
  }
}

export function HomeDomains({ domains }: { domains: Domain[] }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Browse Exams by Domain</h2>
      <div className={styles.domainGrid}>
        {domains.map((d) => {
          const v = domainVisual(d.slug);
          return (
            <Link key={d.id} href={`/domains/${d.slug}`} className={styles.domainCard}>
              <div className={styles.domainCardInner}>
                <div className={styles.domainCardMain}>
                  <div className={styles.domainCardTop}>
                    <span className={styles.cardIcon} aria-hidden>
                      {v.icon}
                    </span>
                    <span className={styles.domainName}>{d.name}</span>
                  </div>
                  <span className={styles.domainDesc}>
                    {d.description ?? "Explore exams in this domain"}
                  </span>
                </div>

                <span className={styles.cardThumb} aria-hidden>
                  <Image src={v.imageSrc} alt="" width={168} height={112} />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
