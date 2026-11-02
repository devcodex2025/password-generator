# SEO todo — from tools.org.ua audit (2026-11-02)

Source: https://tools.org.ua/uk/www/generatepasswordto.me — score **71/100**.
Secondary source: W3C validator (validator.nu), 50 messages on `/ua`.

## Done already
- [x] Title 54 chars, description 149 chars, keywords, OG tags, alt on all images, SEF URLs,
      favicon, UTF-8, HTML5, sitemap, robots.txt, analytics — all pass.

## P1 — score points, low effort

- [ ] **Print stylesheet** (+1.5): add `@media print` rules (white background, black text,
      hide header/footer/ads). File: `src/styles/index.css`.
- [ ] **Dublin Core meta** (+1): add `dc.title`, `dc.description`, `dc.language`,
      `dc.identifier` via `metadata.other` in `[locale]/layout.tsx`.
- [ ] **Inline styles cleanup**: reduce `style={{...}}` attributes in
      `PasswordRow.tsx`, `PcShareBtn.tsx`, `ShareBlock.tsx`, `PasswordGenerator.tsx` —
      move to classes. Validator flags inline CSS and it lowers the text/HTML ratio.

## P2 — content/HTML ratio (7% vs 15% target)

- [ ] Ratio is depressed by Tailwind class strings and the large JS payload, not by missing text.
      Practical actions:
  - [ ] keep the SSR content (done) and add 2–3 short visible paragraphs above the accordion
        summarising what the tool does and how it works;
  - [ ] continue replacing inline styles with classes (see P1);
  - [ ] audit the client bundle: 29–30 script chunks is above their "6 files" threshold.
        Candidates to lazy-load: MUI components (Slider/Checkbox), ShareBlock, ads.

## P3 — HTML validity (validator.nu: 50 messages)

- [ ] 42 of 50 errors are **Emotion `<style>` tags injected inside label/span/div/a** by MUI.
      Fix: add `@mui/material-nextjs` `AppRouterCacheProvider` in the root layout (collects
      Emotion styles into the head) or replace those MUI components with plain HTML controls.
- [ ] `aria-valuemin` / `aria-valuemax` duplicated on an element that already has `min`/`max`
      (MUI Slider) — pass explicit aria props or drop them.
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
