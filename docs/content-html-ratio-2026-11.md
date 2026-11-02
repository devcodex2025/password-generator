# Content/HTML ratio audit (2026-11-02)

The tools.org.ua report shows 7% on the home page ("target 15%"). We measured all 190 sitemap
pages to see what that number actually consists of.

## Method

For every URL: `text_bytes / html_bytes × 100`, where text is the HTML with tags, `<script>` and
`<style>` stripped. A second ratio excludes inline `<script>` payload (`no-script`).

## Results (207 URLs at the time of measurement)

| Metric | Value |
|---|---|
| Average with inline scripts | **5.9%** |
| Average without inline scripts | **15.1%** |
| Home `/ua` | 16.4% (24.6% no-script), 1928 words |
| Guides (UA/RU) | 15.5–15.6% (37–38% no-script), 1747–1796 words |
| Thinnest real pages | `/vi/*` — 14 words, 0.9% |

Two conclusions follow:

1. **The ratio is dominated by Next.js inline RSC payload, not by missing content.** The home
   page is a client component, so the whole subtree (including the 1900-word SEO accordion) is
   serialized into `self.__next_f.push(...)` scripts. That doubles the HTML and halves the ratio.
   Without those scripts every page is already at or above the 15% threshold.
2. `/vi` pages were **404s listed in the sitemap** (17 URLs). The Vietnamese locale exists in
   `lang.json` (community PR) but the app has no routes or content for it; the sitemap was built
   from `lang.json`, so it advertised pages that returned 404. Fixed: the sitemap now uses the
   explicit 11-locale list → 207 → 190 URLs, all 200.

## What was improved now

- Dead hidden markup removed from `PasswordGenerator` (two decorative `floating-pill` blocks,
  never displayed, ~2 KB of duplicated HTML).
- Sitemap locale source fixed (no 404 URLs).
- The auditor's print-CSS/DC/metadata items were addressed earlier (score 71 → 74).

## What would raise the metric further (and the cost)

| Option | Effect | Cost |
|---|---|---|
| Make `/[locale]/page.tsx` a server component, pass client islands | removes most RSC duplication, ratio toward 15–20% | medium refactor, hydration risk |
| Drop MUI/Radix (replace with native controls) | fewer markup attributes | large refactor, UX regressions |
| Add ~2000 words per page | ratio +7 points per page | duplicate/thin content risk, not recommended |

## Recommendation

Treat the "content/HTML ratio" as a **proxy metric, not a ranking factor**. The actionable part
(thin pages, 404s in the sitemap, dead markup) is fixed. If we want a real content win, it is
adding genuinely useful localized content, not padding text to satisfy a scanner.
