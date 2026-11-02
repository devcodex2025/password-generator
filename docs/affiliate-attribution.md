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
npm run affiliate                  # 28-day window, network + GA4 cross-check
npm run affiliate -- --days=7
npm run affiliate -- --days=90
npm run affiliate -- --json
npm run affiliate -- --no-ga4       # skip the GA4 cross-check
```

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

## Phase 2 — sales inside GA4 (optional, heavier)

Prerequisites: unique click id, server-side storage for the click → GA4 `client_id` mapping, and
the Measurement Protocol secret.

1. Put a unique id in `aff_sub2` (`gp_<random>`), keep the readable bucket in `aff_sub`.
2. On click, `POST /api/affiliate/click` with `{ clickId, clientId, placement, locale }`; store
   with a TTL of ~60 days.
3. Pull conversions, look up the client id, send a `purchase` event with `transaction_id` =
   conversion id, `value` = payout, `currency` = USD.
4. GA4 deduplicates on `transaction_id`, so re-running is safe.

Hard limit: the Measurement Protocol accepts events backdated at most **72 hours**. Later
conversions can be counted offline but cannot be inserted into the original GA4 session. That is
why the network report stays the source of truth for revenue.

Privacy: the mapping stores a pseudonymous GA4 client id and click metadata only. No emails, no
passwords, no newsletter data. Nothing that identifies a person, and nothing beyond the click
registration is exposed publicly.
