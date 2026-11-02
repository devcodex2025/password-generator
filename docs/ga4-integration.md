# Google Analytics 4 integration

Status: **read access verified 2026-11-02**, funnel instrumentation updated same day.

## Property

| Field | Value |
|---|---|
| Property | `505938758` — "Generate Password To Me" |
| Account | `232155024` |
| Web stream | `G-0D1YR3HRJD` — `https://www.generatepasswordto.me` |
| Time zone / currency | Europe/Kiev / USD |
| Data retention | **14 months** (was 2 months until 2026-11-02) |

`NEXT_PUBLIC_GA_ID` is set in Vercel: events land in this property. The `G-22LZX0XFLM` tag in
`public/index.html` is a leftover from the static export and points at a different property; that
file is not used by the Next app router.

## Access model

A service account is used, not OAuth. The earlier
`ga4-credentials.json` (`authorized_user`) is dead — its refresh token was revoked because the
OAuth client sits in *Testing* mode.

1. Cloud project `generatepassword-513319` (number `972940333648`):
   - **Analytics Data API** enabled — reports, funnel reports.
   - **Analytics Admin API** enabled — key events, custom dimensions, retention, streams.
2. Service account `gsc-reporting@generatepassword-513319.iam.gserviceaccount.com`
   added to the property as **Administrator** (temporarily, to configure the funnel).
3. Key file stays outside the repo:
   `~/.config/minebench-google-analytics/gsc-service-account.json` (WSL, `chmod 600`).

Recommended follow-up: downgrade the service account to **Viewer** once configuration settles.
Reading reports and funnels only needs `analytics.readonly`; writes need `analytics.edit`.

## What is configured

Event-scoped custom dimensions (`customEvent:<parameter>` in Data API):

| Parameter | Meaning |
|---|---|
| `mode` | `random` / `pin` / `words` |
| `standard` | password standard preset |
| `ui_language` | visitor language of the page |
| `surface` | `home` now, room for embedded widgets |
| `network` | share network |
| `type` | share copy type |
| `placement` | affiliate CTA placement |

Key events (conversions): `password_generated`, `password_copied`,
`nordpass_affiliate_click`. Marking is not retroactive — counts start from the change, and the
Key events column can take up to 24 h to appear in reports. The default `purchase` key event is
left untouched; it never fires on this site.

## Event schema (code)

| Event | Parameters |
|---|---|
| `password_generated` | `mode`, `length`, `standard` (random/pin modes), `ui_language`, `surface` |
| `passwords_generated_batch` | `count`, `length`, `mode`, `ui_language`, `surface` |
| `password_copied` | `index`, `ui_language`, `surface` |
| `passwords_copied_all` | `count`, `ui_language`, `surface` |
| `passwords_downloaded` | `count`, `ui_language`, `surface` |
| `share_click` | `network`, `language` |
| `share_copy` | `type`, `language` |
| `nordpass_affiliate_click` | `placement`, `ui_language`, `offer`, `value`, `currency` |
| `nordvpn_affiliate_click` | `placement`, `ui_language`, `event_label` |
| `affiliate_outbound_click` | `product`, `placement`, `ui_language`, `affiliate_offer_id` — every outbound affiliate click, including plain prose links |

`length` means characters for random/PIN modes and word count for passphrase mode.

## Usage

```powershell
$env:GA4_CREDENTIALS='\\wsl.localhost\Ubuntu\home\<user>\.config\minebench-google-analytics\gsc-service-account.json'

npm.cmd run ga4                    # 28-day report
npm.cmd run ga4 -- --days=7        # shorter window
npm.cmd run ga4 -- --funnel        # add the conversion funnel
npm.cmd run ga4 -- --json          # machine-readable output
npm.cmd run ga4 -- --funnel --by=customEvent:ui_language
```

On Windows PowerShell use `npm.cmd`, not `npm`: the `npm.ps1` shim silently drops arguments
after `--`. `GA4_CREDENTIALS` is read from `.env.local` when it is not in the environment.

The script reports totals, channels, landing pages, top pages, events, key events, the funnel
`page_view → password_generated → password_copied → affiliate click`, and data-quality warnings.

## Funnel caveats

- A funnel is a query, not a saved object in GA4. The script builds it through
  `analyticsdata.googleapis.com/v1alpha:runFunnelReport`; the UI equivalent is an Exploration.
- Custom dimensions and key events need up to 24 h before they appear in reports.
- Consent Mode v2 default-denies analytics; sessions without consent are modeled at best, so
  event counts are a floor, not a ceiling.

## AdSense

- GA4 monetization metrics (`publisherAdClicks`, `publisherAdImpressions`, `totalAdRevenue`) are
  accepted by the API but return no rows — consistent with an unapproved AdSense account and no
  ad serving yet.
- The GA4 ↔ AdSense product link is UI-only (no Admin API resource). GA4 → Admin → Product links
  → AdSense links. Requires Administrator on both sides.
- The **AdSense Management API** is separate: `adsense.googleapis.com` is not enabled, and it is
  an OAuth API — service accounts are not a supported path. It needs an OAuth client in
  *Production* mode (a *Testing* client revokes refresh tokens after 7 days, which is exactly what
  killed the old GA4 credential).
