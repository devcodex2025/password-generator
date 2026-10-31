#!/usr/bin/env node
/**
 * Google Search Console report (zero dependencies, service-account JWT auth).
 *
 * Usage:
 *   GSC_CREDENTIALS=/path/to/service-account.json npm run gsc
 *   npm run gsc -- --days=7 --domain=generatepasswordto.me
 *   npm run gsc -- --json
 *
 * Env:
 *   GSC_CREDENTIALS  path to the service-account JSON key (never commit it)
 *   GSC_PROPERTY     optional exact property ("sc-domain:example.com" or "https://www.example.com/")
 *
 * Output: accessible properties, sitemap status, search analytics (queries/pages/dates),
 * URL inspection for the homepage and one localized page.
 */
import fs from 'node:fs';
import crypto from 'node:crypto';

const args = process.argv.slice(2);
const getArg = (name, fallback = '') => {
  const hit = args.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.split('=').slice(1).join('=') : fallback;
};

const DAYS = Math.max(1, Math.min(180, Number(getArg('days', '28')) || 28));
const AS_JSON = args.includes('--json');
const DOMAIN_HINT = getArg('domain', 'generatepasswordto.me');
const CRED_PATH =
  process.env.GSC_CREDENTIALS ||
  '/home/karbi/.config/minebench-google-analytics/gsc-service-account.json';
const PROPERTY = process.env.GSC_PROPERTY || getArg('property', '');

const b64url = (data) =>
  Buffer.from(data)
    .toString('base64')
    .replace(/=+$/, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

function loadServiceAccount(path) {
  if (!fs.existsSync(path)) {
    throw new Error(`credential file not found: ${path}`);
  }
  const sa = JSON.parse(fs.readFileSync(path, 'utf8'));
  if (sa.type !== 'service_account') {
    throw new Error(
      `credential type is "${sa.type}", expected "service_account". ` +
        'OAuth authorized_user tokens expire/revoke — create a service account key instead.'
    );
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
    })
  );
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(`${header}.${claims}`);
  const assertion = `${header}.${claims}.${b64url(signer.sign(sa.private_key))}`;

  const res = await fetch(tokenUri, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
    signal: AbortSignal.timeout(20000),
  });
  if (!res.ok) {
    throw new Error(`token exchange failed: HTTP ${res.status} ${(await res.text()).slice(0, 200)}`);
  }
  return (await res.json()).access_token;
}

async function api(token, method, url, body) {
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(30000),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`HTTP ${res.status} ${text.slice(0, 300)}`);
  return text ? JSON.parse(text) : {};
}

const iso = (d) => d.toISOString().slice(0, 10);

async function buildReport(token) {
  const sites = (await api(token, 'GET', 'https://searchconsole.googleapis.com/webmasters/v3/sites')).siteEntry || [];
  const report = {
    generatedAt: new Date().toISOString(),
    days: DAYS,
    properties: sites.map((s) => ({ siteUrl: s.siteUrl, permission: s.permissionLevel })),
    property: null,
  };

  const chosen =
    (PROPERTY && sites.find((s) => s.siteUrl === PROPERTY)) ||
    sites.find((s) => s.siteUrl.includes(DOMAIN_HINT));
  if (!chosen) {
    report.error = `no accessible property for "${DOMAIN_HINT}". Add the service-account email as a user in Search Console.`;
    return report;
  }

  const prop = chosen.siteUrl;
  const enc = encodeURIComponent(prop);
  const end = iso(new Date());
  const start = iso(new Date(Date.now() - DAYS * 86400000));

  const property = { siteUrl: prop, permission: chosen.permissionLevel, range: { start, end } };

  try {
    const sitemaps = (await api(token, 'GET', `https://searchconsole.googleapis.com/webmasters/v3/sites/${enc}/sitemaps`)).sitemap || [];
    property.sitemaps = sitemaps.map((s) => ({
      path: s.path,
      lastSubmitted: s.lastSubmitted || null,
      lastDownloaded: s.lastDownloaded || null,
      pending: s.isPending ?? null,
      errors: s.errors ?? 0,
      warnings: s.warnings ?? 0,
    }));
  } catch (e) {
    property.sitemapsError = String(e.message).slice(0, 200);
  }

  const query = async (dimensions, rowLimit = 10) => {
    const body = { startDate: start, endDate: end, dimensions, rowLimit, dataState: 'all' };
    const res = await api(
      token,
      'POST',
      `https://searchconsole.googleapis.com/webmasters/v3/sites/${enc}/searchAnalytics/query`,
      body
    );
    return (res.rows || []).map((r) => ({
      keys: r.keys,
      clicks: r.clicks,
      impressions: r.impressions,
      ctr: Number((r.ctr ?? 0).toFixed(4)),
      position: Number((r.position ?? 0).toFixed(1)),
    }));
  };

  try {
    property.totals = (await query([], 1))[0] || { clicks: 0, impressions: 0, ctr: 0, position: 0 };
    property.byQuery = await query(['query']);
    property.byPage = await query(['page']);
    property.byDate = await query(['date'], 31);
  } catch (e) {
    property.analyticsError = String(e.message).slice(0, 200);
  }

  property.inspection = {};
  for (const url of [`https://www.${DOMAIN_HINT}/`, `https://www.${DOMAIN_HINT}/ua`]) {
    try {
      const res = await api(token, 'POST', 'https://searchconsole.googleapis.com/v1/urlInspection/index:inspect', {
        inspectionUrl: url,
        siteUrl: prop,
        languageCode: 'en',
      });
      const st = res.inspectionResult?.indexStatusResult ?? {};
      property.inspection[url] = {
        verdict: st.verdict,
        coverageState: st.coverageState,
        indexingState: st.indexingState,
        robotsTxtState: st.robotsTxtState,
        lastCrawlTime: st.lastCrawlTime,
        pageFetchState: st.pageFetchState,
      };
    } catch (e) {
      property.inspection[url] = { error: String(e.message).slice(0, 200) };
    }
  }

  report.property = property;
  return report;
}

// ---------- human-readable output ----------
function printReport(r) {
  console.log(`GSC report — ${r.generatedAt} | last ${r.days} days`);
  console.log('properties:', r.properties.length);
  r.properties.forEach((p) => console.log(`  - ${p.siteUrl} (${p.permission})`));
  if (r.error) {
    console.error('\nERROR:', r.error);
    process.exitCode = 1;
    return;
  }
  const p = r.property;
  console.log(`\n=== ${p.siteUrl} | ${p.range.start} .. ${p.range.end}`);
  if (p.sitemaps?.length) {
    console.log('sitemaps:');
    p.sitemaps.forEach((s) => {
      console.log(`  ${s.path}`);
      console.log(`   submitted: ${s.lastSubmitted || '-'} | downloaded: ${s.lastDownloaded || '-'} | pending: ${s.pending} | errors: ${s.errors} | warnings: ${s.warnings}`);
    });
  } else {
    console.log('sitemaps: none or not readable', p.sitemapsError || '');
  }
  if (p.totals) {
    console.log(`\ntotals: clicks ${p.totals.clicks} | impressions ${p.totals.impressions} | ctr ${(p.totals.ctr * 100).toFixed(2)}% | avg pos ${p.totals.position}`);
  }
  const section = (title, rows) => {
    console.log(`\n${title}: ${rows.length} rows`);
    rows.forEach((row) => {
      const key = row.keys.join(' | ');
      console.log(`  ${key.slice(0, 90)} → clicks ${row.clicks}, impr ${row.impressions}, pos ${row.position}`);
    });
  };
  if (p.byQuery) section('top queries', p.byQuery);
  if (p.byPage) section('top pages', p.byPage);
  if (p.analyticsError) console.log('\nanalytics error:', p.analyticsError);
  if (p.inspection) {
    console.log('\nURL inspection:');
    Object.entries(p.inspection).forEach(([url, st]) => {
      console.log(`  ${url}`);
      if (st.error) return console.log('   error:', st.error);
      console.log(`   verdict: ${st.verdict} | coverage: ${st.coverageState}`);
      console.log(`   indexing: ${st.indexingState} | robots: ${st.robotsTxtState} | fetched: ${st.pageFetchState}`);
      console.log(`   lastCrawl: ${st.lastCrawlTime || '-'}`);
    });
  }
}

async function main() {
  const sa = loadServiceAccount(CRED_PATH);
  const token = await getAccessToken(sa);
  const report = await buildReport(token);
  if (AS_JSON) console.log(JSON.stringify(report, null, 2));
  else printReport(report);
}

main().catch((e) => {
  console.error('GSC report failed:', e.message);
  process.exitCode = 1;
});
