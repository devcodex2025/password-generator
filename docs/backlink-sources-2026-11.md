# Беклінк-джерела без реєстрації — 256 сервісів + пакетний прогін

Дата: 2026-11-02. Ціль: `https://www.generatepasswordto.me`.
Дані: [`docs/backlink-sources.csv`](./backlink-sources.csv) · черга: [`docs/backlink-queue.md`](./backlink-queue.md) · скрипт: [`scripts/backlink-queue.mjs`](../scripts/backlink-queue.mjs).

---

## 1. Головне, перш ніж витрачати тиждень

У списку **256 джерел**. Це не «256 беклінків». Розподіл за реальністю:

| Що це | Скільки | Що дає насправді |
|---|---:|---|
| Без реєстрації, публікує сторінку (Tier A + B) | 73 | 10–20 індексованих сторінок, майже всі `nofollow`. 1–3 можуть бути dofollow |
| Потрібен акаунт, але є реальна цінність (Tier S + C) | 86 | 10–25 referring domains за 2–3 місяці, частина dofollow |
| Спільноти (Tier D) | 25 | 2–5 посилань + трафік, якщо спершу допомагати людям |
| Утиліти без SEO-ефекту (Tier E) | 38 | 0 посилань. Корисно для перевірки сайту, не для лінкбілдингу |
| Індексація (Tier F) | 7 | 0 посилань, але прискорює обхід — уже підключено |
| **Перевірено — не працює** (Tier X) | 15 | 0. Це економія часу: не витрачайте на них години |
| **Не робити** (Tier Z) | 12 | Відтік довіри, ризик manual action |

**Чому не 1000.** У репозиторії вже є емпіричний тест 40 «безкоштовних SEO-сервісів без реєстрації»: [`docs/backlink-catalogs.json`](./backlink-catalogs.json). Результат — **один** реальний індексований dofollow-беклінк (`tools.org.ua`). Решта або `noindex`, або вимагає акаунт, або блокує ботів, або взагалі не має вихідного посилання.

Додати ще 700 рядків можна лише мертвими доменами, link-фермами й автосабмітерами. Це не «пакетний прогін», це спам-профіль, за який новий домен отримує manual action. Тому тут 256 **перевірюваних кандидатів**, а не 1000 вигаданих. Скрипт нижче відсіює мертві за 5 хвилин.

**Головний висновок:** для цього домену лінкбілдинг — це 15–20 ручних дій у релевантних місцях + один лінкабельний актив (`/password-statistics-2026`), а не 1000 форм.

---

## 2. Структура

```
docs/backlink-sources.csv      # 256 джерел, єдине джерело правди
docs/backlink-queue.md         # згенерована черга з чекбоксами
docs/backlink-catalogs.json    # результати реального тесту 40 сервісів
scripts/backlink-queue.mjs     # перевірка живості + генерація черги + verify
```

### Колонки CSV

| Колонка | Значення |
|---|---|
| `id` | `S01`, `A07`, `X12`… стабільний ідентифікатор для логування |
| `tier` | S/A/B/C/D/E/F/X/Z — див. нижче |
| `category` | directory, launch, community, qa, blog, anon-publish, file-host, shortener, utility, indexing, avoid |
| `name` | людська назва |
| `url` | куди йти |
| `action` | що саме зробити |
| `registration` | `none` / `email` / `account` / `github` / `invite` |
| `link_type` | `dofollow` / `nofollow` / `ugc` / `none` / `unknown` |
| `value` | 0–5, очікувана користь саме для цього домену |
| `effort_min` | реалістичний час на одну дію, хвилини |
| `priority` | P1 (робити зараз) … P4 (не варто) |
| `status` | `done` / `todo` / `verify` (URL або поведінка не підтверджені) / `tested-fail` / `avoid` / `blocked` |
| `notes` | обмеження, ризики, що саме перевірити |

`status=verify` означає: сервіс існує, але я не підтверджував форму/індексацію. Саме для цього `--check`.

### Tier-и

- **S** — найвища цінність. Перевірене або очевидне джерело; більшість вимагає акаунт. Це і є справжній лінкбілдинг.
- **A** — публікація сторінки без реєстрації (Telegraph, Rentry, Write.as, paste/file-хости, скорочувачі). Індексовані сторінки, переважно `nofollow`. Цінність — бренд, трафік, інколи індексація.
- **B** — відкриті форми каталогів без акаунта. Переважно низька якість, але дешево.
- **C** — акаунт є, цінність середня/низька: профілі, блоги, пакети.
- **D** — спільноти. Правило: спершу відповідь по суті, посилання — тільки якщо без нього відповідь неповна.
- **E** — інструменти перевірки. Нуль посилань. Не витрачайте час на «прогін заради прогріву».
- **F** — індексація (IndexNow, GSC, Bing). Не посилання, але потрібно.
- **X** — перевірено, не дає посилання. Залишено, щоб не перевіряти вдруге.
- **Z** — не використовувати. Тут навмисно немає робочих URL, лише категорії, щоб не спокушатися.

---

## 3. Пакетний прогін: 4 фази

Скрипт **нічого не публікує**. Він фільтрує, перевіряє живості, генерує чергу і верифікує вже опубліковане. Публікація — ручна, бо в кожної форми свої поля, captcha й ToS.

```bash
# 0. Скільки всього і що перше
npm run backlinks

# 1. Перевірити живості (6 паралельно, таймаут 12 с)
node scripts/backlink-queue.mjs --check
# -> docs/backlink-sources.checked.csv з http_status / reachable / noindex

# 2. Відсіяти мертві й згенерувати робочу чергу
node scripts/backlink-queue.mjs --status=todo --tier=S,A,B --priority=P1,P2 --queue
# -> docs/backlink-queue.md

# 3. Після публікації перевірити конкретну сторінку
node scripts/backlink-queue.mjs --verify=https://telegra.ph/your-page-11-02

# 4. Відфільтрувати тільки те, що залишилось
node scripts/backlink-queue.mjs --tier=A --limit=20
```

`--verify` показує HTTP-статус, `noindex`, і всі знайдені посилання на цільовий домен з `rel` та анкором. Це і є доказ, який треба зберегти в лог.

### Порядок роботи

1. **`--check`** один раз. Усе, що `reachable=no`, переводимо в `X` і більше не чіпаємо.
2. **Tier S, P1** — по одному, вручну, 20–60 хв на пункт. Це 80% результату.
3. **Tier A** — 3–5 сторінок на день, різний текст, різні анкори. Не більше.
4. **Tier B** — тільки після S/A. Каталоги нижче за якістю; 5–10 на тиждень максимум.
5. **Tier D** — окремий трек: 15–20 хвилин на день відповідати на питання без посилань. Посилання з'являються самі, коли ви вже корисні.
6. **Tier E/F** — один раз, для гігієни. Не зараховуйте їх у KPI.

### Логування

Після кожного розміщення додавайте рядок у `docs/link-building-tracking.json` (формат уже є) або хоча б у чергу:

```
S01 | live | https://tools.org.ua/uk/www/generatepasswordto.me | dofollow | 2026-11-02
A01 | live | https://telegra.ph/... | nofollow? | перевірити через --verify
```

Без логу через 3 тижні ви не знатимете, що вже зроблено, і почнете дублювати.

---

## 4. Правила, які не можна порушувати

- **Ніяких одноразових email і масових реєстрацій.** Це порушення ToS і пряма ознака link spam для Google. Репозиторій уже одного разу відмовився від такого підходу — див. [`docs/link-building-plan-2026-11.md`](./link-building-plan-2026-11.md).
- **Одна сторінка — один унікальний текст.** 20 однакових Telegraph-сторінок = шаблонний спам.
- **Анкори:** 50% бренд (`generatepasswordto.me`, `GeneratePasswordTo`), 30% загальні (`password generator`, `генератор паролів`), 20% довгі. Ніколи один і той самий точний анкор поспіль.
- **`nofollow` — це нормально.** Він дає трафік і брендові сигнали. Не женіться за `dofollow` на paste-хостингах.
- **Не обходьте captcha і не автоматизуйте форми.** Rate limit: 5–10 дій на день на старті. Це виглядає як людина, бо це людина.
- **Не платіть за посилання** і не беріть участь у масових link exchange. Tier Z — саме про це.
- **Перевіряйте `robots`/`noindex` перед витрачанням часу.** `--verify` це показує.

---

## 5. Що робити першим (15 дій, реальний ROI)

| # | Дія | Tier | Час | Очікування |
|---|---|---|---:|---|
| 1 | `tools.org.ua` — уже зроблено | S01 | — | ✅ dofollow, 11 лінків |
| 2 | PrivacyTools — suggested tool | S02 | 10 хв | сильний тематичний каталог |
| 3 | awesome-privacy — PR на один рядок | S03 | 20 хв | постійний репозиторій |
| 4 | AlternativeTo — картка альтернативи | S05 | 20 хв | трафік + індекс |
| 5 | SaaSHub | S06 | 15 хв | швидке схвалення |
| 6 | Slant — відповідь у топ-питанні | S07 | 15 хв | вічний тред |
| 7 | Show HN з технічним кутом | S22 | 30 хв | пік трафіку + лінк |
| 8 | Стаття на dev.to з canonical | S23 | 90 хв | referring domain |
| 9 | Пост на DOU.ua | S27 | 120 хв | UA-аудиторія |
| 10 | 2–3 відповіді на Security SE | S37 | 40 хв | експертний лінк |
| 11 | r/passwords — відповідь по суті | S31 | 30 хв | трафік, безпечно |
| 12 | Telegraph — одна сторінка з реальним поясненням | A01 | 10 хв | індексована сторінка |
| 13 | Write.as — анонімний пост | A03 | 15 хв | індексована сторінка |
| 14 | Rentry — короткий how-to | A02 | 10 хв | індексована сторінка |
| 15 | `--verify` + лог | — | 5 хв | докази й контроль |

Решта S/C — після цього, по 2–3 на тиждень.

---

## 6. Шаблони

### 6.1. Сторінка на Telegraph / Rentry / Write.as

Не копіюйте лендінг. Дайте те, чого немає на сайті: коротке пояснення з прикладами.

```
Заголовок: Як згенерувати пароль, який не йде на сервер

1. Що взагалі означає "локальна генерація" (Web Crypto, без запиту).
2. Скільки ентропії потрібно: 8/12/16/20 символів — таблиця з /password-statistics-2026.
3. Чому парольна фраза з 5 слів краща за 10 символів зі знаками.
4. Що каже NIST SP 800-63B (довжина > складність, без примусової ротації).
5. Посилання: генератор — https://www.generatepasswordto.me/ (анкор: password generator).
```

5–7 абзаців, один лінк, без «best tool 2026» і без списку конкурентів.

### 6.2. Картка в каталозі

```
Name: GeneratePasswordTo
URL: https://www.generatepasswordto.me/
Tagline (60): Free password generator — local, NIST-aligned, 11 languages
Short (160): Generate strong random passwords or memorable passphrases in your browser.
Nothing is sent to a server. NIST 800-63B guidance, 11 languages.
Long: GeneratePasswordTo.Me is a free password generator that runs entirely in your
browser. It creates cryptographically random passwords from 8 to 100 characters,
memorable passphrase modes built on the EFF wordlist, and numeric PINs. Every option
is explained with the standards behind it (NIST SP 800-63B, PCI DSS, OWASP), and the
site is available in 11 languages. Passwords are never transmitted or stored.
Tags: password generator, passphrase generator, random password, security, privacy, NIST
```

### 6.3. Відповідь у спільноті

```
Коротка відповідь на конкретне питання (2–4 речення).
Потім — чому саме так: довжина/ентропія/офлайн-генерація.
Посилання — тільки якщо людина просила інструмент або якщо без нього
відповідь неповна. Одне посилання, не три.
```

Ніяких «I built…» у топ-рівні треду, де це заборонено. Спочатку 5–10 корисних відповідей без лінків.

### 6.4. Лист редактору (Tier S outreach)

```
Subject: Password generator with local-only generation (source + standards)

Hi {name},
I maintain generatepasswordto.me — a free password generator that runs entirely
client-side (Web Crypto, no server round-trip) and documents the standards behind
each option. If you keep a resources page on password security, it may fit there:
{url}. Happy to answer questions or provide data for an article.
Either way, thanks for the work you publish on {topic}.
{signature}
```

---

## 7. Як розширити список самостійно

Додавайте рядки в CSV тим самим форматом. Шукайте не «backlink sites», а конкретні поверхні:

```
"submit your tool" password OR security
"add your site" directory -inurl:(submit)
"write for us" password security
site:github.com "awesome" password
site:reddit.com "password generator" recommendations
"resources" "password security" site:.edu
```

Критерій перед додаванням: сторінка індексується (`site:` перевірка), лінк не `noindex`, форма не вимагає оплати, тематика збігається. Якщо хоч одне «ні» — Tier X, не витрачайте час.

---

## 8. KPI і що вважати успіхом

- **7 днів:** 10–15 виконаних S/A дій, 3–5 живих індексованих сторінок, лог заповнений.
- **30 днів:** 5–10 referring domains у GSC → Links, з них ≥3 зі сторінок, що самі ранжуються.
- **90 днів:** 15–25 referring domains, ≥1 редакційна згадка, 1–2 лінки з тематичних каталогів.
- **Провал:** 100+ сабмітів за тиждень, 0 трафіку, різке падіння позицій. Це сигнал, що ви в Tier Z, а не в лінкбілдингу.

GSC → Links оновлюється із затримкою 2–4 тижні. Не робіть висновків за 3 дні.

---

## 9. Чого тут навмисно немає

- 700 мертвих доменів для «обсягу».
- Автосабмітера, який обходить captcha.
- Списку «dofollow forums 2026» — 95% таких списків складаються з `nofollow` і спам-майданчиків.
- Порад купувати посилання, робити PBN або масові Web 2.0.

Якщо потрібен саме великий обсяг — розширюйте Tier S/C релевантними каталогами й редакційними цілями, а не кількістю форм. Один лінк зі сторінки, що ранжується за «password security», коштує більше, ніж 200 paste-сторінок.
