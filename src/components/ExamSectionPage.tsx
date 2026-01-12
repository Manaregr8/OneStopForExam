import type { Domain, Exam, FaqItem } from "@/lib/data/types";
import type { ExamSectionKey } from "@/lib/data/exams";
import { renderMarkdownWithToc } from "@/lib/markdown";
import { examSectionDescription, examSectionTitle } from "@/lib/seo/metadata";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo/schema";
import { absoluteUrl } from "@/lib/site";

import { ExamShell } from "@/components/ExamShell";
import { TocSidebar } from "@/components/TocSidebar";
import { Faq } from "@/components/Faq";
import { ExamInternalLinks } from "@/components/InternalLinks";

export async function ExamSectionPage({
  exam,
  domains,
  section,
  contentMarkdown,
  faqs,
  sameDomainExams,
}: {
  exam: Exam;
  domains: Domain[];
  section: ExamSectionKey;
  contentMarkdown: string;
  faqs: FaqItem[];
  sameDomainExams: Exam[];
}) {
  const { html, toc } = await renderMarkdownWithToc(contentMarkdown);

  const title = examSectionTitle(exam, section);
  const description = examSectionDescription(exam, section);

  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", url: absoluteUrl("/") },
    { name: "Exams", url: absoluteUrl("/exams") },
    { name: exam.name, url: absoluteUrl(`/exams/${exam.slug}`) },
  ]);

  const jsonLdBlocks: Array<Record<string, unknown>> = [
    breadcrumbs as Record<string, unknown>,
    articleJsonLd({
      exam,
      section,
      title,
      description,
      dateModified: exam.updated_at,
    }) as Record<string, unknown>,
  ];

  if (faqs.length) {
    jsonLdBlocks.push(
      faqJsonLd(faqs.map((f) => ({ question: f.question, answer: f.answer })))
    );
  }

  return (
    <>
      {jsonLdBlocks.map((block, idx) => (
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
          type="application/ld+json"
          key={idx}
        />
      ))}

      <ExamShell
        exam={exam}
        domains={domains}
        activeSection={section}
        sidebar={<TocSidebar toc={toc} />}
      >
        <div
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <div style={{ marginTop: 14 }}>
          <h2>Quick links</h2>
          <ul>
            <li>
              <a href={`/exams/${exam.slug}/how-to-prepare`}>Preparation strategy</a>
            </li>
            <li>
              <a href={`/exams/${exam.slug}/previous-year-question-papers`}>
                Previous year question papers (PYQs)
              </a>
            </li>
          </ul>
        </div>

        <Faq items={faqs.map((f) => ({ question: f.question, answer: f.answer }))} />
        <ExamInternalLinks sameDomainExams={sameDomainExams} />
      </ExamShell>
    </>
  );
}
