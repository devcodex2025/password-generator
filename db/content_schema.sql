-- Multilingual guides content schema (PostgreSQL)
-- Designed for future switch from in-code JSON to database-backed content.

create table if not exists content_articles (
  id bigserial primary key,
  slug varchar(160) not null unique,
  category varchar(80) not null,
  reading_minutes integer not null default 5,
  author varchar(120) not null default 'GeneratePasswordTo Team',
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists content_article_locales (
  id bigserial primary key,
  article_id bigint not null references content_articles(id) on delete cascade,
  locale varchar(10) not null,
  title varchar(255) not null,
  excerpt text not null,
  seo_title varchar(255) not null,
  seo_description varchar(255) not null,
  keywords text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (article_id, locale)
);

create table if not exists content_article_sections (
  id bigserial primary key,
  article_locale_id bigint not null references content_article_locales(id) on delete cascade,
  sort_order integer not null,
  heading varchar(255) not null,
  paragraphs text[] not null default '{}',
  bullets text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (article_locale_id, sort_order)
);

create index if not exists idx_content_article_locales_locale on content_article_locales(locale);
create index if not exists idx_content_article_sections_locale on content_article_sections(article_locale_id, sort_order);

