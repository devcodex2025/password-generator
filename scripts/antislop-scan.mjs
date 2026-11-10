#!/usr/bin/env node
/**
 * Anti-slop guard for site content.
 * Scans article prose (all locales) and UI copy (lang.json) for generic AI filler:
 * meta-commentary, buzzwords, hedging, empty intensifiers.
 *
 * Usage: npm run antislop
 * Exit code 1 when a non-allowlisted pattern is found.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const ARTICLES_DIR = path.join(ROOT, 'src/content/articles');
const LANG_PATH = path.join(ROOT, 'src/components/lang.json');

const PATTERNS = {
  en: [
    /it(?:'|’)s important to note/gi, /worth noting/gi, /in today(?:'|’)s (?:fast-paced |digital )?world/gi,
    /in the (?:modern|digital) (?:world|age)/gi, /delve into/gi, /seamless(?:ly)?/gi, /robust/gi, /leverage/gi,
    /game-?changer/gi, /unlock(?:ing)?/gi, /elevate/gi, /empower/gi, /cutting-edge/gi, /state-of-the-art/gi,
    /revolutioni[sz]/gi, /landscape/gi, /furthermore/gi, /moreover/gi, /in conclusion/gi, /\boverall,?\s/gi,
    /\bultimately,?\s/gi, /\bessentially,?\s/gi, /\bbasically,?\s/gi, /very (?:important|secure|strong|simple)/gi,
    /could potentially/gi, /in order to/gi, /due to the fact that/gi, /has the ability to/gi,
  ],
  ua: [
    /варто (?:зазначити|відзначити)/gi, /важливо (?:зазначити|відзначити)/gi, /у сучасному (?:світі|цифровому)/gi,
    /в сучасному світі/gi, /не секрет/gi, /давайте розглянемо/gi, /ключов(?:ий|ого) (?:гравець|гравця)/gi,
    /відіграє (?:важливу|ключову) роль/gi, /у підсумку/gi, /таким чином/gi, /більше того/gi, /крім того/gi,
    /по суті/gi, /фактично/gi, /досить (?:важливо|просто|часто)/gi, /доволі/gi, /надзвичайно/gi,
    /комплексний підхід/gi, /безшовн/gi, /ідеальне рішення/gi,
  ],
  ru: [
    /стоит (?:отметить|сказать)/gi, /важно (?:отметить|сказать)/gi, /в современном (?:мире|цифровом)/gi,
    /не секрет/gi, /давайте рассмотрим/gi, /ключев(?:ой|ого) (?:игрок|игрока)/gi,
    /играет (?:важную|ключевую) роль/gi, /в итоге/gi, /таким образом/gi, /более того/gi, /кроме того/gi,
    /по сути/gi, /фактически/gi, /довольно (?:важно|просто|часто)/gi, /чрезвычайно/gi,
    /комплексный подход/gi, /бесшовн/gi, /идеальное решение/gi,
  ],
  es: [/cabe (?:destacar|señalar)/gi, /es importante/gi, /en el mundo actual/gi, /sin duda/gi, /solución perfecta/gi, /sin fisuras/gi, /robusto/gi],
  fr: [/il est important/gi, /dans le monde actuel/gi, /sans aucun doute/gi, /solution parfaite/gi, /sans faille/gi, /robuste/gi],
  de: [/es ist wichtig/gi, /in der heutigen (?:Welt|Zeit)/gi, /zweifellos/gi, /perfekte Lösung/gi, /nahtlos/gi, /robust/gi],
  it: [/è importante/gi, /nel mondo di oggi/gi, /senza dubbio/gi, /soluzione perfetta/gi, /senza soluzione di continuità/gi, /robusto/gi],
  pt: [/é importante/gi, /no mundo atual/gi, /sem dúvida/gi, /solução perfeita/gi, /sem falhas/gi, /robusto/gi],
  ja: [/今日の(?:デジタル)?世界/g, /完璧な/g, /シームレス/g, /堅牢/g, /効果的なソリューション/g],
  zh: [/在当今(?:数字)?(?:世界|时代)/g, /完美/g, /无缝/g, /稳健/g],
  vi: [/điều quan trọng là/gi, /trong thế giới (?:hiện đại|số)/gi, /không thể phủ nhận/gi, /giải pháp hoàn hảo/gi, /liền mạch/gi, /mạnh mẽ/gi],
};

// Legitimate uses that must not fail the check (tested against the surrounding context).
const ALLOW = [
  /phone unlock/i, /biometric unlock/i, /device unlocks?/i, /overall package/i, /overall analytics/i,
  /dérivation de clés robuste/i, /è importante/i, /es importante/i, /điều quan trọng là/i, /重要です/, /importance/i, /khuyến nghị/i,
];

const MIN_LEN = { ja: 6, zh: 6 };

function extractArticles() {
  const result = {};
  for (const file of fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith('.ts'))) {
    const src = fs.readFileSync(path.join(ARTICLES_DIR, file), 'utf8');
    const re = /export const (\w+): LocalizedArticleContent = \{[\s\S]*?\n\};/g;
    let m;
    while ((m = re.exec(src))) {
      const loc = m[1];
      const strings = [...m[0].matchAll(/'((?:[^'\\]|\\.){40,})'/g)].map((x) => x[1]);
      result[loc] = (result[loc] || []).concat(strings);
    }
  }
  return result;
}

function extractUi() {
  const lang = JSON.parse(fs.readFileSync(LANG_PATH, 'utf8'));
  const result = {};
  for (const value of Object.values(lang)) {
    if (!value || typeof value !== 'object') continue;
    for (const [loc, text] of Object.entries(value)) {
      if (typeof text !== 'string') continue;
      const min = MIN_LEN[loc] || 30;
      if (text.length >= min) result[loc] = (result[loc] || []).concat([text]);
    }
  }
  return result;
}

function walkFiles(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.next' && entry.name !== 'fonts') walkFiles(full, out);
    } else {
      out.push(full);
    }
  }
  return out;
}

// Page copy lives outside the article files. Only ASCII strings are checked,
// because the same page holds every locale and non-Latin text would trip the
// English patterns by accident.
function extractPageStrings() {
  const result = [];
  const pages = walkFiles(path.join(ROOT, 'src/app')).filter((f) => /page\.tsx$/.test(f));
  for (const file of pages) {
    const src = fs.readFileSync(file, 'utf8');
    for (const m of src.matchAll(/'((?:[^'\\]|\\.){40,})'/g)) {
      if (/^[\x20-\x7E‘’“”…]+$/.test(m[1])) result.push(m[1]);
    }
  }
  return result;
}

// R-02: the em dash is forbidden everywhere in src, not just in prose.
function findEmDashes() {
  const exts = /\.(ts|tsx|js|jsx|mjs|css|json|md|html)$/;
  const found = [];
  for (const file of walkFiles(path.join(ROOT, 'src'))) {
    if (!exts.test(file)) continue;
    const src = fs.readFileSync(file, 'utf8');
    if (!src.includes('\u2014')) continue;
    src.split('\n').forEach((line, i) => {
      if (line.includes('\u2014')) found.push(`${path.relative(ROOT, file)}:${i + 1}`);
    });
  }
  return found;
}

const corpus = {};
for (const [loc, list] of Object.entries(extractArticles())) corpus[loc] = (corpus[loc] || []).concat(list);
for (const [loc, list] of Object.entries(extractUi())) corpus[loc] = (corpus[loc] || []).concat(list);
corpus.en = (corpus.en || []).concat(extractPageStrings());

let failures = 0;
const rows = [];
for (const [loc, texts] of Object.entries(corpus).sort()) {
  const joined = texts.join('\n');
  const hits = [];
  for (const re of PATTERNS[loc] || []) {
    re.lastIndex = 0;
    const matches = joined.match(re) || [];
    for (const match of matches) {
      const idx = joined.indexOf(match);
      const context = joined.slice(Math.max(0, idx - 40), idx + 60).replace(/\s+/g, ' ');
      if (ALLOW.some((a) => a.test(context))) continue;
      hits.push({ match, context });
    }
  }
  rows.push({ loc, words: joined.split(/\s+/).filter(Boolean).length, hits });
  failures += hits.length;
}

console.log('locale | words | real slop hits');
for (const r of rows) {
  console.log(`${r.loc.padEnd(4)} | ${String(r.words).padStart(7)} | ${r.hits.length}`);
  for (const h of r.hits.slice(0, 5)) console.log(`     "${h.match}" … ${h.context}`);
}

if (failures) {
  console.error(`\nFAIL: ${failures} slop pattern(s) found. Fix or allowlist in scripts/antislop-scan.mjs.`);
  process.exit(1);
}

const emDashes = findEmDashes();
if (emDashes.length) {
  console.error(`\nFAIL (R-02): ${emDashes.length} em dash line(s) in src.`);
  for (const where of emDashes.slice(0, 20)) console.error(`  ${where}`);
  process.exit(1);
}

console.log('\nOK: no non-allowlisted slop patterns, no em dashes in src.');
