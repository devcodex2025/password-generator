# Anti-slop audit — site content (2026-11-02)

Tooling: `anti-slop` skill (`~/.codex/skills/anti-slop`) plus a project scanner that extends
its English pattern list with localized equivalents for all 12 locales.

Scope: 11 guides (all locale blocks), 211 UI strings per locale, static pages, meta copy.

## Method

1. Extracted prose per locale (articles + `lang.json` UI copy).
2. Ran the skill's `detect_slop.py` on English (score 2/100, one hit: “could potentially”).
3. Ran a localized pattern scan (meta-commentary, buzzwords, hedging, empty intensifiers,
   “in today's digital world” family, “seamless/robust/leverage/unlock/landscape”,
   “it's important to note”, plus UA/RU/ES/FR/DE/IT/PT/JA/ZH/VI equivalents).

## Before → after

| Locale | Words scanned | Slop hits before | After |
|---|---|---|---|
| en | 18 015 | 11 | 5 (all legitimate: “biometric unlock”, “phone unlock”) |
| ua | 13 169 | 4 | **0** |
| ru | 6 687 | 2 | **0** |
| es | 10 367 | 0 | 0 |
| fr | 9 811 | 2 | 1 (false positive: “importance”) |
| de | 6 924 | 2 | **0** |
| it | 7 933 | 1 | 1 (legitimate “è importante”) |
| pt | 7 793 | 1 | **0** |
| ja | 501 | 7 | 1 (legitimate “重要です”) |
| zh | 450 | 2 | **0** |
| vi | 9 131 | 1 | **0** |

## What was rewritten

- **`aboutus_intro` — all 12 locales.** The original was textbook corporate slop
  (“Welcome to our platform… secure solutions for your digital needs… navigate the complex
  digital landscape”). Replaced with a concrete product statement: one tool, runs in the browser,
  no accounts, no stored passwords, NIST 800-63B, 12 languages, open source.
- **`seolist_intro1` — en, ua, ru, ja, vi.** Removed “In today's digital world”,
  “У сучасному цифровому світі”, “В современном цифровом мире”, “今日のデジタル世界では”,
  “Trong thế giới số ngày nay” and the “more important than ever” filler.
- **`seotext_intro2` — en, fr, de, ja.** “robust password” → “strong password”,
  “mot de passe robuste” → “mot de passe fort”, “robustes Passwort” → “starkes Passwort”,
  “シンプルで効果的なソリューション” → concrete statement.
- **Articles:** removed “seamlessly”, “бесшовно”, “nahtlos”, “无缝运行”, “シームレスに動作”,
  “recursos robustos”, “essentially impossible”, “could potentially”, “фактично” ×3 (ua),
  “mạnh mẽ” (vi adverb misuse), “完璧な”/“完美” phrasing, “robustesse/robustezza” in headings.

## Kept on purpose

- “biometric unlock”, “phone unlock” — literal product behaviour, not buzzwords.
- Italian “è importante” and Japanese “重要です” — plain, correct language in context.
- “overall analytics” in the cookie policy — means aggregate analytics, not filler.

## Remaining work

- Files currently being edited by a parallel session (`common-password-mistakes.ts`,
  `nist-800-63b-password-rules.ts`, `passphrase-vs-password-entropy.ts`) contain one more small
  fix each that will be committed with that work: “фактично незламні” → “практично незламні”,
  “khuyến nghị mạnh mẽ” → “khuyến nghị”, “essentially impossible” and the ja/zh wording.
- Vietnamese guide bodies: apply the same scan after each translation batch.

## Rule for new content

Before publishing any page or translation:

```bash
python ~/.codex/skills/anti-slop/scripts/detect_slop.py <text-file> --verbose
```

Reject: “in today's digital world”, “it's important to note”, “seamless”, “robust”, “leverage”,
“unlock the power”, “landscape”, “game-changer”, “more important than ever”, and their localized
equivalents. Prefer concrete claims with numbers (length, bits, seconds) over adjectives.
