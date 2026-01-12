import { notFound } from "next/navigation";
import type { Metadata } from "next";

import {
  getExamBySlug,
  getExamContent,
  getExamDomains,
  getExamsForDomain,
  getFaqForExamSection,
  type ExamSectionKey,
} from "@/lib/data/exams";
import { buildExamSectionMetadata } from "@/lib/seo/metadata";
import { fallbackMarkdown } from "@/lib/content/fallback";
import { ExamSectionPage } from "@/components/ExamSectionPage";

export function makeGenerateMetadata(section: ExamSectionKey) {
  return async function generateMetadata({
    params,
  }: {
    params: Promise<{ examSlug: string }>;
  }): Promise<Metadata> {
    const { examSlug } = await params;
    const exam = await getExamBySlug(examSlug);
    if (!exam) return {};
    return buildExamSectionMetadata({ exam, section });
  };
}

export function makeSectionPage(section: ExamSectionKey) {
  return async function ExamSectionRoute({
    params,
  }: {
    params: Promise<{ examSlug: string }>;
  }) {
    const { examSlug } = await params;
    const exam = await getExamBySlug(examSlug);
    if (!exam) notFound();

    const [domains, contentRow, faqs] = await Promise.all([
      getExamDomains(exam.id),
      getExamContent(exam.id, section),
      getFaqForExamSection(exam.id, section),
    ]);

    const sameDomainExams = domains.length
      ? (await getExamsForDomain(domains[0].id)).filter((e) => e.id !== exam.id)
      : [];

    const contentMarkdown = contentRow?.content_markdown ?? fallbackMarkdown(exam, section);

    return ExamSectionPage({
      exam,
      domains,
      section,
      contentMarkdown,
      faqs,
      sameDomainExams,
    });
  };
}
