import Link from "next/link";
import Image from "next/image";

import {
  ArrowRight,
  BadgeCheck,
  Layers,
  Search,
  Sparkles,
  ClipboardList,
  BookOpen,
  Target,
  CalendarClock,
  FileText,
} from "lucide-react";

import styles from "@/app/page.module.scss";

import { SearchBox } from "@/components/SearchBox";

export function HomeHero() {
  return (
    <div className={styles.hero}>
      <div className="container">
        <div className={styles.heroGrid}>
          <div>
            <p className={styles.kicker}>Exam-first knowledge graph</p>
            <h1 className={styles.h1}>One Platform. Every Exam in India.</h1>
            <p className={styles.lede}>
              Eligibility, syllabus, exam pattern, preparation strategy and PYQs — in a clean,
              structured layout built for Indian aspirants.
            </p>

            <div className={styles.heroHighlights}>
              <div className={styles.highlightCard}>
                <span className={styles.highlightIcon} aria-hidden>
                  <Search size={18} />
                </span>
                <div>
                  <div className={styles.highlightTitle}>Smart search</div>
                  <div className={styles.highlightText}>Find any exam in seconds.</div>
                </div>
              </div>
              <div className={styles.highlightCard}>
                <span className={styles.highlightIcon} aria-hidden>
                  <Layers size={18} />
                </span>
                <div>
                  <div className={styles.highlightTitle}>Structured sections</div>
                  <div className={styles.highlightText}>Same layout for every exam.</div>
                </div>
              </div>
              <div className={styles.highlightCard}>
                <span className={styles.highlightIcon} aria-hidden>
                  <BadgeCheck size={18} />
                </span>
                <div>
                  <div className={styles.highlightTitle}>Preparation-ready</div>
                  <div className={styles.highlightText}>Syllabus → plan → PYQs.</div>
                </div>
              </div>
            </div>

            <SearchBox />

            <div className={styles.heroCtas}>
              <Link className={styles.primaryBtn} href="/exams">
                Browse All Exams <ArrowRight size={16} />
              </Link>
              <Link className={styles.secondaryBtn} href="/domains">
                Browse by Domain
              </Link>
            </div>
          </div>

          <div className={`card ${styles.heroCard}`}>
            <div className={styles.heroVisual}>
              <Image
                src="/illustrations/hero.svg"
                alt="Exam dashboard illustration"
                width={900}
                height={640}
                priority
              />
            </div>

            <div className={styles.heroCardBody}>
              <div className={styles.heroCardTop}>
                <span className={styles.heroBadge}>
                  <Sparkles size={14} aria-hidden />
                  Built for aspirants
                </span>
                <h2 className={styles.heroCardTitle}>Everything you need per exam</h2>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
