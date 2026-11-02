# Vietnamese translation tasks — generatepasswordto.me (2026-11)

## Current state

- `/vi`, `/vi/privacy-policy`, `/vi/terms-of-service`, `/vi/contact` — live in Vietnamese, indexed.
- `/vi/guides` and the 11 guides — live but **noindex**: bodies render English (fallback) with
  canonical to the EN version. They become indexable only after a Vietnamese `vi` export exists.
- UI strings in `lang.json` are fully translated (no missing `vi` keys).
- `guides-i18n.ts` (categories, labels) and `guides-ui.ts` (TOC, buttons, notices) have **no `vi`
  block** yet — they currently fall back to English.
- Vietnamese keyword cloud: 69 phrases, top terms `mật khẩu` (70), `tạo` (24), `trình quản lý`
  (11), `mạnh` (10), `ngẫu nhiên` (10), `cụm mật khẩu` (10), `kiểm tra` (10).

## Volume

| # | Guide (slug) | EN sections | ~EN words | Priority |
|---|---|---|---|---|
| 1 | how-to-create-strong-passwords | 10 | 1 548 | P0 |
| 2 | common-password-mistakes | 8 | 1 415 | P0 |
| 3 | nist-800-63b-password-rules | 7 | 1 290 | P0 |
| 4 | passphrase-vs-password-entropy | 7 | 1 202 | P1 |
| 5 | what-to-do-after-password-breach | 7 | 1 362 | P1 |
| 6 | password-manager-vs-manual-storage | 7 | 1 385 | P1 |
| 7 | two-factor-authentication-basics | 7 | 1 511 | P2 |
| 8 | secure-password-generator-guide | 8 | 1 579 | P2 |
| 9 | pci-dss-password-requirements | 7 | 1 231 | P2 |
| 10 | team-password-policy-template | 8 | 1 508 | P2 |
| 11 | vpn-security-privacy-guide | 7 | 1 955 | P3 |

**Total ≈ 15 986 words / 83 sections.**

## Per-guide deliverable

For each slug, add `export const vi: LocalizedArticleContent = { … }` to
`src/content/articles/<slug>.ts` with:

- `title` — natural Vietnamese, ≤70 chars, contains “mật khẩu”.
- `excerpt` — 140–200 chars, mentions the practical benefit.
- `seoTitle` — **≤60 chars**, keyword-first, e.g.
  `Cách tạo mật khẩu mạnh: hướng dẫn 2026 | generatepasswordto.me`.
- `seoDescription` — **≤155 chars**, includes 2–3 of: `tạo mật khẩu`, `mật khẩu mạnh`,
  `cụm mật khẩu`, `trình quản lý mật khẩu`, `ngẫu nhiên`.
- `keywords` — 5–8 Vietnamese phrases taken from `docs/keyword-cloud.json` (`locales.vi`).
- `sections` — same count and order as the EN source; each `heading`, `paragraphs`, `bullets`
  translated. Numbers, standards and product names unchanged.

### Translation rules

- Natural Vietnamese for a general audience, not machine translation. No word-by-word calques.
- Keep in Latin script, unchanged: `NIST SP 800-63B`, `PCI DSS`, `OWASP`, `EFF`, `HIBP`,
  `Argon2id`, `bcrypt`, `SHA-1`, `2FA`, `PIN`, `Bitwarden`, `1Password`, `NordPass`.
- Use the glossary (`docs/vi-glossary.json`). Consistency matters more than synonym variety.
- Preserve all numbers, entropy values, crack-time estimates and citations.
- Vietnamese punctuation and spacing: no space before punctuation, spaces around numbers/units.
- Do not add claims that are absent in EN; do not drop the sources.

## UI/labels tasks

1. `src/lib/guides-i18n.ts` — add `vi` block (category labels, headings, meta strings).
2. `src/lib/guides-ui.ts` — add `vi` block (TOC title, “read more”, reading-time label,
   interlink placement labels, notices).
3. `src/app/[locale]/best-password-managers-2026/page.tsx` — check whether its copy needs a
   `vi` variant; if it falls back to EN, add Vietnamese strings.
4. `/[locale]/password-statistics-2026` — currently EN + UA only. Optional P3: add vi.

## Integration checklist (per guide)

1. Add the `vi` export; register it in `ARTICLE_CATALOG` (`src/content/articles.ts`).
2. Remove the `noindex` fallback for that slug: in
   `src/app/[locale]/guides/[slug]/page.tsx` change the condition from
   `locale === 'vi'` to “no Vietnamese content for this slug”.
3. Include VI in that guide’s hreflang map (`SUPPORTED_CONTENT_LANGUAGES` already lists `vi`).
4. Add `/vi/guides/<slug>` to the sitemap: in `next-sitemap.config.js` the `vi` guide pages are
   currently excluded by `transform`; switch to per-slug exclusion for untranslated guides.
5. Build and verify:
   ```bash
   npm run build
   # canonical is self, robots: index,follow, hreflang includes vi
   ```
6. Publish → `npm run indexnow` → `npm run gsc -- --submit` → request indexing in GSC UI.

## Acceptance criteria (per article)

- [ ] Section count and order match EN; word count within ±15% of EN.
- [ ] No English sentences left (except the protected terms list).
- [ ] `seoTitle` ≤60 chars, `seoDescription` ≤155 chars, both contain a cloud keyword.
- [ ] `keywords` present, 5–8 items, Vietnamese, drawn from the cloud.
- [ ] Page renders at `/vi/guides/<slug>` with `lang="vi"`, `robots: index,follow`,
      self canonical, hreflang includes `vi`.
- [ ] No layout breakage (long Vietnamese headings wrap correctly on mobile).

## Quality gate

- Native-speaker review of at least the P0 articles before removing `noindex`.
- Spot-check 10 random paragraphs against EN for meaning, not literal wording.
- Re-run `npm run keywords` + `npm run keywords:cloud` after each batch to confirm keyword alignment.

## Tracking

| Slug | Translated | Reviewed | Indexable | Sitemap | Notes |
|---|---|---|---|---|---|
| how-to-create-strong-passwords | ☑ | ☐ | ☑ | ☑ | P0 |
| common-password-mistakes | ☑ | ☐ | ☑ | ☑ | P0 |
| nist-800-63b-password-rules | ☑ | ☐ | ☑ | ☑ | P0 |
| passphrase-vs-password-entropy | ☑ | ☐ | ☑ | ☑ | P1 |
| what-to-do-after-password-breach | ☑ | ☐ | ☑ | ☑ | P1 |
| password-manager-vs-manual-storage | ☑ | ☐ | ☑ | ☑ | P1 |
| two-factor-authentication-basics | ☑ | ☐ | ☑ | ☑ | P2 |
| secure-password-generator-guide | ☑ | ☐ | ☑ | ☑ | P2 |
| pci-dss-password-requirements | ☑ | ☐ | ☑ | ☑ | P2 |
| team-password-policy-template | ☑ | ☐ | ☑ | ☑ | P2 |
| vpn-security-privacy-guide | ☑ | ☐ | ☑ | ☑ | P3 |
| guides-i18n labels | ☑ | ☐ | – | – | UI |
| guides-ui labels | ☑ | ☐ | – | – | UI |
| interlinking anchors/placements | ☑ | ☐ | – | – | UI |
| affiliate promo strings | ☑ | ☐ | – | – | UI |
| best-password-managers-2026 | ☑ | ☐ | ☑ | ☑ | Page |
| password-statistics-2026 | ☑ | ☐ | ☑ | ☑ | Page |
