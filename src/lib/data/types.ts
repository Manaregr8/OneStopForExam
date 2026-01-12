export type Domain = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
};

export type Exam = {
  id: string;
  name: string;
  slug: string;
  short_name: string | null;
  level: "national" | "state" | "university" | "other" | null;
  conducting_body: string | null;
  application_mode: string | null;
  exam_mode: string | null;
  frequency: string | null;
  official_website: string | null;
  popularity_rank: number | null;
  upcoming_from: string | null; // ISO date
  updated_at: string;
};

export type ExamContent = {
  exam_id: string;
  content_markdown: string;
  updated_at: string;
};

export type FaqItem = {
  id: string;
  exam_id: string;
  section: string;
  question: string;
  answer: string;
  sort_order: number;
};
