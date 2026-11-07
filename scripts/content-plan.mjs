#!/usr/bin/env node
/**
 * Generate the editorial content plan from the keyword map and the content
 * agent brief. The plan groups each locale's top 50 queries into high, medium
 * and low demand tiers, maps them to existing or new pages, and lists the
 * next production order.
 *
 * Run with: npm run content:plan
 */
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const BRIEF_PATH = path.resolve(ROOT, 'docs/content-agent-brief.json');
const MAP_DIR = path.resolve(ROOT, 'docs/keyword-map');
const OUTPUT = path.resolve(ROOT, 'docs/content-plan-2026-11.md');

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;
  const source = text.replace(/^\uFEFF/, '');

  for (let i = 0; i < source.length; i += 1) {
    const char = source[i];
    if (quoted) {
      if (char === '"' && source[i + 1] === '"') {
        field += '"';
        i += 1;
      } else if (char === '"') {
        quoted = false;
      } else {
        field += char;
      }
      continue;
    }
    if (char === '"') {
      quoted = true;
    } else if (char === ',') {
      row.push(field);
      field = '';
    } else if (char === '\n') {
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else if (char !== '\r') {
      field += char;
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

function loadLocaleRows(locale) {
  const file = path.join(MAP_DIR, 'locales', `${locale}.csv`);
  if (!fs.existsSync(file)) return new Map();
  const [header, ...rows] = parseCsv(fs.readFileSync(file, 'utf8'));
  const columns = new Map(header.map((name, index) => [name, index]));
  const byKeyword = new Map();
  for (const row of rows) {
    const keyword = (row[columns.get('keyword')] || '').trim();
    if (!keyword) continue;
    byKeyword.set(keyword, {
      keyword,
      cluster: row[columns.get('cluster')] || '',
      intent: row[columns.get('intent')] || '',
      priority: row[columns.get('priority')] || '',
      demandScore: Number(row[columns.get('demandScore')]) || 0,
      targetPage: row[columns.get('targetPage')] || '',
      status: row[columns.get('status')] || '',
      note: row[columns.get('note')] || '',
    });
  }
  return byKeyword;
}

const tierOf = (row) => {
  if (row.priority === 'P1' || row.demandScore >= 80) return 'high';
  if (row.priority === 'P2' || row.demandScore >= 60) return 'medium';
  return 'low';
};

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

const brief = JSON.parse(fs.readFileSync(BRIEF_PATH, 'utf8'));
const locales = Object.keys(brief.keyword_targets || {});
const sections = [];
const summaryRows = [];

for (const locale of locales) {
  const rowsByKeyword = loadLocaleRows(locale);
  const tierRows = { high: [], medium: [], low: [] };
  for (const tier of ['high', 'medium', 'low']) {
    tierRows[tier] = (brief.keyword_tiers?.[locale]?.[tier] || [])
      .map((keyword) => rowsByKeyword.get(keyword))
      .filter(Boolean)
      .sort((a, b) => b.demandScore - a.demandScore);
  }
  const top = [...tierRows.high, ...tierRows.medium, ...tierRows.low];
  const tiers = tierRows;

  const clusters = new Map();
  for (const row of top) {
    const entry = clusters.get(row.cluster) || { cluster: row.cluster, count: 0, top: row };
    entry.count += 1;
    if (row.demandScore > entry.top.demandScore) entry.top = row;
    clusters.set(row.cluster, entry);
  }
  const topClusters = [...clusters.values()].sort((a, b) => b.count - a.count).slice(0, 5);

  const gaps = top
    .filter((row) => row.status.startsWith('gap') || row.status === 'partial')
    .sort((a, b) => b.demandScore - a.demandScore);
  const completedPages = new Set(['wifi-password-guide']);
  const isCompleted = (row) => [...completedPages].some((page) => row.targetPage.includes(page));
  const newPages = gaps.filter((row) => row.status === 'gap-new' && !isCompleted(row)).slice(0, 3);
  const completedRows = gaps.filter(isCompleted).slice(0, 3);
  const sectionsToAdd = gaps.filter((row) => row.status === 'gap-section' || row.status === 'gap-feature').slice(0, 3);
  const extensions = gaps.filter((row) => row.status === 'partial').slice(0, 3);

  const tierLine = (tier) => {
    const examples = tiers[tier].slice(0, 3).map((row) => `\`${row.keyword}\``).join(', ') || 'none';
    return `${tier}: ${tiers[tier].length} (${examples})`;
  };

  summaryRows.push(
    `| \`${locale}\` | ${languageNames[locale] || locale} | ${tiers.high.length} | ${tiers.medium.length} | ${tiers.low.length} | ${gaps.length} |`,
  );

  sections.push(`### \`${locale}\` — ${languageNames[locale] || locale}

- **Demand tiers:** ${tierLine('high')}; ${tierLine('medium')}; ${tierLine('low')}
- **Top clusters:** ${topClusters.map((cluster) => `\`${cluster.cluster}\` (${cluster.count})`).join(', ')}
- **Existing pages to extend:** ${extensions.length ? extensions.map((row) => `\`${row.keyword}\` → ${row.targetPage}`).join('; ') : 'none in the tier sample'}
- **Sections to add:** ${sectionsToAdd.length ? sectionsToAdd.map((row) => `\`${row.keyword}\` → ${row.targetPage}`).join('; ') : 'none in the tier sample'}
- **New page candidates:** ${newPages.length ? newPages.map((row) => `\`${row.keyword}\` (${row.note || 'gap-new'})`).join('; ') : 'none in the tier sample'}
- **Published in this cycle:** ${completedRows.length ? completedRows.map((row) => `\`${row.keyword}\` → ${row.targetPage}`).join('; ') : 'none in the tier sample'}
- **Reviewer note:** ${topClusters[0]?.top?.note || 'Keep home on generator intent; map how-to and example queries to guides.'}
`);
}

const markdown = `# Content plan — 2026-11

Generated from \`docs/keyword-map/locales/<code>.csv\` and
\`docs/content-agent-brief.json\` → \`keyword_targets\`.

## How to read this plan

Each locale has the top 50 targets plus high, medium and low tier samples from
the full locale CSV. The plan groups them into three demand tiers so every
language gets head, mid-tail and long-tail coverage instead of only the
highest-volume head terms.

| Tier | Selection rule | Role |
|---|---|---|
| High | \`priority = P1\` or \`demandScore >= 80\` | Home title/H1, generator intent, strongest guide intros |
| Medium | \`priority = P2\` or \`60 <= demandScore < 80\` | Guide sections, FAQ answers, internal links |
| Low | \`priority = P3\` or \`demandScore < 60\` | Long-tail questions, examples, glossary and supporting sections |

The site passes \`npm run content:validate\` with at least 2 high, 1 medium and
1 low keyword per locale present site-wide. This plan keeps adding context-
relevant terms; it does not insert every keyword into every article.

## Status summary

| Locale | Language | High | Medium | Low | Gaps in tier sample |
|---|---|---:|---:|---:|---:|
${summaryRows.join('\n')}

## Per-locale plan

${sections.join('\n')}
## Production order

1. **Weeks 1-2 — repair and extend the six largest locales:** \`en\`, \`ua\`, \`es\`, \`de\`, \`fr\`, \`pt\`. Refresh title/H1/FAQ against the high tier, add the medium-tier sections to existing guides, and publish one long-tail example page only where the cluster has no existing target.
2. **Weeks 3-4 — complete the remaining locales:** \`ru\`, \`pl\`, \`it\`, \`ja\`, \`zh\`, \`vi\`. Reuse the same page shapes and translate the intent, not the sentences. Check CJK title lengths separately: natural Chinese and Japanese titles are shorter than the Latin 50-65 character range.
3. **Week 5 — internal links:** connect each new section to the generator, the Wi-Fi guide, the passphrase guide and the manager comparison page. Use one canonical URL per intent.
4. **Week 6 — measure:** re-run \`npm run gsc:baseline\`, compare per locale and per query cluster, then promote only queries with impressions and positions 4-20.

## Article brief template

When a gap needs a new page, add it to \`docs/content-agent-brief.json\` with:

- \`slug\`: one URL per intent, never one URL per keyword variant.
- \`intent\`: tool, how-to, comparison, policy or incident response.
- \`primary_keywords\`: two localized phrases from the target locale, not English terms copied into every language.
- \`secondary_keywords\`: 3-5 medium and long-tail phrases from that locale's top 50.
- \`target_page\`: existing page, or a new slug only when the cluster has no canonical target.
- \`review_status\`: \`ai-draft\`, \`native-review-pending\` or \`approved\`.

## Frequency guardrails

- **High tier:** one page owns the head term. Do not repeat the same head term in the title of two pages.
- **Medium tier:** use it in H2 sections and FAQ answers where it answers a real question.
- **Low tier:** use it in examples, checklists, glossary entries and long-tail FAQ. These queries rarely deserve their own URL.
- **No stuffing:** every added phrase must answer a reader question. If a term cannot be used naturally, leave it in the planning CSV.

## Measurement

The current baseline is \`docs/gsc-baseline-2026-11-07.json\`. After 2-4 weeks,
run \`npm run gsc:baseline\` again and compare:

- impressions and clicks per locale;
- queries moving from position 20+ to 4-20;
- pages that gained impressions without clicks (rewrite title/description);
- locales where a medium-tier section earned no impressions (drop or rewrite it).
`;

fs.writeFileSync(OUTPUT, markdown, 'utf8');
console.log(`Wrote ${path.relative(ROOT, OUTPUT)}`);
