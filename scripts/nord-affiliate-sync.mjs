#!/usr/bin/env node
/**
 * Nord affiliate (HasOffers / TUNE) sync.
 *
 *   node scripts/nord-affiliate-sync.mjs           # summary
 *   node scripts/nord-affiliate-sync.mjs --json    # also write .nord-offers.json
 *
 * Reads NORD_AFFILIATE_API_KEY / NORD_AFFILIATE_NETWORK_ID from the environment
 * or .env.local. The key is never printed or written to any tracked file.
 */

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const ENV_LOCAL = path.join(ROOT, '.env.local');

function loadEnvLocal() {
  if (!fs.existsSync(ENV_LOCAL)) return;
  for (const line of fs.readFileSync(ENV_LOCAL, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (match && !process.env[match[1]]) {
      process.env[match[1]] = match[2].replace(/^["']|["']$/g, '').trim();
    }
  }
}

loadEnvLocal();

const networkId = process.env.NORD_AFFILIATE_NETWORK_ID || 'nordvpn';
const apiKey = process.env.NORD_AFFILIATE_API_KEY;
const affId = process.env.NORD_AFFILIATE_ID || '146616';

if (!apiKey) {
  console.error(`NORD_AFFILIATE_API_KEY missing. Add it to ${ENV_LOCAL}`);
  process.exit(2);
}

async function callApi(params) {
  const url = new URL('https://api.hasoffers.com/Apiv3/json');
  url.searchParams.set('NetworkId', networkId);
  url.searchParams.set('api_key', apiKey);
  url.searchParams.set('Format', 'json');
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);

  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  const body = await res.json().catch(() => null);
  const response = body?.response;
  if (response?.status !== 1) {
    throw new Error(response?.errorMessage || `HTTP ${res.status}`);
  }
  const data = response.data?.data ?? response.data ?? {};
  return Array.isArray(data) ? data : Object.values(data);
}

const offers = await callApi({ Target: 'Affiliate_Offer', Method: 'findAll', limit: '200' });

const urls = [];
for (let page = 1; page <= 20; page += 1) {
  const batch = await callApi({
    Target: 'Affiliate_OfferUrl',
    Method: 'findAll',
    limit: '1000',
    page: String(page),
  });
  urls.push(...batch.map((row) => row.OfferUrl ?? row));
  if (batch.length < 1000) break;
}

const normalizedOffers = offers.map((row) => {
  const o = row.Offer ?? row;
  return {
    id: String(o.id),
    name: o.name,
    status: o.status,
    payoutType: o.payout_type,
    payout: o.default_payout,
    percentPayout: o.percent_payout,
    currency: o.currency,
    previewUrl: o.preview_url,
    approvalStatus: o.approval_status,
    linkPlatform: o.link_platform,
  };
});

const normalizedUrls = urls.map((u) => ({
  urlId: String(u.id),
  offerId: String(u.offer_id),
  name: u.name,
  status: u.status,
  landing: u.preview_url,
}));

const offerCounts = normalizedUrls.reduce((acc, url) => {
  acc[url.offerId] = (acc[url.offerId] || 0) + 1;
  return acc;
}, {});

console.log(`network: ${networkId} | aff_id: ${affId}`);
console.log(`offers: ${normalizedOffers.length} | landings: ${normalizedUrls.length}\n`);
console.log('ID    STATUS  LANDINGS  PAYOUT            NAME');
console.log('----  ------  --------  ----------------  ----------------------------------------');
for (const offer of normalizedOffers) {
  const payout = offer.percentPayout ? `${offer.percentPayout}%` : offer.payout ?? '-';
  console.log(
    [
      offer.id.padEnd(4),
      String(offer.status).padEnd(6),
      String(offerCounts[offer.id] ?? 0).padEnd(8),
      String(payout).padEnd(16),
      (offer.name || '').slice(0, 40),
    ].join('  ')
  );
}

if (process.argv.includes('--json')) {
  const out = path.join(ROOT, '.nord-offers.json');
  fs.writeFileSync(
    out,
    JSON.stringify({ fetchedAt: new Date().toISOString(), networkId, affId, offers: normalizedOffers, urls: normalizedUrls }, null, 2)
  );
  console.log(`\nwrote ${path.relative(ROOT, out)} (gitignored)`);
}
