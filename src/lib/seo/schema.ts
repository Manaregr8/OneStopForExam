import type { Exam } from "@/lib/data/types";
import type { ExamSectionKey } from "@/lib/data/exams";
import { absoluteUrl, SITE_NAME } from "@/lib/site";

export function breadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

export function faqJsonLd(faq: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

export function articleJsonLd(params: {
  exam: Exam;
  section: ExamSectionKey;
  title: string;
  description: string;
  dateModified: string;
}) {
  const url =
    params.section === "overview"
      ? absoluteUrl(`/exams/${params.exam.slug}`)
      : absoluteUrl(`/exams/${params.exam.slug}/${params.section}`);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: params.title,
    description: params.description,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    author: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    dateModified: params.dateModified,
  };
}
