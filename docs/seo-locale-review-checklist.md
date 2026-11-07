# SEO locale review checklist

Prepared: 2026-11-07
Source of queries: `docs/keyword-map/locales/<code>.csv`, top 5 by `demandScore`
(highest 50 per locale are in `docs/content-agent-brief.json` → `keyword_targets`).

This checklist is for the native-language review required by issue #47. It is not
an instruction to insert keywords mechanically: home pages must keep targeting
generator/tool intent, while guides target how-to, length, passphrase, Wi-Fi and
examples intent.

## Status summary

| Locale | Language | Automated match | Top 5 queries |
|---|---|---:|---|
| `en` | English | 0/5 | `password ideas`<br>`how to create a strong password`<br>`best password manager`<br>`password manager`<br>`password examples` |
| `ua` | Ukrainian | 0/5 | `як створити надійний пароль`<br>`згенерувати пароль`<br>`надійний пароль`<br>`придумати пароль`<br>`приклади паролів` |
| `es` | Spanish | 0/5 | `buenas contraseñas`<br>`contraseña aleatoria`<br>`contraseña de 12 caracteres`<br>`contraseña segura`<br>`contraseña wifi` |
| `fr` | French | 0/5 | `mot de passe 12 caractères`<br>`mot de passe aléatoire`<br>`mot de passe sécurisé`<br>`comment créer un mot de passe sécurisé`<br>`créer un mot de passe` |
| `de` | German | 0/5 | `passphrase`<br>`passwort 12 zeichen`<br>`passwort erstellen`<br>`passwort manager`<br>`passwort prüfen` |
| `it` | Italian | 1/5 | `miglior gestore di password`<br>`come creare una password sicura`<br>`esempi di password`<br>`generatore di password`<br>`gestore di password` |
| `pt` | Portuguese (BR) | 1/5 | `como criar uma senha segura`<br>`criar senha`<br>`força da senha`<br>`gerador de senhas`<br>`gerenciador de senhas` |
| `ru` | Russian | 0/5 | `как создать надежный пароль`<br>`запомнить пароль`<br>`пароль из 12 символов`<br>`парольная фраза`<br>`безопасный пароль` |
| `zh` | Chinese (Simplified) | 1/5 | `12位密码`<br>`密码强度`<br>`密码短语`<br>`强密码`<br>`生成密码` |
| `ja` | Japanese | 0/5 | `12文字 パスワード`<br>`wifi パスワード`<br>`パスフレーズ`<br>`パスワード 作り方`<br>`パスワード 作成` |
| `pl` | Polish | 0/5 | `wygeneruj hasło`<br>`hasło 12 znaków`<br>`siła hasła`<br>`silne hasło`<br>`fraza hasłowa` |
| `vi` | Vietnamese | 0/5 | `trình quản lý mật khẩu tốt nhất`<br>`tạo mật khẩu ngẫu nhiên`<br>`cách tạo mật khẩu mạnh`<br>`mật khẩu ngẫu nhiên`<br>`cụm mật khẩu` |

An `Automated match` of 0 or 1 is expected for most locales because the current
home title/H1/FAQ were written for brand and generator intent, not for the query
map. The review should decide which queries belong on the home page, which
belong on a guide, and which should not be targeted at all.

## Per-locale review

### `en` — English

- **Top queries (keyword map):** `password ideas`, `how to create a strong password`, `best password manager`, `password manager`, `password examples`
- **Current title:** Strong Random Password Generator
- **Current H1:** Password Generator — Strong, Random, Free
- **Visible FAQ:** 4 items (storage, sources, trust, review). No length, passphrase or Wi-Fi questions yet.
- **Automated match:** 0/5
- [ ] Native reviewer confirms at least 3/5 are covered naturally, or proposes localized title/H1/FAQ wording.

### `ua` — Ukrainian

- **Top queries (keyword map):** `як створити надійний пароль`, `згенерувати пароль`, `надійний пароль`, `придумати пароль`, `приклади паролів`
- **Current title:** Генератор надійних паролів онлайн
- **Current H1:** Генератор паролів онлайн — надійні та випадкові
- **Visible FAQ:** 4 items (storage, sources, trust, review). No length, passphrase or Wi-Fi questions yet.
- **Automated match:** 0/5
- [ ] Native reviewer confirms at least 3/5 are covered naturally, or proposes localized title/H1/FAQ wording.

### `es` — Spanish

- **Top queries (keyword map):** `buenas contraseñas`, `contraseña aleatoria`, `contraseña de 12 caracteres`, `contraseña segura`, `contraseña wifi`
- **Current title:** Generador de contraseñas seguras
- **Current H1:** Generador de contraseñas — seguras y aleatorias
- **Visible FAQ:** 4 items (storage, sources, trust, review). No length, passphrase or Wi-Fi questions yet.
- **Automated match:** 0/5
- [ ] Native reviewer confirms at least 3/5 are covered naturally, or proposes localized title/H1/FAQ wording.

### `fr` — French

- **Top queries (keyword map):** `mot de passe 12 caractères`, `mot de passe aléatoire`, `mot de passe sécurisé`, `comment créer un mot de passe sécurisé`, `créer un mot de passe`
- **Current title:** Générateur de mots de passe forts
- **Current H1:** Générateur de mots de passe — forts et aléatoires
- **Visible FAQ:** 4 items (storage, sources, trust, review). No length, passphrase or Wi-Fi questions yet.
- **Automated match:** 0/5
- [ ] Native reviewer confirms at least 3/5 are covered naturally, or proposes localized title/H1/FAQ wording.

### `de` — German

- **Top queries (keyword map):** `passphrase`, `passwort 12 zeichen`, `passwort erstellen`, `passwort manager`, `passwort prüfen`
- **Current title:** Sicherer Passwort-Generator
- **Current H1:** Passwort-Generator — sicher, zufällig, kostenlos
- **Visible FAQ:** 4 items (storage, sources, trust, review). No length, passphrase or Wi-Fi questions yet.
- **Automated match:** 0/5
- [ ] Native reviewer confirms at least 3/5 are covered naturally, or proposes localized title/H1/FAQ wording.

### `it` — Italian

- **Top queries (keyword map):** `miglior gestore di password`, `come creare una password sicura`, `esempi di password`, `generatore di password`, `gestore di password`
- **Current title:** Generatore di password sicure
- **Current H1:** Generatore di password — sicure e casuali
- **Visible FAQ:** 4 items (storage, sources, trust, review). No length, passphrase or Wi-Fi questions yet.
- **Automated match:** 1/5 (`generatore di password`)
- [ ] Native reviewer confirms at least 3/5 are covered naturally, or proposes localized title/H1/FAQ wording.

### `pt` — Portuguese (BR)

- **Top queries (keyword map):** `como criar uma senha segura`, `criar senha`, `força da senha`, `gerador de senhas`, `gerenciador de senhas`
- **Current title:** Gerador de senhas fortes
- **Current H1:** Gerador de senhas — fortes e aleatórias
- **Visible FAQ:** 4 items (storage, sources, trust, review). No length, passphrase or Wi-Fi questions yet.
- **Automated match:** 1/5 (`gerador de senhas`)
- [ ] Native reviewer confirms at least 3/5 are covered naturally, or proposes localized title/H1/FAQ wording.

### `ru` — Russian

- **Top queries (keyword map):** `как создать надежный пароль`, `запомнить пароль`, `пароль из 12 символов`, `парольная фраза`, `безопасный пароль`
- **Current title:** Генератор надёжных паролей онлайн
- **Current H1:** Генератор паролей онлайн — надёжные и случайные
- **Visible FAQ:** 4 items (storage, sources, trust, review). No length, passphrase or Wi-Fi questions yet.
- **Automated match:** 0/5
- [ ] Native reviewer confirms at least 3/5 are covered naturally, or proposes localized title/H1/FAQ wording.

### `zh` — Chinese (Simplified)

- **Top queries (keyword map):** `12位密码`, `密码强度`, `密码短语`, `强密码`, `生成密码`
- **Current title:** 密码生成器 – 在线生成强密码
- **Current H1:** 密码生成器 — 强密码、随机生成
- **Visible FAQ:** 4 items (storage, sources, trust, review). No length, passphrase or Wi-Fi questions yet.
- **Automated match:** 1/5 (`强密码`)
- [ ] Native reviewer confirms at least 3/5 are covered naturally, or proposes localized title/H1/FAQ wording.

### `ja` — Japanese

- **Top queries (keyword map):** `12文字 パスワード`, `wifi パスワード`, `パスフレーズ`, `パスワード 作り方`, `パスワード 作成`
- **Current title:** パスワード自動生成 – 無料オンライン
- **Current H1:** パスワード自動生成 — 強力で無料
- **Visible FAQ:** 4 items (storage, sources, trust, review). No length, passphrase or Wi-Fi questions yet.
- **Automated match:** 0/5
- [ ] Native reviewer confirms at least 3/5 are covered naturally, or proposes localized title/H1/FAQ wording.

### `pl` — Polish

- **Top queries (keyword map):** `wygeneruj hasło`, `hasło 12 znaków`, `siła hasła`, `silne hasło`, `fraza hasłowa`
- **Current title:** Generator silnych haseł online
- **Current H1:** Generator haseł — silne i losowe
- **Visible FAQ:** 4 items (storage, sources, trust, review). No length, passphrase or Wi-Fi questions yet.
- **Automated match:** 0/5
- [ ] Native reviewer confirms at least 3/5 are covered naturally, or proposes localized title/H1/FAQ wording.

### `vi` — Vietnamese

- **Top queries (keyword map):** `trình quản lý mật khẩu tốt nhất`, `tạo mật khẩu ngẫu nhiên`, `cách tạo mật khẩu mạnh`, `mật khẩu ngẫu nhiên`, `cụm mật khẩu`
- **Current title:** Trình tạo mật khẩu mạnh
- **Current H1:** Trình tạo mật khẩu — mạnh và ngẫu nhiên
- **Visible FAQ:** 4 items (storage, sources, trust, review). No length, passphrase or Wi-Fi questions yet.
- **Automated match:** 0/5
- [ ] Native reviewer confirms at least 3/5 are covered naturally, or proposes localized title/H1/FAQ wording.

## Remaining content work (blocked on native review)

1. **P1.1 — home FAQ wording.** Add length, passphrase and Wi-Fi questions in
   each locale only after a native speaker writes/approves the copy. Keep the
   FAQPage JSON-LD in `src/lib/home-structured-data.ts` in lockstep with the
   visible accordion in `src/components/SeoAccordion.jsx`.
2. **P1.4 — password-manager platform sections.** Add Android, iPhone, Chrome
   and Google Password Manager sections to
   `src/app/[locale]/best-password-managers-2026/page.tsx` with localized copy
   from the affiliate string files.
3. **P1.5 — Wi-Fi guide translations.** The English guide is live at
   `/en/guides/wifi-password-guide`. Translate and review it per locale, then
   add the locale to `guideLocaleAvailability` in `next-sitemap.config.js`
   (and to `viTranslatedGuideSlugs` for Vietnamese). Until then the route is
   not generated for that locale and returns 404 by design.

## Measurement

The per-locale baseline is in `docs/gsc-baseline-2026-11-07.json`. Re-run
`npm run gsc:baseline` after 2-4 weeks and compare per locale and per query,
not just site totals. GSC returned no query-level rows for the baseline window,
so the next run is the first one that can show query movement.
