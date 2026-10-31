# GSC historical analysis — generatepasswordto.me (2025-07-01 … 2026-10-31)

Source: Search Console API (`searchAnalytics.query`, `dataState=all`), property
`sc-domain:generatepasswordto.me`. Totals over the window: **0 clicks / 801 impressions**
(clicks by device: desktop 3, mobile 0, tablet 0 — the per-page totals include a few rows
counted separately).

## Monthly impressions

| Month | Impressions |
|---|---|
| 2025-08 | 42 |
| 2025-09 | **563** (peak) |
| 2025-10 | 16 |
| 2025-11 | 31 |
| 2025-12 | 1 |
| 2026-01 | 2 |
| 2026-02 | 4 |
| 2026-03 | 123 |
| 2026-04 | 106 |
| 2026-05 | 86 |
| 2026-06 | 81 |
| 2026-07 | 50 |
| 2026-08 | 0 |
| 2026-09 | 1 |
| 2026-10 | 5 |

Interpretation: the site had two weak visibility windows (Sep 2025, Mar–Jul 2026) and then
went dark (domain NXDOMAIN from ~Aug 2026) until restoration on 2026-10-31. Historical
positions were mostly 76–98 — the site was never actually ranking, only occasionally shown.

## Pages in history — apex vs www

Google indexed and served **apex** URLs (`https://generatepasswordto.me/...`), not `www`:

| Historical URL | Impressions | Avg position |
|---|---|---|
| `https://generatepasswordto.me/ru` | 420 | 84.8 |
| `https://generatepasswordto.me/` | 79 | 83.4 |
| `https://generatepasswordto.me/it` | 79 | 65.6 |
| `https://generatepasswordto.me/ua` | 34 | 5.6 |
| `https://generatepasswordto.me/de` | 13 | 57.5 |
| `https://generatepasswordto.me/en` | 8 | 3.4 |
| `https://generatepasswordto.me/fr` | 9 | 26.4 |
| `https://generatepasswordto.me/es` | 7 | 40.6 |

Now apex 301-redirects to `https://www.generatepasswordto.me/...` and canonical points to
www. Google will consolidate these signals on the www URLs; no manual action needed.
Interesting: `ua` (pos 5.6), `en` (pos 3.4) and `pt/pl/zh` (pos ~4) had strong *positions*
with tiny impression counts — likely brand/very narrow queries.

## Soft-404 garbage URLs that were indexed

| URL | Impressions | Status before fix |
|---|---|---|
| `/` + `{search_term_string}` | 6 | **200** (rendered as a locale) |
| `/{search_term_string}/guides/pci-dss-password-requirements` | 4 | **200** |
| `/{search_term_string}/guides/what-to-do-after-password-breach` | 1 | **200** |
| `/{search_term_string}` variants | 3 | **200** |

Cause: the `[locale]` segment accepted *any* string (no `dynamicParams = false`), so every
`/{anything}` URL rendered a page with a self-canonical → infinite soft-404 space and wasted
crawl budget. Fixed on 2026-10-31 by setting `dynamicParams = false` on the `[locale]`
segment and on `[locale]/guides/[slug]`; unknown values now return a real 404.

## Queries observed (all positions 76–98, i.e. not ranking)

- Multilingual long-tail: `comment créer un mot de passe fort` (95.5),
  `como criar uma senha forte` (95.7), `cómo crear contraseñas seguras` (97),
  `generate password` (74 impressions, 79.8).
- Brand-adjacent: `generapassword` (13 impressions, position **17.8** — best observed).
- German niche: `empfohlener passphrasen-generator für starke passwörter` (6 impressions,
  position **4.7**) — again points at the passphrase gap identified in
  `keyword-strategy-2026-10-31.md`.
- Cyrillic typed in the wrong keyboard layout (`cutybhbhjdfnm gfhjkm`) — real user behavior,
  no action.
- Countries: Ukraine 175 impressions, Albania 146 (0 clicks, likely bot traffic),
  Canada 21 (1 click), Argentina 39.
- Devices: desktop 917 impressions, mobile 191, tablet 3 — historically almost no mobile
  engagement (now improved after the mobile CTA fixes).

## Takeaways

1. The domain has **almost no ranking history**: 801 impressions and ~3 clicks in 15 months.
   There is nothing to "recover" — growth must come from the new content/technical work.
2. Apex → www consolidation is the only historical-signal task; it is already handled by the
   301 redirect + canonical.
3. The soft-404 fix removes the thin-content URLs Google had indexed and focuses crawl budget
   on the 205 real pages.
4. Two demand signals survived review: passphrase/"words" generator and length-specific
   queries — both are in the prioritized keyword plan.
