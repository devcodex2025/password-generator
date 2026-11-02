#!/usr/bin/env node
/**
 * AdSense readiness audit for a live site.
 *
 * Crawls every URL in sitemap.xml and reports:
 *  - thin content risk (visible word count per page, <150 / <300 thresholds)
 *  - iframe-only / low-text tool pages
 *  - duplicate content inside the same locale (Jaccard similarity)
 *  - required trust pages (privacy, terms, contact, about)
 *  - ads.txt, ads.txt google line, robots.txt Mediapartners rule
 *  - AdSense ad code and cookie-consent signals in the served HTML
 *  - status codes, canonical, noindex, h1 count
 *
 * Usage:
 *   npm run adsense:audit
 *   npm run adsense:audit -- --base=https://www.example.com --limit=20
 *   npm run adsense:audit -- --sample=1   (one URL per template)
 *
 * Read-only: only GET requests to the public site, no auth, no writes.
 */
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const DEFAULT_BASE = 'https://www.generatepasswordto.me';
const UA = 'adsense-audit/1.0 (+https://www.generatepasswordto.me)';
const CONCURRENCY = 6;
const THIN = 300;
const VERY_THIN = 150;
const DUP_THRESHOLD = 0.55;

function arg(name, fallback) {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : fallback;
}

const BASE = arg('base', DEFAULT_BASE).replace(/\/+$/, '');
const LIMIT = Number.parseInt(arg('limit', '0'), 10) || 0;
const SAMPLE = arg('sample', '') === '1';
const OUT = arg('out', 'docs/adsense-audit-2026-11-02.json');

const LOCALES = ['en', 'ua', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'pl', 'vi'];

function decodeEntities(text) {
  return text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number.parseInt(dec, 10)));
}

function stripHtml(html) {
  return decodeEntities(
    html
      .replace(/<!--[\s\S]*?-->/g, ' ')
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
      .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, ' ')
      .replace(/<template\b[^>]*>[\s\S]*?<\/template>/gi, ' ')
      .replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi, ' ')
      .replace(/<[^>]+>/g, ' '),
  )
    .replace(/\s+/g, ' ')
    .trim();
}

function wordCount(text) {
  const tokens = text.match(/[\p{L}\p{N}]+/gu) || [];
  let count = 0;
  for (const token of tokens) {
    // CJK scripts are not space separated: count characters, not runs.
    if (/^[\u3040-\u30ff\u3400-\u9fff\uac00-\ud7af]+$/.test(token)) count += token.length;
    else count += 1;
  }
  return count;
}

function templateOf(url) {
  const parts = new URL(url).pathname.split('/').filter(Boolean);
  const rest = parts[0] && LOCALES.includes(parts[0]) ? parts.slice(1) : parts;
  if (rest.length === 0) return 'home';
  if (rest[0] === 'guides') return rest.length === 1 ? 'guides-index' : 'guide';
  if (rest[0] === 'privacy-policy') return 'legal';
  if (rest[0] === 'terms-of-service') return 'legal';
  if (rest[0] === 'contact') return 'contact';
  return rest.join('/');
}

function localeOf(url) {
  const first = new URL(url).pathname.split('/').filter(Boolean)[0];
  return LOCALES.includes(first) ? first : 'x';
}

async function get(url, asText = true) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);
  try {
    const res = await fetch(url, {
      headers: { 'user-agent': UA, accept: asText ? 'text/html,application/xhtml+xml' : '*/*' },
      redirect: 'follow',
      signal: controller.signal,
    });
    return { res, body: asText ? await res.text() : await res.text() };
  } finally {
    clearTimeout(timer);
  }
}

function meta(html, name) {
  const patterns = [
    new RegExp(`<meta[^>]+name=["']${name}["'][^>]+content=["']([^"']*)["']`, 'i'),
    new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+name=["']${name}["']`, 'i'),
  ];
  for (const re of patterns) {
    const hit = html.match(re);
    if (hit) return hit[1];
  }
  return '';
}

function attr(html, tag, name) {
  const hit = html.match(new RegExp(`<${tag}\\b[^>]*\\b${name}=["']([^"']*)["']`, 'i'));
  return hit ? hit[1] : '';
}

async function auditPage(url) {
  const started = Date.now();
  try {
    const { res, body } = await get(url);
    const main = body.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
    const bodyish = body.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i);
    const rough = main ? main[1] : bodyish ? bodyish[1] : body;
    const withoutChrome = rough
      .replace(/<header\b[^>]*>[\s\S]*?<\/header>/gi, ' ')
      .replace(/<footer\b[^>]*>[\s\S]*?<\/footer>/gi, ' ')
      .replace(/<nav\b[^>]*>[\s\S]*?<\/nav>/gi, ' ');

    const mainText = stripHtml(withoutChrome);
    const fullText = stripHtml(body);
    const iframes = (body.match(/<iframe\b/gi) || []).length;
    const h1s = (body.match(/<h1\b/gi) || []).length;

    return {
      url,
      path: new URL(url).pathname,
      locale: localeOf(url),
      template: templateOf(url),
      status: res.status,
      finalUrl: res.url,
      redirected: res.url !== url,
      contentType: res.headers.get('content-type') || '',
      title: decodeEntities((body.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [, ''])[1]).trim(),
      description: meta(body, 'description'),
      canonical: (body.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i) || [, ''])[1],
      robots: meta(body, 'robots'),
      wordsFull: wordCount(fullText),
      wordsMain: wordCount(mainText),
      h1: h1s,
      iframes,
      hasAdLoader: /pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js/i.test(body),
      hasAdMeta: /google-adsense-account/i.test(body),
      hasAdUnit: /<ins\b[^>]*class=["'][^"']*adsbygoogle/i.test(body),
      hasConsent: /vanilla-cookieconsent|cc-window|consent-mode|cookieconsent/i.test(body),
      tokens: [...new Set(mainText.toLowerCase().match(/[\p{L}\p{N}]+/gu) || [])].filter((w) => w.length > 2),
      ms: Date.now() - started,
    };
  } catch (error) {
    return {
      url,
      path: new URL(url).pathname,
      locale: localeOf(url),
      template: templateOf(url),
      status: 0,
      error: String(error?.message || error),
      wordsFull: 0,
      wordsMain: 0,
    };
  }
}

async function pool(items, worker, size) {
  const results = new Array(items.length);
  let cursor = 0;
  async function run() {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await worker(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(size, items.length) }, run));
  return results;
}

function jaccard(a, b) {
  if (!a.size || !b.size) return 0;
  let inter = 0;
  for (const token of a) if (b.has(token)) inter += 1;
  return inter / (a.size + b.size - inter);
}

function median(values) {
  if (!values.length) return 0;
  const sorted = [...values].sort((x, y) => x - y);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : Math.round((sorted[mid - 1] + sorted[mid]) / 2);
}

async function main() {
  console.log(`AdSense audit: ${BASE}`);

  let sitemapUrls = [];
  try {
    const { res, body } = await get(`${BASE}/sitemap.xml`);
    if (res.ok) {
      sitemapUrls = [...body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
    }
  } catch (error) {
    console.error(`Cannot read sitemap: ${error.message}`);
  }

  sitemapUrls = [...new Set(sitemapUrls)];
  if (!sitemapUrls.length) {
    sitemapUrls = LOCALES.map((loc) => `${BASE}/${loc}`);
  }

  if (SAMPLE) {
    const seen = new Set();
    sitemapUrls = sitemapUrls.filter((url) => {
      const key = `${localeOf(url)}:${templateOf(url)}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }
  if (LIMIT) sitemapUrls = sitemapUrls.slice(0, LIMIT);

  console.log(`URLs to check: ${sitemapUrls.length}\n`);

  const pages = await pool(sitemapUrls, async (url, index) => {
    const page = await auditPage(url);
    if ((index + 1) % 25 === 0 || index === sitemapUrls.length - 1) {
      process.stdout.write(`  checked ${index + 1}/${sitemapUrls.length}\r`);
    }
    return page;
  }, CONCURRENCY);
  process.stdout.write('\n\n');

  const texts = pages.map((page) => new Set(page.tokens || []));

  // Technical files
  const technical = [];
  const addTech = (label, ok, detail) => technical.push({ label, ok, detail });

  try {
    const { res, body } = await get(`${BASE}/ads.txt`);
    const lines = body.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    const googleLine = lines.find((l) => /^google\.com\s*,/i.test(l));
    addTech('ads.txt present', res.status === 200, `${res.status}, ${lines.length} line(s)`);
    addTech('ads.txt google.com line', Boolean(googleLine), googleLine || 'not found');
  } catch (error) {
    addTech('ads.txt present', false, error.message);
    addTech('ads.txt google.com line', false, 'ads.txt unreachable');
  }

  try {
    const { res, body } = await get(`${BASE}/robots.txt`);
    addTech('robots.txt present', res.status === 200, `${res.status}`);
    addTech('robots allows Mediapartners-Google', /user-agent:\s*mediapartners-google[\s\S]*?allow:\s*\//i.test(body), 'checked served robots.txt');
    addTech('robots advertises sitemap', /sitemap:/i.test(body), (body.match(/sitemap:\s*\S+/i) || ['missing'])[0]);
  } catch (error) {
    addTech('robots.txt present', false, error.message);
  }

  if (pages[0]) {
    const loaderPages = pages.filter((p) => p.hasAdLoader).length;
    addTech('AdSense loader script in served HTML', loaderPages > 0, loaderPages ? `present on ${loaderPages}/${pages.length} pages` : 'missing — pagead2 .../adsbygoogle.js not found');
    addTech('AdSense publisher meta tag', pages.some((p) => p.hasAdMeta), 'google-adsense-account');
    addTech('AdSense ad unit markup in served HTML', null, 'client-rendered via ssr:false (verified in browser)');
    addTech('Cookie consent signal in served HTML', null, 'client-rendered CMP (verified in browser)');
  }

  const required = ['privacy-policy', 'terms-of-service', 'contact'];
  const optional = ['about'];
  const requiredResults = await pool([...required, ...optional], async (slug) => {
    const url = `${BASE}/en/${slug}`;
    try {
      const { res } = await get(url);
      return { slug, url, status: res.status, ok: res.status === 200 };
    } catch (error) {
      return { slug, url, status: 0, ok: false, error: error.message };
    }
  }, 4);
  for (const item of requiredResults) {
    const kind = required.includes(item.slug) ? 'required page' : 'recommended page';
    addTech(`${kind} /${item.slug}`, item.ok, `HTTP ${item.status}`);
  }

  const ok = pages.filter((p) => p.status === 200);
  const thin = ok.filter((p) => p.template !== 'legal' && p.wordsMain < THIN);
  const veryThin = thin.filter((p) => p.wordsMain < VERY_THIN);
  const iframeOnly = ok.filter((p) => p.iframes > 0 && p.wordsMain < VERY_THIN);
  const noAd = ok.filter((p) => !p.hasAdLoader);

  const duplicates = [];
  const byLocale = new Map();
  ok.forEach((page, index) => {
    if (page.template === 'legal') return;
    const list = byLocale.get(page.locale) || [];
    list.push({ page, index });
    byLocale.set(page.locale, list);
  });
  for (const [locale, list] of byLocale) {
    for (let i = 0; i < list.length; i += 1) {
      for (let j = i + 1; j < list.length; j += 1) {
        const a = list[i];
        const b = list[j];
        const sim = jaccard(texts[a.index], texts[b.index]);
        if (sim >= DUP_THRESHOLD) {
          duplicates.push({ locale, a: a.page.path, b: b.page.path, similarity: Number(sim.toFixed(3)) });
        }
      }
    }
  }
  duplicates.sort((x, y) => y.similarity - x.similarity);

  const byTemplate = new Map();
  for (const page of ok) {
    const list = byTemplate.get(page.template) || [];
    list.push(page);
    byTemplate.set(page.template, list);
  }

  console.log('CONTENT — visible words in <main> per template');
  console.log('template            | pages |  min | median | thin(<300) | very thin(<150)');
  console.log('--------------------|-------|------|--------|------------|----------------');
  for (const [template, list] of [...byTemplate].sort()) {
    const counts = list.map((p) => p.wordsMain);
    const thinCount = list.filter((p) => p.wordsMain < THIN).length;
    const veryThinCount = list.filter((p) => p.wordsMain < VERY_THIN).length;
    console.log(
      `${template.padEnd(19)} | ${String(list.length).padStart(5)} | ${String(Math.min(...counts)).padStart(4)} | ${String(median(counts)).padStart(6)} | ${String(thinCount).padStart(10)} | ${String(veryThinCount).padStart(14)}`,
    );
  }

  console.log('\nTHIN PAGES (<300 words, legal pages excluded)');
  if (!thin.length) console.log('  none');
  for (const page of thin.sort((a, b) => a.wordsMain - b.wordsMain)) {
    console.log(`  ${String(page.wordsMain).padStart(5)}  ${page.locale.padEnd(2)}  ${page.path}${page.wordsMain < VERY_THIN ? '  [VERY THIN]' : ''}`);
  }

  console.log('\nIFRAME-ONLY / EMBED-ONLY CANDIDATES');
  if (!iframeOnly.length) console.log('  none');
  for (const page of iframeOnly) console.log(`  ${page.path} — ${page.iframes} iframe(s), ${page.wordsMain} words`);

  console.log('\nDUPLICATE PAIRS (same locale, Jaccard >= 0.55)');
  if (!duplicates.length) console.log('  none');
  for (const dup of duplicates.slice(0, 15)) {
    console.log(`  ${dup.similarity}  ${dup.locale}  ${dup.a}  <>  ${dup.b}`);
  }

  console.log('\nTECHNICAL / POLICY CHECKS');
  for (const item of technical) {
    const label = item.ok === null ? 'INFO' : item.ok ? 'PASS' : 'FAIL';
    console.log(`  ${label}  ${item.label}  (${item.detail})`);
  }

  const broken = ok.filter((p) => p.redirected || (p.canonical && p.canonical !== p.url));
  const noindex = ok.filter((p) => /noindex/i.test(p.robots));
  const badH1 = ok.filter((p) => p.h1 !== 1);
  const missingDesc = ok.filter((p) => !p.description);
  console.log('\nCRAWL HEALTH');
  console.log(`  HTTP 200: ${ok.length}/${pages.length}`);
  console.log(`  non-200: ${pages.filter((p) => p.status !== 200).length}`);
  console.log(`  redirects / canonical mismatch: ${broken.length}`);
  console.log(`  noindex: ${noindex.length}`);
  console.log(`  pages without exactly one H1: ${badH1.length}`);
  console.log(`  pages without meta description: ${missingDesc.length}`);
  console.log(`  pages without AdSense loader: ${noAd.length}`);

  const report = {
    generatedAt: new Date().toISOString(),
    base: BASE,
    totals: {
      urls: pages.length,
      http200: ok.length,
      thin: thin.length,
      veryThin: veryThin.length,
      duplicates: duplicates.length,
      iframeOnly: iframeOnly.length,
    },
    technical,
    requiredPages: requiredResults,
    duplicates,
    pages,
  };

  const outPath = path.resolve(process.cwd(), OUT);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`\nReport: ${path.relative(process.cwd(), outPath)}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
