import styles from "@/app/page.module.scss";
import Image from "next/image";

export function HomeSeoBlock() {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>About India’s competitive exams (and how to use this portal)</h2>
      <div className={styles.aboutGrid}>
        <div className={`card ${styles.aboutImageCard}`}>
          <div className={styles.aboutImage}>
            <Image
              src="/studying%20student.jpg"
              alt="Student studying"
              width={720}
              height={900}
              sizes="(max-width: 900px) 100vw, 360px"
            />
          </div>
        </div>

        <div className={`prose ${styles.seoBlock}`}>
          <p>
            India’s competitive exam ecosystem is wide: Engineering entrance exams like JEE Main,
            Medical exams like NEET UG, Management exams like CAT, Government recruitment exams like
            UPSC and SSC CGL, banking exams like IBPS PO and SBI PO, law exams like CLAT, defence exams
            like NDA, teaching exams like CTET and UGC NET, and several university-level tests. While
            notifications, formats, and timelines vary, serious preparation always needs the same
            building blocks: clear eligibility rules, a topic-wise syllabus, an unambiguous exam
            pattern, and a disciplined practice workflow.
          </p>
          <p>
            This platform is designed as a structured knowledge graph — not a random collection of
            articles. Every exam has dedicated pages for Eligibility, Syllabus, Exam Pattern, How to
            Prepare, and Previous Year Question Papers. Use the syllabus page to create a checklist of
            topics, then use the exam pattern page to allocate time and attempts per section. Finally,
            use PYQs to validate which topics repeat and to build accuracy under time pressure. If you
            are switching from one exam to another within the same domain, compare patterns and syllabi
            to reuse preparation efforts effectively.
          </p>
          <p>
            Aspirants often lose weeks due to scattered information. A reliable portal must be
            readable, updated, and internal-link rich so you can move from a domain (like Engineering)
            to an exam (like JEE Main) and then to the exact section you need (like eligibility or
            syllabus) without distraction. That’s the mission here: one-stop solution for every exam
            in India.
          </p>
        </div>
      </div>
    </section>
  );
}
