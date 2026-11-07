# Indexing runbook — generatepasswordto.me

Last updated: 2026-11-07

Purpose: get real pages into Google's index as fast as legitimately possible, without spamming
the "Request indexing" tool.

## Current state (2026-11-07)

Measured with the URL Inspection API against all 231 URLs in `sitemap.xml`
(raw rows: `docs/gsc-url-inspection-2026-11-07.json`).

| Coverage state | URLs |
|---|---|
| Submitted and indexed | 16 |
| Crawled — currently not indexed | 103 |
| Discovered — currently not indexed | 23 |
| URL is unknown to Google | 89 |
| **Total** | **231** |

Per locale: `ua` 6 indexed, `en`/`pl` 2, `de`/`es`/`fr`/`it`/`zh` 1, `ru`/`pt`/`ja`/`vi` 0.
112 URLs have never been crawled.

Crawl budget (GSC → Settings → Crawl stats, 90 days to 2026-11-05): 451 requests, **99% refresh,
<1% discovery**, 41% of them for images. The `robots.txt not available` (35%) and `DNS error`
(32%) rows are leftovers from the August–October 2026 outage and show as "Problems in the past".

Reading of the data: the crawl is not blocked — it is *small*, and Google spends it refreshing
known URLs instead of discovering new ones. That is an authority and crawl-demand limit, not a
`robots.txt` bug.

## What the repo now does

- `sitemap.xml` keeps every real page (231 URLs) and uses a **real per-URL `<lastmod>`** from
  `sitemap-lastmod.js` instead of the build timestamp.
- hreflang clusters are symmetric across all 12 locales, `vi` included, with `x-default` on every
  page.
- `public/index.html` (stale Create React App template served at `/index.html` with status 200) is
  removed.
- The statistics pages are linked from the guides hub and the footer in the three locales that
  publish them (`en`, `ua`, `vi`) — they previously had zero inbound internal links.
- IndexNow submission: `npm run indexnow`.
- GSC reporting and sitemap submission: `npm run gsc`, `npm run gsc -- --submit`.

## Maintenance rules

1. **Never** point `<lastmod>` at build time. Bump the date in `sitemap-lastmod.js` (and `updatedAt`
   in `src/content/articles.ts` for guides) only when the visible copy of that page changes.
   `src/lib/sitemap-lastmod.test.mjs` fails if the two sources drift, if a date is invalid, or if a
   date is in the future.
2. **The sitemap keeps all 12 locales.** Narrowing the locale set to focus crawl budget was
   explicitly rejected by the maintainer on 2026-11-07. Do not reintroduce it.
3. A page may only be linked from a locale where it exists. Check
   `hasStatisticsPage()` / `languagesForGuide()` before adding a link, otherwise the link 404s.
4. `priority` and `changefreq` are ignored by Google — do not tune them.

## Manual step (needs a Google account, ~10 min)

GSC → URL Inspection → paste URL → **Request indexing**. Limit ~10–12 per day; repeated requests
for the same URL do nothing. Only worth doing after the page itself changed.

### Day 1
1. `/ua/guides`
2. `/ua/guides/nist-800-63b-password-rules`
3. `/en/guides/nist-800-63b-password-rules`
4. `/ua/guides/common-password-mistakes`
5. `/de/guides/how-to-create-strong-passwords`
6. `/pl/guides/vpn-security-privacy-guide`
7. `/ru/privacy-policy`
8. `/en/password-statistics-2026`

### Day 2
9. `/ru`
10. `/pt`
11. `/ja`
12. `/vi`
13. `/vi/guides`
14. `/ua/password-statistics-2026`

The root `/`, `/ua`, `/pl`, `/de`, `/es`, `/fr`, `/en/guides` and the UA guide set are already
`Submitted and indexed` — do not re-request them.

## After every release

```bash
npm test                    # includes the sitemap lastmod/hreflang checks
npm run build               # regenerates sitemap.xml and robots.txt
npm run indexnow            # Bing/Yandex/Naver/Seznam
npm run gsc -- --submit     # resubmit sitemap to Google
```

## What to check after 3–7 days

1. `npm run gsc` → sitemap `lastDownloaded` is recent, `errors` 0, `warnings` 0.
2. `/vi/guides/<slug>` URLs move from `URL is unknown to Google` to `Discovered` (the sitemap read
   on 2026-11-06 saw 219 URLs; the 12 Vietnamese guide URLs were added after that).
3. "Indexed" grows past 16; `Crawled — currently not indexed` is the number that must fall.
4. If a page stays `Crawled — currently not indexed` for 2+ weeks after a real content change: add
   internal links to it, improve the content, and do not re-request indexing repeatedly.

## Expected timeline

- Sitemap re-read after deploy: 1–3 days.
- Fresh crawl of changed URLs: 3–10 days.
- Meaningful growth in indexed pages: 2–6 weeks, and it is capped by backlinks. The domain had
  8 external links (all pointing at `/`) as of 2026-11-07.
