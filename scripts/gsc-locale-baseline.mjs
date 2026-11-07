#!/usr/bin/env node
/**
 * Per-locale Google Search Console baseline.
 *
 * Groups search-analytics rows by the locale prefix of the landing page and
 * records totals plus the top 20 queries for each locale. Run before a SEO
 * release, then re-run after 2-4 weeks and compare.
 *
 * Usage:
 *   GSC_CREDENTIALS=/path/to/service-account.json npm run gsc:baseline
 *   npm run gsc:baseline -- --days=28 --output=docs/gsc-baseline.json
 *
 * The output contains no credentials and no account identifiers.
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import process from 'node:process';

const args = process.argv.slice(2);
const getArg = (name, fallback = '') => {
  const hit = args.find((arg) => arg.startsWith(`--${name}=`));
  return hit ? hit.split('=').slice(1).join('=') : fallback;
};

const DAYS = Math.max(1, Math.min(180, Number(getArg('days', '28')) || 28));
const DOMAIN = getArg('domain', 'generatepasswordto.me');
const CRED_PATH =
  process.env.GSC_CREDENTIALS ||
  path.resolve(process.cwd(), 'gsc-service-account.json');
const PROPERTY = process.env.GSC_PROPERTY || getArg('property', 'sc-domain:generatepasswordto.me');
const OUTPUT =
  getArg('output', '') ||
  `docs/gsc-baseline-${new Date().toISOString().slice(0, 10)}.json`;

const LOCALES = ['en', 'ua', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'pl', 'vi'];
const TOP_QUERIES = 20;

const b64url = (data) =>
  Buffer.from(data)
    .toString('base64')
    .replace(/=+$/, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

function loadServiceAccount(file) {
  if (!fs.existsSync(file)) {
    throw new Error(`GSC credential file not found: ${file}`);
  }
  const sa = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (sa.type !== 'service_account') {
    throw new Error(`GSC credential type is "${sa.type}", expected "service_account"`);
  }
  return sa;
}

async function getAccessToken(sa) {
  const now = Math.floor(Date.now() / 1000);
  const tokenUri = sa.token_uri || 'https://oauth2.googleapis.com/token';
  const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claims = b64url(
    JSON.stringify({
      iss: sa.client_email,
      scope: 'https://www.googleapis.com/auth/webmasters.readonly',
      aud: tokenUri,
      iat: now,
      exp: now + 3600,
    }),
  );
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(`${header}.${claims}`);
  const assertion = `${header}.${claims}.${b64url(signer.sign(sa.private_key))}`;

  const response = await fetch(tokenUri, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
    signal: AbortSignal.timeout(20000),
  });
  if (!response.ok) {
    throw new Error(`GSC token exchange failed: HTTP ${response.status}`);
  }
  return (await response.json()).access_token;
}

async function query(token, property, body) {
  const encoded = encodeURIComponent(property);
  const response = await fetch(
    `https://searchconsole.googleapis.com/webmasters/v3/sites/${encoded}/searchAnalytics/query`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(30000),
    },
  );
  const text = await response.text();
  if (!response.ok) {
    throw new Error(`GSC query failed: HTTP ${response.status} ${text.slice(0, 300)}`);
  }
  return JSON.parse(text).rows || [];
}

function localeForUrl(url) {
  try {
    const pathname = new URL(url).pathname.replace(/^\/+|\/+$/g, '');
    if (!pathname) return 'en';
    const first = pathname.split('/')[0].toLowerCase();
    return LOCALES.includes(first) ? first : 'en';
  } catch {
    return null;
  }
}

function emptyBucket(locale) {
  return {
    locale,
    clicks: 0,
    impressions: 0,
    ctr: 0,
    position: 0,
    weightedPosition: 0,
    queries: new Map(),
    pages: new Map(),
  };
}

function topFromMap(map, limit) {
  return [...map.entries()]
    .map(([key, value]) => ({
      key,
      clicks: value.clicks,
      impressions: value.impressions,
      ctr: value.impressions > 0 ? Number((value.clicks / value.impressions).toFixed(4)) : 0,
      position:
        value.impressions > 0 ? Number((value.weightedPosition / value.impressions).toFixed(1)) : 0,
    }))
    .sort((a, b) => b.impressions - a.impressions || b.clicks - a.clicks || a.position - b.position)
    .slice(0, limit);
}

function finalizeBucket(bucket) {
  const position = bucket.impressions > 0 ? bucket.weightedPosition / bucket.impressions : 0;
  const queries = topFromMap(bucket.queries, TOP_QUERIES).map(({ key, ...rest }) => ({
    query: key,
    ...rest,
  }));
  const pages = topFromMap(bucket.pages, 10).map(({ key, ...rest }) => ({
    page: key,
    ...rest,
  }));

  return {
    locale: bucket.locale,
    clicks: bucket.clicks,
    impressions: bucket.impressions,
    ctr: bucket.impressions > 0 ? Number((bucket.clicks / bucket.impressions).toFixed(4)) : 0,
    position: Number(position.toFixed(1)),
    topQueries: queries,
    topPages: pages,
  };
}

async function main() {
  const serviceAccount = loadServiceAccount(CRED_PATH);
  const token = await getAccessToken(serviceAccount);

  const end = new Date().toISOString().slice(0, 10);
  const start = new Date(Date.now() - DAYS * 86400000).toISOString().slice(0, 10);
  const range = { start, end };

  const pageRows = await query(token, PROPERTY, {
    startDate: start,
    endDate: end,
    dimensions: ['page'],
    rowLimit: 25000,
    dataState: 'all',
  });

  // Query-level rows can be absent when Google anonymizes low-volume queries,
  // so totals come from the page dimension and this second call only enriches
  // the per-locale query list.
  const queryPageRows = await query(token, PROPERTY, {
    startDate: start,
    endDate: end,
    dimensions: ['page', 'query'],
    rowLimit: 25000,
    dataState: 'all',
  });

  const siteQueryRows = await query(token, PROPERTY, {
    startDate: start,
    endDate: end,
    dimensions: ['query'],
    rowLimit: TOP_QUERIES,
    dataState: 'all',
  });

  const buckets = new Map(LOCALES.map((locale) => [locale, emptyBucket(locale)]));
  let totalClicks = 0;
  let totalImpressions = 0;
  let totalWeightedPosition = 0;

  for (const row of pageRows) {
    const page = row.keys?.[0] || '';
    const locale = localeForUrl(page);
    if (!locale) continue;

    const clicks = row.clicks || 0;
    const impressions = row.impressions || 0;
    const position = row.position || 0;

    const bucket = buckets.get(locale);
    bucket.clicks += clicks;
    bucket.impressions += impressions;
    bucket.weightedPosition += position * impressions;

    const pageBucket = bucket.pages.get(page) || { clicks: 0, impressions: 0, weightedPosition: 0 };
    pageBucket.clicks += clicks;
    pageBucket.impressions += impressions;
    pageBucket.weightedPosition += position * impressions;
    bucket.pages.set(page, pageBucket);

    totalClicks += clicks;
    totalImpressions += impressions;
    totalWeightedPosition += position * impressions;
  }

  for (const row of queryPageRows) {
    const page = row.keys?.[0] || '';
    const keyword = row.keys?.[1] || '';
    const locale = localeForUrl(page);
    if (!locale || !keyword) continue;

    const bucket = buckets.get(locale);
    const queryBucket = bucket.queries.get(keyword) || {
      clicks: 0,
      impressions: 0,
      weightedPosition: 0,
    };
    queryBucket.clicks += row.clicks || 0;
    queryBucket.impressions += row.impressions || 0;
    queryBucket.weightedPosition += (row.position || 0) * (row.impressions || 0);
    bucket.queries.set(keyword, queryBucket);
  }

  const report = {
    generatedAt: new Date().toISOString(),
    property: PROPERTY,
    domain: DOMAIN,
    days: DAYS,
    range,
    totals: {
      clicks: totalClicks,
      impressions: totalImpressions,
      ctr: totalImpressions > 0 ? Number((totalClicks / totalImpressions).toFixed(4)) : 0,
      position:
        totalImpressions > 0 ? Number((totalWeightedPosition / totalImpressions).toFixed(1)) : 0,
    },
    siteTopQueries: siteQueryRows.map((row) => ({
      query: row.keys?.[0] || '',
      clicks: row.clicks || 0,
      impressions: row.impressions || 0,
      ctr: Number((row.ctr || 0).toFixed(4)),
      position: Number((row.position || 0).toFixed(1)),
    })),
    notes: [
      'Locales are derived from the first path segment of each landing page.',
      siteQueryRows.length === 0
        ? 'GSC returned no query-level rows for this range (low volume or anonymized queries).'
        : 'Query-level rows are site-wide; per-locale query rows are included when GSC exposes them.',
    ],
    locales: [...buckets.values()].map(finalizeBucket),
  };

  const abs = path.resolve(process.cwd(), OUTPUT);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, `${JSON.stringify(report, null, 2)}\n`, 'utf8');

  console.log(`GSC baseline written to ${OUTPUT}`);
  console.log(`Property: ${PROPERTY} | ${range.start} .. ${range.end}`);
  console.log(`Totals: clicks ${report.totals.clicks} | impressions ${report.totals.impressions} | ctr ${(report.totals.ctr * 100).toFixed(2)}% | position ${report.totals.position}`);
  for (const locale of report.locales) {
    console.log(
      `  ${locale.locale.padEnd(2)} clicks ${String(locale.clicks).padStart(4)} | impressions ${String(locale.impressions).padStart(5)} | queries ${locale.topQueries.length}`,
    );
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
