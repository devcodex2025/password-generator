#!/usr/bin/env node
/**
 * Affiliate link report + importer.
 *
 *   node scripts/affiliate-links-report.mjs               # matrix of what is configured
 *   node scripts/affiliate-links-report.mjs --check       # also HTTP-check every unique URL
 *   node scripts/affiliate-links-report.mjs --import links.json
 *
 * Import format (what you can copy out of the Nord affiliate portal per product):
 *   {
 *     "nordpass":       { "de": "https://...", "fr": "https://..." },
 *     "nordpassFamily": { "default": "https://..." },
 *     "nordvpn":        { "en": "https://..." }
 *   }
 * Keys: locale codes (en, ua, es, fr, de, it, pt, ru, zh, ja, pl) or ISO country
 * codes (DE, FR, US) or "default". Nothing but tracking URLs belongs here — never
 * usernames, passwords or API keys.
 */

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const LINKS_PATH = path.join(ROOT, 'src/content/affiliate/links.json');
const LOCALES = ['en', 'ua', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'pl'];

const args = process.argv.slice(2);
const doCheck = args.includes('--check');
const importIdx = args.indexOf('--import');

const data = JSON.parse(fs.readFileSync(LINKS_PATH, 'utf8'));

function classify(url) {
  if (!url) return null;
  if (url.startsWith('/')) return 'internal';
  if (!/^https:\/\//.test(url)) return 'invalid';
  if (/aff_c\?|aff_id=|\/click\/|aff_sub=/.test(url)) return 'tracking';
  return 'external-untracked';
}

function resolve(product, locale) {
  const cfg = data.products[product];
  const envName = cfg.env;
  const envValue = envName ? process.env[envName] : undefined;

  if (cfg.byLocale?.[locale]) return { url: cfg.byLocale[locale], source: 'locale' };
  if (cfg.byLocale?.en) return { url: cfg.byLocale.en, source: 'locale-en' };
  if (envValue && envValue.startsWith('http')) return { url: envValue, source: 'env' };
  if (cfg.fallback) return { url: cfg.fallback, source: 'fallback' };
  return { url: cfg.internal, source: 'internal' };
}

if (importIdx !== -1) {
  const file = args[importIdx + 1];
  if (!file) {
    console.error('Usage: --import <file.json>');
    process.exit(1);
  }
  const incoming = JSON.parse(fs.readFileSync(file, 'utf8'));
  let added = 0;

  for (const [product, mapping] of Object.entries(incoming)) {
    const cfg = data.products[product];
    if (!cfg) {
      console.warn(`skip unknown product: ${product}`);
      continue;
    }
    for (const [key, url] of Object.entries(mapping)) {
      if (typeof url !== 'string' || !url.startsWith('http')) {
        console.warn(`skip invalid url for ${product}.${key}`);
        continue;
      }
      if (/^[A-Z]{2}$/.test(key)) {
        cfg.byGeo = cfg.byGeo || {};
        cfg.byGeo[key] = url;
      } else if (key === 'default' || key === 'en') {
        cfg.byLocale = cfg.byLocale || {};
        cfg.byLocale.en = url;
      } else if (LOCALES.includes(key)) {
        cfg.byLocale = cfg.byLocale || {};
        cfg.byLocale[key] = url;
      } else {
        console.warn(`skip unknown key ${product}.${key}`);
        continue;
      }
      added += 1;
    }
  }

  data.updatedAt = new Date().toISOString().slice(0, 10);
  fs.writeFileSync(LINKS_PATH, JSON.stringify(data, null, 2) + '\n');
  console.log(`imported ${added} links into ${path.relative(ROOT, LINKS_PATH)}`);
  process.exit(0);
}

let problems = 0;
const seen = new Map();

for (const [product, cfg] of Object.entries(data.products)) {
  console.log(`\n=== ${product} ===`);
  const rows = LOCALES.map((locale) => {
    const { url, source } = resolve(product, locale);
    const kind = classify(url);
    if (kind === 'invalid') problems += 1;
    if (source === 'internal') problems += 1;
    if (kind === 'tracking') {
      seen.set(url, (seen.get(url) || 0) + 1);
    }
    return `${locale.padEnd(3)} ${source.padEnd(9)} ${kind ?? '-'}`;
  });
  for (let i = 0; i < rows.length; i += 4) console.log('  ' + rows.slice(i, i + 4).join(' | '));
  const configured = Object.keys(cfg.byLocale || {}).length;
  const geo = Object.keys(cfg.byGeo || {}).length;
  console.log(`  configured: byLocale=${configured} byGeo=${geo} fallback=${cfg.fallback ? 'yes' : 'no'}`);
}

const duplicates = [...seen.entries()].filter(([, n]) => n > 1);
if (duplicates.length) {
  console.log('\nNote: identical URLs used for several locales (expected until per-geo landings are added):');
  duplicates.forEach(([url, n]) => console.log(`  x${n} ${url}`));
}

if (doCheck) {
  console.log('\nHTTP check:');
  for (const url of seen.keys()) {
    try {
      const res = await fetch(url, { method: 'GET', redirect: 'manual' });
      const location = res.headers.get('location') || '-';
      console.log(`  ${res.status} ${url.replace(/\?.*$/, '?…')} -> ${location.replace(/\?.*$/, '?…')}`);
    } catch (error) {
      console.log(`  ERR ${url} (${error.message})`);
      problems += 1;
    }
  }
}

console.log(`\nTotal issues: ${problems}`);
process.exit(problems > 0 ? 1 : 0);
