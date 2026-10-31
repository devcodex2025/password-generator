# Розкладка лендінгів Nord по мовах (2026-10-31)

Джерело: `Affiliate_Offer` / `Affiliate_OfferUrl` через `scripts/nord-affiliate-sync.mjs` — 14 офферів, 1555 лендінгів.

Ставки: **NordVPN 40%**, **NordPass 30%**, **NordPass Business 25%**, **NordLocker 40%**, NordProtect 40%, Coveron 40%.

## NordPass — offer 488, 30%

| Мова | url_id | Лендінг |
|---|---|---|
| en | 9356 | nordpass.com/special/ |
| de | 10303 | nordpass.com/de/special/ |
| fr | 10228 | nordpass.com/fr/special/ |
| es | 17691 | nordpass.com/special/es |
| it | 11309 | nordpass.com/it/special |
| pt | 25248 | nordpass.com/special-br/ (pt-BR) |
| ru, pl, ja, zh, ua | — | дефолтний лендінг оффера |

Family: en 24599, it 24656, es 24657. Для решти мов — англійська family-сторінка.

## NordVPN — offer 15, 40%

| Мова | url_id | Лендінг |
|---|---|---|
| en | 29486 | nordvpn.com/ |
| de | 4 | nordvpn.com/de/ |
| fr | 8 | nordvpn.com/fr/ |
| es | 40 | nordvpn.com/es/ |
| it | 26185 | nordvpn.com/it/special/ (окремої it-головної немає) |
| pl | 34136 | nordvpn.com/pl |
| pt | 30 | nordvpn.com/pt/ |
| ru | 6 | nordvpn.com/ru/ |
| ja, zh, ua | — | дефолтний лендінг (у Норда немає /ja/, /zh/, /uk/ головних) |

Гео-оффери (мають пріоритет над мовою, через cookie `geo` з `x-vercel-ip-country`):

| Країна | Оффер | url_id |
|---|---|---|
| CN | 153 NordVPN China | 2777 |
| KR | 476 NordVPN Korea | — (дефолт) |
| SA | 226 NordVPN Arabia | — (дефолт) |

## NordLocker — offer 489, 40%

en → 14794 (`nordlocker.com/special/`). Локалізованих лендінгів немає, інші мови йдуть на ту саму сторінку.

## Правило «дефолтного» лендінгу

Якщо для мови немає окремого `url_id`, лінк іде **без** `url_id`:
`https://go.nordvpn.net/aff_c?offer_id=488&aff_id=146616`

Nord сам редіректить за гео/мовою відвідувача. Це краще, ніж примусово відправити японця на англійську сторінку.

Перевірено: параметр `&url=` у tracking-лінку **ігнорується** (`url_id` жорстко задає лендінг), тому підмінити сторінку «на льоту» неможливо.

## Що виправлено в контенті

22 вбудовані лінки `&url_id=902` у тексті гайда `vpn-security-privacy-guide` (11 мов × 2) прибрано — тепер вони ведуть на дефолтний лендінг і підхоплюють мову відвідувача замість фіксованої `/special/`.

## Перевірка

```bash
node scripts/affiliate-links-report.mjs          # Total issues: 0
node scripts/affiliate-links-report.mjs --check  # HTTP-перевірка кожного унікального лінку
node scripts/nord-affiliate-sync.mjs --json      # оновити список офферів/лендінгів
```
