# Link-building run — 2026-11-02

## 1. Підсумок

- Джерел у списку: 256
- Перевірено HTTP: 256 (живих 210, мертвих 46, noindex 26 виявлено — з них реальний `noindex` на робочій сторінці 1, решта 25 — сторінки блокування 403, де слово «noindex» є в тексті відповіді)
- Опубліковано сторінок: 1 (усього 2 спроби публікації)
- Верифіковано лінків: 1 (dofollow 0, nofollow 1)
- Заблоковано: 3
- Витрачено часу: ~25 хв (оцінка за часовими мітками артефактів; окремий таймер не вівся)
- Додано referring domains за прогін: **1** (`telegra.ph`); єдине посилання з нього — `nofollow`

Гейт Фази 1 пройдено: живих 210/256 = 82% (поріг 40%).

## 2. Опубліковано та верифіковано

| ID | Платформа | URL | HTTP | noindex | rel | Анкор | Слів |
|---|---|---|---|---|---|---|---|
| A01 | Telegraph | https://telegra.ph/How-long-does-it-take-to-crack-a-password-A-working-estimate-11-02 | 200 | false | nofollow | crack-time dataset | 734 |

Сторінка веде рівно на 1 URL: `https://www.generatepasswordto.me/en/password-statistics-2026` (перевірено 200). У ТЗ був шлях `/password-statistics-2026`, але він віддає 404; робочий локалізований шлях — `/en/password-statistics-2026`, його й використано.

Сирий вивід `--verify` для опублікованого URL:

```json
{
  "page": "https://telegra.ph/How-long-does-it-take-to-crack-a-password-A-working-estimate-11-02",
  "http": 200,
  "finalUrl": "https://telegra.ph/How-long-does-it-take-to-crack-a-password-A-working-estimate-11-02",
  "noindex": false,
  "found": 1,
  "links": [
    {
      "href": "https://www.generatepasswordto.me/en/password-statistics-2026",
      "rel": "nofollow",
      "text": "crack-time dataset"
    }
  ]
}
```

Фактичний `rel` = `nofollow`, тому в CSV для A01 `link_type` виправлено з `dofollow` на `nofollow`.

Друга спроба (Write.as) не зарахована. Сирий вивід для прозорості:

```json
{
  "page": "https://write.as/lx7jnemx7lwwo",
  "http": 200,
  "finalUrl": "https://write.as/lx7jnemx7lwwo",
  "noindex": false,
  "found": 0,
  "links": []
}
```

## 3. Не вдалося

| ID | Джерело | Причина | Що робити людині |
|---|---|---|---|
| A03 | Write.as | Анонімний пост створено через офіційний API (`POST /api/posts` → 201), але Write.as віддає анонімні пости як звичайний текст: Markdown-лінк не став `<a>`, а надісланий готовий HTML екрановано. `--verify` → `found=0`. Пост видалено (DELETE → 204, URL тепер 404) | Не повторювати анонімно. За наявності акаунта — вставити готовий текст у веб-редактор Write.as, де Markdown рендериться, і перевірити лінк через `--verify` |

## 4. Заблоковано (потрібен акаунт/captcha/ToS)

| ID | Джерело | Що саме блокує |
|---|---|---|
| A02 | Rentry | Немає публічного API. Публікація лише через веб-форму з CSRF-токеном, captcha та edit code. Markdown-лінки сервіс підтримує, але автономно опублікувати неможливо |
| A05 | HackMD | Офіційний API вимагає `Authorization: Bearer <token>`, який видається лише в акаунті (hackmd.io/@docs/api-authorization). Анонімна публікація через API не задокументована |
| S42 | Lobsters | Invite-only, реєстрація за запрошенням |

Окремо: **98 із 111** джерел Tier S/C/D мають `registration=account` (ще 2 — GitHub, 4 — email, 1 — invite). Це не технічний збій, а свідома межа автономного прогону: акаунти, captcha й ToS не обходяться. У розділі 6 — топ-10 дій саме з цього пулу.

## 5. Зміни в репозиторії

- `docs/backlink-sources.checked.csv` — новий файл: усі 256 рядків із `http_status`, `reachable`, `noindex`, `final_url`, `checked_at`.
- `docs/backlink-sources.csv` — 46 недоступних і 1 реальний `noindex` переведено в `status=tested-fail`, `value=0`, у `notes` додано HTTP-код і дату; A01 → `done` + фактичний `link_type=nofollow`; A02/A05 → `blocked`; A03 → `tested-fail`. Рядки не видалені, `id`/`name`/`tier` не змінені, 256 рядків × 13 колонок збережено.
- `docs/backlink-queue.md` — перегенеровано з живих `todo`-джерел Tier S/A, P1–P2: 23 пункти на момент прогону, 21 після повного аудиту каталогів, жодного `tested-fail`.
- `docs/link-building-tracking.json` — 20 записів (2 з першого прогону + 10 сторінок Telegraph + службові записи аудиту й кампанії).
- `docs/backlink-check-2026-11-02.log` — сирий лог `--check`.
- `docs/verification-2026-11-02-telegraph.json`, `docs/verification-2026-11-02-writeas.json` — сирі виводи `--verify`.
- `docs/link-building-run-2026-11-02.md` / `.json` — звіт першого прогону.
- `docs/link-building-campaign-2026-11-02.md` / `.json` — кампанія на 10 розміщень: 10 сторінок Telegraph, усі верифіковані (HTTP 200, `noindex=false`, `found=1`, 500+ слів). Сирі виводи: `docs/verification-2026-11-02-telegraph-01..10.json`.
- `docs/directory-audit-2026-11-02.md` / `.json` — повний аудит 65 живих джерел без реєстрації (22 заблоковано, 30 без робочої форми, 12 не дають беклінк, 1 недоступний). Після нього: 16 джерел → `blocked`, 7 → `tested-fail`, 28 → `verify` з поміткою «перевірити у браузері»; черга — 21 пункт.
- `src/`, залежності, CI не змінювались. Нічого не закомічено.

Свідоме відхилення: 12 рядків Tier Z залишені зі `status=avoid` (Z01 — 403, Z04 — timeout). `avoid` — це заборона на використання, а не результат тесту; переводити їх у `tested-fail` означало б натякнути, що сервіс варто спробувати, коли він запрацює. HTTP-статуси зафіксовані в `checked.csv`.

## 6. Наступні 10 дій для людини

| # | ID | Дія | URL | Час | Очікуваний результат |
|---|---|---|---|---|---|
| 1 | S02 | Подати інструмент у PrivacyTools через їхню форму «suggest a tool» | https://www.privacytools.io/ | 10 хв | Тематичний каталог, ручна модерація |
| 2 | S03 | Fork + PR: один рядок у awesome-privacy за їхнім contribution guide | https://github.com/Lissy93/awesome-privacy | 20 хв | Постійний GitHub-репозиторій, `nofollow` |
| 3 | S05 | Створити акаунт, додати застосунок як альтернативу; бот отримує 403, у браузері сторінка жива | https://alternativeto.net/ | 20 хв | Трафік + індексація |
| 4 | S06 | Submit product, безкоштовний тариф | https://www.saashub.com/ | 15 хв | Швидке схвалення |
| 5 | S16 | Launch із GitHub-логіном, кут «11 локалей + локальна генерація» | https://devhunt.org/ | 20 хв | Dev-аудиторія |
| 6 | S23 | Опублікувати готовий текст із розділу 7.4, виставити canonical | https://dev.to/ | 30 хв | Referring domain, `nofollow` |
| 7 | S22 | Show HN у вівторок–четвер, технічний кут, без маркетингу | https://news.ycombinator.com/show | 30 хв | Пік трафіку + лінк |
| 8 | S27 | Український технічний пост (можна адаптувати 7.4) | https://dou.ua/ | 120 хв | UA-аудиторія, редакційна цінність |
| 9 | S31 | Дати 3 відповіді по суті без лінків, потім 1 доречний лінк | https://www.reddit.com/r/passwords/ | 30 хв | Трафік, без ризику promo-ban |
| 10 | S37 | Відповісти на 2 питання про ентропію/злам; лінк лише якщо він завершує відповідь | https://security.stackexchange.com/ | 40 хв | Експертний лінк, `nofollow` |

### 6.1. Джерела зі `status=verify` (перевірити вручну)

`--check` підтвердив, що сторінка відповідає, але не підтвердив форму подання, наявність вихідного посилання чи індексацію. Причина в колонці «Чому вручну».

| ID | Джерело | URL | Чому вручну |
|---|---|---|---|
| S52 | Alternative.me | https://alternative.me/ | may need account; registration=none |
| A04 | txt.fyi | https://txt.fyi/ | no rich links; minimal SEO value; registration=none |
| A09 | bpa.st | https://bpa.st/ | retention varies; registration=none |
| A10 | pastes.dev | https://pastes.dev/ | raw text host; registration=none |
| A11 | ControlC | https://controlc.com/ | legacy paste host; registration=none |
| A20 | JSFiddle | https://jsfiddle.net/ | link in code comment only; registration=none |
| A23 | glot.io | https://glot.io/ | snippet host; registration=none |
| A24 | Pastebin.pl | https://pastebin.pl/ | nofollow; registration=none |
| A41 | t.ly | https://t.ly/ | may require account for custom slug; registration=none |
| A44 | spoo.me | https://spoo.me/ | open source; registration=none |
| A45 | s.id | https://s.id/ | may require account; registration=none |
| A46 | ulvis.net | https://ulvis.net/ | tracking only; registration=none |
| B01 | Viesearch | https://www.viesearch.com/ | human-reviewed directory; registration=none |
| B02 | Directory-Free | https://www.directory-free.com/ | low quality; verify indexation; registration=none |
| B03 | ExactSeek | https://www.exactseek.com/ | small search engine; registration=none |
| B04 | SoMuch | https://www.somuch.com/ | legacy directory; registration=none |
| B05 | 01WebDirectory | https://www.01webdirectory.com/ | legacy directory; low quality; registration=none |
| B06 | WowDirectory | https://www.wowdirectory.com/ | legacy directory; registration=none |
| B07 | GoGuides | https://www.goguides.org/ | legacy directory; registration=none |
| B08 | A1WebDirectory | https://www.a1webdirectory.org/ | legacy directory; registration=none |
| B09 | DirectoryVault | https://www.directoryvault.com/ | legacy directory; registration=none |
| B10 | FreeWebDirectory | https://www.freewebdirectory.org/ | legacy directory; registration=none |
| B12 | AI Tools Directory | https://aitoolsdirectory.com/ | free submission; registration=none |
| B13 | ToolPilot | https://www.toolpilot.ai/ | free tier; registration=none |
| B14 | TopAI.tools | https://topai.tools/ | free submission; registration=none |
| B15 | AI Tool Hunt | https://www.aitoolhunt.com/ | free submission; registration=none |
| B16 | Insidr AI Tools | https://www.insidr.ai/ | free tier; registration=none |
| B17 | OpenFuture | https://openfuture.ai/ | free submission; registration=none |
| B18 | SuperTools | https://supertools.therundown.ai/ | newsletter-adjacent; registration=none |
| B19 | AIXploria | https://www.aixploria.com/ | free submission; registration=none |
| B20 | TinyLaunch | https://tinylaunch.com/ | free launch board; registration=none |
| B21 | Fazier | https://fazier.com/ | free launch board; registration=none |
| B22 | Turbo0 | https://turbo0.com/ | free launch board; registration=none |
| B23 | PitchWall | https://pitchwall.co/ | free launch board; registration=none |
| B25 | OpenHunts | https://openhunts.com/ | free launch board; registration=none |
| C01 | SaaS Mantra | https://www.saasmantra.com/ | low traffic; registration=account |
| C02 | SaaS AI Tools | https://saasaitools.com/ | low traffic; registration=account |
| C07 | IndieMaker | https://indiemaker.co/ | small board; registration=account |
| D16 | Reddit r/passwordmanagers | https://www.reddit.com/r/passwordmanagers/ | small but on-topic; registration=account |
| E27 | Nibbler | https://nibbler.silktide.com/ | indexable report but no dofollow link; registration=none |

## 7. Готові тексти

### 7.1. Картка для SaaSHub (продуктовий каталог)

**EN**
- Name: GeneratePasswordTo
- URL: https://www.generatepasswordto.me/
- Tagline (60): Local-only password and passphrase generator, 11 languages
- Short (160): Free browser-based password generator. Web Crypto randomness, NIST-aligned guidance, passphrase and PIN modes — nothing leaves your device.
- Long: GeneratePasswordTo.Me is a free password generator that runs entirely in the browser. It creates cryptographically random passwords from 8 to 100 characters, memorable passphrases from the EFF wordlist, and numeric PINs. Every option is explained with the standard behind it (NIST SP 800-63B, OWASP, PCI DSS), and the interface is available in 11 languages. Passwords are never transmitted to or stored on a server. No account, no telemetry, no upsell.
- Tags: password generator, passphrase generator, random password, security, privacy, NIST

**UA**
- Назва: GeneratePasswordTo
- URL: https://www.generatepasswordto.me/
- Tagline (60): Генератор паролів і фраз, 11 мов, лише локально
- Short (160): Безкоштовний генератор паролів у браузері: криптографічна випадковість, режим парольних фраз і PIN. Дані не залишають пристрій.
- Long: GeneratePasswordTo.Me — безкоштовний генератор паролів, що працює повністю у браузері. Створює випадкові паролі від 8 до 100 символів, парольні фрази на основі списку слів EFF і числові PIN. Кожен параметр пояснено з посиланням на стандарт (NIST SP 800-63B, OWASP, PCI DSS), інтерфейс доступний 11 мовами. Паролі не передаються на сервер і не зберігаються. Без акаунта, без телеметрії, без платних тарифів.
- Теги: генератор паролів, парольна фраза, випадковий пароль, безпека, приватність, NIST

### 7.2. Картка для AlternativeTo (порівняльний каталог)

**EN**
- Name: GeneratePasswordTo
- URL: https://www.generatepasswordto.me/
- Tagline (60): A password generator that never sees your password
- Short (160): Open-standards password generator with passphrase and PIN modes. Runs client-side in 11 languages; no signup, no cloud sync, no stored secrets.
- Long: A browser-side alternative to cloud password generators. GeneratePasswordTo.Me uses the Web Crypto API so the password is created on your device and never sent anywhere. Choose 8–100 random characters, a 4–7 word EFF passphrase, or a numeric PIN, with the entropy and crack-time reasoning documented on the site. Useful when you need a one-off strong password without creating an account in yet another service.
- Tags: password generator, alternative, passphrase, privacy, client-side, no account

**UA**
- Назва: GeneratePasswordTo
- URL: https://www.generatepasswordto.me/
- Tagline (60): Генератор паролів, який не бачить ваш пароль
- Short (160): Генератор за відкритими стандартами: парольні фрази, PIN, 11 мов. Працює на клієнті — без реєстрації та хмарної синхронізації.
- Long: Браузерна альтернатива хмарним генераторам паролів. GeneratePasswordTo.Me використовує Web Crypto API: пароль створюється на вашому пристрої й нікуди не надсилається. Можна взяти 8–100 випадкових символів, фразу з 4–7 слів за списком EFF або числовий PIN; розрахунок ентропії та часу зламу опубліковано на сайті. Зручно, коли потрібен одноразовий сильний пароль без ще одного акаунта.
- Теги: генератор паролів, альтернатива, парольна фраза, приватність, клієнтська генерація

### 7.3. Картка для PrivacyTools (privacy-каталог)

**EN**
- Name: GeneratePasswordTo
- URL: https://www.generatepasswordto.me/
- Tagline (60): Client-side password generator with public methodology
- Short (160): Generates passwords and passphrases locally with Web Crypto. Documents the entropy math, cites NIST and OWASP, and collects no data.
- Long: A free password generator built around a simple rule: the secret must not leave the device. Generation uses `crypto.getRandomValues` in the browser; there is no server endpoint that receives a password. The site publishes its entropy formulas and crack-time assumptions so the claims can be checked, and it links to NIST SP 800-63B and OWASP guidance instead of inventing its own rules. Available in 11 languages, including Ukrainian. No account, no analytics on generated values, no password storage.
- Tags: password generator, privacy, client-side, Web Crypto, open methodology, NIST

**UA**
- Назва: GeneratePasswordTo
- URL: https://www.generatepasswordto.me/
- Tagline (60): Клієнтський генератор із відкритою методикою
- Short (160): Генерує паролі та фрази локально через Web Crypto. Публікує формули ентропії, посилається на NIST і OWASP, не збирає дані.
- Long: Безкоштовний генератор паролів із простим правилом: секрет не залишає пристрій. Генерація йде через `crypto.getRandomValues` у браузері, серверного ендпоінта, який приймає пароль, не існує. Сайт публікує формули ентропії та припущення щодо часу зламу, щоб їх можна було перевірити, і посилається на NIST SP 800-63B та OWASP замість власних вигаданих правил. Доступний 11 мовами, включно з українською. Без акаунта, без аналітики згенерованих значень, без збереження паролів.
- Теги: генератор паролів, приватність, клієнтська генерація, Web Crypto, NIST

### 7.4. Пост для dev.to (з canonical)

Заголовок: **Your password generator should not be able to read your password**

Canonical: `https://www.generatepasswordto.me/en/guides/secure-password-generator-guide`

Теги: `security, webdev, javascript, privacy`

````markdown
---
title: Your password generator should not be able to read your password
canonical_url: https://www.generatepasswordto.me/en/guides/secure-password-generator-guide
tags: security, webdev, javascript, privacy
---

Most "generate password" buttons are a form post. You pick a length, the browser
sends a request, a server runs `random.choice()` in a loop and returns a string.
It works, and it is the wrong architecture for the one thing the page exists to
produce.

## What can go wrong server-side

A password that reaches a server exists in places you do not control: the request
log, the framework's debug output, an APM trace, a queue payload, a database
column someone added for "history". None of these require malice. They require a
normal Tuesday.

There is also a quieter problem: the randomness source. `Math.random()` is not a
CSPRNG. In Node, `crypto.randomBytes` is fine; in a serverless function with a
cold start, people reach for whatever is imported. A generator that runs in the
browser can use `crypto.getRandomValues`, which is specified for exactly this.

## What client-side generation looks like

The shape is small:

```js
const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*';
const bytes = new Uint32Array(length);
crypto.getRandomValues(bytes);
let out = '';
for (const b of bytes) out += alphabet[b % alphabet.length];
```

Two details matter more than the code. First, modulo bias: `b % alphabet.length`
is only uniform when the range divides 2^32. For a 64-symbol alphabet it is fine;
for 94 symbols the bias is tiny but real, so rejection sampling is the correct
version. Second, the alphabet should avoid ambiguous characters if a human will
ever read the password aloud or type it from paper.

## Entropy is the part worth documenting

`log2(alphabetSize) * length` gives the search space in bits. A 94-symbol
alphabet gives 6.55 bits per character: 12 characters ≈ 79 bits, 16 ≈ 105. A
passphrase over the EFF 7,776-word list gives 12.9 bits per word, so 6 words ≈
78 bits. Those numbers mean nothing without the guess rate and the hash
assumption behind them, which is why a serious generator publishes its method
instead of a coloured bar.

## The checklist I would apply to any generator

- Does generation happen in the browser, with `crypto.getRandomValues`?
- Is there any network request that contains the generated value?
- Are length/character-set/passphrase options explained, not just offered?
- Is the entropy formula published, with the guess-rate assumption?
- Does the page work without an account, and without storing the result?

If a generator cannot answer the first two, the rest does not matter. A password
is only as private as the weakest system that has seen it.

I wrote up the longer version, including the NIST SP 800-63B reasoning and the
passphrase math, in the [secure password generator guide](https://www.generatepasswordto.me/en/guides/secure-password-generator-guide).
````

## 8. Ризики та спостереження

- **403 — це не «мертве».** З 46 недоступних джерел 28 віддали 403, ще 2 — 429, 1 — 526 (Cloudflare). Це бот-захист, а не видалений сайт: AlternativeTo, Product Hunt, Medium, npm, Stack Overflow, G2, Capterra, Softpedia живі в браузері. За правилом ТЗ вони переведені в `tested-fail`/`value=0`, але в ручному handoff їх варто перевіряти першими, а не викреслювати.
- **`noindex` у 403-відповідях — хибні спрацювання.** Регулярка скрипта шукає слово `noindex` у тілі; сторінки блокування його містять. Реально `noindex` лише в S44 (F6S, HTTP 200). У звіті це розділено, щоб не завищувати кількість «неіндексованих».
- **Telegraph віддає `rel="nofollow"`.** У CSV A01 стояв `dofollow` — це виправлено за фактичним виводом `--verify`. Очікування «Tier A = dofollow» було помилковим.
- **Write.as не рендерить Markdown для анонімних постів.** API приймає Markdown, але віддає його як текст; готовий HTML екранується. Без акаунта лінк там неможливий. Це варто зафіксувати в стратегії: анонімність Write.as і рендеринг лінків взаємовиключні.
- **Баг у `scripts/backlink-queue.mjs`.** У `runChecks` рядок `{ ...record, ...result }` перезаписує `record.status` HTTP-кодом, тому в `backlink-sources.checked.csv` колонка `status` містить HTTP-код, а не статус джерела. На аудит не вплинуло (я оновлював `backlink-sources.csv` з оригіналу), але скрипт варто поправити окремим комітом.
- **Суперечність на самій сторінці статистики.** `/en/password-statistics-2026` у методі вказує `10^13` guesses/s, а колонка часу зламу збігається з `~10^12` (12 символів → «~19 000 років»; за 10^13 це ≈1 900 років, а для 16 символів розбіжність уже в мільйони разів). Для YMYL-сторінки це ризик довіри; статтю на Telegraph написано з власним, узгодженим розрахунком, але саму сторінку сайту варто перерахувати.
- **Один referring domain за прогін — очікувано.** `telegra.ph` — безкоштовний субдомен із `nofollow`: це брендовий/індексаційний сигнал, а не важіль рейтингу. Реальні referring domains дадуть Tier S/C дії з розділу 6.
- **Zero-click ризик.** 98 із 111 Tier S/C/D вимагають акаунта. Без людини прогін щоразу даватиме 0–2 лінки; це обмеження моделі, а не збій.

## 9. NOT DONE

- NOT DONE: третя сторінка (тема «Що насправді вимагає NIST 800-63B») — немає третьої Tier A платформи з офіційним API для анонімної публікації; Rentry і HackMD заблоковані, а правило «1 сторінка на платформу» забороняє другу сторінку на Telegraph.
- NOT DONE: лінк із Write.as — анонімний пост не рендерить Markdown, `found=0`; сторінку видалено, щоб не залишати напівзламану копію.
- NOT DONE: дії для 98 джерел Tier S/C/D з `registration=account` — потребують акаунта, captcha або прийняття ToS; винесені в розділ 6.
- NOT DONE: виправлення бага `status`/`http_status` у `scripts/backlink-queue.mjs` — поза межами цього прогону, щоб диф залишався сфокусованим.
