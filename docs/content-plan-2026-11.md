# Content plan — 2026-11

Generated from `docs/keyword-map/locales/<code>.csv` and
`docs/content-agent-brief.json` → `keyword_targets`.

## How to read this plan

Each locale has the top 50 targets plus high, medium and low tier samples from
the full locale CSV. The plan groups them into three demand tiers so every
language gets head, mid-tail and long-tail coverage instead of only the
highest-volume head terms.

| Tier | Selection rule | Role |
|---|---|---|
| High | `priority = P1` or `demandScore >= 80` | Home title/H1, generator intent, strongest guide intros |
| Medium | `priority = P2` or `60 <= demandScore < 80` | Guide sections, FAQ answers, internal links |
| Low | `priority = P3` or `demandScore < 60` | Long-tail questions, examples, glossary and supporting sections |

The site passes `npm run content:validate` with at least 2 high, 1 medium and
1 low keyword per locale present site-wide. This plan keeps adding context-
relevant terms; it does not insert every keyword into every article.

## Status summary

| Locale | Language | High | Medium | Low | Gaps in tier sample |
|---|---|---:|---:|---:|---:|
| `en` | English | 6 | 20 | 20 | 28 |
| `ua` | Ukrainian | 20 | 20 | 20 | 25 |
| `ru` | Russian | 20 | 20 | 20 | 26 |
| `pl` | Polish | 20 | 20 | 20 | 25 |
| `de` | German | 8 | 20 | 20 | 32 |
| `es` | Spanish | 11 | 20 | 20 | 26 |
| `fr` | French | 9 | 20 | 20 | 19 |
| `it` | Italian | 10 | 20 | 20 | 23 |
| `pt` | Portuguese (BR) | 10 | 20 | 20 | 22 |
| `ja` | Japanese | 13 | 20 | 20 | 28 |
| `zh` | Chinese (Simplified) | 5 | 16 | 20 | 26 |
| `vi` | Vietnamese | 4 | 20 | 20 | 21 |

## Execution update — 2026-11-07

Closed in this cycle for all 12 locales:

| Locale | Length presets 8/12/16/20 + examples | FAQ (12-char, 8-char, checker, Wi-Fi) | Words-mode passphrase section | Review status |
|---|:---:|:---:|:---:|---|
| `en` | done | done | done | native-review-pending |
| `ua` | done | done | done | native-review-pending |
| `es` | done | done | done | native-review-pending |
| `de` | done | done | done | native-review-pending |
| `fr` | done | done | done | native-review-pending |
| `pt` | done | done | done | native-review-pending |
| `ru` | done | done | done | native-review-pending |
| `pl` | done | done | done | native-review-pending |
| `it` | done | done | done | native-review-pending |
| `ja` | done | done | done | native-review-pending |
| `zh` | done | done | done | native-review-pending |
| `vi` | done | done | done | native-review-pending |

- `how-to-create-strong-passwords` now owns the length/example/checker intent:
  concrete 8/12/16/20 examples, generator presets, a visible FAQ and a
  Wi-Fi cross-link. This closes the `gap-section` rows for
  `12 character password examples`, `password examples`, `password checker`,
  `hasło 12 znaków`, `contraseña de 12 caracteres`, `mot de passe 12 caractères`,
  `passwort 12 zeichen`, `senha de 12 caracteres`, `пароль из 12 символов`,
  `password di 12 caratteri`, `12文字 パスワード`, `12位密码` and
  `mật khẩu 12 ký tự`.
- `passphrase-vs-password-entropy` now documents the words mode that already
  ships in the generator: word counts 4-8, entropy per word, examples and a
  warning against hand-picked word lists. This closes the `gap-feature` rows for
  `passphrase`, `passphrase generator` and the localized equivalents.
- The Wi-Fi guide, home FAQ and manager platform sections were already
  published before this cycle; their CSV rows remain useful as intent labels but
  are no longer content gaps.
- No new URL was created. Every closed gap has a canonical page: length,
  examples and checker intent → `how-to-create-strong-passwords`; words mode →
  `passphrase-vs-password-entropy`; Wi-Fi → `wifi-password-guide`; manager-year
  queries → `best-password-managers-2026`.

Remaining after this cycle:

- Native review of the two edited guides is still required; the brief marks both
  `review_status: native-review-pending`.
- `password policy windows server 2008-2022` (ru) is policy intent, not a
  how-to intent. The canonical page is `team-password-policy-template`; do not
  add a server-version doorway page.
- `mejor gestor de contraseñas 2025/2026` (es) and
  `melhor gerenciador de senhas 2026` (pt) are manager comparison queries, not
  length queries, even though the CSV clusters them under `length`. They belong
  to `best-password-managers-2026`.
- GSC still has no query-level rows for the baseline window. Re-run
  `npm run gsc:baseline` after 2-4 weeks before promoting any new query.

## Per-locale plan

### `en` — English

- **Demand tiers:** high: 6 (`password ideas`, `how to create a strong password`, `best password manager`); medium: 20 (`password policy`, `12 character password reddit`, `password ideas list`); low: 20 (`password ideas creative`, `random password generator google`, `generate secure password bitwarden`)
- **Top clusters:** `length` (11), `strength` (7), `howto` (6), `ideas` (4), `passphrase` (4)
- **Existing pages to extend:** `password ideas` → /en/guides/how-to-create-strong-passwords; `best password manager` → /en/best-password-managers-2026; `password manager` → /en/best-password-managers-2026
- **Sections to add:** `12 character password examples` → /en/guides/how-to-create-strong-passwords; `12 character password reddit` → /en/guides/how-to-create-strong-passwords; `12 character password meaning` → /en/guides/how-to-create-strong-passwords
- **New page candidates:** none in the tier sample
- **Published in this cycle:** `wifi password` → /en/guides/wifi-password-guide
- **Reviewer note:** Add length presets 8/12/16/20 + FAQ

### `ua` — Ukrainian

- **Demand tiers:** high: 20 (`як створити надійний пароль`, `згенерувати пароль`, `надійний пароль`); medium: 20 (`надійний пароль може допомогти захистити вашу інтернет репутацію`, `надійний пароль має бути довжиною не менше ніж`, `надійний пароль повинен бути правильними можуть бути більш однієї відповіді`); low: 20 (`основні правила складання паролів для електронної скриньки`, `пароль для електронної пошти використовується для`, `безпека паролів`)
- **Top clusters:** `strength` (17), `generator` (12), `manager` (9), `wifi` (4), `howto` (3)
- **Existing pages to extend:** `приклади паролів` → /ua/guides/how-to-create-strong-passwords; `перевірити пароль` → /ua/guides/how-to-create-strong-passwords; `надійний пароль приклад` → /ua/guides/how-to-create-strong-passwords
- **Sections to add:** `парольна фраза` → /ua/guides/passphrase-vs-password-entropy; `генератор паролів 10 символів` → /ua/guides/how-to-create-strong-passwords; `пароль з 6 символів` → /ua/guides/how-to-create-strong-passwords
- **New page candidates:** none in the tier sample
- **Published in this cycle:** `пароль wifi` → /ua/guides/wifi-password-guide; `пароль wifi как узнать` → /ua/guides/wifi-password-guide; `пароль wifi windows 10 посмотреть` → /ua/guides/wifi-password-guide
- **Reviewer note:** Strong-password guide

### `ru` — Russian

- **Demand tiers:** high: 20 (`как создать надежный пароль`, `запомнить пароль`, `пароль из 12 символов`); medium: 20 (`политика паролей windows server 2012`, `надежный пароль или нет`, `политика паролей`); low: 20 (`opera пароль`, `проверить пароль на время взлома`, `безопасный пароль для аккаунта apple`)
- **Top clusters:** `strength` (13), `length` (9), `generator` (7), `other` (6), `examples` (5)
- **Existing pages to extend:** `примеры паролей для аккаунта` → /ru/guides/how-to-create-strong-passwords; `примеры паролей для почты` → /ru/guides/how-to-create-strong-passwords; `примеры паролей для google` → /ru/guides/how-to-create-strong-passwords
- **Sections to add:** `пароль из 12 символов` → /ru/guides/how-to-create-strong-passwords; `парольная фраза` → /ru/guides/passphrase-vs-password-entropy; `политика паролей windows server 2016` → /ru/guides/how-to-create-strong-passwords
- **New page candidates:** none in the tier sample
- **Published in this cycle:** `пароль wifi` → /ru/guides/wifi-password-guide
- **Reviewer note:** Strong-password guide

### `pl` — Polish

- **Demand tiers:** high: 20 (`wygeneruj hasło`, `hasło 12 znaków`, `siła hasła`); medium: 20 (`bezpieczne hasło czyli jakie`, `silne hasło oznacza tzw hasło godne zaufania to takie które`, `bezpieczne hasło długość`); low: 20 (`jak tworzyc hasła`, `jak tworzyć silne hasła zaproponuj takie hasło`, `jak stworzyc mocne hasło`)
- **Top clusters:** `strength` (14), `howto` (10), `wifi` (9), `generator` (8), `check` (6)
- **Existing pages to extend:** `sprawdź hasło` → /pl/guides/how-to-create-strong-passwords; `silne hasło przykłady` → /pl/guides/how-to-create-strong-passwords; `siła hasła test` → /pl/guides/how-to-create-strong-passwords
- **Sections to add:** `hasło 12 znaków` → /pl/guides/how-to-create-strong-passwords; `fraza hasłowa` → /pl/guides/passphrase-vs-password-entropy; `silne hasło ile znaków` → /pl/guides/how-to-create-strong-passwords
- **New page candidates:** none in the tier sample
- **Published in this cycle:** `hasło wifi` → /pl/guides/wifi-password-guide; `hasło do wifi w telefonie android` → /pl/guides/wifi-password-guide; `hasło do wifi jagiellonia` → /pl/guides/wifi-password-guide
- **Reviewer note:** Strong-password guide

### `de` — German

- **Demand tiers:** high: 8 (`passphrase`, `passwort 12 zeichen`, `passwort erstellen`); medium: 20 (`bester passwort manager`, `passwort beispiele`, `passwort generator`); low: 20 (`passwort generator easy to remember`, `wlan passwort anzeigen android`, `passwort erstellen windows 10`)
- **Top clusters:** `manager` (13), `generator` (11), `length` (6), `wifi` (5), `passphrase` (4)
- **Existing pages to extend:** `passwort manager` → /de/best-password-managers-2026; `passwort prüfen` → /de/guides/how-to-create-strong-passwords; `bester passwort manager` → /de/best-password-managers-2026
- **Sections to add:** `passphrase` → /de/guides/passphrase-vs-password-entropy; `passwort 12 zeichen` → /de/guides/how-to-create-strong-passwords; `passphrase generator` → /de/guides/passphrase-vs-password-entropy
- **New page candidates:** none in the tier sample
- **Published in this cycle:** `wlan passwort` → /de/guides/wifi-password-guide; `wlan passwort anzeigen` → /de/guides/wifi-password-guide; `wlan passwort anzeigen iphone` → /de/guides/wifi-password-guide
- **Reviewer note:** Platform sections (Android/iPhone/Chrome)

### `es` — Spanish

- **Demand tiers:** high: 11 (`buenas contraseñas`, `contraseña aleatoria`, `contraseña de 12 caracteres`); medium: 20 (`cómo crear una contraseña segura`, `seguridad de contraseña`, `verificar contraseña`); low: 20 (`como crear una contraseña segura para correo electronico`, `eliminar la frase de contraseña de sincronización`, `contraseña segura con letras números y símbolos combinados`)
- **Top clusters:** `strength` (8), `generator` (8), `howto` (8), `length` (6), `passphrase` (5)
- **Existing pages to extend:** `ejemplos de contraseñas` → /es/guides/how-to-create-strong-passwords; `gestor de contraseñas` → /es/best-password-managers-2026; `mejor gestor de contraseñas` → /es/best-password-managers-2026
- **Sections to add:** `contraseña de 12 caracteres` → /es/guides/how-to-create-strong-passwords; `frase de contraseña` → /es/guides/passphrase-vs-password-entropy; `ejemplos de contraseñas de 8 caracteres` → /es/guides/how-to-create-strong-passwords
- **New page candidates:** none in the tier sample
- **Published in this cycle:** `contraseña wifi` → /es/guides/wifi-password-guide; `contraseña segura para wifi` → /es/guides/wifi-password-guide; `contraseña wifi gopro hero 3` → /es/guides/wifi-password-guide
- **Reviewer note:** Strong-password guide

### `fr` — French

- **Demand tiers:** high: 9 (`mot de passe 12 caractères`, `mot de passe aléatoire`, `mot de passe sécurisé`); medium: 20 (`générer un mot de passe aléatoire`, `mot de passe 12 caractères exemple`, `mot de passe wifi freebox`); low: 20 (`generateur mot de passe fort dashlane`, `générer mot de passe fort en ligne`, `générer un mot de passe solide cnil`)
- **Top clusters:** `strength` (12), `generator` (11), `wifi` (8), `length` (7), `howto` (6)
- **Existing pages to extend:** `vérifier mot de passe` → /fr/guides/how-to-create-strong-passwords; `mot de passe sécurisé exemple` → /fr/guides/how-to-create-strong-passwords; `generateur mot de passe fort dashlane` → /fr/best-password-managers-2026
- **Sections to add:** `mot de passe 12 caractères` → /fr/guides/how-to-create-strong-passwords; `mot de passe 12 caractères exemple` → /fr/guides/how-to-create-strong-passwords; `créer un mot de passe à 8 caractères` → /fr/guides/how-to-create-strong-passwords
- **New page candidates:** none in the tier sample
- **Published in this cycle:** `mot de passe wifi` → /fr/guides/wifi-password-guide; `mot de passe wifi freebox` → /fr/guides/wifi-password-guide; `mot de passe wifi orange` → /fr/guides/wifi-password-guide
- **Reviewer note:** Strong-password guide

### `it` — Italian

- **Demand tiers:** high: 10 (`miglior gestore di password`, `come creare una password sicura`, `esempi di password`); medium: 20 (`creare password`, `forza della password`, `verificare password`); low: 20 (`genera password casuale google`, `genera password sicura google`, `una password sicura deve essere composta da almeno 6 caratteri`)
- **Top clusters:** `generator` (17), `manager` (7), `length` (7), `strength` (6), `examples` (3)
- **Existing pages to extend:** `miglior gestore di password` → /it/best-password-managers-2026; `esempi di password` → /it/guides/how-to-create-strong-passwords; `gestore di password` → /it/best-password-managers-2026
- **Sections to add:** `passphrase` → /it/guides/passphrase-vs-password-entropy; `password di 12 caratteri` → /it/guides/how-to-create-strong-passwords; `password sicura quanti caratteri` → /it/guides/how-to-create-strong-passwords
- **New page candidates:** none in the tier sample
- **Published in this cycle:** `password wifi` → /it/guides/wifi-password-guide
- **Reviewer note:** Home generator + H1/meta

### `pt` — Portuguese (BR)

- **Demand tiers:** high: 10 (`como criar uma senha segura`, `criar senha`, `força da senha`); medium: 20 (`boas senhas`, `exemplos de senhas`, `gerenciador de senhas google`); low: 20 (`gerar senha segura online`, `gerenciador de senhas windows 10`, `criar senha gov`)
- **Top clusters:** `generator` (14), `strength` (12), `manager` (10), `length` (4), `examples` (4)
- **Existing pages to extend:** `gerenciador de senhas` → /pt/best-password-managers-2026; `melhor gerenciador de senhas` → /pt/best-password-managers-2026; `exemplos de senhas` → /pt/guides/how-to-create-strong-passwords
- **Sections to add:** `senha de 12 caracteres` → /pt/guides/how-to-create-strong-passwords; `melhor gerenciador de senhas 2026` → /pt/guides/how-to-create-strong-passwords; `exemplo de senha forte 12 caracteres` → /pt/guides/how-to-create-strong-passwords
- **New page candidates:** none in the tier sample
- **Published in this cycle:** `senha wifi` → /pt/guides/wifi-password-guide; `senha wifi epson l3250` → /pt/guides/wifi-password-guide; `gerar qrcode senha wifi` → /pt/guides/wifi-password-guide
- **Reviewer note:** Home generator + H1/meta

### `ja` — Japanese

- **Demand tiers:** high: 13 (`12文字 パスワード`, `wifi パスワード`, `パスフレーズ`); medium: 20 (`おすすめ パスワード管理`, `パスワード 作り方 例`, `パスワード ポリシー`); low: 20 (`パスワード 例 の 三 文字`, `ランダム パスワード 作成 ツール`, `android パスワード 自動生成 できない`)
- **Top clusters:** `generator` (12), `check` (8), `length` (6), `manager` (6), `passphrase` (4)
- **Existing pages to extend:** `パスワード 例` → /ja/guides/how-to-create-strong-passwords; `パスワード 確認` → /ja/guides/how-to-create-strong-passwords; `パスワード 管理` → /ja/best-password-managers-2026
- **Sections to add:** `12文字 パスワード` → /ja/guides/how-to-create-strong-passwords; `パスフレーズ` → /ja/guides/passphrase-vs-password-entropy; `パスフレーズ 生成` → /ja/guides/passphrase-vs-password-entropy
- **New page candidates:** none in the tier sample
- **Published in this cycle:** `wifi パスワード` → /ja/guides/wifi-password-guide; `wifi パスワード 変更` → /ja/guides/wifi-password-guide; `wifi パスワード 自動 生成` → /ja/guides/wifi-password-guide
- **Reviewer note:** Home generator + H1/meta

### `zh` — Chinese (Simplified)

- **Demand tiers:** high: 5 (`12位密码`, `密码强度`, `密码短语`); medium: 16 (`wifi密码`, `密码生成器`, `密码管理`); low: 20 (`wifi密码查看器`, `强密码生成`, `强密码规则`)
- **Top clusters:** `length` (17), `strength` (6), `generator` (4), `manager` (3), `wifi` (2)
- **Existing pages to extend:** `密码管理` → /zh/best-password-managers-2026; `最好的密码管理器` → /zh/best-password-managers-2026; `密码 例子` → /zh/guides/how-to-create-strong-passwords
- **Sections to add:** `12位密码` → /zh/guides/how-to-create-strong-passwords; `密码短语` → /zh/guides/passphrase-vs-password-entropy; `12位密码 12位元` → /zh/guides/how-to-create-strong-passwords
- **New page candidates:** none in the tier sample
- **Published in this cycle:** `wifi密码` → /zh/guides/wifi-password-guide; `wifi密码查看器` → /zh/guides/wifi-password-guide
- **Reviewer note:** Add length presets 8/12/16/20 + FAQ

### `vi` — Vietnamese

- **Demand tiers:** high: 4 (`trình quản lý mật khẩu tốt nhất`, `tạo mật khẩu ngẫu nhiên`, `cách tạo mật khẩu mạnh`); medium: 20 (`cụm mật khẩu`, `độ mạnh mật khẩu`, `kiểm tra mật khẩu`); low: 20 (`để quản lý mật khẩu an toàn bạn nên làm gì`, `mật khẩu mạnh là gì cho ví dụ`, `mật khẩu wifi xe kim mạnh hùng`)
- **Top clusters:** `generator` (11), `strength` (8), `passphrase` (5), `check` (5), `length` (4)
- **Existing pages to extend:** `trình quản lý mật khẩu tốt nhất` → /vi/best-password-managers-2026; `kiểm tra mật khẩu` → /vi/guides/how-to-create-strong-passwords; `trình quản lý mật khẩu` → /vi/best-password-managers-2026
- **Sections to add:** `cụm mật khẩu` → /vi/guides/passphrase-vs-password-entropy; `mật khẩu 12 ký tự` → /vi/guides/how-to-create-strong-passwords; `cụm mật khẩu 24 từ của pi` → /vi/guides/passphrase-vs-password-entropy
- **New page candidates:** none in the tier sample
- **Published in this cycle:** `mật khẩu wifi` → /vi/guides/wifi-password-guide; `mật khẩu wifi xe kim mạnh hùng` → /vi/guides/wifi-password-guide
- **Reviewer note:** Home generator + H1/meta

## Production order

1. **Weeks 1-2 — repair and extend the six largest locales:** `en`, `ua`, `es`, `de`, `fr`, `pt`. Refresh title/H1/FAQ against the high tier, add the medium-tier sections to existing guides, and publish one long-tail example page only where the cluster has no existing target.
2. **Weeks 3-4 — complete the remaining locales:** `ru`, `pl`, `it`, `ja`, `zh`, `vi`. Reuse the same page shapes and translate the intent, not the sentences. Check CJK title lengths separately: natural Chinese and Japanese titles are shorter than the Latin 50-65 character range.
3. **Week 5 — internal links:** connect each new section to the generator, the Wi-Fi guide, the passphrase guide and the manager comparison page. Use one canonical URL per intent.
4. **Week 6 — measure:** re-run `npm run gsc:baseline`, compare per locale and per query cluster, then promote only queries with impressions and positions 4-20.

## Article brief template

When a gap needs a new page, add it to `docs/content-agent-brief.json` with:

- `slug`: one URL per intent, never one URL per keyword variant.
- `intent`: tool, how-to, comparison, policy or incident response.
- `primary_keywords`: two localized phrases from the target locale, not English terms copied into every language.
- `secondary_keywords`: 3-5 medium and long-tail phrases from that locale's top 50.
- `target_page`: existing page, or a new slug only when the cluster has no canonical target.
- `review_status`: `ai-draft`, `native-review-pending` or `approved`.

## Frequency guardrails

- **High tier:** one page owns the head term. Do not repeat the same head term in the title of two pages.
- **Medium tier:** use it in H2 sections and FAQ answers where it answers a real question.
- **Low tier:** use it in examples, checklists, glossary entries and long-tail FAQ. These queries rarely deserve their own URL.
- **No stuffing:** every added phrase must answer a reader question. If a term cannot be used naturally, leave it in the planning CSV.

## Measurement

The current baseline is `docs/gsc-baseline-2026-11-07.json`. After 2-4 weeks,
run `npm run gsc:baseline` again and compare:

- impressions and clicks per locale;
- queries moving from position 20+ to 4-20;
- pages that gained impressions without clicks (rewrite title/description);
- locales where a medium-tier section earned no impressions (drop or rewrite it).
