# AdSense fix plan — 2026-11-02

Step-by-step remediation for the findings in `docs/adsense-audit-2026-11-02.md`.
Order is deliberate: blockers first, content before re-application, sitemap changes last so the new
content is what gets recrawled.

Effort is for one developer with the existing translation workflow; content review time is separate.

## Phase 0 — Baseline and guardrails (30 min)

1. Create a branch: `codex/adsense-fixes`.
2. Save the current audit as the baseline:
   ```bash
   npm run adsense:audit
   ```
3. Confirm the numbers in `docs/adsense-audit-2026-11-02.json`: 208 URLs, 0 non-200, 14 thin content
   pages (12 contact + 2 best-password-managers), 1 duplicate pair.
4. Do not re-apply to AdSense until Phase 1 and Phase 2 are deployed and recrawled.

Done when: baseline JSON is committed and the branch builds (`npm run build`).

## Phase 1 — Blockers (day 1)

### Step 1.1 — Ship the AdSense loader

Files: `src/app/[locale]/layout.tsx`, optionally a new `src/components/Advertising/AdSenseScript.tsx`.

Actions:

1. Remove the dead `src/app/metadata.txt` snippet or move it to a real component. The file is not
   imported anywhere and never reaches production.
2. Add the loader once, in the locale layout, after the consent default script:
   ```tsx
   <Script
     async
     src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5995594246081561"
     crossOrigin="anonymous"
     strategy="afterInteractive"
   />
   ```
3. Make the Consent Mode default unconditional. Today it only renders when
   `NEXT_PUBLIC_GA_ID` is set (`layout.tsx:115-165`); move the `consent default = denied` snippet out
   of that conditional so ad storage is denied even when GA is not configured.
4. If Auto ads will be enabled, exclude `/{locale}/privacy-policy`, `/{locale}/terms-of-service`,
   `/{locale}/contact`, `/{locale}/about` and 404 from Auto ads in the AdSense UI. Legal pages must
   not carry ads.
5. Keep `SmartAdBanner` on the home page only for now. Do not add units to thin pages.

Acceptance:

- `curl -s https://…/en | grep adsbygoogle.js` returns the loader.
- Live browser: a `pagead2` request fires, `ins.adsbygoogle` exists after consent, no console errors.
- With marketing consent denied, Consent Mode still reports `ad_storage: denied`.

Risk: loading the ad tag in the EEA. Consent Mode v2 keeps ads non-personalized until consent; if
legal requires harder gating, load the tag only after `marketing` consent and accept lower fill.

Effort: 0.5–1 h.

### Step 1.2 — Add the About page

Files: `src/app/[locale]/about/page.tsx` (new), `src/lib/static-pages-i18n.ts`,
`src/components/Footer.jsx`, `next-sitemap.config.js`.

Actions:

1. Add `aboutTitle`, `aboutIntro`, `aboutSections: { heading, body }[]` to `StaticPageCopy` and fill
   all 12 locales. Reuse the existing `aboutus_*` keys in `src/components/lang.json` as a starting
   point, but write a standalone page, not a copy of the homepage block.
2. Required sections: what the site is, who runs it, how the generator works (client-side
   `crypto.getRandomValues`, nothing stored), how content is reviewed, privacy stance, contact.
3. Use `LocalizedPageShell`, `Breadcrumbs`, canonical + hreflang like the other static pages, and
   `STATIC_PAGE_LOCALES` for `generateStaticParams`.
4. Add About to `legalLinks` in `src/components/Footer.jsx`.
5. Add `'about'` to `staticPageSlugs` and `viStaticSlugs` in `next-sitemap.config.js`.
6. Add `about` to the AdSense-recommended pages check in `scripts/adsense-audit.mjs` (it already
   checks `/en/about`).

Acceptance:

- `/{locale}/about` returns 200 in all 12 locales.
- The page has ≥500 visible words, one H1, canonical, hreflang, and a footer link.
- `npm run adsense:audit` shows `PASS recommended page /about`.

Effort: 3–4 h including translations.

## Phase 2 — Content quality (days 2–3)

### Step 2.1 — Rewrite privacy policy and terms, fix the contradiction

Files: `src/lib/static-pages-i18n.ts`, `src/app/[locale]/privacy-policy/page.tsx`,
`src/app/[locale]/terms-of-service/page.tsx`.

The current English privacy intro says *"We do not engage in advertising tracking, third-party
profiling"* while the ad disclosure on the same page says Google serves ads with DoubleClick
cookies. That is a direct contradiction and a policy risk. Fix it in every locale, not only English.

Actions:

1. Extend the copy type:
   ```ts
   privacySections: { heading: string; body: string }[];
   termsSections: { heading: string; body: string }[];
   ```
   Keep the intro and bullets as a summary, render sections below them.
2. Privacy must cover: controller identity and contact, data collected (server logs, contact form,
   captcha), cookies and categories, advertising (Google AdSense, DoubleClick, personalized vs
   non-personalized, consent), legal bases, retention, user rights, third parties and transfers,
   children, changes, contact.
3. Terms must cover: acceptance, service description and no guarantee of password strength,
   acceptable use, no professional advice, IP, third-party links and ads, disclaimer and liability,
   changes and termination, governing law, contact.
4. Remove the "no advertising tracking" sentence and describe the real setup: Consent Mode v2,
   `ad_storage` denied by default, ads only after consent where required.
5. Add the missing `vi` entry to `ADS_DISCLOSURE` (currently falls back to English).
6. Add `vi` to the `supportedLangs` arrays in the privacy/terms/contact pages, or centralize the list
   in `src/lib/locales.ts` and reuse it. Today vi pages exist but have no `vi` hreflang.
7. Translate in this order: en → ua → ru → pl → it → pt → zh → de → es → fr → ja → vi. Do not pad:
   each section must contain specifics (cookie names/categories, retention periods, contact email).

Acceptance:

- Every privacy and terms page is ≥450 visible words.
- No sentence claims the site does not use advertising cookies.
- `npm run adsense:audit` shows 0 legal pages under 300 words.
- Manual check: every locale has a complete section set, no English fallback except proper nouns.

Effort: 1.5–2 days (translation-heavy).

### Step 2.2 — Expand the contact pages

Files: `src/lib/static-pages-i18n.ts`, `src/app/[locale]/contact/page.tsx`.

Actions:

1. Add `contactFaq: { q: string; a: string }[]` and a richer `contactIntro` to the copy type.
2. Content: what to contact about, response time, data-deletion requests, security reports, press and
   advertising enquiries, and 4–6 FAQ entries (free? do you store passwords? how to report a bug?
   how to request deletion?).
3. Render the FAQ as headings + paragraphs. Add `FAQPage` structured data only if the answers are
   visible on the page (they will be).
4. Keep the existing form and captcha untouched.

Acceptance:

- Every contact page is ≥250 visible words.
- The form still submits; no captcha regression.
- Low Value Content Checker reports thin risk Low for `/en/contact`.

Effort: 4–6 h including translations.

### Step 2.3 — Top up the ru/ua password-manager comparisons

Files: `src/app/[locale]/best-password-managers-2026/page.tsx`.

Actions:

1. Add one comparison section to the `ru` and `ua` variants only: local pricing, 2FA support, or
   emergency access. English is already 353 words; mirror the section, do not invent claims.
2. Keep affiliate disclosures unchanged.

Acceptance: both pages ≥320 words; no new affiliate links without `rel="sponsored"`.

Effort: 1–2 h.

### Step 2.4 — Differentiate the Vietnamese duplicate pair

Files: `src/content/articles/pci-dss-password-requirements.ts`,
`src/content/articles/team-password-policy-template.ts`.

Actions:

1. Rewrite the `vi` intro and at least two examples in each so they are topic-specific: PCI DSS
   focuses on cardholder-data systems and auditor evidence; team policy focuses on internal rollout,
   onboarding, and enforcement.
2. Do not shorten the pages; both are 1.8–2.2k words and pass thin-content checks. Only remove
   overlap.

Acceptance: Jaccard similarity below 0.55; both remain ≥400 words; `npm run antislop` passes.

Effort: 2 h.

## Phase 3 — Technical SEO hygiene (day 3)

### Step 3.1 — Remove the duplicate `/en` home from the sitemap

Files: `next-sitemap.config.js`, `next.config.js`, `src/components/Footer.jsx`,
`src/components/Header.tsx`.

Actions:

1. In `next-sitemap.config.js`, build `localePages` without `en` (root `/` is the English home).
2. Add a permanent redirect in `next.config.js`:
   ```js
   async redirects() {
     return [{ source: '/en', destination: '/', permanent: true }];
   }
   ```
3. Point internal home links to `/` when `locale === 'en'` (Footer, Header, logo, breadcrumbs).
4. Keep `hreflang="en"` pointing at `/` and `x-default` at `/`.

Acceptance: `/en` returns 301 to `/`; sitemap has one English home URL; no internal link to `/en`.

### Step 3.2 — Stop blocking `/_next/` for Googlebot

Files: `next-sitemap.config.js`.

Actions:

1. Remove `'/_next/'` from the `*` disallow list. Keep `/api/` and `/server-sitemap.xml`.
2. Regenerate robots with `npm run build` (postbuild runs `next-sitemap`).

Acceptance: served `robots.txt` no longer disallows `/_next/`; `Mediapartners-Google: Allow: /`
still present.

Effort for Phase 3: 1–2 h.

## Phase 4 — Verification and re-application (day 4 + waiting)

1. Build and test:
   ```bash
   npm run build
   npm test
   npm run antislop
   npm run adsense:audit
   ```
2. Expected audit output: 0 FAIL, `/about` 200, loader on all pages, 0 thin content pages outside
   utility/legal, 0 duplicate pairs, 0 canonical mismatches.
3. External re-checks:
   - Low Value Content Checker on `/en`, `/en/contact`, `/ru/privacy-policy`, `/en/about`.
   - TMOD thin content checker: target ≥95/100 with 0 warnings.
4. Browser checks with the in-app browser:
   - consent banner appears, `cc_cookie` absent before consent;
   - no `pagead2` cookies before consent;
   - ad unit renders after consent; no layout shift (reserve `min-height: 90px`);
   - no console errors on `/en`, `/en/about`, `/en/contact`.
5. Deploy, then in Google Search Console: submit the regenerated sitemap and request indexing for
   About, contact, privacy and terms.
6. Wait for recrawl (1–2 weeks), re-run `npm run adsense:audit`, then re-apply in AdSense.
7. After approval, enable Auto ads only on content pages, never on legal, contact, about or 404.

## Definition of done

| Metric | Baseline | Target |
|---|---:|---:|
| Thin pages (<300 words, utility excluded) | 14 | 0 |
| Very thin pages (<150 words) | 12 | 0 |
| Legal pages <300 words | 21 | 0 |
| Duplicate pairs ≥0.55 | 1 | 0 |
| `adsense:audit` FAIL items | 2 | 0 |
| AdSense loader present | no | yes, all pages |
| About page | 404 | 200 × 12 locales |
| Contact page words | 38–106 | ≥250 |
| Privacy/terms words | 66–350 | ≥450 |

## Risks and rollback

- **Consent/EEA:** the loader must not fire personalized ads before consent. Verify `ad_storage:
  denied` in the data layer before shipping.
- **Translations:** machine translation without review will create new thin content. Review each
  locale or ship fewer locales first.
- **301 `/en`:** can affect existing links. Use a permanent redirect, update internal links in the
  same deploy, and watch GSC coverage for two weeks.
- **Auto ads:** can place units on legal or thin pages. Keep manual units until approval; exclude
  utility URLs if Auto ads is enabled.
- **Rollback:** each phase is a separate commit; revert the phase commit without touching content
  work in other phases.

## Suggested commit sequence

```text
Add AdSense loader behind consent mode
Add localized About page and footer link
Expand privacy policy and terms copy
Add contact page FAQ and intake guidance
Expand ru/ua password manager comparisons
Differentiate Vietnamese policy guides
Fix English home canonical and sitemap entry
Allow Next.js assets in robots.txt
```
