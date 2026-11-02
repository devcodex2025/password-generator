# AdSense audit — 2026-11-02

Live audit of `https://www.generatepasswordto.me`: thin content, duplicate content, and AdSense
policy/technical compatibility.

> **Status update (same day):** the loader and `/about` findings are fixed in code. The tag is
> gated behind `NEXT_PUBLIC_ADSENSE_ENABLED` because the site is not approved yet, and behind
> marketing consent. Privacy/terms now have structured sections in all 12 locales, contact pages
> have an intro plus six FAQs, and the ru/ua and vi content findings are addressed. `/en` now
> 301-redirects to `/`, the sitemap lists 219 URLs with consistent hreflang, and robots.txt no
> longer blocks `/_next/`. See `docs/adsense-fix-plan-2026-11-02.md`.

## What ran

| Step | Tool | Scope | Result |
|---|---|---|---|
| 1 | [Low Value Content Checker](https://adsensesitechecker.com/low-value-content-checker) | 4 representative URLs | thin risk low/medium, no iframes |
| 2 | `npm run adsense:audit` (this repo, replaces a manual Screaming Frog crawl) | all 208 sitemap URLs | 208/208 HTTP 200, 0 iframe-only |
| 3 | [TMOD thin content checker](https://tmod.net/tools/thin-content) | 12 sampled pages | **95/100, Pass**, 0 warnings, 0 failures |
| 4 | TMOD 45-check AdSense audit | whole site | blocked: requires a free account, not created |
| 5 | Browser verification | `/en` | CMP present, Consent Mode v2 default = denied, ad loader absent |
| 6 | Lighthouse | `/en` | accessibility 100, best practices 100, SEO 100 |

Raw data: `docs/adsense-audit-2026-11-02.json` (208 pages, per-page word counts and flags).

## Content depth by template

Visible words inside `<main>`; site chrome (header/footer/nav) excluded.

| Template | Pages | Min | Median | <300 | <150 |
|---|---:|---:|---:|---:|---:|
| guide | 132 | 415 | 922 | 0 | 0 |
| home | 13 | 1721 | 2003 | 0 | 0 |
| guides-index | 12 | 580 | 696 | 0 | 0 |
| password-statistics-2026 | 3 | 345 | 364 | 0 | 0 |
| best-password-managers-2026 | 12 | 292 | 357 | 2 | 0 |
| contact | 12 | 38 | 42 | 12 | 12 |
| legal (privacy/terms) | 24 | 66 | 191 | 21 | 9 |

No iframe-only pages. No page is missing a single H1 or a meta description. No `noindex`.

## External checker details

Low Value Content Checker (word counts include header/footer, hence higher than the table above):

| URL | Words | Thin risk | Iframes | FAQ |
|---|---:|---|---|---|
| `/en` | 1969 | Low | 0 | Found |
| `/ua` | 1847 | Low | 0 | Found |
| `/en/guides/secure-password-generator-guide` | 1912 | Low | 0 | Missing |
| `/en/privacy-policy` | 368 | Low | 0 | Missing |
| `/en/contact` | 127 | **Medium** | 0 | Missing |

The checker also reports "Privacy missing · Contact missing · About missing · Terms missing" on every
URL, including the privacy policy itself. That is a false negative: it does not follow footer links.
All four links exist in the served HTML (`/en/privacy-policy`, `/en/terms-of-service`, `/en/contact`).

## Findings

### P0 — AdSense loader is not on the page

> Fixed in code: `AdSenseLoader` renders the tag after marketing consent when
> `NEXT_PUBLIC_ADSENSE_ENABLED=true`. The flag stays off until the account is approved.

The publisher meta tag and `ads.txt` are present, but the AdSense loader script is not.

Evidence:

- `pagead2.googlesyndication.com/pagead/js/adsbygoogle.js` appears on **0 of 208** pages.
- Live browser: `typeof window.adsbygoogle === "object"`, `length === 2` (react-adsense queued two
  pushes), no `pagead2` network request, no `<ins class="adsbygoogle">`, 0 `.smart-ad-container`.
- The only loader snippet lives in `src/app/metadata.txt`, which is imported nowhere (the extension
  is `.txt`; grep finds no reference). It is dead code.
- `SmartAdBanner` waits 2 s for a load event, then sets `adState = "failed"` and renders `null`
  (`src/components/Advertising/SmartAdBanner.jsx:56-63,93-95`).

Effect: ad units are queued forever and then hidden. If the site is already approved, it is serving
no ads. If it is not approved yet, the review still expects to see the AdSense code on the site.

Fix, in `src/app/[locale]/layout.tsx` (or the root layout), inside the consent-gated boundary:

```tsx
<Script
  async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5995594246081561"
  crossOrigin="anonymous"
  strategy="afterInteractive"
/>
```

Keep Consent Mode v2 default-denied behavior; do not load it on legal/404 pages.

### P0 — `/about` returns 404

> Fixed: `/{locale}/about` now exists in 12 locales, is linked from the footer and listed in the
> sitemap.

AdSense reviewers look for an About page. There is no `/{locale}/about` route and no About link in
the footer. Add a real About page (who runs the site, why it exists, how the generator works, contact)
in all locales, or add an About section on the home page and link it as About.

### P1 — legal pages are thin in most locales

21 of 24 privacy/terms pages are under 300 words; 9 are under 150.

| Page | Words |
|---|---:|
| `/ru/terms-of-service` | 66 |
| `/pl/terms-of-service` | 76 |
| `/it/terms-of-service` | 83 |
| `/pt/terms-of-service` | 83 |
| `/pl/privacy-policy` | 117 |
| `/ru/privacy-policy` | 121 |
| `/pt/privacy-policy` | 130 |
| `/zh/terms-of-service` | 136 |
| `/it/privacy-policy` | 138 |

A privacy policy that does not describe cookies, AdSense/DoubleClick, legal basis, and data rights is
a real GDPR and AdSense-policy risk, not just a word-count issue. The English page (282 words) is
also at the low end. Expand from the English source and re-translate; do not pad.

### P1 — contact pages are very thin

`/{locale}/contact` is 38–106 words of main content (127 including chrome). Utility pages are
excluded by TMOD's classifier, but other checkers still flag them. Add a short intro (what to write
about), response-time expectation, and 3–4 FAQ entries. This also helps the "site feels unfinished"
signal.

### P2 — two pages sit on the thin boundary

`/ru/best-password-managers-2026` (292 words) and `/ua/best-password-managers-2026` (299 words) are
just under 300. The English version is 353. Add one comparison section to the ru/ua versions.

### P2 — near-duplicate pair in Vietnamese

`/vi/guides/pci-dss-password-requirements` and `/vi/guides/team-password-policy-template` score 0.564
Jaccard similarity (threshold 0.55). Every other locale is below threshold. Differentiate the intro
and the examples in the vi translations.

### P2 — sitemap lists `/en`, whose canonical is `/`

`/en` and `/` both return 200; `/en` declares `canonical = https://www.generatepasswordto.me/` and
`hreflang en = /`. The sitemap still lists `/en`. This is not an AdSense blocker but it splits
signals. Drop `/en` from the sitemap (root is the English URL) or 301 `/en` to `/`.

### P2 — `robots.txt` blocks `/_next/` for Googlebot

`Disallow: /_next/` prevents Googlebot from fetching the CSS and JS bundles. AdSense's
`Mediapartners-Google` is explicitly allowed, but the main crawler renders an unstyled page, which
weakens the quality signal reviewers see. Allow `/_next/static/` at minimum.

### Confirmed good

- `ads.txt`: `google.com, pub-5995594246081561, DIRECT, f08c47fec0942fa0`.
- `robots.txt`: allows `Mediapartners-Google` and advertises the sitemap. Note that `*` is disallowed
  from `/_next/`, so AdSense is fine but Googlebot cannot fetch the JS/CSS bundles — see P2 above.
- Consent Mode v2: default denied for ad/analytics storage; CMP banner renders; no `cc_cookie` before
  consent.
- 208/208 sitemap URLs return 200; no soft 404s; one H1 and one meta description per page.
- No iframe-only tool page; the generator is inline, not embedded.
- Lighthouse: 100 accessibility / 100 best practices / 100 SEO.

## Recommended order of work

1. Decide whether the AdSense loader should be live. If yes, add it (P0).
2. Add the About page and footer link (P0).
3. Expand privacy policy and terms in ru, pl, it, pt, zh, then the rest (P1).
4. Add intro + FAQ to all 12 contact pages (P1).
5. Add one section to ru/ua password-manager comparisons (P2).
6. Differentiate the vi duplicate pair (P2).
7. Remove `/en` from the sitemap or redirect it (P2).
8. Re-run `npm run adsense:audit` and the two external checkers.

## Re-running

```bash
npm run adsense:audit
npm run adsense:audit -- --sample=1
npm run adsense:audit -- --base=https://www.example.com --limit=20
```
