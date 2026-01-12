import type { Metadata } from "next";

import type { Exam } from "@/lib/data/types";
import type { ExamSectionKey } from "@/lib/data/exams";
import { absoluteUrl } from "@/lib/site";

export function sectionLabel(section: ExamSectionKey): string {
  switch (section) {
    case "overview":
      return "Overview";
    case "eligibility":
      return "Eligibility";
    case "syllabus":
      return "Syllabus";
    case "exam-pattern":
      return "Exam Pattern";
    case "how-to-prepare":
      return "How to Prepare";
    case "previous-year-question-papers":
      return "Previous Year Question Papers";
  }
}

export function examSectionTitle(exam: Exam, section: ExamSectionKey): string {
  const year = new Date().getFullYear();
  if (section === "overview") {
    return `${exam.name} ${year} – Eligibility, Syllabus, Exam Pattern, Preparation Tips`;
  }
  return `${exam.name} ${year} – ${sectionLabel(section)}`;
}

export function examSectionDescription(exam: Exam, section: ExamSectionKey): string {
  if (section === "overview") {
    return `Get the latest ${exam.name} details: key dates, eligibility, syllabus, exam pattern, preparation strategy, and previous year question papers. Updated for Indian aspirants.`;
  }

  const label = sectionLabel(section);
  switch (section) {
    case "eligibility":
      return `${exam.name} eligibility: age limit, qualification, attempts, reservation rules, and important conditions in a clear checklist.`;
    case "syllabus":
      return `${exam.name} syllabus with topic-wise coverage, subject split, and high-weightage focus areas for effective preparation.`;
    case "exam-pattern":
      return `${exam.name} exam pattern: sections, marking scheme, duration, mode, question types, and scoring strategy.`;
    case "how-to-prepare":
      return `${exam.name} preparation strategy: realistic plan, resources, revision cycles, mock test approach, and last-month priorities.`;
    case "previous-year-question-papers":
      return `${exam.name} previous year question papers (PYQs): how to use PYQs, year-wise approach, and practice plan to improve accuracy.`;
    default:
      return `${exam.name} ${label} in an exam-focused, SEO-friendly format.`;
  }
}

export function examSectionCanonical(examSlug: string, section: ExamSectionKey): string {
  return section === "overview"
    ? absoluteUrl(`/exams/${examSlug}`)
    : absoluteUrl(`/exams/${examSlug}/${section}`);
}

export function buildExamSectionMetadata(params: {
  exam: Exam;
  section: ExamSectionKey;
}): Metadata {
  const title = examSectionTitle(params.exam, params.section);
  const description = examSectionDescription(params.exam, params.section);
  const canonical = examSectionCanonical(params.exam.slug, params.section);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
    },
  };
}
