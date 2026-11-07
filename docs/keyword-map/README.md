# Keyword map — password & security queries (all locales)

Generated: **2026-11-07T00:38:06.993Z**

**33,556 keyword rows** (32,674 distinct phrases, unique within each locale) across **12 locales**, collected exclusively from free autocomplete endpoints (Google, Bing, DuckDuckGo). No paid SEO API, no search-volume estimates passed off as facts.

**Languages (12/12):** `en` English · `ua` Ukrainian · `ru` Russian · `pl` Polish · `de` German · `es` Spanish · `fr` French · `it` Italian · `pt` Portuguese (BR) · `ja` Japanese · `zh` Chinese (Simplified) · `vi` Vietnamese

## Coverage check

- Largest locale: **en** with **5,798** keywords.
- Smallest locale: **ua** with **1,039** keywords.
- Goal check (at least 1,000 for one language): **PASS**, 12/12 locales at 1,000+.

| Locale | Language | Keywords | P1 | P2 | P3 | Top cluster | Requests (G/B/D) |
|---|---|---:|---:|---:|---:|---|---|
| `en` | English | **5,798** | 402 | 2228 | 3168 | strength (1175) | 629/14/14 |
| `ua` | Ukrainian | **1,039** | 220 | 368 | 451 | wifi (157) | 3293/14/14 |
| `ru` | Russian | **1,997** | 346 | 754 | 897 | wifi (487) | 3293/14/14 |
| `pl` | Polish | **3,697** | 257 | 1209 | 2231 | howto (816) | 3293/14/14 |
| `de` | German | **3,181** | 149 | 2408 | 624 | generator (554) | 629/14/14 |
| `es` | Spanish | **3,407** | 200 | 2280 | 927 | generator (711) | 629/14/14 |
| `fr` | French | **2,772** | 130 | 1210 | 1432 | generator (533) | 629/14/14 |
| `it` | Italian | **2,734** | 148 | 2150 | 436 | generator (570) | 629/14/14 |
| `pt` | Portuguese (BR) | **2,918** | 167 | 2222 | 529 | generator (671) | 629/14/14 |
| `ja` | Japanese | **1,933** | 106 | 1216 | 611 | generator (363) | 714/14/14 |
| `zh` | Chinese (Simplified) | **1,315** | 21 | 1155 | 139 | account (186) | 697/14/14 |
| `vi` | Vietnamese | **2,765** | 160 | 2175 | 430 | generator (603) | 629/14/14 |

Every locale in the site is covered. Codes follow the app (`ua`, not `uk`); exported hreflang equivalents: `ua → uk`, `pt → pt-BR`, `zh → zh-CN`. Per-language slices are in `locales/<code>.csv`; `languages.csv` is the index.

## Method

1. **Seeds** — 17 commercial and informational heads per locale (generator, strength, manager, passphrase, policy, Wi-Fi, examples…).
2. **Sweep** — every seed queried alone and with each alphabet/character suffix (`password a…z0…9`, `密码 的/怎么/…`), returning 10–15 real Google suggestions per call.
3. **Head expansion** — the strongest newly discovered heads are expanded again, up to four rounds or until the locale target is met.
4. **Cross-engine** — Bing Suggest and DuckDuckGo Autocomplete run on the core seeds for diversity.
5. **Filter** — keep queries containing the locale password root (or a security-adjacent term), drop game/movie/hack/crack/NSFW intents.
6. **Score** — `demandScore` 0–100 = 40% seed/head prior, 30% suggestion frequency (log), 20% best rank, 10% engine coverage. Google relevance is not used because only one client variant returns it. Scores are calibrated within a locale — use them to prioritise inside a language, not as an absolute cross-language ranking.
7. **Map** — each keyword gets a cluster, intent, priority and a target route; uncovered demand is flagged `gap-new` / `gap-feature`.

> **Rate limiting:** Google blocks high-volume clients with HTTP 403. Requests are spaced 70–160 ms apart; after 25 consecutive 403s the collector stops that locale rather than hammering the endpoint. Google Suggest is queried via `client=firefox` (10 results); early locales were captured via `client=chrome` (15 results), so counts are conservative, not inflated.

> **Honest limitation:** autocomplete provides real query wording and relative demand signals, not absolute monthly volumes. Attach Google Search Console or Keyword Planner data before forecasting traffic.

## Sources

| Source | Status | Role |
|---|---|---|
| Google Suggest (`client=firefox` / `client=chrome`) | Used | Primary query corpus and ranking signal |
| Bing Suggest (`osjson.aspx`, per-market) | Used | Cross-engine suggestions for core seeds |
| DuckDuckGo Autocomplete | Used | Cross-engine suggestions for core seeds |
| Google Trends | Not used | Returned HTTP 429 from this network during collection |
| Google Search Console | Not used | Needs property access/credentials; best source of real impressions |
| Ahrefs / Semrush / Ubersuggest free tiers | Not used | Interactive accounts/CAPTCHA; no API access from this environment |

## Cluster matrix (keyword counts)

| Cluster | en | ua | ru | pl | de | es | fr | it | pt | ja | zh | vi | Total |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| generator | 547 | 149 | 431 | 355 | 554 | 711 | 533 | 570 | 671 | 363 | 155 | 603 | 5642 |
| strength | 1175 | 57 | 123 | 632 | 450 | 699 | 373 | 260 | 596 | 119 | 170 | 526 | 5180 |
| howto | 167 | 124 | 94 | 816 | 0 | 135 | 233 | 167 | 137 | 73 | 58 | 0 | 2004 |
| length | 736 | 125 | 263 | 428 | 317 | 508 | 438 | 309 | 486 | 186 | 178 | 301 | 4275 |
| check | 297 | 20 | 56 | 496 | 148 | 166 | 136 | 107 | 187 | 255 | 70 | 247 | 2185 |
| examples | 254 | 29 | 64 | 234 | 131 | 162 | 87 | 96 | 99 | 68 | 52 | 112 | 1388 |
| passphrase | 448 | 11 | 32 | 284 | 311 | 147 | 2 | 309 | 1 | 70 | 85 | 60 | 1760 |
| manager | 887 | 74 | 220 | 6 | 426 | 423 | 174 | 296 | 349 | 307 | 174 | 284 | 3620 |
| policy | 372 | 40 | 33 | 20 | 142 | 106 | 21 | 94 | 83 | 80 | 76 | 100 | 1167 |
| breach | 23 | 1 | 4 | 4 | 2 | 2 | 7 | 0 | 1 | 0 | 0 | 1 | 45 |
| twofa | 10 | 1 | 1 | 5 | 1 | 1 | 2 | 2 | 3 | 0 | 0 | 22 | 48 |
| pin | 2 | 0 | 0 | 0 | 0 | 2 | 0 | 0 | 2 | 0 | 0 | 2 | 8 |
| wifi | 477 | 157 | 487 | 328 | 292 | 336 | 311 | 323 | 296 | 146 | 63 | 335 | 3551 |
| account | 31 | 36 | 29 | 1 | 326 | 8 | 97 | 19 | 4 | 229 | 186 | 35 | 1001 |
| platform | 15 | 87 | 32 | 16 | 18 | 0 | 99 | 37 | 0 | 6 | 0 | 24 | 334 |
| ideas | 264 | 2 | 0 | 1 | 3 | 1 | 0 | 0 | 1 | 0 | 0 | 0 | 272 |
| other | 93 | 126 | 128 | 71 | 60 | 0 | 259 | 145 | 2 | 31 | 48 | 113 | 1076 |

## Gaps worth building

| Cluster | Proposed target | Keywords | Avg score | Examples |
|---|---|---:|---:|---|
| passphrase | `/ua/guides/passphrase-vs-password-entropy` | 11 | 64 | парольна фраза · парольна фраза гугл · парольна фраза chrome · пароль фраза |
| passphrase | `/ru/guides/passphrase-vs-password-entropy` | 32 | 59 | парольная фраза · парольная фраза генератор · парольная фраза опера · парольная фраза пример |
| passphrase | `/vi/guides/passphrase-vs-password-entropy` | 60 | 55 | cụm mật khẩu · cụm mật khẩu 24 từ của pi · ví dụ mật khẩu mạnh dễ nhớ · cụm mật khẩu chrome là gì |
| passphrase | `/zh/guides/passphrase-vs-password-entropy` | 85 | 55 | 密码短语 · 最好的密码管理器 短语不显示 · 好密码 短语查询 · 密码 例子 短语 例子 |
| passphrase | `/es/guides/passphrase-vs-password-entropy` | 147 | 52 | frase de contraseña · frase de contraseña google · frase de contraseña wpa no valida · frase de contraseña de chrome |
| passphrase | `/ja/guides/passphrase-vs-password-entropy` | 70 | 51 | パスフレーズ · パスフレーズ 生成 · パスフレーズ 英語 · パスフレーズ 例 |
| wifi | `/zh/guides/wifi-password-guide` | 63 | 51 | wifi密码 · wifi密码查看器 · wifi密码 中文 · wifi密码 了解 |
| wifi | `/ja/guides/wifi-password-guide` | 146 | 49 | wifi パスワード · wifi パスワード 変更 · wifi パスワード どこ · wifi パスワード qrコード 作成 |
| wifi | `/de/guides/wifi-password-guide` | 292 | 49 | wlan passwort · wlan passwort anzeigen · wlan passwort anzeigen iphone · wlan passwort anzeigen windows 11 |
| wifi | `/pt/guides/wifi-password-guide` | 296 | 49 | senha wifi · senha wifi epson l3250 · senha wifi windows 10 · senha wifi windows 11 |
| pin | `/vi` | 2 | 49 | cách tạo mật khẩu mạnh pin · mật khẩu mạnh pin |
| wifi | `/vi/guides/wifi-password-guide` | 335 | 49 | mật khẩu wifi · mật khẩu wifi xe mạnh hùng · chính sách mật khẩu wifi · mật khẩu wifi mạnh |
| passphrase | `/it/guides/passphrase-vs-password-entropy` | 309 | 49 | passphrase · passphrase generator · passphrase adalah · passphrase examples |
| passphrase | `/de/guides/passphrase-vs-password-entropy` | 311 | 49 | passphrase · passphrase generator · passphrase meaning · passphrase vs password |
| wifi | `/es/guides/wifi-password-guide` | 336 | 48 | contraseña wifi · contraseña wifi windows 10 · generador de contraseñas wifi · contraseña wifi impresora hp |

## Top keywords per locale

<details><summary><strong>en</strong> — English (5798 keywords)</summary>

| # | Keyword | Cluster | Intent | Score | Target |
|---:|---|---|---|---:|---|
| 1 | password ideas | ideas | informational | 89 | `/en/guides/how-to-create-strong-passwords` |
| 2 | how to create a strong password | howto | informational | 88 | `/en/guides/how-to-create-strong-passwords` |
| 3 | best password manager | manager | commercial | 84 | `/en/best-password-managers-2026` |
| 4 | password manager | manager | commercial | 82 | `/en/best-password-managers-2026` |
| 5 | password examples | examples | informational | 81 | `/en/guides/how-to-create-strong-passwords` |
| 6 | 12 character password examples | length | informational | 80 | `/en/guides/how-to-create-strong-passwords` |
| 7 | password policy | policy | informational | 79 | `/en/guides/team-password-policy-template` |
| 8 | password ideas list | ideas | informational | 78 | `/en/guides/how-to-create-strong-passwords` |
| 9 | 12 character password reddit | length | informational | 78 | `/en/guides/how-to-create-strong-passwords` |
| 10 | 12 character password meaning | length | informational | 77 | `/en/guides/how-to-create-strong-passwords` |
| 11 | password checker | check | informational | 76 | `/en/guides/how-to-create-strong-passwords` |
| 12 | password generator | generator | tool | 76 | `/en` |
| 13 | random password | generator | tool | 76 | `/en` |
| 14 | 12 character password | length | informational | 76 | `/en/guides/how-to-create-strong-passwords` |
| 15 | 12 character password list | length | informational | 76 | `/en/guides/how-to-create-strong-passwords` |
| 16 | passphrase | passphrase | informational | 76 | `/en/guides/passphrase-vs-password-entropy` |
| 17 | generate secure password | strength | tool | 76 | `/en/guides/how-to-create-strong-passwords` |
| 18 | good passwords | strength | informational | 76 | `/en/guides/how-to-create-strong-passwords` |
| 19 | password strength | strength | informational | 76 | `/en/guides/how-to-create-strong-passwords` |
| 20 | strong password | strength | informational | 76 | `/en/guides/how-to-create-strong-passwords` |
| 21 | wifi password | wifi | informational | 76 | `/en/guides/wifi-password-guide` |
| 22 | password ideas for work | ideas | informational | 75 | `/en/guides/how-to-create-strong-passwords` |
| 23 | passphrase examples | passphrase | informational | 75 | `/en/guides/passphrase-vs-password-entropy` |
| 24 | password examples for work | examples | informational | 74 | `/en/guides/how-to-create-strong-passwords` |
| 25 | password examples list | examples | informational | 74 | `/en/guides/how-to-create-strong-passwords` |
| 26 | password examples to use | examples | informational | 74 | `/en/guides/how-to-create-strong-passwords` |
| 27 | how to create a strong password and remember it | howto | informational | 74 | `/en/guides/how-to-create-strong-passwords` |
| 28 | 12 character password policy | length | informational | 74 | `/en/guides/how-to-create-strong-passwords` |
| 29 | how to create a strong password 2022 | length | informational | 74 | `/en/guides/how-to-create-strong-passwords` |
| 30 | memorable password creator | passphrase | informational | 74 | `/en/guides/passphrase-vs-password-entropy` |

</details>

<details><summary><strong>ua</strong> — Ukrainian (1039 keywords)</summary>

| # | Keyword | Cluster | Intent | Score | Target |
|---:|---|---|---|---:|---|
| 1 | згенерувати пароль | generator | tool | 100 | `/ua` |
| 2 | придумати пароль | generator | tool | 100 | `/ua` |
| 3 | як створити надійний пароль | howto | informational | 100 | `/ua/guides/how-to-create-strong-passwords` |
| 4 | надійний пароль | strength | informational | 100 | `/ua/guides/how-to-create-strong-passwords` |
| 5 | перевірити пароль | check | informational | 97 | `/ua/guides/how-to-create-strong-passwords` |
| 6 | приклади паролів | examples | informational | 97 | `/ua/guides/how-to-create-strong-passwords` |
| 7 | парольна фраза | passphrase | informational | 97 | `/ua/guides/passphrase-vs-password-entropy` |
| 8 | гарний пароль | strength | informational | 97 | `/ua/guides/how-to-create-strong-passwords` |
| 9 | випадковий пароль | generator | tool | 93 | `/ua` |
| 10 | політика паролів | policy | informational | 93 | `/ua/guides/team-password-policy-template` |
| 11 | пароль онлайн | generator | tool | 92 | `/ua` |
| 12 | надійний пароль приклад | examples | informational | 85 | `/ua/guides/how-to-create-strong-passwords` |
| 13 | безпечний пароль | strength | informational | 85 | `/ua/guides/how-to-create-strong-passwords` |
| 14 | перевірити пароль на надійність | check | informational | 81 | `/ua/guides/how-to-create-strong-passwords` |
| 15 | генератор паролів гугл | generator | tool | 81 | `/ua` |
| 16 | генератор паролів google | generator | navigational | 81 | `/ua` |
| 17 | згенерувати пароль гугл | generator | tool | 81 | `/ua` |
| 18 | згенерувати пароль онлайн | generator | tool | 81 | `/ua` |
| 19 | придумать пароль онлайн | generator | tool | 81 | `/ua` |
| 20 | як створити надійний пароль інформація | howto | informational | 81 | `/ua/guides/how-to-create-strong-passwords` |
| 21 | як створити надійний пароль презентація | howto | informational | 81 | `/ua/guides/how-to-create-strong-passwords` |
| 22 | надійний пароль з 8 символів | length | informational | 81 | `/ua/guides/how-to-create-strong-passwords` |
| 23 | надійний пароль має містити комбінацію із щонайменше 8 літер цифр і символів | length | informational | 81 | `/ua/guides/how-to-create-strong-passwords` |
| 24 | пароль з 12 символів | length | informational | 81 | `/ua/guides/how-to-create-strong-passwords` |
| 25 | менеджер паролів в телефоні | manager | commercial | 81 | `/ua/best-password-managers-2026` |
| 26 | менеджер паролів на андроїд | manager | commercial | 81 | `/ua/best-password-managers-2026` |
| 27 | менеджер паролів android | manager | commercial | 81 | `/ua/best-password-managers-2026` |
| 28 | парольна фраза гугл | passphrase | informational | 81 | `/ua/guides/passphrase-vs-password-entropy` |
| 29 | парольна фраза chrome | passphrase | navigational | 81 | `/ua/guides/passphrase-vs-password-entropy` |
| 30 | політика паролів це | policy | informational | 81 | `/ua/guides/team-password-policy-template` |

</details>

<details><summary><strong>ru</strong> — Russian (1997 keywords)</summary>

| # | Keyword | Cluster | Intent | Score | Target |
|---:|---|---|---|---:|---|
| 1 | как создать надежный пароль | howto | informational | 100 | `/ru/guides/how-to-create-strong-passwords` |
| 2 | запомнить пароль | other | informational | 100 | `/ru` |
| 3 | пароль из 12 символов | length | informational | 97 | `/ru/guides/how-to-create-strong-passwords` |
| 4 | парольная фраза | passphrase | informational | 97 | `/ru/guides/passphrase-vs-password-entropy` |
| 5 | безопасный пароль | other | informational | 93 | `/ru` |
| 6 | хороший пароль | strength | informational | 84 | `/ru/guides/how-to-create-strong-passwords` |
| 7 | надежный пароль проверить | check | informational | 81 | `/ru/guides/how-to-create-strong-passwords` |
| 8 | надежный пароль проверка | check | informational | 81 | `/ru/guides/how-to-create-strong-passwords` |
| 9 | безопасный пароль пример | examples | informational | 81 | `/ru/guides/how-to-create-strong-passwords` |
| 10 | примеры паролей для аккаунта | examples | informational | 81 | `/ru/guides/how-to-create-strong-passwords` |
| 11 | примеры паролей для вк | examples | informational | 81 | `/ru/guides/how-to-create-strong-passwords` |
| 12 | примеры паролей для гугл аккаунта | examples | informational | 81 | `/ru/guides/how-to-create-strong-passwords` |
| 13 | примеры паролей для гугла | examples | informational | 81 | `/ru/guides/how-to-create-strong-passwords` |
| 14 | примеры паролей для почты | examples | informational | 81 | `/ru/guides/how-to-create-strong-passwords` |
| 15 | примеры паролей для регистрации | examples | informational | 81 | `/ru/guides/how-to-create-strong-passwords` |
| 16 | примеры паролей для учетной записи | examples | informational | 81 | `/ru/guides/how-to-create-strong-passwords` |
| 17 | примеры паролей для электронной почты | examples | informational | 81 | `/ru/guides/how-to-create-strong-passwords` |
| 18 | примеры паролей для google | examples | navigational | 81 | `/ru/guides/how-to-create-strong-passwords` |
| 19 | случайный пароль генератор | generator | tool | 81 | `/ru` |
| 20 | случайный пароль онлайн | generator | tool | 81 | `/ru` |
| 21 | как создать надежный пароль для аккаунта | howto | informational | 81 | `/ru/guides/how-to-create-strong-passwords` |
| 22 | пароль из 12 символов пример | length | informational | 81 | `/ru/guides/how-to-create-strong-passwords` |
| 23 | политика паролей server 2019 | length | informational | 81 | `/ru/guides/how-to-create-strong-passwords` |
| 24 | политика паролей windows server 2008 | length | informational | 81 | `/ru/guides/how-to-create-strong-passwords` |
| 25 | политика паролей windows server 2016 | length | informational | 81 | `/ru/guides/how-to-create-strong-passwords` |
| 26 | политика паролей windows server 2019 | length | informational | 81 | `/ru/guides/how-to-create-strong-passwords` |
| 27 | политика паролей windows server 2022 | length | informational | 81 | `/ru/guides/how-to-create-strong-passwords` |
| 28 | сложный пароль из 12 символов | length | informational | 81 | `/ru/guides/how-to-create-strong-passwords` |
| 29 | случайный пароль 10 символов | length | informational | 81 | `/ru/guides/how-to-create-strong-passwords` |
| 30 | случайный пароль из 8 символов | length | informational | 81 | `/ru/guides/how-to-create-strong-passwords` |

</details>

<details><summary><strong>pl</strong> — Polish (3697 keywords)</summary>

| # | Keyword | Cluster | Intent | Score | Target |
|---:|---|---|---|---:|---|
| 1 | wygeneruj hasło | generator | tool | 100 | `/pl` |
| 2 | hasło 12 znaków | length | informational | 100 | `/pl/guides/how-to-create-strong-passwords` |
| 3 | siła hasła | strength | informational | 100 | `/pl/guides/how-to-create-strong-passwords` |
| 4 | silne hasło | strength | informational | 100 | `/pl/guides/how-to-create-strong-passwords` |
| 5 | sprawdź hasło | check | informational | 97 | `/pl/guides/how-to-create-strong-passwords` |
| 6 | fraza hasłowa | passphrase | informational | 97 | `/pl/guides/passphrase-vs-password-entropy` |
| 7 | losowe hasło | generator | tool | 95 | `/pl` |
| 8 | dobre hasła | other | informational | 88 | `/pl` |
| 9 | siła hasła test | check | informational | 85 | `/pl/guides/how-to-create-strong-passwords` |
| 10 | silne hasło przykłady | examples | informational | 85 | `/pl/guides/how-to-create-strong-passwords` |
| 11 | jak utworzyć silne i bezpieczne hasło | howto | informational | 85 | `/pl/guides/how-to-create-strong-passwords` |
| 12 | silne hasło ile znaków | length | informational | 85 | `/pl/guides/how-to-create-strong-passwords` |
| 13 | silne hasło definicja | strength | informational | 85 | `/pl/guides/how-to-create-strong-passwords` |
| 14 | silne hasło powinno | strength | informational | 85 | `/pl/guides/how-to-create-strong-passwords` |
| 15 | silne hasło powinno zawierać | strength | informational | 85 | `/pl/guides/how-to-create-strong-passwords` |
| 16 | siła hasła sprawdzenie | check | informational | 81 | `/pl/guides/how-to-create-strong-passwords` |
| 17 | silne hasło sprawdzanie | check | informational | 81 | `/pl/guides/how-to-create-strong-passwords` |
| 18 | silne hasło test | check | informational | 81 | `/pl/guides/how-to-create-strong-passwords` |
| 19 | sprawdź hasło do wifi | check | informational | 81 | `/pl/guides/how-to-create-strong-passwords` |
| 20 | sprawdź hasło google | check | navigational | 81 | `/pl/guides/how-to-create-strong-passwords` |
| 21 | sprawdzić hasło do wifi android | check | informational | 81 | `/pl/guides/how-to-create-strong-passwords` |
| 22 | sprawdzić hasło do wifi na komputerze | check | informational | 81 | `/pl/guides/how-to-create-strong-passwords` |
| 23 | silne hasło przykład | examples | informational | 81 | `/pl/guides/how-to-create-strong-passwords` |
| 24 | losowe hasło generator | generator | tool | 81 | `/pl` |
| 25 | wygeneruj hasło google | generator | navigational | 81 | `/pl` |
| 26 | jak tworzyć silne hasło | howto | informational | 81 | `/pl/guides/how-to-create-strong-passwords` |
| 27 | jak utworzyć bezpieczne hasło | howto | informational | 81 | `/pl/guides/how-to-create-strong-passwords` |
| 28 | jak utworzyć bezpieczne hasło do konta | howto | informational | 81 | `/pl/guides/how-to-create-strong-passwords` |
| 29 | jak utworzyć silne hasło | howto | informational | 81 | `/pl/guides/how-to-create-strong-passwords` |
| 30 | jak utworzyć silne hasło krok po kroku | howto | informational | 81 | `/pl/guides/how-to-create-strong-passwords` |

</details>

<details><summary><strong>de</strong> — German (3181 keywords)</summary>

| # | Keyword | Cluster | Intent | Score | Target |
|---:|---|---|---|---:|---|
| 1 | passwort prüfen | check | informational | 82 | `/de/guides/how-to-create-strong-passwords` |
| 2 | passwort erstellen | generator | tool | 82 | `/de` |
| 3 | zufälliges passwort | generator | tool | 82 | `/de` |
| 4 | passwort 12 zeichen | length | informational | 82 | `/de/guides/how-to-create-strong-passwords` |
| 5 | passwort manager | manager | commercial | 82 | `/de/best-password-managers-2026` |
| 6 | passphrase | passphrase | informational | 82 | `/de/guides/passphrase-vs-password-entropy` |
| 7 | sicheres passwort | strength | informational | 82 | `/de/guides/how-to-create-strong-passwords` |
| 8 | wie erstelle ich ein sicheres passwort | strength | tool | 82 | `/de/guides/how-to-create-strong-passwords` |
| 9 | passwort beispiele | examples | informational | 76 | `/de/guides/how-to-create-strong-passwords` |
| 10 | passwort generator | generator | tool | 76 | `/de` |
| 11 | bester passwort manager | manager | commercial | 76 | `/de/best-password-managers-2026` |
| 12 | passwort stärke | other | informational | 76 | `/de` |
| 13 | wlan passwort | wifi | informational | 76 | `/de/guides/wifi-password-guide` |
| 14 | passwort vergessen | account | informational | 69 | `/de` |
| 15 | passphrase generator | passphrase | tool | 69 | `/de/guides/passphrase-vs-password-entropy` |
| 16 | passwort richtlinien | policy | informational | 69 | `/de/guides/team-password-policy-template` |
| 17 | wlan passwort anzeigen | wifi | informational | 69 | `/de/guides/wifi-password-guide` |
| 18 | wlan passwort vergessen | account | informational | 67 | `/de` |
| 19 | sicheres passwort beispiel | examples | informational | 67 | `/de/guides/how-to-create-strong-passwords` |
| 20 | passwort erstellen lassen | generator | tool | 67 | `/de` |
| 21 | passwort erstellen online | generator | tool | 67 | `/de` |
| 22 | passwort generator online | generator | tool | 67 | `/de` |
| 23 | passwort erstellen 12 zeichen | length | tool | 67 | `/de/guides/how-to-create-strong-passwords` |
| 24 | zufälliges passwort 12 zeichen | length | informational | 67 | `/de/guides/how-to-create-strong-passwords` |
| 25 | bester passwort manager ios | manager | commercial | 67 | `/de/best-password-managers-2026` |
| 26 | bester passwort manager windows 11 | manager | commercial | 67 | `/de/best-password-managers-2026` |
| 27 | passwort manager kostenlos | manager | commercial | 67 | `/de/best-password-managers-2026` |
| 28 | sicheres passwort erstellen | strength | tool | 67 | `/de/guides/how-to-create-strong-passwords` |
| 29 | sicheres passwort generieren | strength | tool | 67 | `/de/guides/how-to-create-strong-passwords` |
| 30 | sicheres passwort testen | strength | informational | 67 | `/de/guides/how-to-create-strong-passwords` |

</details>

<details><summary><strong>es</strong> — Spanish (3407 keywords)</summary>

| # | Keyword | Cluster | Intent | Score | Target |
|---:|---|---|---|---:|---|
| 1 | ejemplos de contraseñas | examples | informational | 82 | `/es/guides/how-to-create-strong-passwords` |
| 2 | contraseña aleatoria | generator | tool | 82 | `/es` |
| 3 | crear contraseña | generator | tool | 82 | `/es` |
| 4 | generador de contraseñas | generator | tool | 82 | `/es` |
| 5 | contraseña de 12 caracteres | length | informational | 82 | `/es/guides/how-to-create-strong-passwords` |
| 6 | gestor de contraseñas | manager | commercial | 82 | `/es/best-password-managers-2026` |
| 7 | mejor gestor de contraseñas | manager | commercial | 82 | `/es/best-password-managers-2026` |
| 8 | frase de contraseña | passphrase | informational | 82 | `/es/guides/passphrase-vs-password-entropy` |
| 9 | buenas contraseñas | strength | informational | 82 | `/es/guides/how-to-create-strong-passwords` |
| 10 | contraseña segura | strength | informational | 82 | `/es/guides/how-to-create-strong-passwords` |
| 11 | contraseña wifi | wifi | informational | 82 | `/es/guides/wifi-password-guide` |
| 12 | verificar contraseña | check | informational | 76 | `/es/guides/how-to-create-strong-passwords` |
| 13 | cómo crear una contraseña segura | howto | informational | 76 | `/es/guides/how-to-create-strong-passwords` |
| 14 | seguridad de contraseña | strength | informational | 76 | `/es/guides/how-to-create-strong-passwords` |
| 15 | crear contraseña aleatoria | generator | tool | 70 | `/es` |
| 16 | verificar contraseña e firma | check | informational | 69 | `/es/guides/how-to-create-strong-passwords` |
| 17 | generar contraseña | generator | tool | 69 | `/es` |
| 18 | ejemplos de contraseñas de 8 caracteres | length | informational | 69 | `/es/guides/how-to-create-strong-passwords` |
| 19 | contraseña fuerte | strength | informational | 69 | `/es/guides/how-to-create-strong-passwords` |
| 20 | crear contraseña segura | strength | tool | 69 | `/es/guides/how-to-create-strong-passwords` |
| 21 | seguridad de contraseña test | check | informational | 67 | `/es/guides/how-to-create-strong-passwords` |
| 22 | verificar contraseña registraduria | check | informational | 67 | `/es/guides/how-to-create-strong-passwords` |
| 23 | verificar contraseña sat | check | informational | 67 | `/es/guides/how-to-create-strong-passwords` |
| 24 | 5 ejemplos de contraseñas seguras | examples | informational | 67 | `/es/guides/how-to-create-strong-passwords` |
| 25 | contraseña segura ejemplo | examples | informational | 67 | `/es/guides/how-to-create-strong-passwords` |
| 26 | ejemplos de contraseñas inseguras | examples | informational | 67 | `/es/guides/how-to-create-strong-passwords` |
| 27 | ejemplos de contraseñas poco seguras | examples | informational | 67 | `/es/guides/how-to-create-strong-passwords` |
| 28 | ejemplos de contraseñas seguras | examples | informational | 67 | `/es/guides/how-to-create-strong-passwords` |
| 29 | contraseña aleatoria avast | generator | tool | 67 | `/es` |
| 30 | contraseña aleatoria google | generator | navigational | 67 | `/es` |

</details>

<details><summary><strong>fr</strong> — French (2772 keywords)</summary>

| # | Keyword | Cluster | Intent | Score | Target |
|---:|---|---|---|---:|---|
| 1 | mot de passe aléatoire | generator | tool | 84 | `/fr` |
| 2 | mot de passe 12 caractères | length | informational | 84 | `/fr/guides/how-to-create-strong-passwords` |
| 3 | mot de passe sécurisé | strength | informational | 84 | `/fr/guides/how-to-create-strong-passwords` |
| 4 | vérifier mot de passe | check | informational | 82 | `/fr/guides/how-to-create-strong-passwords` |
| 5 | créer un mot de passe | generator | tool | 82 | `/fr` |
| 6 | générateur de mot de passe | generator | tool | 82 | `/fr` |
| 7 | comment créer un mot de passe sécurisé | howto | informational | 82 | `/fr/guides/how-to-create-strong-passwords` |
| 8 | force du mot de passe | strength | informational | 82 | `/fr/guides/how-to-create-strong-passwords` |
| 9 | mot de passe wifi | wifi | informational | 82 | `/fr/guides/wifi-password-guide` |
| 10 | générer un mot de passe | generator | tool | 69 | `/fr` |
| 11 | générer un mot de passe aléatoire | generator | tool | 69 | `/fr` |
| 12 | mot de passe 12 caractères exemple | length | informational | 69 | `/fr/guides/how-to-create-strong-passwords` |
| 13 | mot de passe fort | strength | informational | 69 | `/fr/guides/how-to-create-strong-passwords` |
| 14 | mot de passe wifi freebox | wifi | informational | 69 | `/fr/guides/wifi-password-guide` |
| 15 | mot de passe wifi orange | wifi | informational | 69 | `/fr/guides/wifi-password-guide` |
| 16 | vérifier mot de passe compromis | breach | informational | 67 | `/fr/guides/what-to-do-after-password-breach` |
| 17 | mot de passe sécurisé exemple | examples | informational | 67 | `/fr/guides/how-to-create-strong-passwords` |
| 18 | créer un mot de passe windows 11 | generator | tool | 67 | `/fr` |
| 19 | générateur de mot de passe gratuit | generator | tool | 67 | `/fr` |
| 20 | créer un mot de passe à 8 caractères | length | tool | 67 | `/fr/guides/how-to-create-strong-passwords` |
| 21 | mot de passe aléatoire 12 caractères | length | informational | 67 | `/fr/guides/how-to-create-strong-passwords` |
| 22 | mot de passe aléatoire sécurisé | strength | informational | 67 | `/fr/guides/how-to-create-strong-passwords` |
| 23 | mot de passe fort c est quoi | strength | informational | 67 | `/fr/guides/how-to-create-strong-passwords` |
| 24 | mot de passe wifi sfr | wifi | informational | 67 | `/fr/guides/wifi-password-guide` |
| 25 | mot de passe wifi windows 10 | wifi | informational | 67 | `/fr/guides/wifi-password-guide` |
| 26 | mot de passe wifi windows 11 | wifi | informational | 67 | `/fr/guides/wifi-password-guide` |
| 27 | générateur de mot de passe en ligne aléatoire et fort | strength | informational | 66 | `/fr/guides/how-to-create-strong-passwords` |
| 28 | générateur de mot de passe google | generator | navigational | 65 | `/fr` |
| 29 | comment créer un mot de passe fort et sécurisé | howto | informational | 65 | `/fr/guides/how-to-create-strong-passwords` |
| 30 | générer un mot de passe 12 caractères | length | tool | 65 | `/fr/guides/how-to-create-strong-passwords` |

</details>

<details><summary><strong>it</strong> — Italian (2734 keywords)</summary>

| # | Keyword | Cluster | Intent | Score | Target |
|---:|---|---|---|---:|---|
| 1 | miglior gestore di password | manager | commercial | 84 | `/it/best-password-managers-2026` |
| 2 | esempi di password | examples | informational | 82 | `/it/guides/how-to-create-strong-passwords` |
| 3 | generatore di password | generator | tool | 82 | `/it` |
| 4 | password casuale | generator | tool | 82 | `/it` |
| 5 | come creare una password sicura | howto | informational | 82 | `/it/guides/how-to-create-strong-passwords` |
| 6 | password di 12 caratteri | length | informational | 82 | `/it/guides/how-to-create-strong-passwords` |
| 7 | gestore di password | manager | commercial | 82 | `/it/best-password-managers-2026` |
| 8 | passphrase | passphrase | informational | 82 | `/it/guides/passphrase-vs-password-entropy` |
| 9 | password sicura | strength | informational | 82 | `/it/guides/how-to-create-strong-passwords` |
| 10 | password wifi | wifi | informational | 82 | `/it/guides/wifi-password-guide` |
| 11 | verificare password | check | informational | 76 | `/it/guides/how-to-create-strong-passwords` |
| 12 | creare password | generator | tool | 76 | `/it` |
| 13 | forza della password | other | informational | 76 | `/it` |
| 14 | password sicura quanti caratteri | length | informational | 70 | `/it/guides/how-to-create-strong-passwords` |
| 15 | esempi di password sicure | examples | informational | 69 | `/it/guides/how-to-create-strong-passwords` |
| 16 | genera password | generator | tool | 69 | `/it` |
| 17 | password casuale 12 caratteri | length | informational | 69 | `/it/guides/how-to-create-strong-passwords` |
| 18 | password casuale 8 caratteri | length | informational | 69 | `/it/guides/how-to-create-strong-passwords` |
| 19 | gestore di password google | manager | navigational | 69 | `/it/best-password-managers-2026` |
| 20 | buone password | other | informational | 69 | `/it` |
| 21 | password forte | strength | informational | 69 | `/it/guides/how-to-create-strong-passwords` |
| 22 | password sicura libero mail | strength | informational | 69 | `/it/guides/how-to-create-strong-passwords` |
| 23 | come creare una password sicura e facile da ricordare | howto | informational | 68 | `/it/guides/how-to-create-strong-passwords` |
| 24 | gestore di password e cassaforte digitale nordpass | manager | navigational | 68 | `/it/best-password-managers-2026` |
| 25 | verificare password google | check | navigational | 67 | `/it/guides/how-to-create-strong-passwords` |
| 26 | creare password cie | generator | tool | 67 | `/it` |
| 27 | genera password casuale | generator | tool | 67 | `/it` |
| 28 | password casuale online | generator | tool | 67 | `/it` |
| 29 | gestore di password free | manager | commercial | 67 | `/it/best-password-managers-2026` |
| 30 | creare password sicura | strength | tool | 67 | `/it/guides/how-to-create-strong-passwords` |

</details>

<details><summary><strong>pt</strong> — Portuguese (BR) (2918 keywords)</summary>

| # | Keyword | Cluster | Intent | Score | Target |
|---:|---|---|---|---:|---|
| 1 | criar senha | generator | tool | 82 | `/pt` |
| 2 | gerador de senhas | generator | tool | 82 | `/pt` |
| 3 | senha aleatória | generator | tool | 82 | `/pt` |
| 4 | como criar uma senha segura | howto | informational | 82 | `/pt/guides/how-to-create-strong-passwords` |
| 5 | senha de 12 caracteres | length | informational | 82 | `/pt/guides/how-to-create-strong-passwords` |
| 6 | gerenciador de senhas | manager | commercial | 82 | `/pt/best-password-managers-2026` |
| 7 | melhor gerenciador de senhas | manager | commercial | 82 | `/pt/best-password-managers-2026` |
| 8 | força da senha | strength | informational | 82 | `/pt/guides/how-to-create-strong-passwords` |
| 9 | senha segura | strength | informational | 82 | `/pt/guides/how-to-create-strong-passwords` |
| 10 | senha wifi | wifi | informational | 82 | `/pt/guides/wifi-password-guide` |
| 11 | exemplos de senhas | examples | informational | 76 | `/pt/guides/how-to-create-strong-passwords` |
| 12 | boas senhas | strength | informational | 76 | `/pt/guides/how-to-create-strong-passwords` |
| 13 | gerenciador de senhas google | manager | navigational | 70 | `/pt/best-password-managers-2026` |
| 14 | verificar senha | check | informational | 69 | `/pt/guides/how-to-create-strong-passwords` |
| 15 | gerar senha | generator | tool | 69 | `/pt` |
| 16 | melhor gerenciador de senhas 2026 | length | commercial | 69 | `/pt/guides/how-to-create-strong-passwords` |
| 17 | gerenciador de senhas microsoft | manager | navigational | 69 | `/pt/best-password-managers-2026` |
| 18 | gerenciador de senhas salvas | manager | commercial | 69 | `/pt/best-password-managers-2026` |
| 19 | senha forte | strength | informational | 69 | `/pt/guides/how-to-create-strong-passwords` |
| 20 | senha wifi epson l3250 | wifi | informational | 69 | `/pt/guides/wifi-password-guide` |
| 21 | como criar uma senha forte e segura para redes sociais | howto | informational | 68 | `/pt/guides/how-to-create-strong-passwords` |
| 22 | verificar senha wifi | check | informational | 67 | `/pt/guides/how-to-create-strong-passwords` |
| 23 | exemplos de senhas fortes | examples | informational | 67 | `/pt/guides/how-to-create-strong-passwords` |
| 24 | exemplos de senhas seguras | examples | informational | 67 | `/pt/guides/how-to-create-strong-passwords` |
| 25 | criar senha de app gmail | generator | tool | 67 | `/pt` |
| 26 | gerador de senhas 4devs | generator | tool | 67 | `/pt` |
| 27 | gerador de senhas avast | generator | tool | 67 | `/pt` |
| 28 | gerador de senhas google | generator | navigational | 67 | `/pt` |
| 29 | gerenciador de senhas bitwarden | manager | navigational | 67 | `/pt/best-password-managers-2026` |
| 30 | gerenciador de senhas windows | manager | commercial | 67 | `/pt/best-password-managers-2026` |

</details>

<details><summary><strong>ja</strong> — Japanese (1933 keywords)</summary>

| # | Keyword | Cluster | Intent | Score | Target |
|---:|---|---|---|---:|---|
| 1 | パスワード 確認 | check | informational | 82 | `/ja/guides/how-to-create-strong-passwords` |
| 2 | パスワード 例 | examples | informational | 82 | `/ja/guides/how-to-create-strong-passwords` |
| 3 | パスワード 作成 | generator | tool | 82 | `/ja` |
| 4 | パスワード 生成 | generator | tool | 82 | `/ja` |
| 5 | パスワード 作り方 | howto | informational | 82 | `/ja/guides/how-to-create-strong-passwords` |
| 6 | 12文字 パスワード | length | informational | 82 | `/ja/guides/how-to-create-strong-passwords` |
| 7 | パスワード 管理 | manager | commercial | 82 | `/ja/best-password-managers-2026` |
| 8 | ランダム パスワード | other | informational | 82 | `/ja` |
| 9 | 良いパスワード | other | informational | 82 | `/ja` |
| 10 | パスフレーズ | passphrase | informational | 82 | `/ja/guides/passphrase-vs-password-entropy` |
| 11 | パスワード 強度 | strength | informational | 82 | `/ja/guides/how-to-create-strong-passwords` |
| 12 | 安全なパスワード | strength | informational | 82 | `/ja/guides/how-to-create-strong-passwords` |
| 13 | wifi パスワード | wifi | informational | 82 | `/ja/guides/wifi-password-guide` |
| 14 | おすすめ パスワード管理 | manager | commercial | 76 | `/ja/best-password-managers-2026` |
| 15 | パスワード 忘れた | account | informational | 69 | `/ja` |
| 16 | パスワード 自動生成 | generator | tool | 69 | `/ja` |
| 17 | パスワード 作り方 例 | howto | informational | 69 | `/ja/guides/how-to-create-strong-passwords` |
| 18 | パスワード ポリシー | policy | informational | 69 | `/ja/guides/team-password-policy-template` |
| 19 | wifi パスワード 確認 windows11 | check | informational | 67 | `/ja/guides/how-to-create-strong-passwords` |
| 20 | パスワード 確認 iphone | check | informational | 67 | `/ja/guides/how-to-create-strong-passwords` |
| 21 | パスワード 作成 ランダム | generator | tool | 67 | `/ja` |
| 22 | パスワード 生成 ランダム | generator | tool | 67 | `/ja` |
| 23 | ランダム パスワード 生成 excel | generator | tool | 67 | `/ja` |
| 24 | パスワード 作り方 おすすめ | howto | informational | 67 | `/ja/guides/how-to-create-strong-passwords` |
| 25 | パスワード 管理 アプリ | manager | commercial | 67 | `/ja/best-password-managers-2026` |
| 26 | パスワード 管理 ノート | manager | commercial | 67 | `/ja/best-password-managers-2026` |
| 27 | パスフレーズ 生成 | passphrase | tool | 67 | `/ja/guides/passphrase-vs-password-entropy` |
| 28 | パスフレーズ 英語 | passphrase | informational | 67 | `/ja/guides/passphrase-vs-password-entropy` |
| 29 | パスワード 強度 判定 | strength | informational | 67 | `/ja/guides/how-to-create-strong-passwords` |
| 30 | wifi パスワード 変更 | wifi | informational | 67 | `/ja/guides/wifi-password-guide` |

</details>

<details><summary><strong>zh</strong> — Chinese (Simplified) (1315 keywords)</summary>

| # | Keyword | Cluster | Intent | Score | Target |
|---:|---|---|---|---:|---|
| 1 | 生成密码 | generator | tool | 82 | `/zh` |
| 2 | 12位密码 | length | informational | 82 | `/zh/guides/how-to-create-strong-passwords` |
| 3 | 密码短语 | passphrase | informational | 82 | `/zh/guides/passphrase-vs-password-entropy` |
| 4 | 密码强度 | strength | informational | 82 | `/zh/guides/how-to-create-strong-passwords` |
| 5 | 强密码 | strength | informational | 82 | `/zh/guides/how-to-create-strong-passwords` |
| 6 | 密码生成器 | generator | tool | 76 | `/zh` |
| 7 | 随机密码 | generator | tool | 76 | `/zh` |
| 8 | 密码管理 | manager | commercial | 76 | `/zh/best-password-managers-2026` |
| 9 | wifi密码 | wifi | informational | 76 | `/zh/guides/wifi-password-guide` |
| 10 | 忘记密码 | account | informational | 69 | `/zh` |
| 11 | 密码 检查 | check | informational | 69 | `/zh/guides/how-to-create-strong-passwords` |
| 12 | 密码 例子 | examples | informational | 69 | `/zh/guides/how-to-create-strong-passwords` |
| 13 | 如何创建强密码 | howto | informational | 69 | `/zh/guides/how-to-create-strong-passwords` |
| 14 | 最好的密码管理器 | manager | commercial | 69 | `/zh/best-password-managers-2026` |
| 15 | 好密码 | strength | informational | 69 | `/zh/guides/how-to-create-strong-passwords` |
| 16 | 密码生成器 1password | manager | navigational | 62 | `/zh/best-password-managers-2026` |
| 17 | 忘记 密码 检查 | account | informational | 61 | `/zh` |
| 18 | google 密码 检查 工具 | check | navigational | 61 | `/zh/guides/how-to-create-strong-passwords` |
| 19 | 密码 大全 输入 密码 访问 最新 资源 链接 不 定时 更新 | other | informational | 61 | `/zh` |
| 20 | 密码强度 英文 | strength | informational | 61 | `/zh/guides/how-to-create-strong-passwords` |
| 21 | 强密码 英文 | strength | informational | 61 | `/zh/guides/how-to-create-strong-passwords` |
| 22 | 随机密码生成 | generator | tool | 59 | `/zh` |
| 23 | 强密码规则 | policy | informational | 59 | `/zh/guides/team-password-policy-template` |
| 24 | 强密码生成 | strength | tool | 59 | `/zh/guides/how-to-create-strong-passwords` |
| 25 | wifi密码查看器 | wifi | informational | 59 | `/zh/guides/wifi-password-guide` |
| 26 | hkbn wifi 忘记密码 | account | informational | 57 | `/zh` |
| 27 | win10 忘记密码 安全模式 | account | informational | 57 | `/zh` |
| 28 | 好密码 密码忘记 | account | informational | 57 | `/zh` |
| 29 | 好密码 忘记密码 | account | informational | 57 | `/zh` |
| 30 | 如何创建强密码 忘记密码 | account | informational | 57 | `/zh` |

</details>

<details><summary><strong>vi</strong> — Vietnamese (2765 keywords)</summary>

| # | Keyword | Cluster | Intent | Score | Target |
|---:|---|---|---|---:|---|
| 1 | trình quản lý mật khẩu tốt nhất | manager | commercial | 87 | `/vi/best-password-managers-2026` |
| 2 | tạo mật khẩu ngẫu nhiên | generator | tool | 85 | `/vi` |
| 3 | mật khẩu ngẫu nhiên | generator | tool | 82 | `/vi` |
| 4 | cách tạo mật khẩu mạnh | strength | tool | 82 | `/vi/guides/how-to-create-strong-passwords` |
| 5 | kiểm tra mật khẩu | check | informational | 76 | `/vi/guides/how-to-create-strong-passwords` |
| 6 | tạo mật khẩu | generator | tool | 76 | `/vi` |
| 7 | tạo mật khẩu mới | generator | tool | 76 | `/vi` |
| 8 | mật khẩu 12 ký tự | length | informational | 76 | `/vi/guides/how-to-create-strong-passwords` |
| 9 | trình quản lý mật khẩu | manager | commercial | 76 | `/vi/best-password-managers-2026` |
| 10 | mật khẩu tốt | other | informational | 76 | `/vi` |
| 11 | cụm mật khẩu | passphrase | informational | 76 | `/vi/guides/passphrase-vs-password-entropy` |
| 12 | độ mạnh mật khẩu | strength | informational | 76 | `/vi/guides/how-to-create-strong-passwords` |
| 13 | mật khẩu mạnh | strength | informational | 76 | `/vi/guides/how-to-create-strong-passwords` |
| 14 | mật khẩu wifi | wifi | informational | 76 | `/vi/guides/wifi-password-guide` |
| 15 | cụm mật khẩu 24 từ của pi | passphrase | informational | 72 | `/vi/guides/passphrase-vs-password-entropy` |
| 16 | mật khẩu mạnh ngẫu nhiên | strength | informational | 72 | `/vi/guides/how-to-create-strong-passwords` |
| 17 | chính sách bảo mật mật khẩu tốt nhất là gì | policy | commercial | 70 | `/vi/guides/team-password-policy-template` |
| 18 | ví dụ mật khẩu | examples | informational | 69 | `/vi/guides/how-to-create-strong-passwords` |
| 19 | tạo mật khẩu ngẫu nhiên trong excel | generator | tool | 69 | `/vi` |
| 20 | ví dụ mật khẩu 12 ký tự | length | informational | 69 | `/vi/guides/how-to-create-strong-passwords` |
| 21 | ví dụ mật khẩu 6 đến 12 ký tự | length | informational | 69 | `/vi/guides/how-to-create-strong-passwords` |
| 22 | mật khẩu an toàn | strength | informational | 69 | `/vi/guides/how-to-create-strong-passwords` |
| 23 | mật khẩu mạnh bao gồm các yếu tố nào | strength | informational | 69 | `/vi/guides/how-to-create-strong-passwords` |
| 24 | kiểm tra mật khẩu mạnh hay yếu | check | informational | 68 | `/vi/guides/how-to-create-strong-passwords` |
| 25 | phần mềm tạo mật khẩu ngẫu nhiên | generator | tool | 68 | `/vi` |
| 26 | tạo mật khẩu ngẫu nhiên online | generator | tool | 68 | `/vi` |
| 27 | test độ mạnh mật khẩu | check | informational | 67 | `/vi/guides/how-to-create-strong-passwords` |
| 28 | tạo mật khẩu facebook mới lỗi không xác định | generator | tool | 67 | `/vi` |
| 29 | mật khẩu tốt nhất bao nhiêu ký tự | length | commercial | 67 | `/vi/guides/how-to-create-strong-passwords` |
| 30 | ví dụ mật khẩu 8 đến 20 ký tự | length | informational | 67 | `/vi/guides/how-to-create-strong-passwords` |

</details>

## Files

- `keywords.csv` — every keyword, all locales (UTF-8 BOM, Excel-ready).
- `keywords.json` — full records, scores, engine metadata and per-locale totals.
- `locales/<code>.csv` — per-locale slice for content planning.
- `languages.csv` — language index with codes, hreflang aliases, counts and file paths.
- `cluster-matrix.csv` — locale × cluster keyword counts.
- `../keyword-research.json` — compatible input for `npm run keywords:map` and `keywords:cloud`.

## Refresh

```bash
npm run keywords:deep            # collect (resumable via temp cache)
npm run keywords:map             # cluster -> page mapping report
npm run keywords:cloud           # weighted term/bigram cloud
```

Useful flags: `--locales=en,ua`, `--min=1500`, `--rounds=2`, `--refresh`, `--heads=30`.
