#!/usr/bin/env node
/**
 * Refresh `keyword_targets` in docs/content-agent-brief.json from the
 * per-locale keyword map.
 *
 * Each locale gets the top 50 queries by demandScore (then queryHits), so new
 * articles are written against real autocomplete demand instead of guesses.
 *
 * Run after `npm run keywords:map`:
 *   npm run keywords:brief
 */
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const MAP_DIR = path.resolve(ROOT, 'docs/keyword-map');
const LOCALES_DIR = path.join(MAP_DIR, 'locales');
const BRIEF_PATH = path.resolve(ROOT, 'docs/content-agent-brief.json');
const LIMIT = 50;

function read(file) {
  return fs.readFileSync(file, 'utf8');
}

/** Minimal CSV parser that handles quoted fields and escaped quotes. */
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

function loadLocaleCodes() {
  const indexPath = path.join(MAP_DIR, 'languages.csv');
  if (!fs.existsSync(indexPath)) {
    throw new Error(`Keyword map index not found: ${indexPath}`);
  }

  const [header, ...rows] = parseCsv(read(indexPath));
  const codeIndex = header.indexOf('code');
  if (codeIndex === -1) {
    throw new Error('languages.csv has no "code" column');
  }
  return rows.map((row) => row[codeIndex]).filter(Boolean);
}

function loadKeywords(file) {
  const [header, ...rows] = parseCsv(read(file));
  const columns = new Map(header.map((name, index) => [name, index]));
  const required = ['keyword', 'demandScore', 'queryHits', 'bestRank'];
  for (const name of required) {
    if (!columns.has(name)) {
      throw new Error(`${file} is missing the "${name}" column`);
    }
  }

  const seen = new Set();
  return rows
    .map((row) => ({
      keyword: (row[columns.get('keyword')] || '').trim(),
      demandScore: Number(row[columns.get('demandScore')]) || 0,
      queryHits: Number(row[columns.get('queryHits')]) || 0,
      bestRank: Number(row[columns.get('bestRank')]) || 999,
    }))
    .filter((entry) => entry.keyword && !seen.has(entry.keyword) && seen.add(entry.keyword))
    .sort(
      (a, b) =>
        b.demandScore - a.demandScore ||
        b.queryHits - a.queryHits ||
        a.bestRank - b.bestRank ||
        a.keyword.localeCompare(b.keyword),
    );
}

function buildTiers(all) {
  return {
    high: all.filter((entry) => entry.demandScore >= 80).slice(0, 20).map((entry) => entry.keyword),
    medium: all
      .filter((entry) => entry.demandScore >= 60 && entry.demandScore < 80)
      .slice(0, 20)
      .map((entry) => entry.keyword),
    low: all.filter((entry) => entry.demandScore < 60).slice(0, 20).map((entry) => entry.keyword),
  };
}

function main() {
  if (!fs.existsSync(LOCALES_DIR)) {
    throw new Error(`Keyword map locales not found: ${LOCALES_DIR}. Run "npm run keywords:map" first.`);
  }

  const targets = {};
  const tiersByLocale = {};
  const summary = [];
  for (const code of loadLocaleCodes()) {
    const file = path.join(LOCALES_DIR, `${code}.csv`);
    if (!fs.existsSync(file)) {
      throw new Error(`Missing keyword file for locale "${code}": ${file}`);
    }
    const all = loadKeywords(file);
    const keywords = all.slice(0, LIMIT).map((entry) => entry.keyword);
    if (keywords.length === 0) {
      throw new Error(`No keywords found for locale "${code}"`);
    }
    targets[code] = keywords;
    tiersByLocale[code] = buildTiers(all);
    summary.push(
      `${code}:${keywords.length} (tiers ${tiersByLocale[code].high.length}/${tiersByLocale[code].medium.length}/${tiersByLocale[code].low.length})`,
    );
  }

  const brief = JSON.parse(read(BRIEF_PATH));
  brief.keyword_targets = targets;
  brief.keyword_tiers = tiersByLocale;
  brief.keyword_targets_note =
    `Top ${LIMIT} queries per locale by demandScore from docs/keyword-map/locales/<code>.csv, plus high/medium/low tier samples. Refresh with "npm run keywords:brief" after "npm run keywords:map".`;
  fs.writeFileSync(BRIEF_PATH, `${JSON.stringify(brief, null, 2)}\n`, 'utf8');

  console.log(`Updated ${path.relative(ROOT, BRIEF_PATH)} with top ${LIMIT} keywords and tiers for ${summary.length} locales.`);
  console.log(summary.join(', '));
}

main();
