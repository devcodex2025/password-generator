#!/usr/bin/env node
/**
 * Affiliate conversion report: HasOffers/TUNE affiliate API, optionally cross-checked with GA4.
 *
 * Clicks and conversions both come from the network, so the conversion rate does not depend on
 * cookie consent, ad blockers, or GA4 sampling. GA4 is only used as a second opinion.
 *
 * Usage:
 *   npm run affiliate
 *   npm run affiliate -- --days=7 --json
 *   npm run affiliate -- --no-ga4
 *   npm run affiliate -- --by=date
 *
 * Env (read from .env.local / .env or the real environment):
 *   NORD_AFFILIATE_API_KEY      affiliate API key from the HasOffers panel (required)
 *   NORD_AFFILIATE_NETWORK_ID   default "nordvpn"
 *   NORD_AFFILIATE_ID           optional, only used for display
 *   GA4_CREDENTIALS / GSC_CREDENTIALS  service-account key for the click cross-check
 *   GA4_PROPERTY                optional GA4 property ID
 *
 * Join key: the sub-id written by resolveAffiliateUrl() — "gen-<locale>-<placement>" —
 * which the network stores as Stat.affiliate_info1.
 */
import { loadServiceAccount, getAccessToken, apiJson, resolvePropertyId, loadEnvFiles } from './lib/google-auth.mjs';

const args = process.argv.slice(2);
const getArg = (name, fallback = '') => {
  const hit = args.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.split('=').slice(1).join('=') : fallback;
};

loadEnvFiles(['.env.local', '.env']);

// Sub-id fields are only available for 548 days of history per the TUNE API.
const DAYS = Math.max(1, Math.min(540, Number(getArg('days', '28')) || 28));
const AS_JSON = args.includes('--json');
const WITH_GA4 = !args.includes('--no-ga4');
const NETWORK_ID = process.env.NORD_AFFILIATE_NETWORK_ID || 'nordvpn';
const API_KEY = process.env.NORD_AFFILIATE_API_KEY || '';
const AFFILIATE_ID = process.env.NORD_AFFILIATE_ID || '';
const API_BASE = process.env.HASOFFERS_API_BASE || 'https://api.hasoffers.com/Apiv3/json';
const CRED_PATH =
  process.env.GA4_CREDENTIALS ||
  process.env.GSC_CREDENTIALS ||
  '/home/karbi/.config/minebench-google-analytics/gsc-service-account.json';

const iso = (d) => d.toISOString().slice(0, 10);
const END = new Date();
const START = new Date(END.getTime() - DAYS * 86400000);

const LOCALES = ['en', 'ua', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'pl', 'vi'];
const CLICK_EVENTS = ['affiliate_outbound_click', 'nordpass_affiliate_click', 'nordvpn_affiliate_click'];
const OFFERS = { 488: 'NordPass', 15: 'NordVPN', 489: 'NordLocker', 754: 'NordPass Business' };

/** "gen-ua-breach-result" -> { locale: "ua", placement: "breach-result" } */
function parseSubId(value) {
  const raw = String(value || '');
  if (!raw) return { locale: '(none)', placement: '(no sub-id)' };
  if (!raw.startsWith('gen-')) return { locale: '(unknown)', placement: raw };
  const rest = raw.slice(4);
  const locale = LOCALES.find((l) => rest === l || rest.startsWith(`${l}-`));
  if (!locale) return { locale: '(unknown)', placement: rest };
  return { locale, placement: rest.slice(locale.length).replace(/^-/, '') || '(none)' };
}

async function hasOffers(params) {
  const url = new URL(API_BASE);
  url.searchParams.set('NetworkId', NETWORK_ID);
  url.searchParams.set('api_key', API_KEY);
  url.searchParams.set('Format', 'json');
  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) {
      for (const item of value) url.searchParams.append(`${key}[]`, item);
    } else {
      url.searchParams.set(key, value);
    }
  }

  const res = await fetch(url, {
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(30000),
  });
  const body = await res.json().catch(() => null);
  const response = body?.response;
  if (response?.status !== 1) {
    const message =
      response?.errorMessage?.message || response?.errorMessage || `HTTP ${res.status}`;
    throw new Error(String(message));
  }
  const data = response.data?.data ?? response.data ?? {};
  return Array.isArray(data) ? data : Object.values(data);
}

/** Aggregated clicks / conversions / payout, grouped by sub-id. */
async function fetchStats() {
  return (
    await hasOffers({
      Target: 'Affiliate_Report',
      Method: 'getStats',
      limit: '1000',
      'filters[Stat.date][conditional]': 'GREATER_THAN_OR_EQUAL_TO',
      'filters[Stat.date][values][]': iso(START),
      'sort[Stat.clicks]': 'DESC',
      fields: [
        'Stat.affiliate_info1',
        'Stat.affiliate_info2',
        'Stat.clicks',
        'Stat.conversions',
        'Stat.payout',
        'Stat.sale_amount',
      ],
    })
  ).map((row) => row.Stat || row);
}

/** Individual conversions, used for the approved / pending / rejected split. */
async function fetchConversions() {
  return (
    await hasOffers({
      Target: 'Affiliate_Report',
      Method: 'getConversions',
      limit: '500',
      page: '1',
      data_start: iso(START),
      data_end: iso(END),
      'filters[Stat.datetime][conditional]': 'GREATER_THAN_OR_EQUAL_TO',
      'filters[Stat.datetime][values][]': `${iso(START)} 00:00:00`,
      fields: [
        'Stat.id',
        'Stat.datetime',
        'Stat.conversion_status',
        'Stat.approved_payout',
        'Stat.sale_amount',
        'Stat.affiliate_info1',
        'Stat.offer_id',
        'Stat.currency',
      ],
    })
  ).map((row) => row.Stat || row);
}

async function fetchGa4Clicks() {
  const sa = loadServiceAccount(CRED_PATH);
  const token = await getAccessToken(sa, 'https://www.googleapis.com/auth/analytics.readonly');
  const propertyId = await resolvePropertyId(token);

  const report = await apiJson(
    token,
    `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
    {
      dateRanges: [{ startDate: `${DAYS}daysAgo`, endDate: 'today' }],
      dimensions: [{ name: 'customEvent:placement' }],
      metrics: [{ name: 'eventCount' }, { name: 'totalUsers' }],
      dimensionFilter: {
        filter: { fieldName: 'eventName', inListFilter: { values: CLICK_EVENTS } },
      },
      limit: 200,
    }
  );

  const byPlacement = {};
  for (const row of report.rows || []) {
    const placement = row.dimensionValues?.[0]?.value || '(not set)';
    byPlacement[placement] = Number(row.metricValues?.[0]?.value || 0);
  }
  return { propertyId, byPlacement };
}

function empty() {
  return { clicks: 0, conversions: 0, approved: 0, pending: 0, rejected: 0, payout: 0, sale: 0 };
}

function summarize(stats, conversions) {
  const buckets = {};
  const totals = empty();

  for (const row of stats) {
    const subId = String(row.affiliate_info1 ?? '');
    const key = subId || '(none)';
    buckets[key] ||= { subId, ...parseSubId(subId), ...empty() };
    const entry = buckets[key];
    const clicks = Number(row.clicks ?? 0) || 0;
    const conv = Number(row.conversions ?? 0) || 0;
    const payout = Number(row.payout ?? 0) || 0;
    const sale = Number(row.sale_amount ?? 0) || 0;

    entry.clicks += clicks;
    entry.conversions += conv;
    entry.payout += payout;
    entry.sale += sale;
    totals.clicks += clicks;
    totals.conversions += conv;
    totals.payout += payout;
    totals.sale += sale;
  }

  // status split comes from the conversion-level endpoint
  for (const conv of conversions) {
    const subId = String(conv.affiliate_info1 ?? '');
    const key = subId || '(none)';
    const entry = buckets[key] || (buckets[key] = { subId, ...parseSubId(subId), ...empty() });
    const status = String(conv.conversion_status ?? conv.status ?? '').toLowerCase();
    if (status === 'approved') {
      entry.approved += 1;
      totals.approved += 1;
    } else if (status === 'pending') {
      entry.pending += 1;
      totals.pending += 1;
    } else if (status === 'rejected') {
      entry.rejected += 1;
      totals.rejected += 1;
    }
  }

  const rollUp = (field) => {
    const out = {};
    for (const entry of Object.values(buckets)) {
      const key = entry[field] || '(none)';
      out[key] ||= { [field]: key, ...empty() };
      const target = out[key];
      for (const metric of ['clicks', 'conversions', 'approved', 'pending', 'rejected', 'payout', 'sale']) {
        target[metric] += entry[metric];
      }
    }
    return Object.values(out).map((row) => ({
      ...row,
      conversionRate: row.clicks ? (row.conversions / row.clicks) * 100 : null,
      epc: row.clicks ? row.payout / row.clicks : null,
    }));
  };

  return {
    totals: {
      ...totals,
      conversionRate: totals.clicks ? (totals.conversions / totals.clicks) * 100 : null,
      epc: totals.clicks ? totals.payout / totals.clicks : null,
    },
    bySubId: Object.values(buckets).map((row) => ({
      ...row,
      conversionRate: row.clicks ? (row.conversions / row.clicks) * 100 : null,
      epc: row.clicks ? row.payout / row.clicks : null,
    })),
    byPlacement: rollUp('placement'),
    byLocale: rollUp('locale'),
  };
}

async function main() {
  if (!API_KEY) {
    throw new Error(
      'NORD_AFFILIATE_API_KEY is not set.\n' +
        'Copy the API key from the affiliate panel into .env.local:\n' +
        '  NORD_AFFILIATE_API_KEY=...\n' +
        '  NORD_AFFILIATE_NETWORK_ID=nordvpn'
    );
  }

  const [stats, conversions] = await Promise.all([fetchStats(), fetchConversions()]);
  const summary = summarize(stats, conversions);

  let ga4 = null;
  if (WITH_GA4) {
    try {
      ga4 = await fetchGa4Clicks();
    } catch (e) {
      ga4 = { error: String(e.message).slice(0, 300) };
    }
  }

  const report = {
    generatedAt: new Date().toISOString(),
    days: DAYS,
    range: { start: iso(START), end: iso(END) },
    network: { id: NETWORK_ID, affiliateId: AFFILIATE_ID || null },
    totals: summary.totals,
    byPlacement: summary.byPlacement,
    byLocale: summary.byLocale,
    bySubId: summary.bySubId,
    ga4: ga4
      ? { propertyId: ga4.propertyId, clicksByPlacement: ga4.byPlacement, error: ga4.error }
      : null,
  };

  if (AS_JSON) {
    console.log(JSON.stringify(report, null, 2));
    return;
  }

  const money = (n) => `$${n.toFixed(2)}`;
  const pct = (n) => (n === null ? '-' : `${n.toFixed(2)}%`);
  console.log(
    `Affiliate report — ${report.generatedAt} | last ${DAYS} days (${report.range.start} .. ${report.range.end})`
  );
  console.log(`network: ${NETWORK_ID}${AFFILIATE_ID ? ` | affiliate ${AFFILIATE_ID}` : ''}`);
  const t = summary.totals;
  console.log(
    `totals: clicks ${t.clicks} | conversions ${t.conversions} | CR ${pct(t.conversionRate)} | ` +
      `payout ${money(t.payout)} | EPC ${t.epc === null ? '-' : money(t.epc)} | sale ${money(t.sale)}`
  );
  if (conversions.length) {
    console.log(`status: approved ${t.approved} | pending ${t.pending} | rejected ${t.rejected}`);
  }

  const table = (title, rows, label) => {
    console.log(`\n${title}:`);
    if (!rows.length) return console.log('  (no data in the window)');
    console.log(
      `  ${label.padEnd(34)} ${'clicks'.padStart(7)} ${'conv'.padStart(6)} ${'CR'.padStart(8)} ${'EPC'.padStart(8)} ${'payout'.padStart(10)}`
    );
    rows
      .sort((a, b) => b.clicks - a.clicks)
      .forEach((r) => {
        console.log(
          `  ${String(r[label]).padEnd(34)} ${String(r.clicks).padStart(7)} ${String(r.conversions).padStart(6)} ` +
            `${pct(r.conversionRate).padStart(8)} ${(r.epc === null ? '-' : money(r.epc)).padStart(8)} ${money(r.payout).padStart(10)}`
        );
      });
  };

  table('by placement (from sub-id)', summary.byPlacement, 'placement');
  table('by locale (from sub-id)', summary.byLocale, 'locale');
  table('by sub-id', summary.bySubId, 'subId');

  if (ga4?.error) console.log(`\nGA4 cross-check unavailable: ${ga4.error}`);
  if (ga4 && !ga4.error) {
    const ga4Total = Object.values(ga4.byPlacement || {}).reduce((a, b) => a + b, 0);
    console.log(
      `\nGA4 cross-check: ${ga4Total} click event(s) in the same window ` +
        `(property ${ga4.propertyId}) vs ${t.clicks} click(s) at the network.`
    );
    if (t.clicks > 0 && ga4Total === 0) {
      console.log(
        '  WARNING: GA4 recorded no affiliate clicks in this window — either the gtag event is not ' +
          'firing, or the clicks did not come from pages where GA4 is loaded.'
      );
    } else if (t.clicks > 0 && ga4Total < t.clicks * 0.5) {
      console.log('  WARNING: GA4 sees less than half of the network clicks (consent, blockers, or gaps).');
    }
  }

  const untracked = summary.byPlacement.find((r) => r.placement === '(no sub-id)');
  if (untracked && untracked.clicks > 0) {
    const share = t.clicks ? (untracked.clicks / t.clicks) * 100 : 0;
    console.log(
      `\nWARNING: ${untracked.clicks} click(s) (${share.toFixed(0)}%) carried no aff_sub — ` +
        'some outbound links bypass the affiliate registry.'
    );
  }
}

main().catch((e) => {
  console.error('Affiliate report failed:', e.message);
  process.exitCode = 1;
});
