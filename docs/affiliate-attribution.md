# Affiliate attribution — closing the sales loop

Status: **working 2026-11-02.** API access confirmed, first real report produced.

## Why GA4 cannot do this alone

GA4 sees what happens on `generatepasswordto.me`. The sale happens on `nordpass.com` or in the
NordPass checkout. There is no native GA4 connector to the affiliate network, so "linking GA4 to
the affiliate cabinet" means joining the two datasets on a shared key.

The key already exists: `resolveAffiliateUrl()` appends `aff_sub=gen-<locale>-<placement>` to every
outbound affiliate URL. HasOffers stores it as `Stat.affiliate_info1` on every click and conversion.

```
network clicks (Stat.clicks)  ──┐
                                ├─►  CR = conversions / clicks
network conversions ────────────┘     EPC = payout / clicks
```

Both sides come from the network, so the rate does not depend on cookie consent, ad blockers, or
GA4 sampling. GA4 is used only as a cross-check — and it currently disagrees (see below).

## Network access

HasOffers/TUNE, network `nordvpn`, affiliate `146616` ("Generate Password"). The key lives in
`.env.local` (gitignored):

```text
NORD_AFFILIATE_API_KEY=...
NORD_AFFILIATE_NETWORK_ID=nordvpn
NORD_AFFILIATE_ID=146616
```

The script never prints the key. Rotate it in the panel if it ever leaks.

## Usage

```powershell
npm.cmd run affiliate                  # 28-day window, network + GA4 cross-check
npm.cmd run affiliate -- --days=7
npm.cmd run affiliate -- --days=90
npm.cmd run affiliate -- --json
npm.cmd run affiliate -- --no-ga4       # skip the GA4 cross-check
```

On Windows PowerShell use `npm.cmd`: the `npm.ps1` shim silently drops arguments after `--`.

Output: totals (clicks, conversions, CR, payout, EPC), approved/pending/rejected split when
conversions exist, breakdown by placement, by locale and by raw sub-id, plus warnings for
untracked clicks and GA4 mismatches.

The sub-id fields are limited to **548 days** of history by the TUNE API, so `--days` is capped at
540.

## Findings, 2026-11-02

28-day window, 2026-10-05 .. 2026-11-02:

| Metric | Value |
|---|---|
| Network clicks | 56 (38 with sub-id, 18 without) |
| Conversions | 0 |
| GA4 affiliate click events | 0 |
| GA4 sessions in the same window | 5 |

Three problems surfaced:

1. **47% of clicks had no `aff_sub`.** Hard-coded affiliate URLs inside
   `src/content/articles/vpn-security-privacy-guide.ts` bypassed the link registry. Fixed:
   `renderGuideTextWithLinks()` now appends `aff_sub=gen-<locale>-guide-<slug>` and marks those
   links `rel="sponsored"`.
2. **GA4 recorded zero affiliate clicks.** Verified in the browser on 2026-11-02: `gtag` loads,
   consent grants, and a promo click sends `en=nordpass_affiliate_click` to
   `region1.google-analytics.com/g/collect`. The gap was the prose links — they had no handler at
   all. Fixed with `AffiliateOutboundTracker`, which fires `affiliate_outbound_click` for every
   outbound affiliate link, including plain article links.
3. **Zero sales.** Expected at this traffic level; nothing to optimise until clicks convert.

## Review date

First meaningful CR comparison: **2026-12-02**, once the fix has 30 days of clicks behind it.

```powershell
npm run affiliate -- --days=30
npm run ga4 -- --days=30 --funnel
```

Compare by `placement` and by `locale`. Ignore any row with fewer than ~50 clicks — at current
volume the difference between 1 sale and 0 is noise, not a signal.

## Limitations to keep in mind

- **Approved ≠ sold.** NordPass holds conversions pending for a refund window. Report on
  `approved`; pending numbers move.
- **Click and conversion windows differ.** Clicks are counted at click time, conversions when the
  advertiser confirms them. Short windows undercount conversions — use 30+ days.
- **Bucket-level attribution.** `aff_sub` is per locale + placement, not per visitor. Two visitors
  from the same placement share a bucket. Enough for CR and EPC by placement, not for per-visitor
  journeys.
- **No GA4 revenue.** Sales stay outside GA4 unless purchase events are pushed back with the
  Measurement Protocol.

## Phase 2 — sales inside GA4 (implemented 2026-11-02)

GA4 now receives a `purchase` event for every approved conversion, with revenue in the property.

**How the join works without a database**

1. On every outbound affiliate click, `AffiliateOutboundTracker` reads the GA4 client id from the
   `_ga` cookie (only when analytics consent is granted) and appends it as `aff_sub2`.
2. The network stores it and returns it on the conversion as `Stat.affiliate_info2`.
3. `runAffiliateSync()` reads approved conversions, maps `aff_sub2 → client_id`, and posts a
   Measurement Protocol `purchase` with `transaction_id` = `aff-<conversion id>`.

**Where the code lives**

| Piece | File |
|---|---|
| Click id injection + click event | `src/components/affiliate/AffiliateOutboundTracker.tsx` |
| Conversion → GA4 mapping | `src/lib/affiliate/sync.ts` |
| Endpoint (auth: `CRON_SECRET`) | `src/app/api/affiliate/sync/route.ts` |
| Daily cron (05:00 UTC) | `vercel.json` |
| Manual trigger | `npm.cmd run affiliate:sync` |

**Required environment variables (Vercel + `.env.local`)**

```text
NORD_AFFILIATE_API_KEY=...
NORD_AFFILIATE_NETWORK_ID=nordvpn
GA4_MEASUREMENT_ID=G-0D1YR3HRJD
GA4_MP_API_SECRET=...          # GA4 → Admin → Data streams → Measurement Protocol API secrets
CRON_SECRET=...                # any long random string
```

The Measurement Protocol secret for this property is `affiliate-purchase-sync`; the value is in
`.env.local`. All five variables are configured for Production and Preview in Vercel
(2026-11-02); the cron is registered at 05:00 UTC and the endpoint returns 401 without the bearer
token and 200 with it.

**Manual run**

```powershell
npm.cmd run affiliate:sync                 # last 30 days, live
npm.cmd run affiliate:sync -- --validate   # GA4 validation endpoint, writes nothing
npm.cmd run affiliate:sync -- --dry        # list what would be sent
```

**Limits that remain**

- Only `approved` conversions are sent. Pending ones are created later; rejected ones never.
- `value` is the **affiliate payout**, not the customer's purchase amount.
- Measurement Protocol accepts backdating up to **72 hours**; later conversions are recorded with
  the sync timestamp instead of the original one.
- The GA4 client id is shared with the affiliate network as `aff_sub2` (pseudonymous, no PII). The
  privacy policy must disclose this; update it before relying on the numbers.
- If the visitor denied analytics consent, no client id exists and the conversion stays offline.
