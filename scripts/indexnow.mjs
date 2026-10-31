#!/usr/bin/env node
/**
 * IndexNow submitter — pings Bing / Yandex / Naver / Seznam with every URL
 * from the live sitemap so they crawl new pages within hours instead of weeks.
 *
 * Usage:
 *   npm run indexnow            # submit all HTML pages from production sitemap
 *   npm run indexnow -- --dry   # print what would be sent, no network calls
 *
 * The key file lives at public/<key>.txt and is served from the site root.
 * Google does not support IndexNow; use Search Console for Google.
 */
import fs from 'node:fs';
import path from 'node:path';

const SITE = 'https://www.generatepasswordto.me';
const SITEMAP = `${SITE}/sitemap.xml`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const DRY = process.argv.includes('--dry');

function readKey() {
  const dir = path.resolve(process.cwd(), 'public');
  const keyFile = fs
    .readdirSync(dir)
    .find((f) => /^[a-f0-9]{32}\.txt$/i.test(f));
  if (!keyFile) {
    throw new Error('IndexNow key file public/<32-hex>.txt not found');
  }
  return { key: path.basename(keyFile, '.txt'), keyFile };
}

async function fetchUrls() {
  const res = await fetch(SITEMAP, { signal: AbortSignal.timeout(20000) });
  if (!res.ok) throw new Error(`sitemap fetch failed: ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => m[1].replace(/&amp;/g, '&'))
    .filter((u) => !/\.(png|jpe?g|webp|gif|svg|ico|pdf|xml|txt)$/i.test(u))
    .filter((u) => !/\/opengraph-image(\/|$)/.test(u));
}

async function main() {
  const { key } = readKey();
  const urlList = await fetchUrls();
  const payload = {
    host: new URL(SITE).host,
    key,
    keyLocation: `${SITE}/${key}.txt`,
    urlList,
  };

  console.log(`IndexNow: ${urlList.length} URLs | key ${key} | keyLocation ${payload.keyLocation}`);
  if (DRY) {
    console.log(JSON.stringify(payload, null, 2).slice(0, 1200));
    return;
  }

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(30000),
  });
  console.log(`IndexNow response: HTTP ${res.status} ${res.statusText}`);
  const text = await res.text();
  if (text) console.log(text.slice(0, 300));
  if (res.status !== 200 && res.status !== 202) process.exitCode = 1;
}

main().catch((err) => {
  console.error('IndexNow failed:', err.message);
  process.exit(1);
});
