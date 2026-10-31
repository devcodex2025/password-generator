# Локальна генерація зображень (Qwen Image 2.1)

Використовувати для будь-яких банерів, OG-картинок, ілюстрацій до гайдів.
Не використовувати хмарні image-моделі, якщо локальна доступна.

## Що встановлено

| Компонент | Шлях |
|---|---|
| ComfyUI Desktop (GUI) | `C:\Users\karbi\AppData\Local\Programs\ComfyUI\ComfyUI.exe` |
| ComfyUI core (main.py) | `C:\Users\karbi\AppData\Local\Comfy-Desktop\ComfyUI-Installs\ComfyUI\ComfyUI\main.py` |
| Python venv | `C:\Users\karbi\AppData\Local\Comfy-Desktop\ComfyUI-Installs\ComfyUI\ComfyUI\.venv\Scripts\python.exe` |
| Дані ComfyUI (data-location: `local-appdata`) | `C:\Users\karbi\AppData\Local\Comfy-Desktop\` |
| Робоча тека моделей/виводу (OneDrive) | `C:\Users\karbi\OneDrive\Документы\ComfyUI\` (`models`, `output`, `custom_nodes`) |

Готові результати попередніх запусків: `C:\Users\karbi\Downloads\comfy-export-2026-10-29-26efeff1\Qwen_image_2.1_00012.png` — модель уже працювала на цій машині.

## Запуск

**Варіант 1 — GUI (звичайний):**

```powershell
& "C:\Users\karbi\AppData\Local\Programs\ComfyUI\ComfyUI.exe"
```
Далі в UI вибрати workflow `Qwen Image 2.1` і Queue. Дефолтний порт ComfyUI Desktop — `http://127.0.0.1:8000`.

**Варіант 2 — headless API (для агентів):**

```powershell
& "C:\Users\karbi\AppData\Local\Comfy-Desktop\ComfyUI-Installs\ComfyUI\ComfyUI\.venv\Scripts\python.exe" `
  "C:\Users\karbi\AppData\Local\Comfy-Desktop\ComfyUI-Installs\ComfyUI\ComfyUI\main.py" `
  --port 8188 --listen 127.0.0.1
```

API: `POST http://127.0.0.1:8188/prompt` (workflow у форматі API), статус — `GET /history/{prompt_id}`, зображення — `GET /view?filename=...&type=output`.

## Перевірка перед першим запуском

1. `Test-Path` для `main.py` і `.venv\Scripts\python.exe` — обидва мають існувати (перевірено 2026-10-31).
2. Переконатися, що чекпойнт Qwen Image 2.1 є в `models\diffusion_models` (або `unet`) робочої теки — у дереві `OneDrive\...\ComfyUI\models` файлів ще не видно, тому перший запуск робити через GUI і зберегти workflow.
3. Після запуску перевірити, що порт слухає: `Get-NetTCPConnection -State Listen | Where-Object LocalPort -in 8000,8188`.

## Правила для цього проєкту

- OG-картинки: 1200×630, без дрібного тексту, без «AI-глянцю», стиль — як у наявних `public/images/`.
- Банери для партнерки: **не** малювати логотипи NordPass/NordVPN — тільки нейтральні ілюстрації (щит, замок, менеджер паролів), бо брендові асети заборонено перемальовувати.
- Зберігати результат у `public/images/` з описовим ім'ям і додавати `width/height` у `next/image`.
