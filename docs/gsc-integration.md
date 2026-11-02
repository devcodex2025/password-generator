# Google Search Console integration (service account)

Status: **working** (verified 2026-10-31) for property `sc-domain:generatepasswordto.me`.

## Why service account and not OAuth

An earlier OAuth `authorized_user` credential existed at
`~/.config/minebench-google-analytics/search-console-credentials.json`, but Google revoked
its refresh token (`invalid_grant: Token has been expired or revoked`) because the OAuth
client is in *Testing* mode (tokens die after 7 days). Service-account keys do not expire
and need no browser consent.

## Setup (already done)

1. Google Cloud project `generatepassword-513319` — **Google Search Console API** enabled.
2. Service account `gsc-reporting@generatepassword-513319.iam.gserviceaccount.com`
   with a JSON key at `~/.config/minebench-google-analytics/gsc-service-account.json`
   (WSL, `chmod 600`, never committed).
3. Search Console → `sc-domain:generatepasswordto.me` → Settings → Users and permissions →
   the service-account email added with **Full** permission (`siteFullUser`).

## Usage

```powershell
# Windows: point the script at the WSL key through the UNC path
$env:GSC_CREDENTIALS='C:\path\to\service-account.json'

npm run gsc                    # 28-day report: sitemaps, totals, top queries/pages, URL inspection
npm run gsc -- --days=7        # shorter window
npm run gsc -- --json          # machine-readable output
npm run gsc -- --submit        # also resubmit the sitemap (needs read-write webmasters scope)
```

Auth: the script signs a JWT with the service-account private key and exchanges it for an
access token (`urn:ietf:params:oauth:grant-type:jwt-bearer`). No npm dependencies.
Default scope is `webmasters.readonly`; `--submit` requests `webmasters` for the sitemap PUT.

## Notes

- Search Console data lags 2–3 days; a brand-new page shows `NEUTRAL / Crawled - currently
  not indexed` until Google re-crawls and decides to index it.
- The URL Inspection API is **read-only**: requesting indexing for individual URLs has to be
  done in the Search Console UI (URL Inspection → Request indexing). The API is used here to
  read verdict/coverage/crawl state.
- Quotas: URL Inspection 2000/day per property, search analytics generous. The report uses
  three analytics calls + two inspections.

## Baseline 2026-10-31 (period 2026-10-03 .. 2026-10-31)

- Property: `sc-domain:generatepasswordto.me`, permission `siteFullUser`
- Sitemap `https://www.generatepasswordto.me/sitemap.xml`: 0 errors, 0 warnings;
  previous download 2026-03-27 (resubmitted via API on 2026-10-31)
- Totals: 1 click, 5 impressions, CTR 20 %, avg position 1.2 (statistically meaningless —
  domain was NXDOMAIN for most of the period)
- URL inspection:
  - `https://www.generatepasswordto.me/` — PASS, `Submitted and indexed`, crawled 2026-10-31
  - `https://www.generatepasswordto.me/ua` — NEUTRAL, `Crawled - currently not indexed`,
    last crawl 2026-06-03 (stale, pre-restoration)
