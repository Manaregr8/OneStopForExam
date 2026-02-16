import type { Exam } from "@/lib/data/types";
import type { ExamSectionKey } from "@/lib/data/exams";

import examContent from "@/../data/catalog/exam-content.json";

type ExamContentCatalog = Record<string, Partial<Record<ExamSectionKey, string>>>;

function catalogMarkdown(exam: Exam, section: ExamSectionKey): string | null {
  const catalog = examContent as unknown as ExamContentCatalog;
  const byExam = catalog[exam.slug];
  const md = byExam?.[section];
  return typeof md === "string" && md.trim() ? md : null;
}

export function fallbackMarkdown(exam: Exam, section: ExamSectionKey): string {
  const fromCatalog = catalogMarkdown(exam, section);
  if (fromCatalog) return fromCatalog;

  switch (section) {
    case "overview":
      return `## About ${exam.name}

${exam.name} is a competitive exam in India. This page is designed for aspirants who want exam-first clarity — eligibility rules, syllabus coverage, exam pattern, preparation approach, and PYQ practice strategy.

## What you should do first

1. Confirm official notification and key dates on the official website.
2. Read eligibility carefully (age, qualification, attempts, category rules).
3. Convert the syllabus into a topic checklist.
4. Use the exam pattern to set a section-wise time plan.
5. Practice PYQs + mock tests and maintain an error log.
`;

    case "eligibility":
      return `## Eligibility overview

Eligibility for ${exam.name} typically depends on age limits, educational qualification, number of attempts, and category/reservation rules.

## Checklist for aspirants

- Age limit and relaxations (if applicable)
- Qualification and minimum marks criteria
- Attempts limit and year of passing (if applicable)
- Nationality and domicile rules (if applicable)
- Category certificates and reservation requirements

## What to verify

Always verify eligibility from the latest official notification because rules can change year to year.
`;

    case "syllabus":
      return `## Syllabus structure

Use this syllabus page as a preparation checklist for ${exam.name}.

## How to study from the syllabus

- Break the syllabus into weekly targets.
- Identify high-weightage areas using PYQs.
- Revise notes every 7–10 days.

## PYQ-based prioritisation

Practice previous year questions topic-wise to find repeating concepts and typical question patterns.
`;

    case "exam-pattern":
      return `## Exam pattern overview

Exam pattern tells you how the paper is structured: sections, number of questions, marking scheme, duration, and mode.

## How to use the pattern

- Set a section-wise attempt target.
- Decide an order of attempting sections.
- Allocate time and keep a buffer for review.

## Common scoring mistakes

- Ignoring negative marking (if applicable)
- Spending too much time on low-confidence questions
- Not reserving time for review and re-check
`;

    case "how-to-prepare":
      return `## Preparation strategy

A practical strategy for ${exam.name} is: syllabus checklist → concept building → PYQs → mock tests → analysis.

## Weekly plan (repeatable)

- 4 days: new topics + practice
- 2 days: PYQs + sectional tests
- 1 day: revision + error log fixes

## Mock test approach

Do fewer tests but analyze deeply. Spend 2× time on analysis compared to the attempt time.
`;

    case "previous-year-question-papers":
      return `## Previous year question papers (PYQs)

PYQs are the most reliable signal of what the exam actually asks.

## How to use PYQs

- Start topic-wise (initial phase)
- Move to full-length papers under time limit (mid phase)
- Maintain an error log and revise those concepts (final phase)

## What to track

- Accuracy by section
- Time per question
- Topics you consistently get wrong
`;
  }
}
