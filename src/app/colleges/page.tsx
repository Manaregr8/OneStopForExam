import type { Metadata } from "next";

import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Colleges (Coming Soon)",
  description:
    "Colleges module is coming soon. This release is focused purely on Indian competitive exams.",
  alternates: { canonical: absoluteUrl("/colleges") },
};

export default function CollegesComingSoonPage() {
  return (
    <div className="container" style={{ padding: "26px 0" }}>
      <h1 style={{ margin: 0, fontSize: 30, letterSpacing: "-0.02em" }}>
        Colleges (Coming Soon)
      </h1>
      <p style={{ color: "var(--muted)", maxWidth: 820 }}>
        We’re building a college layer next. This release is intentionally exam-focused —
        a one-stop solution for every exam in India.
      </p>

      <div className="card" style={{ padding: 18, marginTop: 16 }}>
        <h2 style={{ margin: "0 0 8px", fontSize: 18 }}>What will be included</h2>
        <ul style={{ margin: 0, paddingLeft: 18, color: "var(--muted)" }}>
          <li>College profiles + approvals</li>
          <li>Courses + eligibility mapping</li>
          <li>Fees + placements + cutoff trends</li>
          <li>Admissions timeline and counselling workflow</li>
        </ul>
      </div>
    </div>
  );
}
