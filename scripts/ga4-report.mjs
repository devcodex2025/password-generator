#!/usr/bin/env node
/**
 * Google Analytics 4 report + conversion funnel (zero dependencies, service-account JWT auth).
 *
 * Usage:
 *   GA4_CREDENTIALS=/path/to/service-account.json npm run ga4
 *   npm run ga4 -- --days=7 --json
 *   npm run ga4 -- --funnel --by=customEvent:ui_language
 *
 * Env:
 *   GA4_CREDENTIALS  path to the service-account JSON key (never commit it)
 *   GSC_CREDENTIALS  used as a fallback when GA4_CREDENTIALS is not set
 *   GA4_PROPERTY     optional property ID ("505938758"), otherwise auto-discovered
 *
 * Output: totals, channels, top pages, events, key events, and the
 * page_view -> password_generated -> password_copied -> affiliate click funnel.
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
const WITH_FUNNEL = args.includes('--funnel') || args.includes('--all');
const BREAKDOWN = getArg('by', '');
const CRED_PATH =
  process.env.GA4_CREDENTIALS ||
  process.env.GSC_CREDENTIALS ||
  '/home/karbi/.config/minebench-google-analytics/gsc-service-account.json';
const PROPERTY_ARG = (process.env.GA4_PROPERTY || getArg('property', '')).replace(/^properties\//, '');

const ADMIN = 'https://analyticsadmin.googleapis.com/v1beta';
const DATA = 'https://analyticsdata.googleapis.com/v1beta';
const DATA_ALPHA = 'https://analyticsdata.googleapis.com/v1alpha';

const b64url = (data) =>
  Buffer.from(data)
    .toString('base64')
    .replace(/=+$/, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

function loadServiceAccount(path) {
  if (!fs.existsSync(path)) {
    throw new Error(
      `credential file not found: ${path}\n` +
        'Set GA4_CREDENTIALS to the service-account key, e.g.\n' +
        '  PowerShell: $env:GA4_CREDENTIALS="\\\\wsl.localhost\\Ubuntu\\home\\<user>\\.config\\minebench-google-analytics\\gsc-service-account.json"'
    );
  }
  const sa = JSON.parse(fs.readFileSync(path, 'utf8'));
  if (sa.type !== 'service_account') {
    throw new Error(
      `credential type is "${sa.type}", expected "service_account". ` +
        'OAuth authorized_user tokens expire/revoke — use a service-account key.'
    );
  }
  return sa;
}

async function getAccessToken(sa, scope) {
  const now = Math.floor(Date.now() / 1000);
  const tokenUri = sa.token_uri || 'https://oauth2.googleapis.com/token';
  const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claims = b64url(
    JSON.stringify({ iss: sa.client_email, scope, aud: tokenUri, iat: now, exp: now + 3600 })
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

async function api(token, url, body) {
  const res = await fetch(url, {
    method: body ? 'POST' : 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(30000),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`HTTP ${res.status} ${text.slice(0, 400)}`);
  return text ? JSON.parse(text) : {};
}

async function resolveProperty(token) {
  if (PROPERTY_ARG) return { id: PROPERTY_ARG, displayName: '', measurementId: '', source: 'env' };

  const { accountSummaries = [] } = await api(token, `${ADMIN}/accountSummaries?pageSize=200`);
  const properties = accountSummaries.flatMap((a) => a.propertySummaries || []);
  if (!properties.length) {
    throw new Error(
      'no GA4 properties visible to this service account. ' +
        'Add the service-account email as Viewer/Editor in GA4 → Admin → Property access management.'
    );
  }
  const chosen =
    properties.find((p) => /generatepasswordto/i.test(p.displayName)) || properties[0];
  const id = chosen.property.replace('properties/', '');

  let measurementId = '';
  try {
    const { dataStreams = [] } = await api(token, `${ADMIN}/properties/${id}/dataStreams?pageSize=50`);
    measurementId = dataStreams.find((s) => s.webStreamData?.measurementId)?.webStreamData.measurementId || '';
  } catch {
    /* streams are optional for reporting */
  }

  return { id, displayName: chosen.displayName, measurementId, source: 'discovered' };
}

const runReport = (token, propertyId, body) =>
  api(token, `${DATA}/properties/${propertyId}:runReport`, body);

const table = (report) => ({
  dimensions: (report.dimensionHeaders || []).map((h) => h.name),
  metrics: (report.metricHeaders || []).map((h) => h.name),
  rows: (report.rows || []).map((r) => ({
    dimensions: (r.dimensionValues || []).map((v) => v.value),
    metrics: (r.metricValues || []).map((v) => v.value),
  })),
});

async function safeReport(token, propertyId, body) {
  try {
    return table(await runReport(token, propertyId, body));
  } catch (e) {
    return { error: String(e.message).slice(0, 300) };
  }
}

async function buildFunnel(token, propertyId) {
  const step = (eventName) => ({ funnelEventFilter: { eventName } });
  const body = {
    dateRanges: [{ startDate: `${DAYS}daysAgo`, endDate: 'today' }],
    funnel: {
      isOpenFunnel: false,
      steps: [
        { name: 'Landing', filterExpression: step('page_view') },
        { name: 'Generated', filterExpression: step('password_generated') },
        { name: 'Copied', filterExpression: step('password_copied') },
        {
          name: 'Affiliate click',
          filterExpression: {
            orGroup: {
              expressions: [
                { funnelEventFilter: { eventName: 'nordpass_affiliate_click' } },
                { funnelEventFilter: { eventName: 'nordvpn_affiliate_click' } },
              ],
            },
          },
        },
      ],
    },
    ...(BREAKDOWN ? { funnelBreakdown: { breakdownDimension: { name: BREAKDOWN } } } : {}),
  };
  try {
    const res = await api(token, `${DATA_ALPHA}/properties/${propertyId}:runFunnelReport`, body);
    return table(res.funnelTable || {});
  } catch (e) {
    return { error: String(e.message).slice(0, 300) };
  }
}

async function buildReport(token) {
  const property = await resolveProperty(token);
  const id = property.id;
  const range = { startDate: `${DAYS}daysAgo`, endDate: 'today' };

  const totals = await safeReport(token, id, {
    dateRanges: [range],
    metrics: [
      { name: 'sessions' },
      { name: 'totalUsers' },
      { name: 'engagedSessions' },
      { name: 'screenPageViews' },
      { name: 'eventCount' },
      { name: 'keyEvents' },
    ],
  });

  const [channels, pages, events, keyEvents, landing] = await Promise.all([
    safeReport(token, id, {
      dateRanges: [range],
      dimensions: [{ name: 'sessionDefaultChannelGroup' }],
      metrics: [{ name: 'sessions' }, { name: 'engagedSessions' }],
      orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
      limit: 15,
    }),
    safeReport(token, id, {
      dateRanges: [range],
      dimensions: [{ name: 'pagePath' }],
      metrics: [{ name: 'screenPageViews' }, { name: 'totalUsers' }],
      orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
      limit: 15,
    }),
    safeReport(token, id, {
      dateRanges: [range],
      dimensions: [{ name: 'eventName' }],
      metrics: [{ name: 'eventCount' }, { name: 'totalUsers' }],
      orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }],
      limit: 40,
    }),
    safeReport(token, id, {
      dateRanges: [range],
      dimensions: [{ name: 'eventName' }],
      metrics: [{ name: 'keyEvents' }, { name: 'totalUsers' }],
      orderBys: [{ metric: { metricName: 'keyEvents' }, desc: true }],
      limit: 20,
    }),
    safeReport(token, id, {
      dateRanges: [range],
      dimensions: [{ name: 'landingPagePlusQueryString' }],
      metrics: [{ name: 'sessions' }, { name: 'engagedSessions' }],
      orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
      limit: 15,
    }),
  ]);

  const funnel = WITH_FUNNEL ? await buildFunnel(token, id) : null;

  return {
    generatedAt: new Date().toISOString(),
    days: DAYS,
    property,
    totals,
    channels,
    landingPages: landing,
    pages,
    events,
    keyEvents,
    funnel,
  };
}

// ---------- data-quality checks ----------
function checks(r) {
  const out = [];
  const count = (name) =>
    Number(r.events?.rows?.find((row) => row.dimensions[0] === name)?.metrics[0] || 0);

  const generated = count('password_generated');
  const copied = count('password_copied');

  if (generated > 0 && copied === 0) {
    out.push(
      `password_generated=${generated}, but password_copied=0 — the copy event is not reaching GA4 ` +
        '(consent, ad blocker, or the button handler changed).'
    );
  }
  if (r.totals?.rows?.[0]) {
    const [, users, , , , keyEvents] = r.totals.rows[0].metrics.map(Number);
    if (users < 50) out.push('Fewer than 50 users in the window — treat rates as noise, not trends.');
    if (keyEvents === 0) out.push('No key events recorded in the window.');
  }
  if (r.totals?.error) out.push(`totals report failed: ${r.totals.error}`);

  return out;
}

// ---------- human-readable output ----------
function printReport(r) {
  console.log(`GA4 report — ${r.generatedAt} | last ${r.days} days`);
  console.log(
    `property: ${r.property.id}${r.property.displayName ? ` (${r.property.displayName})` : ''}` +
      `${r.property.measurementId ? ` | ${r.property.measurementId}` : ''}`
  );

  if (r.totals?.rows?.[0]) {
    const [sessions, users, engaged, views, events, keyEvents] = r.totals.rows[0].metrics.map(Number);
    const rate = sessions ? ((engaged / sessions) * 100).toFixed(1) : '0.0';
    console.log(
      `\ntotals: sessions ${sessions} | users ${users} | engaged ${engaged} (${rate}%) | ` +
        `views ${views} | events ${events} | key events ${keyEvents}`
    );
  } else if (r.totals?.error) {
    console.log('\ntotals error:', r.totals.error);
  }

  const section = (title, t, metricLabels) => {
    if (!t) return;
    if (t.error) return console.log(`\n${title}: ${t.error}`);
    console.log(`\n${title}: ${t.rows.length} rows`);
    t.rows.forEach((row) => {
      console.log(`  ${row.dimensions.join(' | ').slice(0, 80)} → ${row.metrics.join(' / ')}`);
    });
    if (metricLabels) console.log(`  (order: ${metricLabels})`);
  };

  section('channels', r.channels, 'sessions / engaged');
  section('landing pages', r.landingPages, 'sessions / engaged');
  section('pages', r.pages, 'views / users');
  section('events', r.events, 'count / users');
  section('key events', r.keyEvents, 'key events / users');

  if (r.funnel) {
    if (r.funnel.error) {
      console.log('\nfunnel:', r.funnel.error);
    } else {
      console.log('\nfunnel (closed, starts at page_view):');
      r.funnel.rows.forEach((row) => {
        console.log(`  ${row.dimensions.join(' | ').slice(0, 80)} → ${row.metrics.join(' / ')}`);
      });
    }
  }

  const issues = checks(r);
  if (issues.length) {
    console.log('\nwarnings:');
    issues.forEach((i) => console.log('  -', i));
  }
}

async function main() {
  const sa = loadServiceAccount(CRED_PATH);
  const token = await getAccessToken(sa, 'https://www.googleapis.com/auth/analytics.readonly');
  const report = await buildReport(token);
  if (AS_JSON) console.log(JSON.stringify(report, null, 2));
  else printReport(report);
}

main().catch((e) => {
  console.error('GA4 report failed:', e.message);
  process.exitCode = 1;
});
