# Виправлення верстки, SEO та маркетингу — 2026-10-31

## Верстка (P1)

| Проблема | Було | Стало |
|---|---|---|
| Логотип перекривав пункт навігації | `.logo { height: 60px }` + `w-[50%] h-6` на `<Image>`, лого перекривало «Generator»/«Генератор» | `.logo { height: 32px; max-width: 100% }`, клас `h-9 w-auto`, навігація `flex-1 gap-3 whitespace-nowrap` |
| Меню ламалося на 2 рядки | `ul w-[55%]` + 7 пунктів | `flex-1` і `whitespace-nowrap`, пункти в один рядок |
| Декоративні «пігулки» `*****` наїжджали на форму | `absolute left-[-140px]` / `right-[-120px]`, `lg:flex` | прибрано з рендеру (`hidden`), більше не перекривають поля |
| Порожній контрол теми у шапці | `Suspense` з невидимим `span` навколо lazy-іконки | іконки імпортуються напряму, кнопка видима одразу |
| Hero «стрибав» при завантаженні | рядок пароля рендерився лише після генерації на клієнті | доданий скелет-плейсхолдер тієї ж висоти (менше CLS) |
| Логотип у ShareBlock деформовано | `width={20} height={20}` при реальному SVG 405×92 | `width={88} height={20}` |

## SEO

| Проблема | Дія |
|---|---|
| **М'який редірект з `/en`** на збережену мову (`window.location.href`) — суперечить hreflang і ламає індексацію англійської | видалено з `app/layout.tsx` і з ефекту `[locale]/page.tsx`; мова лише запам'ятовується, але не нав'язується |
| `<html lang>` підмінявся `beforeInteractive`-скриптом → **hydration mismatch** на кожній сторінці | замінено на `HtmlLangSync` (ефект після гідратації) |
| `<script type="application/ld+json">` всередині клієнтського дерева (гайди, сторінка порівняння, Breadcrumbs) → «Encountered a script tag», скрипт не виконується | JSON-LD винесено за межі `LocalizedPageShell`; з `Breadcrumbs` дубль прибрано |
| Вигаданий `aggregateRating` 4.8/1250 у `SoftwareApplication` | видалено — самооцінні рейтинги не дають rich results і загрожують manual action |
| `SearchAction` на неіснуючу сторінку пошуку | видалено |
| Логотип з неправильним співвідношенням сторін (Lighthouse `image-aspect-ratio`) | `width={405} height={92}` у шапці, `88×20` у ShareBlock |

Перевірка на зібраному HTML (`en.html`):
```
aggregateRating: False | SearchAction: False
FAQPage: True | SoftwareApplication: True | BreadcrumbList: True
width="405": True
```

## Доступність (Lighthouse)

| Аудит | Було | Стало |
|---|---|---|
| Accessibility | **0.87** | **0.93** |
| SEO | 1.00 | 1.00 |
| Best Practices | 0.83 | 0.83 (у дев-режимі: clipboard deny + боти) |

- `+/-` довжини пароля: були `<svg onClick>` без імені й фокуса → додано `role="button"`, `tabIndex`, `aria-label`, обробку Enter/Space.
- Кнопка теми: додано `aria-label` («Switch to light/dark theme»).
- Мова: `<select>` без підпису → доданий `<label class="sr-only">`.
- Дисклеймер «Ad · affiliate link»: `#9ca3af` → `#6b7280` (контраст).

## Маркетинг

- Оффер-стрічка під генератором + офіційний банер NordPass (7 локалей) — див. `docs/affiliate-landing-map.md`.
- Модалка «де зберегти пароль» після copy.
- Сторінка порівняння виведена в навігацію та футер (більше не сирота).
- `aff_sub` з локаллю і плейсментом у кожному партнерському лінку.

## Що лишилось (свідомо не робив)

1. `aria-hidden-focus` і `label-content-name-mismatch` — потрібен точний елемент з деталей Lighthouse (у дев-режимі деталі не віддаються).
2. `<html lang="en">` у серверному HTML для неанглійських локалей: Next дозволяє лише один статичний `lang` у root layout. Виправляється або переїздом `<html>` у `[locale]/layout` (ризиковано), або динамічним рендером (втрата статики 187 сторінок). hreflang при цьому коректний.
3. `NIST 800-63B` пресет досі з мінімумом 8 символів (стандарт SP 800-63B-4 — 15 для однофакторного входу).
