import { notFound } from "next/navigation";

import type { Metadata } from "next";

import {
  getExamBySlug,
  getExamContent,
  getExamDomains,
  getExamsForDomain,
  getFaqForExamSection,
} from "@/lib/data/exams";
import type { ExamSectionKey } from "@/lib/data/exams";
import { buildExamSectionMetadata } from "@/lib/seo/metadata";
import { fallbackMarkdown } from "@/lib/content/fallback";
import { ExamSectionPage } from "@/components/ExamSectionPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ examSlug: string }>;
}): Promise<Metadata> {
  const { examSlug } = await params;
  const exam = await getExamBySlug(examSlug);
  if (!exam) return {};
  return buildExamSectionMetadata({ exam, section: "overview" });
}

export default async function ExamOverviewPage({
  params,
}: {
  params: Promise<{ examSlug: string }>;
}) {
  const { examSlug } = await params;
  const exam = await getExamBySlug(examSlug);
  if (!exam) notFound();

  const section: ExamSectionKey = "overview";

  const [domains, contentRow, faqs] = await Promise.all([
    getExamDomains(exam.id),
    getExamContent(exam.id, section),
    getFaqForExamSection(exam.id, section),
  ]);

  const sameDomainExams = domains.length
    ? (await getExamsForDomain(domains[0].id)).filter((e) => e.id !== exam.id)
    : [];

  const contentMarkdown = contentRow?.content_markdown ?? fallbackMarkdown(exam, section);

  return (
    <ExamSectionPage
      exam={exam}
      domains={domains}
      section={section}
      contentMarkdown={contentMarkdown}
      faqs={faqs}
      sameDomainExams={sameDomainExams}
    />
  );
}
