# Куди додавати ключі та партнерські лінки

## 1. Правило поділу

| Що | Куди | Хто бачить |
|---|---|---|
| Публічні tracking-URL (реферальні лінки) | `src/content/affiliate/links.json` | усі — вони й так у HTML |
| Тимчасові override-и для локалі | env `NEXT_PUBLIC_*_AFFILIATE_URL` | усі (вони публічні) |
| **API-ключ порталу, пароль, 2FA** | **`.env.local` локально + Vercel Environment Variables на проді** | ніхто, крім вас |

`NEXT_PUBLIC_` означає «вбудовується в JS-бандл і доступне кожному відвідувачу». Тому ключ порталу **ніколи** не отримує цей префікс.

## 2. Де саме лежить ключ

**Локально** — файл `C:\Users\karbi\password-generator\.env.local` (уже в `.gitignore`, перевірено):

```
NORD_AFFILIATE_API_KEY=...
NORD_AFFILIATE_NETWORK_ID=...
```

**На проді** — Vercel → проєкт `starforce-digital` → Settings → Environment Variables → Add:
- Name: `NORD_AFFILIATE_API_KEY`
- Value: ключ
- Environments: Production (+ Preview за потреби)
- Sensitive: **увімкнути**

Після додавання — Redeploy. Local `.env.local` і Vercel не синхронізуються: ключ треба покласти в обидва місця.

**Ніколи:** у git, у `links.json`, у `next.config.js`, у клієнтських компонентах, у чат зі мною.

## 3. Що робити з логіном/паролем порталу

Не надсилайте їх мені — я не маю і не повинен мати доступ до вашого акаунта: це дає повний контроль над виплатами. Замість цього потрібен лише експорт лінків:

1. `https://affiliates.nordvpn.com/` → **Offers** (або Campaigns) → фільтр по продукту (NordPass / NordVPN / NordLocker / Saily / Incogni).
2. Для кожного лендінгу — **Tracking Link** (у HasOffers це `go.nordvpn.net/aff_c?offer_id=…&aff_id=…&url_id=…`).
3. Зберегти у JSON і покласти у робочу теку (не в git), наприклад `C:\Users\karbi\Desktop\nord-links.json`:

```json
{
  "nordpass":       { "en": "https://go.nordvpn.net/aff_c?offer_id=41&aff_id=146616&url_id=101",
                      "de": "https://go.nordvpn.net/aff_c?offer_id=41&aff_id=146616&url_id=102",
                      "default": "https://go.nordvpn.net/aff_c?offer_id=41&aff_id=146616&url_id=100" },
  "nordpassFamily": { "default": "https://go.nordvpn.net/aff_c?offer_id=42&aff_id=146616&url_id=110" },
  "nordlocker":     { "default": "..." },
  "saily":          { "default": "..." },
  "incogni":        { "default": "..." }
}
```

Ключі: коди локалей (`en`, `ua`, `es`, `fr`, `de`, `it`, `pt`, `ru`, `zh`, `ja`, `pl`), коди країн (`DE`, `FR`, `US`, …) або `default`.
Гео-ключі мають пріоритет над мовними — саме для цього в проєкті вже є cookie `geo`.

4. Імпорт:

```bash
node scripts/affiliate-links-report.mjs --import "C:\Users\karbi\Desktop\nord-links.json"
node scripts/affiliate-links-report.mjs            # матриця: що налаштовано, що ні
node scripts/affiliate-links-report.mjs --check    # HTTP-перевірка кожного унікального лінку
```

## 4. Порядок пріоритету (зашитий у `src/content/affiliate/links.ts`)

```
byGeo[країна] → byLocale[мова] → byLocale.en → env → fallback → внутрішня сторінка
```

Якщо нічого не налаштовано — відвідувач **не** йде на `nordpass.com` без реферала, а залишається на `/best-password-managers-2026`. Це свідомо: невідстежений перехід = втрачений відвідувач без комісії.

## 5. Якщо API-ключ усе ж потрібен мені

Тоді він має бути в `.env.local`, а я читаю його як змінну середовища й **ніколи не друкую**. Але для задачі «розкласти лендінги по мовах» ключ не потрібен — достатньо JSON з лінками вище.

---

## 6. Перевірені факти про лінки Nord (2026-10-31)

| Перевірка | Результат |
|---|---|
| `go.nordvpn.net/aff_c?offer_id=15&aff_id=146616&url_id=902` | 200 → редірект → `nordvpn.com/special/?utm_source=aff146616&utm_campaign=off15` |
| Чи можна підмінити лендінг параметром `&url=` | **Ні.** `url=` ігнорується: лендінг прив'язаний до `url_id` |
| Чи доходить наш `aff_sub` до мерчанта | **Так.** `aff_sub=gen-de-test` → `utm_content=gen-de-test` |

Отже: один `url_id` = один лендінг. «Кожній мові — свій лендінг» можливо лише через окремі `url_id`
з порталу (Offers → Landing pages). Їх і збирає `scripts/nord-affiliate-sync.mjs`.
