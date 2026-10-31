# Keyword strategy — generatepasswordto.me (2026-10-31)

Method: Google autocomplete per locale (11 locales, 437 unique suggestions).
Raw data: `docs/keyword-research.json` (regenerate: `npm run keywords`).

Limitations: autocomplete shows *real demand* and *relative popularity* (order), but not
absolute volume or difficulty. Exact volumes need a paid source (DataForSEO / Ahrefs /
Semrush) or GSC query data once the site accumulates impressions (2–4 weeks).

## Clusters found

### 1. Core generator terms (all locales) — already covered
`password generator`, `strong/random password generator`, `online`, `free`,
`генератор паролів/паролей`, `generator haseł`, `passwort generator`,
`generador de contraseñas`, `générateur de mot de passe`, `generatore di password`,
`gerador de senhas`, `パスワード 生成`, `密码生成器`.

Status: home page + 11 locale home pages target these in title/H1. Keep as-is; verify each
locale's title contains the local term first (already done in the SEO pass).

### 2. Length-specific queries — high volume, not covered
`password generator 8/12/15/16/20 characters`, `генератор паролів 12 символів`,
`генератор паролей 8/12/16 символов`, `silne hasło ile znaków`.

Intent: user wants a password of an exact length (often because a service requires it).
Existing gap: the generator has a length slider, but no page/section answers "12 characters".

Actions (content, not doorway pages):
- Home: add an FAQ entry + preset links answering "How long should a password be?"
  with 8/12/16/20 anchors; make the presets actually set the slider (already possible via URL
  param or a chip row).
- `how-to-create-strong-passwords` guide: add an H2 "Password length: 8 vs 12 vs 16 vs 20"
  with a table and internal link to the generator.
- Localized titles for those FAQ blocks from the query wording (e.g. UA "12 символів").

### 3. Passphrase / words / easy to remember — high volume, product gap
`password generator words`, `passphrase generator`, `strong password generator easy to remember`,
`генератор паролів словами`, `парольная фраза`, `generator haseł słownikowych`,
`generator haseł łatwych do zapamiętania`.

Intent: memorable passwords, not random strings.
Existing: only the `passphrase-vs-password-entropy` guide (informational).
Gap: there is **no passphrase generator mode**.

Action (product): add a "words" mode to the generator (EFF long wordlist, 4–6 words,
separator + capitalization options). This is the single largest missing feature by demand and
it differentiates from generic generators. Also unlocks a new landing section targeting
"passphrase generator" + local equivalents.

### 4. Password managers / platform queries — covered partially
`password manager google/chrome/android/iphone`, `менеджер паролів google/хром/андроїд/айфон`,
`menedżer haseł w telefonie`, `gestor de contraseñas`, `パスワード 管理`.

Existing: `best-password-managers-2026` + `password-manager-vs-manual-storage`.
Action: add per-platform sections/FAQ (Android, iPhone, Chrome, Google Password Manager)
with internal links; these are informational queries that funnel to the comparison page
(and its affiliate CTA).

### 5. How-to / instructional — covered
`how to create a strong password`, `як створити пароль`, `как создать пароль`,
`come creare una password sicura`, `como criar uma senha segura`,
`comment créer un mot de passe sécurisé`.

Existing: `how-to-create-strong-passwords` in all locales. Verify title/meta include the
question phrasing; add an FAQ block with the exact query text.

### 6. Local institution queries (UA/RU) — skip
`приват24`, `ощад 24`, `смарт id`, `ржд`, `макс`, `айклауд`.

Very high specificity, low commercial value, and thin-content risk if we build pages per
service. Optional: one FAQ item in the UA guide "password requirements of Ukrainian banks"
without dedicated URLs.

### 7. Brand navigational (ESET, 1Password, LastPass, Delinea, Google) — ignore for now
Pure navigational intent. Later these can become affiliate comparison pages
(e.g. "NordPass vs 1Password") — separate content project, needs legal care.

## Prioritized plan

| # | Action | Type | Effort | Impact |
|---|---|---|---|---|
| 1 | FAQ + presets for exact lengths (8/12/16/20) on home + guide | content | S | medium–high |
| 2 | Passphrase ("words") generator mode + landing section | product | M | high |
| 3 | Per-platform sections on password-manager pages | content | S | medium |
| 4 | FAQ phrasing aligned with autocomplete wording per locale | content | S | medium |
| 5 | GSC-driven rewrite of titles/descriptions for queries at position 5–20 | content | M | high (after data) |
| 6 | Optional paid volume/difficulty data (DataForSEO or similar) | tooling | S | decision input |

## Next data checkpoint

Re-run `npm run gsc` after 2–3 weeks. Then optimize against **real queries** from
Performance → Search results (filter position 4–20, impressions > 0) instead of guessing
volumes. Keyword research should be refreshed (`npm run keywords`) monthly.
