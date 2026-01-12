-- Supabase (PostgreSQL) schema for an exam-focused knowledge graph.
-- Safe for 1000+ exams with slug-based routing, SSR, and programmatic SEO.

create extension if not exists pgcrypto;
create extension if not exists pg_trgm;

-- 1) Domains (Engineering, Medical, Government, ...)
create table if not exists public.domains (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists idx_domains_slug on public.domains (slug);

-- 2) Exams (JEE Main, NEET UG, UPSC CSE, ...)
create table if not exists public.exams (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  short_name text,
  level text check (level in ('national','state','university','other')),

  conducting_body text,
  application_mode text,
  exam_mode text,
  frequency text,
  official_website text,

  popularity_rank int,
  upcoming_from date,

  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists idx_exams_slug on public.exams (slug);
create index if not exists idx_exams_popularity on public.exams (popularity_rank);
create index if not exists idx_exams_upcoming on public.exams (upcoming_from);
create index if not exists idx_exams_name_trgm on public.exams using gin (name gin_trgm_ops);

-- 3) Many-to-many: exams <-> domains
create table if not exists public.exam_domains (
  exam_id uuid not null references public.exams (id) on delete cascade,
  domain_id uuid not null references public.domains (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (exam_id, domain_id)
);

create index if not exists idx_exam_domains_domain on public.exam_domains (domain_id);
create index if not exists idx_exam_domains_exam on public.exam_domains (exam_id);

-- 4) Optional: section registry per exam (useful at scale to track completeness)
create table if not exists public.exam_sections (
  id uuid primary key default gen_random_uuid(),
  exam_id uuid not null references public.exams (id) on delete cascade,
  section_key text not null,
  status text not null default 'published' check (status in ('draft','published')),
  updated_at timestamptz not null default now(),
  unique (exam_id, section_key)
);

create index if not exists idx_exam_sections_exam on public.exam_sections (exam_id);
create index if not exists idx_exam_sections_key on public.exam_sections (section_key);

-- 5) Content tables (one row per exam per section)
-- NOTE: keeping each section in a dedicated table makes querying simple and predictable.
create table if not exists public.exam_overview (
  exam_id uuid primary key references public.exams (id) on delete cascade,
  content_markdown text not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.eligibility (
  exam_id uuid primary key references public.exams (id) on delete cascade,
  content_markdown text not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.syllabus (
  exam_id uuid primary key references public.exams (id) on delete cascade,
  content_markdown text not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.pattern (
  exam_id uuid primary key references public.exams (id) on delete cascade,
  content_markdown text not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.preparation (
  exam_id uuid primary key references public.exams (id) on delete cascade,
  content_markdown text not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.pyq (
  exam_id uuid primary key references public.exams (id) on delete cascade,
  content_markdown text not null,
  updated_at timestamptz not null default now()
);

-- 6) FAQ (per exam per section)
create table if not exists public.faq (
  id uuid primary key default gen_random_uuid(),
  exam_id uuid not null references public.exams (id) on delete cascade,
  section text not null,
  question text not null,
  answer text not null,
  sort_order int not null default 1,
  created_at timestamptz not null default now()
);

alter table public.faq
  add constraint faq_unique_exam_section_question unique (exam_id, section, question);

create index if not exists idx_faq_exam_section on public.faq (exam_id, section);

-- 7) SEO meta overrides (programmatic SEO with optional manual control)
create table if not exists public.seo_meta (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null check (entity_type in ('exam','domain')),
  entity_slug text not null,
  section text,
  title text,
  description text,
  canonical text,
  robots text,
  og_image text,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  unique (entity_type, entity_slug, section)
);

create index if not exists idx_seo_meta_lookup on public.seo_meta (entity_type, entity_slug, section);

-- Indexing strategy summary:
-- - Slug UNIQUE indexes on domains/exams enable fast SSR lookup.
-- - exam_domains composite PK enables many-to-many joins at scale.
-- - trigram index on exams.name powers fast ILIKE search for the smart search box.
-- - popularity_rank and upcoming_from indexes support homepage widgets.
