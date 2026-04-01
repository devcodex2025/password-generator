## Interlinking Template for Copywriters

Use this template to implement the SEO interlinking scheme across every locale. Copy the table for each guide and translate the anchor text while keeping the placement consistent (Intro / Body / Conclusion). Each guide must:

1. Link back to `/{lang}/` (generator) and `/{lang}/guides` (hub).
2. Include 3–5 additional guide links from the same topical cluster.
3. Vary anchor text to describe the benefit/perspective (avoid raw titles only).

### Guidance

| Field | Instructions |
|---|---|
| Locale placeholder | Replace `{lang}` with the correct two-letter code (e.g., `/de/` or `/ua/`). |
| Pillar references | When the guide is a pillar, bold the supporting guides in the ``Supporting guides`` column. |
| Placement | Use `intro` for context-setting links, `body` for examples/details, `conclusion` for strong CTAs. |
| Anchor style | Translate the anchor text naturally; use verbs or descriptors (e.g., “перехід до стандартів PCI” instead of “PCI DSS Password Requirements”). |

### Table template (copy per guide)

| Destination path | Anchor text (translated per locale) | Placement (intro/body/conclusion) | Notes |
|------------------|--------------------------------------|-----------------------------------|-------|
| `/{lang}/` | e.g., “генератор безпечних паролів” | conclusion | Always present |
| `/{lang}/guides` | e.g., “переглянути всі гіди” | conclusion | Always present |
| `/{lang}/[related guide slug]` | localized anchor | body | Choose 3–5 rel. guides |

### Example

Filling the template for the English `how-to-create-strong-passwords` guide:

| Destination path | Anchor text | Placement | Notes |
|------------------|-------------|-----------|-------|
| `/en/` | “password generator” | conclusion | core CTA |
| `/en/guides` | “browse the full guide collection” | conclusion | hub link |
| `/en/common-password-mistakes` | “avoid the most common mistakes” | body | supporting |
| `/en/passphrase-vs-password-entropy` | “why passphrases beat short passwords” | body | supporting |
| `/en/secure-password-generator-guide` | “how the generator creates randomness” | intro | supporting |

Use the same structure for each locale and ensure inbound references are naturally added in the supporting guides (e.g., `secure-password-generator-guide` linking back to `how-to-create-strong-passwords` using the anchor “revisit strong-password principles”). Once every guide table is localized, run a quick search (e.g., `rg "<Link.*href=\"/de/"`) to confirm links exist per page.
