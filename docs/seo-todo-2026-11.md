# SEO todo — from tools.org.ua audit (2026-11-02)

Source: https://tools.org.ua/uk/www/generatepasswordto.me — score **71/100** → **74/100**
after the fixes below (re-audited 15:03). W3C errors: **207 → 4**.

## Done already
- [x] Title 54 chars, description 149 chars, keywords, OG tags, alt on all images, SEF URLs,
      favicon, UTF-8, HTML5, sitemap, robots.txt, analytics — all pass.

## P1 — score points, low effort

- [x] **Print stylesheet** (+1.5): inline `<style media="print">` added to the head in
      `[locale]/layout.tsx` (auditor does not detect `@media print` inside bundled CSS).
      Result: "Чудово. Ми знайшли CSS файл…".
- [x] **Dublin Core meta** (+1): `dc.title`, `dc.description`, `dc.language`, `dc.identifier`
      via `generateMetadata` in `[locale]/layout.tsx`. Result: "Чудово".
- [x] **Inline styles cleanup**: removed static inline styles in
      `PasswordSettings.tsx`, `PcShareBtn.tsx`, `PasswordRow.tsx`, `PasswordGenerator.tsx`.
      Remaining 30 style attributes are framework internals (Radix height var, Next Image
      `color:transparent`, MUI Slider, AnimatedPassword `--char-index`).

## P2 — content/HTML ratio (7% vs 15% target)

- [ ] Ratio is depressed by Tailwind class strings and the large JS payload, not by missing text.
      Practical actions:
  - [ ] keep the SSR content (done) and add 2–3 short visible paragraphs above the accordion
        summarising what the tool does and how it works;
  - [ ] continue replacing inline styles with classes (see P1);
  - [ ] audit the client bundle: 29–30 script chunks is above their "6 files" threshold.
        Candidates to lazy-load: MUI components (Slider/Checkbox), ShareBlock, ads.

## P3 — HTML validity (validator.nu: 50 messages)

- [x] 42 of 50 errors were **Emotion `<style>` tags injected inside label/span/div/a** by MUI.
      Fixed with `@mui/material-nextjs` `AppRouterCacheProvider` in the root layout; style tags
      now render only in `<head>` (2 total). validator.nu: **50 → 8** messages, auditor: 207 → 4.
- [ ] `aria-valuemin` / `aria-valuemax` duplicated on an element that already has `min`/`max`
      (MUI Slider internals) — cosmetic, cannot be fixed without replacing the component.
- [ ] `div` inside `button` — find the offender (likely a MUI Button with block children) and
      switch to allowed phrasing content.
- [ ] One `label for=` points to a non-existent id.
- [ ] `fetchpriority` / `imagesrcset` on `<link>` are false positives from an older validator —
      ignore.

## P4 — performance / JS weight

- [ ] Measure real Core Web Vitals in GSC (field data) before changing the architecture.
- [ ] If LCP suffers: keep the generator above the fold server-rendered but hydrate the
      interactive parts lazily.

## Notes

- "Мобільний телефон" section in the tools.org.ua report is empty (their scanner could not run
  the mobile pass); use PageSpeed Insights / GSC CWV instead.
- Re-run the audit after P1–P2: expected score 71 → ~78–80.
