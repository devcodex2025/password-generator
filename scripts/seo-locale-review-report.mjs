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
- **Visible FAQ:** 4 items (storage, sources, trust, review). No length, passphrase or Wi-Fi questions yet.
- **Automated match:** ${matched.length}/5${matched.length ? ` (${matched.map((k) => `\`${k}\``).join(', ')})` : ''}
- [ ] Native reviewer confirms at least 3/5 are covered naturally, or proposes localized title/H1/FAQ wording.
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

An \`Automated match\` of 0 or 1 is expected for most locales because the current
home title/H1/FAQ were written for brand and generator intent, not for the query
map. The review should decide which queries belong on the home page, which
belong on a guide, and which should not be targeted at all.

## Per-locale review

${sections.join('\n')}
## Remaining content work (blocked on native review)

1. **P1.1 — home FAQ wording.** Add length, passphrase and Wi-Fi questions in
   each locale only after a native speaker writes/approves the copy. Keep the
   FAQPage JSON-LD in \`src/lib/home-structured-data.ts\` in lockstep with the
   visible accordion in \`src/components/SeoAccordion.jsx\`.
2. **P1.4 — password-manager platform sections.** Add Android, iPhone, Chrome
   and Google Password Manager sections to
   \`src/app/[locale]/best-password-managers-2026/page.tsx\` with localized copy
   from the affiliate string files.
3. **P1.5 — Wi-Fi guide translations.** The English guide is live at
   \`/en/guides/wifi-password-guide\`. Translate and review it per locale, then
   add the locale to \`guideLocaleAvailability\` in \`next-sitemap.config.js\`
   (and to \`viTranslatedGuideSlugs\` for Vietnamese). Until then the route is
   not generated for that locale and returns 404 by design.

## Measurement

The per-locale baseline is in \`docs/gsc-baseline-2026-11-07.json\`. Re-run
\`npm run gsc:baseline\` after 2-4 weeks and compare per locale and per query,
not just site totals. GSC returned no query-level rows for the baseline window,
so the next run is the first one that can show query movement.
`;

fs.writeFileSync('docs/seo-locale-review-checklist.md', markdown, 'utf8');
console.log('Wrote docs/seo-locale-review-checklist.md');
