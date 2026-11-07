# Implementation request — apply the 12-locale keyword map

- **Prepared:** 2026-11-07
- **Type:** SEO + i18n + content implementation
- **Priority:** P0 for the Vietnamese fallbacks; P1 for on-page alignment
- **Estimate:** 6–9 developer days + native-language review
- **Data:** `docs/keyword-map/` (33,556 keywords, 12 locales)
- **Related:** #32 (SEO umbrella), #31 (content gaps)

---

## 1. Summary

The keyword map for all 12 site locales is ready. This request covers turning it into
on-page changes: closing the Vietnamese fallback gap, aligning titles/H1/FAQ with real
query wording, adding the missing topic sections, and wiring measurement so the next
iteration is driven by Search Console data.

The site already renders 12 locales (`SUPPORTED_LANGS` in `src/lib/home-metadata.ts`).
The generator already has character/words/PIN modes and 8/12/16/20 presets
(`src/components/PasswordGenerator/PasswordSettings.tsx`). The missing work is therefore
mostly **metadata, copy, internal linking and a handful of localized maps** — not a new
generator.

## 2. Verified current state

| Area | Status |
|---|---|
| Locales routed | 12 in `src/lib/home-metadata.ts` and `src/app/[locale]/layout.tsx` |
| Keyword data | 12 locales, 33,556 rows, minimum 1,039 (`ua`), maximum 5,798 (`en`) |
| Home titles/descriptions | Localized for all 12 (`src/lib/home-metadata.ts`) |
| Generator modes | `chars`, `words`, `pin` already exist (`generatorModes.ts`, `PasswordSettings.tsx`) |
| Length presets | 8/12/16/20 already exist (`PasswordSettings.tsx`, line ~186) |
| Guides | Existing cluster targets are live; gaps are flagged `gap-new` / `gap-feature` |
| Vietnamese coverage | **Incomplete** — multiple per-language maps still fall back to English |

### 2.1 Confirmed Vietnamese fallbacks

1. `docs/semantic-core.json` lists 11 languages (`en…pl`), no `vi`.
   `src/components/SeoData.js` falls back to `seoDataMap.en` for `/vi`,
   so the footer description and meta keywords are English.
2. `src/components/SeoData.js` → `LONG_TAIL_BY_LANG` has no `vi` entry.
3. `src/components/SEOKeywords.tsx` → `naturalTextByLang` has no `vi` entry,
   so the visible SEO paragraph on `/vi` is English.
4. `src/components/PasswordGenerator/generatorModes.ts` → `MODE_LABELS` has no `vi`,
   so the mode labels on `/vi` fall back to English.

These are the concrete reasons the site looks like it covers only 11 languages even
though the keyword map covers 12.

## 3. Goals

- Make `/vi` fully localized with no English fallback in SEO text or generator labels.
- Align each locale's home title, H1 and visible FAQ with the highest-demand queries
  from the map, without keyword stuffing or doorway pages.
- Add the missing topic sections that already have demand: length, passphrase,
  Wi-Fi, manager platforms, examples/ideas, policy, 2FA and breach.
- Keep one canonical page per intent and correct hreflang for all 12 locales.
- Record a GSC baseline before changes so impact is measurable.

## 4. Non-goals

- No new password-generation algorithm or security changes.
- No paid keyword tools, link building or affiliate expansion.
- No mass machine translation. New copy is drafted per locale and reviewed by a native speaker.
- No one-page-per-query doorway pages. Clusters map to existing pages or one new guide.

## 5. Workstreams

### P0 — close the Vietnamese gap and add a regression guard (1 day)

| # | Task | File(s) |
|---|---|---|
| P0.1 | Add `vi` to `languages` and `keywords.vi` (`high`/`medium`/`low`) | `docs/semantic-core.json` |
| P0.2 | Add `vi` long-tail terms | `src/components/SeoData.js` |
| P0.3 | Add the Vietnamese SEO paragraph | `src/components/SEOKeywords.tsx` |
| P0.4 | Add Vietnamese mode labels | `src/components/PasswordGenerator/generatorModes.ts` |
| P0.5 | Add a check that every supported locale exists in each per-language map | new `scripts/validate-seo-locales.mjs` + `npm run seo:locales` |
| P0.6 | Verify `/vi` HTML has no English fallback strings | manual + the new check |

Draft content for P0.1–P0.4:

```jsonc
// docs/semantic-core.json — add to "languages" and "keywords"
"vi": {
  "high": ["tạo mật khẩu", "mật khẩu mạnh", "mật khẩu ngẫu nhiên", "trình quản lý mật khẩu", "kiểm tra mật khẩu"],
  "medium": ["tạo mật khẩu online", "mật khẩu an toàn", "cụm mật khẩu", "chính sách mật khẩu", "cách tạo mật khẩu mạnh", "mật khẩu 12 ký tự"],
  "low": ["mật khẩu wifi", "quên mật khẩu", "mật khẩu tốt nhất", "độ mạnh mật khẩu", "ví dụ mật khẩu"]
}
```

```js
// src/components/SeoData.js
vi: ['tạo mật khẩu miễn phí', 'tạo mật khẩu online', 'trình tạo mật khẩu mạnh'],
```

```tsx
// src/components/SEOKeywords.tsx
vi: 'Trình tạo của chúng tôi sử dụng tính ngẫu nhiên mật mã để tạo mật khẩu chống lại các cuộc tấn công brute-force. Mỗi mật khẩu được tạo hoàn toàn trong trình duyệt của bạn — không có gì được gửi đến máy chủ.',
```

```ts
// src/components/PasswordGenerator/generatorModes.ts
vi: { chars: 'Ký tự', words: 'Từ', pin: 'PIN', wordCount: 'Số từ', separator: 'Dấu phân cách', capitalize: 'Viết hoa một từ' },
```

Use the drafts only after native review.

### P1 — on-page alignment and missing sections (4–6 days)

| # | Task | Target | Keyword clusters |
|---|---|---|---|
| P1.1 | Rewrite/extend home FAQ with exact query phrasing per locale: "how long should a password be", "12 characters", "passphrase", "Wi-Fi password" | `src/components/SeoAccordion.jsx`, `src/components/lang.json`, `src/lib/home-structured-data.ts` | length, passphrase, wifi |
| P1.2 | Add length section (8 vs 12 vs 16 vs 20 + table + link to presets) to the strong-password guide | `content.json` / content DB, `src/app/[locale]/guides/[slug]/page.tsx` | length |
| P1.3 | Add an examples/ideas block ("good passwords", "password examples for work") | same guide | examples, ideas |
| P1.4 | Add platform sections (Android, iPhone, Chrome, Google Password Manager) to the manager comparison page | `src/app/[locale]/best-password-managers-2026/page.tsx`, `content.json` | manager, platform |
| P1.5 | Add a Wi-Fi password guide (new page, canonical per locale; skip locales that cannot be reviewed) | new content entry + route | wifi (3,551 keywords) |
| P1.6 | Link 2FA and breach pages from the home FAQ and the strong-password guide | existing guides | twofa, breach |
| P1.7 | Verify passphrase/PIN/length presets are discoverable; add a short H2/section targeting "passphrase generator" and "PIN generator" — no new feature work unless a real gap is found | home + guide | passphrase, pin |

Notes:

- Do **not** add a separate page for every digit variant. Use one length section with
  anchors and presets; the generator already supports 8/12/16/20.
- Do **not** translate all 33,556 keywords into copy. Use the top 20–50 per locale for
  titles/FAQ/sections; the rest stays in the planning CSV.
- Keep the FAQ JSON-LD in `src/lib/home-structured-data.ts` in sync with visible Q&A.

### P2 — scale and measure (2 days, then ongoing)

- Build an internal-link matrix from cluster → target page and apply it in
  `src/components/GuideLinksSection` / guide templates.
- Add the top 50 keywords per locale to `docs/content-agent-brief.json` so new articles
  are written against real queries.
- Run `npm run gsc` after 2–4 weeks; prioritize queries at positions 4–20 with impressions.
- Refresh the keyword map monthly (`npm run keywords:deep`).

## 6. Per-locale targets

Full data: `docs/keyword-map/locales/<code>.csv`; index: `docs/keyword-map/languages.csv`.
The table below is the starting point for title/H1/FAQ review.

| Locale | Language | Keywords | Top cluster | Top queries (score) |
|---|---|---:|---|---|
| `en` | English | 5798 | strength (1175) | password ideas (89) · how to create a strong password (88) · best password manager (84) |
| `ua` | Ukrainian | 1039 | wifi (157) | згенерувати пароль (100) · придумати пароль (100) · як створити надійний пароль (100) |
| `ru` | Russian | 1997 | wifi (487) | как создать надежный пароль (100) · запомнить пароль (100) · пароль из 12 символов (97) |
| `pl` | Polish | 3697 | howto (816) | wygeneruj hasło (100) · hasło 12 znaków (100) · siła hasła (100) |
| `de` | German | 3181 | generator (554) | passwort prüfen (82) · passwort erstellen (82) · zufälliges passwort (82) |
| `es` | Spanish | 3407 | generator (711) | ejemplos de contraseñas (82) · contraseña aleatoria (82) · crear contraseña (82) |
| `fr` | French | 2772 | generator (533) | mot de passe aléatoire (84) · mot de passe 12 caractères (84) · mot de passe sécurisé (84) |
| `it` | Italian | 2734 | generator (570) | miglior gestore di password (84) · esempi di password (82) · generatore di password (82) |
| `pt` | Portuguese (BR) | 2918 | generator (671) | criar senha (82) · gerador de senhas (82) · senha aleatória (82) |
| `ja` | Japanese | 1933 | generator (363) | パスワード 確認 (82) · パスワード 例 (82) · パスワード 作成 (82) |
| `zh` | Chinese (Simplified) | 1315 | account (186) | 生成密码 (82) · 12位密码 (82) · 密码短语 (82) |
| `vi` | Vietnamese | 2765 | generator (603) | trình quản lý mật khẩu tốt nhất (87) · tạo mật khẩu ngẫu nhiên (85) · mật khẩu ngẫu nhiên (82) |

Language-code notes: `ua` is exported as hreflang `uk`; `pt` is Brazilian Portuguese;
`zh` is Simplified Chinese.

## 7. Acceptance criteria

- [ ] `vi` appears in `docs/semantic-core.json`, `LONG_TAIL_BY_LANG`, `naturalTextByLang`
      and `MODE_LABELS`; `/vi` renders no English fallback from those maps.
- [ ] A new `npm run seo:locales` check fails if any supported locale is missing from any
      per-language map; CI runs it.
- [ ] For every locale, at least 3 of the top 5 queries appear naturally in the title,
      H1, or visible FAQ (reviewer checklist, not automatic insertion).
- [ ] Length, passphrase and Wi-Fi sections exist and link to the generator with the
      right preset/mode; no new doorway URLs.
- [ ] FAQPage JSON-LD contains exactly the visible Q&A; no hidden or extra questions.
- [ ] hreflang and canonical are correct for all 12 locales; `vi` stays consistent with
      the sitemap's existing partial-vi handling.
- [ ] `npm run build`, `npm test` and `npm run content:validate` pass.
- [ ] GSC baseline (impressions/clicks/position per locale) is recorded before release.
- [ ] No keyword stuffing: copy reads naturally in each language and is approved by a
      native reviewer.

## 8. Files to touch

| File | Change |
|---|---|
| `docs/semantic-core.json` | add `vi` to languages + tiered keywords |
| `src/components/SeoData.js` | add `vi` long-tail terms |
| `src/components/SEOKeywords.tsx` | add `vi` paragraph |
| `src/components/PasswordGenerator/generatorModes.ts` | add `vi` mode labels |
| `src/components/lang.json` | add/align FAQ keys per locale |
| `src/components/SeoAccordion.jsx` | render new FAQ items |
| `src/lib/home-structured-data.ts` | keep JSON-LD FAQ in sync |
| `src/lib/home-metadata.ts` | verify titles/descriptions against top queries |
| `src/components/PasswordGenerator/PasswordSettings.tsx` | confirm presets/modes are exposed and linked |
| `content.json` + content seed | length/examples/Wi-Fi sections |
| `src/app/[locale]/best-password-managers-2026/page.tsx` | platform sections |
| `next-sitemap.config.js` | only if new canonical pages are added |
| `scripts/validate-seo-locales.mjs` (new) | locale coverage regression check |

## 9. Verification

```bash
npm run build
npm test
npm run content:validate
npm run seo:locales        # new check
npm run gsc                # after release, baseline comparison
```

Manual spot checks:

1. Open `/vi` and search the rendered HTML for the English fallback strings
   ("Our generator uses cryptographic randomness", "Password generator").
2. Open one page per locale and confirm title/H1/FAQ use local wording.
3. Validate the FAQ rich result on `/` and `/vi` with the Rich Results Test.
4. Confirm the length presets set the slider and that the words/PIN modes are reachable
   on mobile.

## 10. Measurement

- Record a GSC baseline per locale before release (impressions, clicks, average position
  for the top 20 queries in each `locales/<code>.csv`).
- Re-run after 2–4 weeks; compare per query cluster, not just site totals.
- Track `/vi` separately: the P0 fix should remove English-fallback impressions/clicks
  on English queries.
- Keep `docs/keyword-map/README.md` as the source of truth for the next iteration.

## 11. Risks and guardrails

| Risk | Mitigation |
|---|---|
| Machine translation reads unnaturally | Native review for each locale before publish |
| Keyword stuffing / doorway pages | One page per intent; clusters map to existing pages |
| Cannibalization home vs guide | Home targets generator/tool queries; guide targets how-to/examples/length |
| AdSense policy | No deceptive pages; keep privacy-first messaging |
| Vietnamese partial rollout | Reuse the existing partial-vi sitemap handling; do not add unreviewed vi URLs |
| Scope creep into new generator features | Length/passphrase/PIN already exist; verify discoverability first |

## 12. Rollout

1. **P0** — vi maps + SEO locale check + baseline GSC. Ship behind the normal release.
2. **P1** — home FAQ and guide sections per locale, starting with `en`, `ua`, `es`, `de`,
   `fr`, `pt`; then `ru`, `pl`, `it`, `ja`, `zh`, `vi`.
3. **P2** — internal links, content brief updates, monthly refresh.

---

_Prepared with an AI coding assistant. Keyword counts verified against `docs/keyword-map/keywords.json` (33,556 rows, 12 locales)._
