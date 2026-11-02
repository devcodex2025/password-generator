# Аудит каталогів без акаунта — повний обсяг (2026-11-02)

Замінює першу часткову версію (29 джерел). Тут — **усі 65** живих джерел із `registration=none`, які ще не були `done`/`tested-fail`/`blocked`, у тирах S/A/B.

## Метод

1. Відбір: `registration=none`, `tier` S/A/B, сторінка жива за `--check`, статус не `done`/`tested-fail`/`blocked`/`avoid` → 65.
2. Для кожного: GET головної → пошук посилань «submit / add site / suggest / new paste» → GET до 2 сторінок форми.
3. Розбір `<form>`: `action`, `method`, поля, `type=password`, `type=file`, checkbox ToS, поле `math`/`captcha`, ознаки JS-only (немає `action`), ознаки логіну.
4. Ручна перевірка спірних випадків (помилкові спрацювання site-wide reCAPTCHA, багатокрокові форми).
5. Подання — лише туди, де форма анонімна, без captcha, без пароля, без ToS і без людської перевірки. Ліміт — 10, фактично 2 спроби.

## Підсумок

| Група | Скільки | Вердикти |
|---|---:|---|
| Заблоковано технічно | **22** | captcha 10, акаунт/пароль 2, ToS 1, людська перевірка 1, бот-захист 6, JS-форма+email 2 |
| Немає придатної форми подання | **30** | немає серверної форми 29, лише збір email 1 |
| Не дають беклінк за визначенням | **12** | paste 3, файлохостинг 3, скорочувач 4, пінг 1, архівна форма 1 |
| Недоступний зараз | **1** | таймаут |
| **Разом** | **65** | |

**Результат: 0 нових посилань.** Загальний підсумок по сайту не змінився — 12 посилань із 2 доменів (`tools.org.ua` 11 dofollow, `telegra.ph` 1 nofollow).

## Спроби подання

| ID | Джерело | Що зроблено | Результат |
|---|---|---|---|
| B01 | Viesearch | `POST /submit` з полями url/title/description/category/email | `{"success":true}` → редірект на `/plan` (платні плани); чернетка й `/plan` → 404. Публічної сторінки немає |
| A36 | Wayback Save Page Now | `GET /save/https://www.generatepasswordto.me/` | **429**: «flagged as suspected abusive bot traffic». Снепшот не створено, повторів не робив |

Не виконувались свідомо:

- 3 paste-хости (A04, A06, A24) — публікація паст без SEO-цінності; політика «1 сторінка на платформу» і заборона сторінок «для обсягу».
- 4 скорочувачі (A39, A45, A46, A47) — редирект, а не беклінк.
- 3 файлохостинги (A09, A29, A33) — клікабельного вихідного посилання немає.
- 1 пінг (A48) — вихідного посилання немає.
- 1 архівна форма (A37, archive.today) — низька цінність і високий ризик Cloudflare-челенджу.

## Повна таблиця (65)

| ID | Джерело | URL | Вердикт | Причина |
|---|---|---|---|---|
| A04 | txt.fyi | https://txt.fyi/ | Paste-хост (політика) | Анонімна паста можлива, але без SEO-цінності; політика — 1 сторінка/платформа |
| A06 | Pastebin | https://pastebin.com/ | Paste-хост (політика) | Анонімна паста можлива, але без SEO-цінності; політика — 1 сторінка/платформа |
| A09 | bpa.st | https://bpa.st/ | Файлохостинг | Завантаження файлу, клікабельного лінка немає |
| A10 | pastes.dev | https://pastes.dev/ | Немає робочої форми | Немає серверної форми подання (JS-only, лише інструкції або 404) |
| A11 | ControlC | https://controlc.com/ | CAPTCHA | CAPTCHA у формі подання |
| A12 | JustPaste.it | https://justpaste.it/ | Немає робочої форми | Немає серверної форми подання (JS-only, лише інструкції або 404) |
| A13 | Paste.ee | https://paste.ee/ | Немає робочої форми | Немає серверної форми подання (JS-only, лише інструкції або 404) |
| A14 | Hastebin | https://hastebin.com/ | Бот-захист (403/429) | 403/429 для ботів |
| A15 | paste.rs | https://paste.rs/ | Немає робочої форми | Немає серверної форми подання (JS-only, лише інструкції або 404) |
| A18 | ix.io | http://ix.io/ | Немає робочої форми | Немає серверної форми подання (JS-only, лише інструкції або 404) |
| A19 | 0x0.st | https://0x0.st/ | Немає робочої форми | Немає серверної форми подання (JS-only, лише інструкції або 404) |
| A20 | JSFiddle | https://jsfiddle.net/ | CAPTCHA | CAPTCHA у формі подання |
| A22 | SQLFiddle | http://sqlfiddle.com/ | Немає робочої форми | Немає серверної форми подання (JS-only, лише інструкції або 404) |
| A23 | glot.io | https://glot.io/ | Немає робочої форми | Немає серверної форми подання (JS-only, лише інструкції або 404) |
| A24 | Pastebin.pl | https://pastebin.pl/ | Paste-хост (політика) | Анонімна паста можлива, але без SEO-цінності; політика — 1 сторінка/платформа |
| A25 | Wikimedia Etherpad | https://etherpad.wikimedia.org/ | Немає робочої форми | Немає серверної форми подання (JS-only, лише інструкції або 404) |
| A26 | DocDroid | https://www.docdroid.net/ | CAPTCHA | CAPTCHA у формі подання |
| A27 | Postimages | https://postimages.org/ | Немає робочої форми | Немає серверної форми подання (JS-only, лише інструкції або 404) |
| A28 | Imgbb | https://imgbb.com/ | Немає робочої форми | Немає серверної форми подання (JS-only, лише інструкції або 404) |
| A29 | Imgbox | https://imgbox.com/ | Файлохостинг | Завантаження файлу, клікабельного лінка немає |
| A30 | FreeImage.host | https://freeimage.host/ | CAPTCHA | CAPTCHA у формі подання |
| A31 | Catbox | https://catbox.moe/ | Немає робочої форми | Немає серверної форми подання (JS-only, лише інструкції або 404) |
| A32 | Litterbox | https://litterbox.catbox.moe/ | Немає робочої форми | Немає серверної форми подання (JS-only, лише інструкції або 404) |
| A33 | tmpfiles.org | https://tmpfiles.org/ | Файлохостинг | Завантаження файлу, клікабельного лінка немає |
| A34 | Uguu | https://uguu.se/ | Немає робочої форми | Немає серверної форми подання (JS-only, лише інструкції або 404) |
| A35 | pixeldrain | https://pixeldrain.com/ | Немає робочої форми | Немає серверної форми подання (JS-only, лише інструкції або 404) |
| A36 | Wayback Machine Save Page Now | https://web.archive.org/save/ | Бот-захист (403/429) | Save Page Now відповів 429: «suspected abusive bot traffic»; снепшот не створено |
| A37 | archive.today | https://archive.ph/ | Архівна форма | Є анонімна форма /submit/, але не використовувалась (низька цінність, ризик Cloudflare) |
| A39 | v.gd | https://v.gd/ | Скорочувач (редирект) | Форма є, але це редирект: не беклінк |
| A40 | TinyURL | https://tinyurl.com/ | Немає робочої форми | Немає серверної форми подання (JS-only, лише інструкції або 404) |
| A41 | t.ly | https://t.ly/ | Бот-захист (403/429) | 403/429 для ботів |
| A42 | shorturl.at | https://www.shorturl.at/ | Бот-захист (403/429) | 403/429 для ботів |
| A44 | spoo.me | https://spoo.me/ | Немає робочої форми | Немає серверної форми подання (JS-only, лише інструкції або 404) |
| A45 | s.id | https://s.id/ | Скорочувач (редирект) | Форма є, але це редирект: не беклінк |
| A46 | ulvis.net | https://ulvis.net/ | Скорочувач (редирект) | Форма є, але це редирект: не беклінк |
| A47 | da.gd | https://da.gd/ | Скорочувач (редирект) | Форма є, але це редирект: не беклінк |
| A48 | Ping-O-Matic | https://pingomatic.com/ | Пінг (без лінка) | Пінг-сервіс, вихідного посилання немає |
| B02 | Directory-Free | https://www.directory-free.com/ | CAPTCHA | Картинка-код (randomImage3.php + txtNumber) на add.php |
| B03 | ExactSeek | https://www.exactseek.com/ | CAPTCHA | CAPTCHA у формі подання |
| B04 | SoMuch | https://www.somuch.com/ | ToS | Обовʼязкове прийняття ToS перед поданням |
| B05 | 01WebDirectory | https://www.01webdirectory.com/ | Немає робочої форми | Лише інструкції; форма доступна з категорії, платна/ручна |
| B06 | WowDirectory | https://www.wowdirectory.com/ | Немає робочої форми | Сторінка 482 байти, лише «Loading...» — JS-only, серверної форми немає |
| B07 | GoGuides | https://www.goguides.org/ | Акаунт/пароль | Email + пароль + captcha + TOS = реєстрація |
| B08 | A1WebDirectory | https://www.a1webdirectory.org/ | CAPTCHA | CAPTCHA у формі подання |
| B09 | DirectoryVault | https://www.directoryvault.com/ | Недоступний зараз | Таймаут під час аудиту (був живий у --check; ймовірно тимчасово) |
| B10 | FreeWebDirectory | https://www.freewebdirectory.org/ | Немає робочої форми | Немає серверної форми подання (JS-only, лише інструкції або 404) |
| B11 | Directory Critic | https://www.directorycritic.com/ | Немає робочої форми | Мета-список; сторінки /submit віддають 404 |
| B12 | AI Tools Directory | https://aitoolsdirectory.com/ | Немає робочої форми | Немає серверної форми подання (JS-only, лише інструкції або 404) |
| B13 | ToolPilot | https://www.toolpilot.ai/ | CAPTCHA | CAPTCHA у формі подання |
| B14 | TopAI.tools | https://topai.tools/ | Бот-захист (403/429) | 403/429 для ботів |
| B15 | AI Tool Hunt | https://www.aitoolhunt.com/ | Немає робочої форми | Немає серверної форми подання (JS-only, лише інструкції або 404) |
| B16 | Insidr AI Tools | https://www.insidr.ai/ | JS-форма + email | JS-форма Elementor; поле email — насправді категорія; публікації не гарантує |
| B17 | OpenFuture | https://openfuture.ai/ | Бот-захист (403/429) | 403/429 для ботів |
| B18 | SuperTools | https://supertools.therundown.ai/ | Немає робочої форми | Немає серверної форми подання (JS-only, лише інструкції або 404) |
| B19 | AIXploria | https://www.aixploria.com/ | Немає робочої форми | Сторінка add-ai не має серверної форми (JS) |
| B20 | TinyLaunch | https://tinylaunch.com/ | Немає робочої форми | Немає серверної форми подання (JS-only, лише інструкції або 404) |
| B21 | Fazier | https://fazier.com/ | Лише збір email | Лише збір email, а не подання проєкту |
| B22 | Turbo0 | https://turbo0.com/ | Акаунт/пароль | Потрібен логін (/auth/login) |
| B23 | PitchWall | https://pitchwall.co/ | Немає робочої форми | Немає серверної форми подання (JS-only, лише інструкції або 404) |
| B25 | OpenHunts | https://openhunts.com/ | CAPTCHA | CAPTCHA у формі подання |
| S02 | PrivacyTools | https://www.privacytools.io/ | Немає робочої форми | Веб-форми немає; подання редакційне або через контакт — залишено в черзі як S-ціль |
| S10 | Startup Stash | https://startupstash.com/ | CAPTCHA | CAPTCHA у формі подання |
| S14 | FutureTools | https://www.futuretools.io/ | JS-форма + email | JS-only форма (Next.js), обовʼязковий email; серверного POST немає |
| S18 | Launching Next | https://www.launchingnext.com/ | Людська перевірка | Арифметичне поле math + email |
| S52 | Alternative.me | https://alternative.me/ | Немає робочої форми | Форми подання на сторінці немає |

## Що змінилося в репозиторії

- `docs/backlink-sources.csv`:
  - `blocked` — 16 джерел (captcha/акаунт/ToS/людська перевірка/JS+email), у `notes` причина й дата;
  - `tested-fail`, `value=0` — 7 (A36 Wayback 429, B21 лише email-збір, A14/A41/A42/B14/B17 — 403/429);
  - `verify` з поміткою «перевірити у браузері» — 28 (немає серверної форми: JS-only, інструкції, 404);
  - S02 залишено `todo` з поясненням, бо це редакційна S-ціль, а не зламана форма.
- Підсумковий розподіл статусів: done 5, todo 108, tested-fail 73, blocked 19, verify 39, avoid 12 (256).
- `docs/backlink-queue.md` — перегенеровано: **21** живий пункт Tier S/A P1–P2, без `tested-fail`.
- `docs/directory-audit-2026-11-02.json` — машиночитна версія цього аудиту (65 рядків, ті самі цифри).

## Висновок

1. **Каталоги без акаунтів у цьому списку вичерпані.** З 65 перевірених жоден не дає підтвердженого публічного посилання: 22 заблоковані технічно, 30 не мають робочої форми, 12 не дають беклінк за визначенням.
2. **Viesearch** — єдина форма, що прийняла дані, але вона веде на платний план і не створює сторінки.
3. **Wayback** блокує IP як «abusive bot» — повторювати не варто, це може погіршити репутацію IP.
4. Єдиний шлях до нових referring domains — Tier S/C дії з акаунтами (розділ 6 основного звіту) або редакційні контакти, а не каталоги.
