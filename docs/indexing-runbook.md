# Indexing runbook — generatepasswordto.me

Purpose: get the 205 real pages into Google's index as fast as legitimately possible, without
spamming the "Request indexing" tool.

## What is already automated

- `sitemap.xml` contains only real pages (205 URLs, no og-image routes).
- `robots.txt` allows crawling, declares the sitemap and the AdSense crawler.
- IndexNow submits to Bing/Yandex/Naver/Seznam: `npm run indexnow`.
- Soft-404 garbage URLs (`/{search_term_string}`, `/$`) return real 404s.
- GSC service-account access: `npm run gsc` reports sitemaps, analytics and URL inspection.

## Manual step (needs your Google account, ~10 min)

GSC → URL Inspection → paste URL → **Request indexing**. Limit ~10–12 per day; repeated
requests for the same URL do nothing.

### Day 1
1. `/ua`
2. `/ua/guides`
3. `/ua/guides/how-to-create-strong-passwords`
4. `/ua/guides/common-password-mistakes`
5. `/ua/guides/nist-800-63b-password-rules`
6. `/ua/best-password-managers-2026`
7. `/en/guides`
8. `/en/guides/how-to-create-strong-passwords`
9. `/pl`
10. `/de`

### Day 2
11. `/es`
12. `/fr`
13. `/it`
14. `/pt`
15. `/ja`
16. `/zh`
17. `/ru`
18. `/en/best-password-managers-2026`

The root `/` is already indexed (`Submitted and indexed`).

## Automatable nudge

```bash
npm run indexnow            # Bing/Yandex/Naver/Seznam
npm run gsc -- --submit     # resubmit sitemap to Google (also triggers a fetch)
```

Run both after any release that adds or changes URLs. There is no API to request indexing for
ordinary pages (the Indexing API is limited to JobPosting/BroadcastEvent), so the GSC UI clicks
above are the only Google-side shortcut.

## What to check after 3–7 days

1. `npm run gsc` → sitemap `lastDownloaded` should be recent; sitemap errors 0.
2. URL inspection for `/ua`, `/pl`, one guide: verdict `PASS` / coverage `Submitted and indexed`.
3. GSC → Indexing → Pages: "Indexed" count should grow from 2 toward 10–40.
4. If a page stays "Crawled — currently not indexed" for 2+ weeks: add internal links to it,
   improve its content, and do **not** re-request indexing repeatedly.

## Expected timeline

- First recrawl: hours–3 days (IndexNow + sitemap).
- First indexed subset: 3–10 days.
- Search impressions appear in GSC with a 2–3 day lag; first clicks usually 2–6 weeks.
