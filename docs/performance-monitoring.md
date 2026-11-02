# Performance monitoring: Speed Insights + польові дані

Статус: **підключено в коді, дані з'являться після деплою** (2026-11-02).

## Що змінено

- Додано `@vercel/speed-insights@2` і `<SpeedInsights />` у
  `src/app/[locale]/layout.tsx` — працює для всіх локалей і сторінок.
- Скрипт Speed Insights вантажиться з **first-party** URL
  (`/_vercel/speed-insights/...`), без стороннього DNS і без блокувальників
  на кшталт `vitals.vercel-analytics.com`.
- Google Analytics (`gtag.js`) переведено з `afterInteractive` на
  `lazyOnload`, щоб він не конкурував за мережу/головний потік під час LCP.

## Чому не можна подивитися цифри просто зараз

Speed Insights — це **RUM**: метрики збираються з реальних браузерів після
деплою. Локально та в CI їх немає. Публічного API без токена теж немає, а
Vercel CLI у цьому середовищі не залогінений (`~/.vercel/auth.json`
відсутній). Тому:

1. Закомітьте й задеплойте зміни.
2. Дайте 24–48 годин трафіку (для малого сайту — довше).
3. Подивіться Vercel → проєкт → **Speed Insights** → TTFB / LCP → P75.
4. Або заберіть цифри через CLI (див. нижче).

## Vercel CLI (без Observability Plus)

```bash
vercel login
vercel link

# які метрики/виміри доступні
vercel metrics schema vercel.speed_insights

# p75 TTFB по країнах
vercel metrics vercel.speed_insights.ttfb_ms \
  --aggregation p75 --group-by country \
  --since 7d --order-by count --limit 20 \
  --project <project-name> --prod

# p75 LCP по країнах
vercel metrics vercel.speed_insights.lcp_ms \
  --aggregation p75 --group-by country \
  --since 7d --order-by count --limit 20 \
  --project <project-name> --prod

# скільки точок даних у кожній країні (щоб не вірити 3 вимірам)
vercel metrics vercel.speed_insights.ttfb_ms \
  --aggregation count --group-by country \
  --since 7d --project <project-name> --prod
```

Якщо `--group-by country` недоступний на вашому плані, дивіться
`--group-by route` і `--group-by deviceType`, а країни — у дашборді
(географічна мапа потребує Speed Insights Plus).

## Як читати цифри

| Метрика | Добре | Потребує уваги | Погано |
|---|---|---|---|
| TTFB p75 | < 800 ms | 800–1800 ms | > 1800 ms |
| LCP p75 | < 2.5 s | 2.5–4.0 s | > 4.0 s |
| INP p75 | < 200 ms | 200–500 ms | > 500 ms |
| CLS p75 | < 0.1 | 0.1–0.25 | > 0.25 |

Дивіться на `count` поруч із p75: 5 вимірів з однієї країни — це не
статистика. Для рішень про Cloudflare потрібні хоча б сотні точок на
цільову країну за 7–28 днів.

## Що робити з результатами

- **TTFB p75 < 800 ms у цільових країнах** → Cloudflare не потрібен,
  залишаємо Vercel. Це очікуваний сценарій за поточних ~200 ms.
- **TTFB p75 > 800 ms, і більшість точок — з країн без близького Vercel PoP**
  → Cloudflare proxied може допомогти, але спочатку перевірте
  `docs/cloudflare-setup.md` і зробіть A/B.
- **LCP > 2.5 s, а TTFB нормальний** → проблема не в CDN, а в JS/шрифтах/
  сторонніх скриптах. Дивіться route/device breakdown і елемент LCP.
- **LCP високий лише на мобільних** → перевіряйте TBT/INP і вагу JS, а не
  TTFB.

## Лабораторний baseline (не поле)

`npm run cdn:check` на 2026-11-02:

```
TTFB min 93 ms / avg 133 ms / max 270 ms
HTML cache HIT, Brotli, 194 URL у sitemap
```

Це вимір з однієї машини, а не p75 по країнах. Для рішень про CDN
використовуйте тільки RUM-дані.
