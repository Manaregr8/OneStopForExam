import Link from "next/link";
import { Monitor, Rocket, Cpu, Terminal, Banknote, ChevronRight } from "lucide-react";

import styles from "@/app/page.module.scss";
import { CAREER_FIELDS } from "@/lib/data/careers";

function CareerIcon({ name, size = 20 }: { name: string; size?: number }) {
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

export function HomeCareerFields() {
  return (
    <section className={styles.section}>
      <div className={styles.splitHeader}>
        <h2 className={styles.sectionTitle}>B.Tech Career Fields</h2>
        <Link href="/careers" className={styles.mutedLink}>
          View all <ChevronRight size={14} style={{ display: "inline", verticalAlign: "middle" }} />
        </Link>
      </div>

      <div className={styles.careerGrid}>
        {CAREER_FIELDS.map((field) => (
          <Link
            key={field.slug}
            href={`/careers/${field.slug}`}
            className={styles.careerCard}
          >
            {/* color accent bar */}
            <div
              style={{ height: 4, background: field.color, width: "100%" }}
              aria-hidden
            />
            <div style={{ padding: "14px 16px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 6,
                }}
              >
                <span 
                  style={{ 
                    width: 32, 
                    height: 32, 
                    borderRadius: 8, 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                    background: "color-mix(in srgb, var(--primary) 10%, transparent)",
                    color: "var(--primary)"
                  }} 
                  aria-hidden
                >
                  <CareerIcon name={field.iconName} size={18} />
                </span>
                <div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: "var(--muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {field.shortName}
                  </div>
                  <div style={{ fontWeight: 800, fontSize: 14, letterSpacing: "-0.01em" }}>
                    {field.name}
                  </div>
                </div>
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: 12,
                  color: "var(--muted)",
                  lineHeight: 1.5,
                }}
              >
                {field.tagline}
              </p>
              <div
                style={{
                  marginTop: 10,
                  fontSize: 11,
                  fontWeight: 700,
                  color: "var(--muted)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  textTransform: "uppercase",
                  letterSpacing: "0.02em"
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <Banknote size={14} /> {field.salaryFresher}
                </span>
                <ChevronRight size={14} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
