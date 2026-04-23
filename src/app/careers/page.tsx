import Link from "next/link";
import type { Metadata } from "next";
import { 
  Monitor, 
  Rocket, 
  Cpu, 
  Terminal, 
  Calendar, 
  Banknote, 
  GraduationCap, 
  ChevronRight 
} from "lucide-react";

import { CAREER_FIELDS } from "@/lib/data/careers";
import { absoluteUrl } from "@/lib/site";
import styles from "./page.module.scss";

function CareerIcon({ name, size = 28 }: { name: string; size?: number }) {
  switch (name) {
    case "Monitor":
      return <Monitor size={size} />;
    case "Rocket":
      return <Rocket size={size} />;
    case "Cpu":
      return <Cpu size={size} />;
    case "Terminal":
      return <Terminal size={size} />;
    default:
      return <Monitor size={size} />;
  }
}

export const metadata: Metadata = {
  title: "B.Tech Career Fields – Engineering Domains Guide",
  description:
    "Explore B.Tech career fields: Software Engineering, Aerospace Engineering, AI & ML, and Computer Science Engineering. Compare eligibility, subjects, salaries and career paths.",
  alternates: { canonical: absoluteUrl("/careers") },
};

export default function CareersPage() {
  return (
    <div className={`container ${styles.page}`}>
      <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
        <Link href="/">Home</Link> / Career Fields
      </nav>

      <h1 className={styles.h1}>B.Tech Career Fields</h1>
      <p className={styles.lede}>
        Compare popular B.Tech engineering branches — eligibility, subjects, career roles, internships,
        and salary packages to find the right path for you.
      </p>

      <div className={styles.grid}>
        {CAREER_FIELDS.map((field) => (
          <Link key={field.slug} href={`/careers/${field.slug}`} className={styles.card}>
            <div className={styles.cardAccent} style={{ background: field.color }} aria-hidden />
            <div className={styles.cardBody}>
              <div className={styles.cardTop}>
                <span className={styles.icon} aria-hidden style={{ color: "var(--primary)" }}>
                  <CareerIcon name={field.iconName} size={32} />
                </span>
                <div>
                  <div className={styles.shortName}>{field.shortName}</div>
                  <h2 className={styles.name}>{field.name}</h2>
                </div>
                <span className={styles.arrow} aria-hidden>
                  <ChevronRight size={20} />
                </span>
              </div>

              <p className={styles.tagline}>{field.tagline}</p>

              <div className={styles.pills}>
                <span className={styles.pill}>
                  <Calendar size={14} style={{ marginRight: 4 }} /> {field.duration}
                </span>
                <span className={styles.pill}>
                  <Banknote size={14} style={{ marginRight: 4 }} /> {field.salaryFresher}
                </span>
                <span className={styles.pill}>
                  <GraduationCap size={14} style={{ marginRight: 4 }} /> PCM Required
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className={styles.cta}>
        <div className={styles.ctaText}>
          <h2>Preparing for an Entrance Exam?</h2>
          <p>Explore JEE Main, JEE Advanced and other entrance exams with full syllabus, patterns and PYQs.</p>
        </div>
        <Link href="/exams" className={styles.ctaLink}>
          Browse Exams <ChevronRight size={18} />
        </Link>
      </div>
    </div>
  );
}
