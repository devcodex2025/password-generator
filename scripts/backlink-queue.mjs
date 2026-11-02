#!/usr/bin/env node
/**
 * Backlink queue helper.
 *
 * Reads docs/backlink-sources.csv, validates reachability of the candidate
 * services, and prints a prioritised work queue. It NEVER submits anything:
 * every service has its own form, terms and captcha, so publishing stays a
 * human step. This script only removes the boring parts (filtering, dedupe,
 * liveness checks, post-publish link verification).
 *
 * Usage:
 *   node scripts/backlink-queue.mjs
 *   node scripts/backlink-queue.mjs --tier=A,B --priority=P1,P2
 *   node scripts/backlink-queue.mjs --check --limit=40
 *   node scripts/backlink-queue.mjs --queue --out=docs/backlink-queue.md
 *   node scripts/backlink-queue.mjs --verify=https://telegra.ph/some-page
 */

import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const CSV_PATH = path.join(ROOT, 'docs', 'backlink-sources.csv');
const DEFAULT_TARGET = 'www.generatepasswordto.me';
const UA = 'generatepasswordto.me-link-audit/1.0 (+https://www.generatepasswordto.me)';

const args = new Map(
  process.argv.slice(2).map((raw) => {
    const [key, ...rest] = raw.replace(/^--/, '').split('=');
    return [key, rest.length ? rest.join('=') : 'true'];
  }),
);

const list = (value) =>
  (value ?? '')
    .split(',')
    .map((item) => item.trim().toUpperCase())
    .filter(Boolean);

const filters = {
  tiers: list(args.get('tier')),
  priorities: list(args.get('priority')),
  statuses: list(args.get('status')),
  limit: Number.parseInt(args.get('limit') ?? '0', 10) || 0,
};

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];

    if (quoted) {
      if (char === '"' && text[i + 1] === '"') {
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
      row.push(field.replace(/\r$/, ''));
      if (row.some((value) => value !== '')) rows.push(row);
      row = [];
      field = '';
    } else {
      field += char;
    }
  }

  if (field !== '' || row.length) {
    row.push(field.replace(/\r$/, ''));
    if (row.some((value) => value !== '')) rows.push(row);
  }

  const [header, ...body] = rows;
  return body.map((values) =>
    Object.fromEntries(header.map((key, index) => [key, values[index] ?? ''])),
  );
}

const TIER_ORDER = ['S', 'A', 'B', 'C', 'D', 'E', 'F', 'X', 'Z'];

function select(records) {
  const selected = records.filter((record) => {
    if (filters.tiers.length && !filters.tiers.includes(record.tier)) return false;
    if (filters.priorities.length && !filters.priorities.includes(record.priority)) return false;
    if (filters.statuses.length && !filters.statuses.includes(record.status.toUpperCase())) return false;
    return true;
  });

  selected.sort(
    (a, b) =>
      a.priority.localeCompare(b.priority) ||
      TIER_ORDER.indexOf(a.tier) - TIER_ORDER.indexOf(b.tier) ||
      Number(b.value) - Number(a.value) ||
      a.id.localeCompare(b.id),
  );

  return filters.limit ? selected.slice(0, filters.limit) : selected;
}

async function probe(url) {
  const started = Date.now();
  try {
    const response = await fetch(url, {
      redirect: 'follow',
      signal: AbortSignal.timeout(12_000),
      headers: { 'user-agent': UA, accept: 'text/html,application/xhtml+xml' },
    });
    const body = response.headers.get('content-type')?.includes('text/html')
      ? await response.text()
      : '';
    return {
      status: response.status,
      finalUrl: response.url,
      ms: Date.now() - started,
      noindex:
        /<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(body) ||
        /noindex/i.test(response.headers.get('x-robots-tag') ?? ''),
    };
  } catch (error) {
    return { status: 0, finalUrl: url, ms: Date.now() - started, error: error.message };
  }
}

async function runChecks(records) {
  const results = [];
  const concurrency = 6;
  let cursor = 0;

  async function worker() {
    while (cursor < records.length) {
      const index = cursor;
      cursor += 1;
      const record = records[index];
      const result = await probe(record.url);
      results[index] = { ...record, ...result };
      const state = result.status === 0 ? 'ERR' : result.status;
      console.log(`[${index + 1}/${records.length}] ${state} ${record.id} ${record.name}`);
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, records.length) }, worker));
  return results;
}

function toCsv(records) {
  const columns = [
    'id', 'tier', 'category', 'name', 'url', 'action', 'registration',
    'link_type', 'value', 'effort_min', 'priority', 'status', 'notes',
    'http_status', 'reachable', 'noindex', 'final_url', 'checked_at',
  ];

  const escape = (value) => `"${String(value ?? '').replaceAll('"', '""')}"`;
  const lines = [columns.map(escape).join(',')];
  const now = new Date().toISOString().slice(0, 10);

  for (const record of records) {
    lines.push(
      columns
        .map((column) => {
          if (column === 'http_status') return escape(record.status ?? '');
          if (column === 'reachable') return escape(record.status >= 200 && record.status < 400 ? 'yes' : 'no');
          if (column === 'noindex') return escape(record.noindex ? 'yes' : record.status ? 'no' : '');
          if (column === 'final_url') return escape(record.finalUrl ?? '');
          if (column === 'checked_at') return escape(record.checked_at ?? now);
          return escape(record[column]);
        })
        .join(','),
    );
  }

  return lines.join('\n');
}

function printQueue(records) {
  const groups = new Map();
  for (const record of records) {
    if (!groups.has(record.tier)) groups.set(record.tier, []);
    groups.get(record.tier).push(record);
  }

  const lines = [
    '# Backlink work queue',
    '',
    `Generated ${new Date().toISOString().slice(0, 10)} from \`docs/backlink-sources.csv\`.`,
    'Tick a box only after the page is live and `--verify` confirms the link.',
    '',
  ];

  for (const [tier, items] of [...groups.entries()].sort()) {
    lines.push(`## Tier ${tier} (${items.length})`, '');
    for (const item of items) {
      lines.push(
        `- [ ] **${item.id}** ${item.name} — ${item.action} — <${item.url}> (${item.link_type}, value ${item.value}, ~${item.effort_min} min)`,
      );
      if (item.notes) lines.push(`  - ${item.notes}`);
    }
    lines.push('');
  }

  return lines.join('\n');
}

async function verify(pageUrl, target) {
  const response = await fetch(pageUrl, {
    redirect: 'follow',
    signal: AbortSignal.timeout(15_000),
    headers: { 'user-agent': UA },
  });
  const html = await response.text();
  const noindex =
    /<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html) ||
    /noindex/i.test(response.headers.get('x-robots-tag') ?? '');

  const normalize = (value) => value.toLowerCase().replace(/^www\./, '');
  const targetHost = normalize(target);

  const links = [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)]
    .map((match) => {
      const attrs = match[1];
      const rawHref = /href=["']([^"']+)["']/i.exec(attrs)?.[1] ?? '';
      const rel = /rel=["']([^"']*)["']/i.exec(attrs)?.[1] ?? '';
      const text = match[2].replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
      let absolute = rawHref;
      let host = '';
      try {
        const parsed = new URL(rawHref, response.url);
        absolute = parsed.href;
        host = normalize(parsed.hostname);
      } catch {
        /* not a resolvable URL */
      }
      return { href: absolute, rel, text, host };
    })
    .filter((link) => link.host === targetHost)
    .map(({ host, ...link }) => link);

  console.log(
    JSON.stringify(
      { page: pageUrl, http: response.status, finalUrl: response.url, noindex, found: links.length, links },
      null,
      2,
    ),
  );

  if (!links.length) {
    console.error(`\nNo link to ${target} found on this page.`);
    process.exitCode = 2;
  }
}

async function main() {
  const records = parseCsv(await readFile(CSV_PATH, 'utf8'));

  if (args.has('verify')) {
    await verify(args.get('verify'), args.get('target') ?? DEFAULT_TARGET);
    return;
  }

  const selected = select(records);

  if (args.has('check')) {
    const checked = await runChecks(selected);
    const out = path.resolve(ROOT, args.get('out') ?? 'docs/backlink-sources.checked.csv');
    await writeFile(out, `${toCsv(checked)}\n`, 'utf8');
    const live = checked.filter((record) => record.status >= 200 && record.status < 400).length;
    console.log(`\nChecked ${checked.length}: ${live} reachable, ${checked.length - live} failed.`);
    console.log(`Written to ${path.relative(ROOT, out)}`);
    return;
  }

  if (args.has('queue')) {
    const out = path.resolve(ROOT, args.get('out') ?? 'docs/backlink-queue.md');
    await writeFile(out, `${printQueue(selected)}\n`, 'utf8');
    console.log(`Queue written to ${path.relative(ROOT, out)} (${selected.length} items)`);
    return;
  }

  const byTier = {};
  for (const record of selected) byTier[record.tier] = (byTier[record.tier] ?? 0) + 1;

  console.log(`Sources: ${records.length} total, ${selected.length} selected`);
  console.log('By tier:', byTier);
  console.log('\nNext up:');
  for (const record of selected.slice(0, 15)) {
    console.log(`  ${record.id} [${record.tier}/${record.priority}] ${record.name} — ${record.action}`);
  }
  console.log('\nOptions: --check --queue --verify=<url> --tier=S,A --priority=P1 --limit=20');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
