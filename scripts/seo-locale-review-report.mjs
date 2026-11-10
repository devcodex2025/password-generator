#!/usr/bin/env node
/**
 * Generate docs/seo-locale-review-checklist.md from the keyword map targets,
 * the current home title/H1 and the visible FAQ translations.
 *
 * The report quantifies how many of each locale's top 5 queries already appear
 * naturally. It is a review aid, not an automatic keyword inserter.
 *
 * Run with: npm run seo:review
 */
import fs from 'node:fs';

const locales = ['en', 'ua', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'pl', 'vi'];
const languageNames = {
  en: 'English',
  ua: 'Ukrainian',
  es: 'Spanish',
  fr: 'French',
  de: 'German',
  it: 'Italian',
  pt: 'Portuguese (BR)',
  ru: 'Russian',
  zh: 'Chinese (Simplified)',
  ja: 'Japanese',
  pl: 'Polish',
  vi: 'Vietnamese',
};
const brief = JSON.parse(fs.readFileSync('docs/content-agent-brief.json', 'utf8'));
const lang = JSON.parse(fs.readFileSync('src/components/lang.json', 'utf8'));
const metadata = fs.readFileSync('src/lib/home-metadata.ts', 'utf8');
const titleBlock = metadata.match(/const localizedMetaTitles: Record<string, string> = \{([\s\S]*?)\n\};/)[1];
const titles = Object.fromEntries(
  [...titleBlock.matchAll(/^\s{2}([a-z]{2}): '([^']*)',/gm)].map((m) => [m[1], m[2]]),
);
const faqKeys = [
  ['faq_length_question', 'faq_length_answer'],
  ['faq_passphrase_question', 'faq_passphrase_answer'],
  ['faq_wifi_question', 'faq_wifi_answer'],
  ['faq_ideas_question', 'faq_ideas_answer'],
  ['faq_create_question', 'faq_create_answer'],
  ['faq_manager_question', 'faq_manager_answer'],
  ['faq_storage_question', 'faq_storage_answer'],
  ['faq_sources_question', 'faq_sources_answer'],
  ['faq_trustworthy_question', 'faq_trustworthy_answer'],
  ['faq_review_question', 'faq_review_answer'],
];
const normalize = (value) =>
  String(value || '')
    .toLowerCase()
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const rows = [];
const sections = [];

for (const locale of locales) {
  const top5 = brief.keyword_targets[locale].slice(0, 5);
  const title = titles[locale];
  const h1 = lang.main_title?.[locale] || '';
  const faqText = faqKeys
    .flatMap(([q, a]) => [lang[q]?.[locale], lang[a]?.[locale]])
    .map(normalize)
    .join(' ');
  const haystack = [normalize(title), normalize(h1), faqText].join(' | ');
  const matched = top5.filter((keyword) => haystack.includes(normalize(keyword)));

  rows.push(`| \`${locale}\` | ${languageNames[locale]} | ${matched.length}/5 | ${top5.map((k) => `\`${k}\``).join('<br>')} |`);

  sections.push(`### \`${locale}\` — ${languageNames[locale]}

- **Top queries (keyword map):** ${top5.map((k) => `\`${k}\``).join(', ')}
- **Current title:** ${title}
- **Current H1:** ${h1}
- **Visible FAQ:** 10 items (length, passphrase, Wi-Fi, ideas, create, manager, storage, sources, trust, review).
- **Automated match:** ${matched.length}/5${matched.length ? ` (${matched.map((k) => `\`${k}\``).join(', ')})` : ''}
- [ ] Native reviewer confirms the wording reads naturally and keeps home/guide intent separate.
`);
}

const markdown = `# SEO locale review checklist

Prepared: 2026-11-07
Source of queries: \`docs/keyword-map/locales/<code>.csv\`, top 5 by \`demandScore\`
(highest 50 per locale are in \`docs/content-agent-brief.json\` → \`keyword_targets\`).

This checklist is for the native-language review required by issue #47. It is not
an instruction to insert keywords mechanically: home pages must keep targeting
generator/tool intent, while guides target how-to, length, passphrase, Wi-Fi and
examples intent.

## Status summary

| Locale | Language | Automated match | Top 5 queries |
|---|---|---:|---|
${rows.join('\n')}

An \`Automated match\` of 3/5 or higher meets the issue's reviewer threshold. The
home title/H1/FAQ now cover length, passphrase, Wi-Fi, ideas, creation and
manager intent. The review should confirm that the copy reads naturally and that
home pages still target generator/tool intent while guides target how-to,
examples and length intent.

## Per-locale review

${sections.join('\n')}
## Remaining content work (needs native review)

The 2026-11 content cycle added language-specific length/example/checker FAQ
sections to how-to-create-strong-passwords and a words-mode passphrase section
to passphrase-vs-password-entropy in all 12 locales. Both guides are marked
review_status: native-review-pending in docs/content-agent-brief.json until a
native speaker signs off.

1. **P1.1 — home FAQ wording.** The 10 FAQ items are drafted in all 12 locales.
   A native speaker should confirm phrasing, tone and the length/passphrase/Wi-Fi
   answers. Keep the FAQPage JSON-LD in \`src/lib/home-structured-data.ts\` in
   lockstep with the visible accordion in \`src/components/SeoAccordion.jsx\`.
2. **P1.4 — password-manager platform sections.** Android, iPhone, Chrome and
   Google Password Manager sections are drafted in
   \`src/app/(latin)/[locale]/best-password-managers-2026/page.tsx\`. Review the localized
   copy, especially the Google Password Manager trade-offs.
3. **P1.5 — Wi-Fi guide translations.** The guide ships in all 12 locales under
   \`src/content/articles/wifi-password-guide.ts\`. The routes, hub and sitemap are
   driven by \`guideLocaleAvailability\` in \`next-sitemap.config.js\`. A native
   reviewer should check the router terminology and the example passwords.

## Measurement

The per-locale baseline is in \`docs/gsc-baseline-2026-11-07.json\`. Re-run
\`npm run gsc:baseline\` after 2-4 weeks and compare per locale and per query,
not just site totals. GSC returned no query-level rows for the baseline window,
so the next run is the first one that can show query movement.
`;

fs.writeFileSync('docs/seo-locale-review-checklist.md', markdown, 'utf8');
console.log('Wrote docs/seo-locale-review-checklist.md');
