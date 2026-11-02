# Cloudflare перед Vercel — підготовка до підключення

Статус: **підготовлено, не активовано** (2026-11-02).

Vercel уже має вбудовану CDN (Edge Network): сторінки пре-рендеряться і
віддаються з кешу найближчого PoP. Cloudflare — це **не заміна** відсутньої
CDN, а додатковий шар. Підключати його варто лише якщо є виміряна проблема,
яку Vercel не закриває: мало PoP у цільових країнах, потрібен окремий WAF,
або TTFB на реальних користувачах стабільно гірший за ~300 ms.

## 1. Поточний стан (2026-11-02)

| Що | Значення |
|---|---|
| DNS | Hostinger: `cosmos.dns-parking.com`, `nova.dns-parking.com` |
| apex `generatepasswordto.me` | `A 216.198.79.1` (Vercel), TTL 60 |
| `www` | `CNAME c69eb314909d0d76.vercel-dns-017.com` (Vercel) |
| apex → www | `301` на рівні Vercel (`next.config.js`) |
| MX | немає (пошта на домені не налаштована) |
| TXT | `google-site-verification=iB6U_WnnZbU-Szh4EXF7BzSzqHuQE4MZGI_Sto7u3yM` |
| Віддача | `Server: Vercel`, `X-Vercel-Cache: HIT`, Brotli `129 KB → 27 KB` |
| TTFB з України | ~130–210 ms (холодний старт / warm), TLS ~110 ms, edge `arn1` (Стокгольм) |

## 2. Що вже підготовлено в репозиторії

- `src/proxy.ts` вміє читати `CF-IPCountry`, якщо задано
  `TRUST_CF_IPCOUNTRY=true`. Без цієї змінної поведінка не змінюється.
- `npm run cdn:check` — перевірка живого сайту: edge, кеш, TTFB, стиснення,
  geo-cookie, apex-редірект, статика, sitemap, robots.
- `.env.example` містить опис `TRUST_CF_IPCOUNTRY`.

Запуск перевірки:

```bash
npm run cdn:check
npm run cdn:check -- --url https://preview.example.com --runs 3
```

## 3. Головне обмеження: geo за проксі

Зараз `geo`-cookie для affiliate-оферів ставиться з `x-vercel-ip-country`.
Коли трафік іде через Cloudflare, Vercel бачить IP Cloudflare, а не
відвідувача, тому:

- `x-vercel-ip-country` описує PoP Cloudflare, а не країну користувача;
- Vercel офіційно не підтримує свої geo-заголовки за стороннім проксі
  (збереження гео є лише в Enterprise Trusted Proxy);
- `Set-Cookie` з HTML не кешується Cloudflare за замовчуванням, а з
  примусовим Edge TTL — **видаляється** з кешованої відповіді.

Тому після включення проксі обов'язково:

1. Cloudflare → Network → **IP Geolocation: On**.
2. Vercel → Production env → `TRUST_CF_IPCOUNTRY=true`, redeploy.
3. Якщо вмикаєте кешування HTML — geo-cookie треба ставити на edge
   (розділ 6, варіант B), інакше відвідувачі кешованих сторінок не
   отримають cookie.

## 4. Крок 1 — додати домен у Cloudflare

1. Cloudflare → Add a site → `generatepasswordto.me` → Free.
2. Імпорт DNS. Перевірте, що перенесено **всі** записи:

| Type | Name | Content | Proxy |
|---|---|---|---|
| A | `@` | `216.198.79.1` | Proxied (для тесту CDN) або DNS only |
| CNAME | `www` | `c69eb314909d0d76.vercel-dns-017.com` | Proxied або DNS only |
| TXT | `@` | `google-site-verification=iB6U_...` | DNS only |

TTL на час міграції — 60–300 s. MX немає; якщо пошта з'явиться пізніше,
перенесіть MX до зміни NS.

3. Змініть NS у реєстратора на видані Cloudflare. Після цього зачекайте
   активації зони (від кількох хвилин до кількох годин).

> Порада: спочатку можна поставити записи в **DNS only** (сіра хмара) —
> це перевірить, що DNS і TLS працюють, але TTFB не зміниться. Проксі
> вмикайте окремим кроком, щоб мати чистий rollback.

## 5. Крок 2 — SSL/TLS і транспорт

Cloudflare → SSL/TLS:

- режим **Full (strict)**. **Не** Flexible — буде redirect loop
  (Cloudflare → HTTP → Vercel → HTTPS → ...);
- Always Use HTTPS: On;
- Minimum TLS Version: 1.2 (краще 1.3, якщо не потрібні старі клієнти);
- TLS 1.3: On; 0-RTT: On (обережно з non-idempotent запитами — у нас
  генератор повністю клієнтський, це безпечно);
- HSTS: уже віддається Vercel з `max-age=63072000; includeSubDomains; preload`.
  Не дублюйте іншим значенням — залиште як є.

Cloudflare → Speed:

- Brotli: On (Vercel уже стискає, CF не завадить);
- Early Hints: On;
- **Rocket Loader: Off** — ламає Next.js hydration;
- Auto Minify: не використовуйте (застаріло).

## 6. Крок 3 — Cache Rules

Порядок правил важливий: останнє відповідне правило перемагає. Спочатку — bypass
для динаміки, потім — кеш статики, HTML — окремо.

### Обов'язкові правила

1. **Bypass API та image optimizer**
   - Expression: `starts_with(http.request.uri.path, "/api/") or starts_with(http.request.uri.path, "/_next/image")`
   - Cache eligibility: **Bypass cache**

2. **Статика Next.js**
   - Expression: `starts_with(http.request.uri.path, "/_next/static/")`
   - Cache eligibility: Eligible for cache
   - Edge TTL: Ignore cache-control header and use this TTL → **1 year**
   - Browser TTL: Respect origin (Vercel уже віддає `immutable`)

3. **Зображення, шрифти, іконки**
   - Expression: `http.request.uri.path.extension in {"avif" "webp" "png" "jpg" "jpeg" "gif" "svg" "ico" "woff" "woff2"}`
   - Eligible for cache, Edge TTL 1 month

4. **HTML — тільки після розділу 6B**
   - За замовчуванням **не кешуйте HTML**. Vercel віддає
     `Cache-Control: public, max-age=0, must-revalidate` + `Set-Cookie: geo=...`,
     тому Cloudflare дасть `BYPASS`/`DYNAMIC` і просто додасть зайвий хоп.
   - Без кешування HTML очікуваний TTFB **не покращиться**, а може стати
     гіршим на 30–80 ms.

### 6B. Якщо все ж кешувати HTML (для реального виграшу TTFB)

Потрібні дві речі: Cache Rule з Edge TTL (він примусово прибирає
`Set-Cookie` з кешу) і Response Header Transform Rule, який повертає
geo-cookie вже на edge.

Cache Rule:

- Expression: `http.request.method eq "GET" and not starts_with(http.request.uri.path, "/api/")`
- Cache eligibility: Eligible for cache
- Edge TTL: Ignore cache-control header and use this TTL → **5–15 minutes**
- Browser TTL: Respect origin

Response Header Transform Rule (Cloudflare → Rules → Transform Rules →
Modify Response Header):

- Expression: `http.request.method eq "GET" and ip.src.country ne "XX"`
- Operation: **Set** для `set-cookie`
- Value (dynamic): `concat("geo=", ip.src.country, "; Path=/; Max-Age=86400; SameSite=Lax")`

Важливо:

- Для response-трансформацій використовується `ip.src.country`, не
  `ip.geoip.country`.
- `Set` перезаписує інші `Set-Cookie`; якщо колись з'являться сесійні
  cookie — перейдіть на `Add` або обмежте правило шляхом HTML.
- Після кожного деплою кеш HTML треба інвалідувати: або короткий TTL
  (5–15 min), або Vercel Deploy Hook → Cloudflare Purge API.
- Перевірте, що сторінки однакові для всіх: у нас немає авторизації, тому
  це безпечно.

## 7. Крок 4 — безпека та боти

- Bot Fight Mode: **Off** на час запуску. Він може челенджити
  `Mediapartners-Google` (AdSense) і Googlebot. У `public/robots.txt` ці
  crawler'и вже явно дозволені — не ламайте ці правила.
- Security Level: Medium.
- WAF managed rules: можна, але перевірте, що не блокуються
  `Googlebot`, `Mediapartners-Google`, `AdsBot-Google`.
- Rate limiting: не потрібен для статичного генератора.
- Vercel Deployment Protection для production-домену має бути **вимкнений**,
  інакше Cloudflare отримає 401 замість сторінки.

## 8. Крок 5 — перевірка після перемикання

```bash
npm run cdn:check
```

Вручну:

```bash
curl -sSI https://www.generatepasswordto.me/
# Server: cloudflare, CF-Cache-Status, X-Vercel-Cache, Set-Cookie: geo=...

curl -sSI https://generatepasswordto.me/
# 301 → https://www.generatepasswordto.me/

curl -sS https://www.generatepasswordto.me/sitemap.xml | Select-String "<loc>"
curl -sSI https://www.generatepasswordto.me/robots.txt
```

Чекліст:

- [ ] `Server: cloudflare`, HTML `CF-Cache-Status: HIT` (якщо ввімкнено 6B);
- [ ] `Set-Cookie: geo=XX` присутній на кешованій сторінці;
- [ ] apex → www без циклу, HSTS на місці;
- [ ] `/en`, `/ua`, `/en/password-statistics-2026` — 200;
- [ ] `/_next/static/*` — `immutable`, `cf-cache-status: HIT`;
- [ ] sitemap і robots доступні Googlebot;
- [ ] AdSense-банери не зникли, `Mediapartners-Google` не отримує 403;
- [ ] GSC: sitemap читається, URL inspection проходить;
- [ ] Vercel Analytics не показує всіх відвідувачів з однієї країни;
- [ ] порівняти TTFB/LCP до/після на реальних користувачах (CrUX/RUM),
      а не одним `curl` з однієї машини.

## 9. Rollback

1. Cloudflare DNS → перемкнути `@` і `www` на **DNS only** (сіра хмара).
   Vercel продовжить віддавати сайт напряму, сертифікат Vercel уже виданий.
2. Перевірити `Server: Vercel`, `X-Vercel-Cache: HIT`, apex-редірект.
3. Прибрати `TRUST_CF_IPCOUNTRY` або виставити `false`, redeploy.
4. Якщо потрібно повністю піти — повернути NS Hostinger
   (`cosmos.dns-parking.com`, `nova.dns-parking.com`).
5. Purge Everything у Cloudflare, щоб не віддавати старий кеш.

## 10. Ризики, які треба прийняти свідомо

| Ризик | Наслідок |
|---|---|
| Подвійна CDN | Два шари кешу, складніше дебажити, потрібен purge після деплою |
| Geo за проксі | Без `TRUST_CF_IPCOUNTRY` + edge-cookie affiliate-гео ламається |
| Аналітика | Vercel Analytics бачить IP Cloudflare; гео/унікальність спотворюються |
| Боти | Втрачаються частина сигналів Vercel WAF/Bot Protection |
| AdSense | Bot Fight Mode може блокувати crawler'ів |
| SEO | Невдалі Cache Rules можуть віддавати stale HTML або різний контент |

## 11. Рішення

- **Не підключати Cloudflare лише заради CDN.** Vercel Edge Network уже
  виконує цю роль, а TTFB ~200 ms з України — хороший показник.
- **DNS-only** режим Cloudflare має сенс, якщо потрібен безкоштовний
  швидкий DNS/DNSSEC і незалежність від Hostinger, але TTFB він не змінить.
- **Проксі** виправданий, якщо після тесту на реальних користувачах
  Cloudflare дає стабільні **>50 ms** виграшу і ви готові до
  geo-cookie на edge та purge HTML-кешу.
- Перед перемиканням зафіксуйте baseline: `npm run cdn:check` і
  CrUX/Lighthouse по кількох гео.
