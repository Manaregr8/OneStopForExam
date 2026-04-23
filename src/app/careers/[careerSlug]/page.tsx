import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { 
  Monitor, 
  Rocket, 
  Cpu, 
  Terminal, 
  Calendar, 
  Banknote, 
  GraduationCap, 
  ClipboardList,
  BookText,
  CheckCircle,
  Book,
  Briefcase,
  Building2,
  Globe,
  Lightbulb,
  Settings,
  Star,
  AlertTriangle,
  Clock,
  ChevronRight
} from "lucide-react";

import { CAREER_FIELDS, getCareerBySlug } from "@/lib/data/careers";
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

export async function generateStaticParams() {
  return CAREER_FIELDS.map((f) => ({ careerSlug: f.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ careerSlug: string }>;
}): Promise<Metadata> {
  const { careerSlug } = await params;
  const field = getCareerBySlug(careerSlug);
  if (!field) return {};

  return {
    title: `B.Tech ${field.name} – Career Guide, Subjects, Salary & Jobs`,
    description: `Complete guide to B.Tech ${field.name}: eligibility, subjects, internships, career roles, top recruiters and salary packages. ${field.salaryFresher} starting salary.`,
    alternates: { canonical: absoluteUrl(`/careers/${field.slug}`) },
  };
}

export default async function CareerDetailPage({
  params,
}: {
  params: Promise<{ careerSlug: string }>;
}) {
  const { careerSlug } = await params;
  const field = getCareerBySlug(careerSlug);
  if (!field) notFound();

  const related = CAREER_FIELDS.filter((f) => f.slug !== field.slug);

  return (
    <div className={`container ${styles.page}`}>
      {/* Breadcrumbs */}
      <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
        <Link href="/">Home</Link> / <Link href="/careers">Career Fields</Link> / {field.name}
      </nav>

      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroAccent} style={{ background: field.color }} aria-hidden />
        <div className={styles.heroBody}>
          <span className={styles.heroIcon} aria-hidden style={{ color: "var(--primary)" }}>
            <CareerIcon name={field.iconName} size={48} />
          </span>
          <div className={styles.heroText}>
            <div className={styles.shortBadge}>B.Tech · {field.shortName}</div>
            <h1 className={styles.h1}>{field.name}</h1>
            <p className={styles.tagline}>{field.tagline}</p>
            <div className={styles.heroBadges}>
              <span className={styles.badge}>
                <Calendar size={14} style={{ marginRight: 6 }} /> {field.duration}
              </span>
              <span className={styles.badge}>
                <Banknote size={14} style={{ marginRight: 6 }} /> Fresher: {field.salaryFresher}
              </span>
              <span className={styles.badge}>
                <GraduationCap size={14} style={{ marginRight: 6 }} /> PCM Required
              </span>
              <span className={styles.badge}>
                <CheckCircle size={14} style={{ marginRight: 6 }} /> JEE Main
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div className={styles.layout}>
        {/* Left column – detail sections */}
        <div>
          {/* What is this field? */}
          <div className={styles.section}>
            <div className={`card ${styles.sectionCard}`}>
              <h2 className={styles.sectionTitle}>
                <BookText size={18} style={{ color: "var(--primary)" }} /> What is {field.name}?
              </h2>
              <p className={styles.description}>{field.description}</p>
            </div>
          </div>

          {/* Eligibility + Admission */}
          <div className={styles.section}>
            <div className={`card ${styles.sectionCard}`}>
              <h2 className={styles.sectionTitle}>
                <CheckCircle size={18} style={{ color: "var(--primary)" }} /> Eligibility & Admission
              </h2>
              <div className={styles.twoCol}>
                <div className={styles.subSection}>
                  <h4>Eligibility Criteria</h4>
                  <ul className={styles.list}>
                    {field.eligibility.map((item, i) => (
                      <li key={i} className={styles.listItem}>
                        <CheckCircle size={14} style={{ color: "var(--success)", marginTop: 3 }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={styles.subSection}>
                  <h4>Admission Process</h4>
                  <ul className={styles.list}>
                    {field.admissionProcess.map((item, i) => (
                      <li key={i} className={styles.listItem}>
                        <span
                          className={styles.bullet}
                          style={{ background: field.color }}
                        >
                          {i + 1}
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Subjects */}
          <div className={styles.section}>
            <div className={`card ${styles.sectionCard}`}>
              <h2 className={styles.sectionTitle}>
                <Book size={18} style={{ color: "var(--primary)" }} /> Subjects
              </h2>
              <div className={styles.twoCol}>
                <div className={styles.subSection}>
                  <h4>Core Subjects</h4>
                  <ul className={styles.list}>
                    {field.coreSubjects.map((subj, i) => (
                      <li key={i} className={styles.listItem}>
                        <CheckCircle size={14} style={{ color: "var(--success)", marginTop: 3 }} />
                        {subj}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={styles.subSection}>
                  <h4>Specialized Subjects</h4>
                  <ul className={styles.list}>
                    {field.specializedSubjects.map((subj, i) => (
                      <li key={i} className={styles.listItem}>
                        <CheckCircle size={14} style={{ color: "var(--success)", marginTop: 3 }} />
                        {subj}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Career Roles */}
          <div className={styles.section}>
            <div className={`card ${styles.sectionCard}`}>
              <h2 className={styles.sectionTitle}>
                <Briefcase size={18} style={{ color: "var(--primary)" }} /> Career Roles
              </h2>
              <div className={styles.rolesGrid}>
                {field.careerRoles.map((role, i) => (
                  <div key={i} className={styles.roleCard}>
                    <ChevronRight size={14} />
                    {role}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Salary */}
          <div className={styles.section}>
            <div className={`card ${styles.sectionCard}`}>
              <h2 className={styles.sectionTitle}>
                <Banknote size={18} style={{ color: "var(--primary)" }} /> Salary Package
              </h2>
              <div className={styles.salaryCards}>
                <div className={styles.salaryCard}>
                  <span className={styles.salaryLabel}>Starting (Freshers)</span>
                  <span className={styles.salaryAmount}>{field.salaryFresher}</span>
                </div>
                <div className={styles.salaryCard}>
                  <span className={styles.salaryLabel}>With Experience</span>
                  <span className={styles.salaryAmount}>{field.salaryExperienced}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Internships */}
          <div className={styles.section}>
            <div className={`card ${styles.sectionCard}`}>
              <h2 className={styles.sectionTitle}>
                <Building2 size={18} style={{ color: "var(--primary)" }} /> Internship Opportunities
              </h2>
              <p className={styles.description} style={{ marginBottom: 14 }}>
                Internships provide real-world experience, build your resume, and significantly increase placement chances. Many companies offer Pre-Placement Offers (PPOs) after internships.
              </p>
              <div className={styles.subSection}>
                <h4>Top Companies for Internships</h4>
                <div className={styles.pillsWrap}>
                  {field.internshipCompanies.map((c) => (
                    <span key={c} className={styles.pill}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>
              {field.internshipPlatforms && (
                <div className={styles.subSection} style={{ marginTop: 14 }}>
                  <h4>Where to Apply</h4>
                  <div className={styles.pillsWrap}>
                    {field.internshipPlatforms.map((p) => (
                      <span key={p} className={styles.pill}>
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Job Sectors + Recruiters */}
          <div className={styles.section}>
            <div className={`card ${styles.sectionCard}`}>
              <h2 className={styles.sectionTitle}>
                <Globe size={18} style={{ color: "var(--primary)" }} /> Placements & Job Sectors
              </h2>
              <div className={styles.twoCol}>
                <div className={styles.subSection}>
                  <h4>Top Recruiters</h4>
                  <ul className={styles.list}>
                    {field.topRecruiters.map((r, i) => (
                      <li key={i} className={styles.listItem}>
                        <CheckCircle size={14} style={{ color: "var(--success)", marginTop: 3 }} />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={styles.subSection}>
                  <h4>Job Sectors</h4>
                  <ul className={styles.list}>
                    {field.jobSectors.map((s, i) => (
                      <li key={i} className={styles.listItem}>
                        <CheckCircle size={14} style={{ color: "var(--success)", marginTop: 3 }} />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Conclusion */}
          <div className={styles.conclusion}>
            <p>{field.conclusion}</p>
          </div>
        </div>

        {/* Sidebar */}
        <aside className={styles.sidebar}>
          {/* Skills */}
          <div className={`card ${styles.sideCard}`}>
            <h3 className={styles.sideTitle}>
              <Lightbulb size={16} style={{ color: "#f59e0b", marginRight: 8, verticalAlign: "middle" }} /> 
              Skills Required
            </h3>
            <ul className={styles.list}>
              {field.skillsRequired.map((s, i) => (
                <li key={i} className={styles.listItem}>
                  <CheckCircle size={14} style={{ color: "var(--primary)", marginTop: 3 }} />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Skills */}
          <div className={`card ${styles.sideCard}`}>
            <h3 className={styles.sideTitle}>
              <Settings size={16} style={{ color: "var(--muted)", marginRight: 8, verticalAlign: "middle" }} /> 
              Technical Skills
            </h3>
            <div className={styles.pillsWrap}>
              {field.technicalSkills.map((s) => (
                <span key={s} className={styles.pill}>
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Why Choose */}
          <div className={`card ${styles.sideCard}`}>
            <h3 className={styles.sideTitle}>
              <Star size={16} style={{ color: "#f59e0b", marginRight: 8, verticalAlign: "middle" }} /> 
              Why Choose This?
            </h3>
            <ul className={styles.list}>
              {field.whyChoose.map((w, i) => (
                <li key={i} className={styles.listItem}>
                  <Star size={12} style={{ color: "#f59e0b", marginTop: 4 }} />
                  {w}
                </li>
              ))}
            </ul>
          </div>

          {/* Challenges */}
          <div className={`card ${styles.sideCard}`}>
            <h3 className={styles.sideTitle}>
              <AlertTriangle size={16} style={{ color: "var(--danger)", marginRight: 8, verticalAlign: "middle" }} /> 
              Challenges
            </h3>
            <ul className={styles.list}>
              {field.challenges.map((c, i) => (
                <li key={i} className={styles.listItem}>
                  <AlertTriangle size={12} style={{ color: "var(--danger)", marginTop: 4 }} />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          {/* Higher Studies */}
          <div className={`card ${styles.sideCard}`}>
            <h3 className={styles.sideTitle}>
              <GraduationCap size={16} style={{ color: "var(--primary)", marginRight: 8, verticalAlign: "middle" }} /> 
              Higher Studies
            </h3>
            <ul className={styles.list}>
              {field.higherStudies.map((h, i) => (
                <li key={i} className={styles.listItem}>
                  <ChevronRight size={14} style={{ marginTop: 3 }} />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {field.studyTimetable && (
            <div className={`card ${styles.sideCard}`}>
              <h3 className={styles.sideTitle}>
                <Clock size={16} style={{ color: "var(--primary)", marginRight: 8, verticalAlign: "middle" }} /> 
                Ideal Study Timetable
              </h3>
              <ul className={styles.list}>
                <li className={styles.listItem}>
                  <span className={styles.bullet} style={{ background: field.color }}>1</span>
                  <strong>College:</strong> {field.studyTimetable.college}
                </li>
                <li className={styles.listItem}>
                  <span className={styles.bullet} style={{ background: field.color }}>2</span>
                  <strong>Self-study:</strong> {field.studyTimetable.selfStudy}
                </li>
                <li className={styles.listItem}>
                  <span className={styles.bullet} style={{ background: field.color }}>3</span>
                  <strong>Coding:</strong> {field.studyTimetable.coding}
                </li>
                <li className={styles.listItem} style={{ fontWeight: 800, marginTop: 4 }}>
                  <span className={styles.bullet} style={{ background: field.color }}>
                    <ChevronRight size={10} />
                  </span>
                  <strong>Total:</strong> {field.studyTimetable.total}
                </li>
              </ul>
            </div>
          )}

          {/* Explore Exams */}
          <div className={`card ${styles.sideCard}`}>
            <h3 className={styles.sideTitle}>
              <ClipboardList size={16} style={{ color: "var(--primary)", marginRight: 8, verticalAlign: "middle" }} /> 
              Entrance Exams
            </h3>
            <ul className={styles.quickLinks}>
              <li>
                <Link href="/exams" className={styles.quickLink}>
                  <ChevronRight size={14} style={{ display: "inline", marginRight: 4 }} />
                  Browse All Exams
                </Link>
              </li>
              <li>
                <Link href="/domains" className={styles.quickLink}>
                  <ChevronRight size={14} style={{ display: "inline", marginRight: 4 }} />
                  Explore Domains
                </Link>
              </li>
              <li>
                <Link href="/careers" className={styles.quickLink}>
                  <ChevronRight size={14} style={{ display: "inline", marginRight: 4 }} />
                  All Career Fields
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>

      {/* Related Career Fields */}
      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 20, letterSpacing: "-0.02em", margin: "0 0 14px" }}>
          Explore Other Career Fields
        </h2>
        <div className={styles.relatedGrid}>
          {related.map((r) => (
            <Link key={r.slug} href={`/careers/${r.slug}`} className={styles.relatedCard}>
              <span className={styles.relatedIcon} style={{ color: "var(--primary)" }}>
                <CareerIcon name={r.iconName} size={24} />
              </span>
              <div className={styles.relatedName}>{r.name}</div>
              <div className={styles.relatedTagline}>{r.tagline}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
