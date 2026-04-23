import type { Metadata } from "next";

import { getDomains, getTopExams, getUpcomingExams } from "@/lib/data/exams";
import { absoluteUrl, SITE_NAME } from "@/lib/site";
import { faqJsonLd } from "@/lib/seo/schema";

import {
  HomeCareerFields,
  HomeCollegesSoon,
  HomeDomains,
  HomeFaq,
  type HomeFaqItem,
  HomeHero,
  HomeResources,
  HomeSeoBlock,
  HomeTopExams,
  HomeTrust,
  HomeUpcomingExams,
} from "@/components/home";

export const metadata: Metadata = {
  title: "One Platform. Every Exam in India.",
  description:
    "One-stop solution for every exam in India — explore eligibility, syllabus, exam pattern, preparation strategy, and PYQs across Engineering, Medical, Government, Banking, Law, Defence, Teaching and more.",
  alternates: { canonical: absoluteUrl("/") },
};

export default async function Home() {
  const [domains, topExams, upcomingExams] = await Promise.all([
    getDomains(),
    getTopExams(12),
    getUpcomingExams(12),
  ]);

  const faqItems: HomeFaqItem[] = [
    {
      question: `What is ${SITE_NAME}?`,
      answer:
        `${SITE_NAME} is an exam-first knowledge platform built for Indian competitive exams. It focuses on verified, structured information like eligibility, syllabus, exam pattern, preparation strategy, and previous year question papers (PYQs).`,
    },
    {
      question: "How do I use this site for preparation?",
      answer:
        "Start from your exam page. Use the syllabus to create a topic checklist, confirm the exam pattern for time allocation, then follow the preparation guide for mock test cycles. Use PYQs to validate high-weightage topics and improve accuracy.",
    },
    {
      question: "Is the information updated for the current year?",
      answer:
        "Yes. Each exam section is maintained with an update-first workflow. When official notifications change, we update the relevant section and reflect the last updated timestamp on the page.",
    },
    {
      question: "Do you provide college information?",
      answer:
        "A Colleges module is coming soon. This release is focused purely on exams — because aspirants need exam clarity before anything else.",
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqItems)) }}
      />

      <HomeHero />

      <div className="container">
        <HomeDomains domains={domains} />
        <HomeTopExams exams={topExams} />
        <HomeUpcomingExams exams={upcomingExams} />
        <HomeCareerFields />
        <HomeTrust />
        <HomeResources />
        <HomeCollegesSoon />
        <HomeSeoBlock />
        <HomeFaq items={faqItems} />
      </div>
    </>
  );
}
