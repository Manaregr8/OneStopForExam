import { cache } from "react";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import type { Domain, Exam, ExamContent, FaqItem } from "@/lib/data/types";

export type ExamSectionKey =
  | "overview"
  | "eligibility"
  | "syllabus"
  | "exam-pattern"
  | "how-to-prepare"
  | "previous-year-question-papers";

export const EXAM_SECTIONS: Array<{ key: ExamSectionKey; label: string }> = [
  { key: "overview", label: "Overview" },
  { key: "eligibility", label: "Eligibility" },
  { key: "syllabus", label: "Syllabus" },
  { key: "exam-pattern", label: "Exam Pattern" },
  { key: "how-to-prepare", label: "How to Prepare" },
  { key: "previous-year-question-papers", label: "Previous Year Question Papers" },
];

export const getDomains = cache(async (): Promise<Domain[]> => {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("domains")
    .select("id,name,slug,description")
    .order("name");

  if (error) throw error;
  return (data ?? []) as Domain[];
});

export const getDomainBySlug = cache(async (domainSlug: string) => {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("domains")
    .select("id,name,slug,description")
    .eq("slug", domainSlug)
    .maybeSingle();

  if (error) throw error;
  return (data ?? null) as Domain | null;
});

export const getExams = cache(async (): Promise<Exam[]> => {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("exams")
    .select(
      "id,name,slug,short_name,level,conducting_body,application_mode,exam_mode,frequency,official_website,popularity_rank,upcoming_from,updated_at"
    )
    .order("popularity_rank", { ascending: true, nullsFirst: false })
    .order("name");

  if (error) throw error;
  return (data ?? []) as Exam[];
});

export const getTopExams = cache(async (limit = 12): Promise<Exam[]> => {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("exams")
    .select(
      "id,name,slug,short_name,level,conducting_body,application_mode,exam_mode,frequency,official_website,popularity_rank,upcoming_from,updated_at"
    )
    .not("popularity_rank", "is", null)
    .order("popularity_rank", { ascending: true })
    .limit(limit);

  if (error) throw error;
  return (data ?? []) as Exam[];
});

export const getUpcomingExams = cache(async (limit = 12): Promise<Exam[]> => {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("exams")
    .select(
      "id,name,slug,short_name,level,conducting_body,application_mode,exam_mode,frequency,official_website,popularity_rank,upcoming_from,updated_at"
    )
    .not("upcoming_from", "is", null)
    .order("upcoming_from", { ascending: true })
    .limit(limit);

  if (error) throw error;
  return (data ?? []) as Exam[];
});

export const getExamBySlug = cache(async (examSlug: string): Promise<Exam | null> => {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("exams")
    .select(
      "id,name,slug,short_name,level,conducting_body,application_mode,exam_mode,frequency,official_website,popularity_rank,upcoming_from,updated_at"
    )
    .eq("slug", examSlug)
    .maybeSingle();

  if (error) throw error;
  return (data ?? null) as Exam | null;
});

export const getExamDomains = cache(async (examId: string): Promise<Domain[]> => {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("exam_domains")
    .select("domains(id,name,slug,description)")
    .eq("exam_id", examId);

  if (error) throw error;
  const rows = (data ?? []) as unknown as Array<{ domains: Domain | Domain[] | null }>;
  return rows
    .map((r) => (Array.isArray(r.domains) ? r.domains[0] : r.domains))
    .filter(Boolean) as Domain[];
});

export const getExamsForDomain = cache(async (domainId: string): Promise<Exam[]> => {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("exam_domains")
    .select(
      "exams(id,name,slug,short_name,level,conducting_body,application_mode,exam_mode,frequency,official_website,popularity_rank,upcoming_from,updated_at)"
    )
    .eq("domain_id", domainId);

  if (error) throw error;
  const rows = (data ?? []) as unknown as Array<{ exams: Exam | Exam[] | null }>;
  return rows
    .map((r) => (Array.isArray(r.exams) ? r.exams[0] : r.exams))
    .filter(Boolean) as Exam[];
});

function tableForSection(section: ExamSectionKey):
  | "exam_overview"
  | "eligibility"
  | "syllabus"
  | "pattern"
  | "preparation"
  | "pyq" {
  switch (section) {
    case "overview":
      return "exam_overview";
    case "eligibility":
      return "eligibility";
    case "syllabus":
      return "syllabus";
    case "exam-pattern":
      return "pattern";
    case "how-to-prepare":
      return "preparation";
    case "previous-year-question-papers":
      return "pyq";
  }
}

export const getExamContent = cache(
  async (examId: string, section: ExamSectionKey): Promise<ExamContent | null> => {
    if (!isSupabaseConfigured()) return null;
    const supabase = await createSupabaseServerClient();
    const table = tableForSection(section);

    const { data, error } = await supabase
      .from(table)
      .select("exam_id,content_markdown,updated_at")
      .eq("exam_id", examId)
      .maybeSingle();

    if (error) throw error;
    return (data ?? null) as ExamContent | null;
  }
);

export const getFaqForExamSection = cache(
  async (examId: string, section: ExamSectionKey): Promise<FaqItem[]> => {
    if (!isSupabaseConfigured()) return [];
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("faq")
      .select("id,exam_id,section,question,answer,sort_order")
      .eq("exam_id", examId)
      .eq("section", section)
      .order("sort_order", { ascending: true });

    if (error) throw error;
    return (data ?? []) as FaqItem[];
  }
);

export const searchExams = cache(async (q: string, limit = 10): Promise<Exam[]> => {
  const trimmed = q.trim();
  if (!trimmed) return [];
  if (!isSupabaseConfigured()) return [];

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("exams")
    .select(
      "id,name,slug,short_name,level,conducting_body,application_mode,exam_mode,frequency,official_website,popularity_rank,upcoming_from,updated_at"
    )
    .ilike("name", `%${trimmed}%`)
    .order("popularity_rank", { ascending: true, nullsFirst: false })
    .order("name")
    .limit(limit);

  if (error) throw error;
  return (data ?? []) as Exam[];
});
