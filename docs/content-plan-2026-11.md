# Content plan — November 2026

Inputs: `docs/keyword-map.md` (437 queries, 11 locales), `docs/keyword-strategy-2026-10-31.md`,
`docs/gsc-history-2026-10-31.md`.

## Position on "rewrite professional articles"

Copying or closely paraphrasing third-party articles is **not** a safe growth tactic here:

1. **Copyright.** A close rewrite of someone else's text is a derivative work; article text is
   protected even if individual facts are not. Rewriting without permission creates legal risk
   and is hard to defend if a takedown arrives.
2. **Google spam policies.** "Scaled content abuse" covers mass-produced pages that add little
   original value, including rewritten/spun content. It is a manual-action risk for the whole
   domain — exactly what a new site cannot afford.
3. **E-E-A-T.** For security topics Google rewards demonstrable expertise and citations; a
   rewrite of an unattributed source signals the opposite.

The safe equivalent: **original articles written from authoritative sources with citations**.
Facts are free to reuse; wording must be ours. Every article below is planned that way.

## Articles / sections (priority order)

| # | Piece | Type | Locales | Targets (cluster) | Sources |
|---|---|---|---|---|---|
| 1 | Password length: 8 vs 12 vs 16 vs 20 characters | section + FAQ | all 11 | `length` (5 locales explicit) | NIST SP 800-63B, OWASP |
| 2 | Passphrase ("words") generator | feature + landing section | all 11 | `passphrase` (4+ locales) | EFF wordlists, NIST |
| 3 | What makes a password strong (with examples) | section + FAQ | all 11 | `strength` (10/11) | NIST, OWASP, HIBP |
| 4 | Password managers by platform (Android/iPhone/Chrome/desktop) | sections | all 11 | `manager` (9/11) | vendor docs, NIST |
| 5 | How to remember a strong password | new article | en, ua, pl, de, es, fr | `passphrase`, `strength` | EFF, NIST |
| 6 | Password requirements cheat sheet (NIST vs PCI DSS vs OWASP) | new article | en, ua, de, es | `howto`, `strength` | NIST, PCI SSC, OWASP |
| 7 | NordPass vs 1Password vs Bitwarden (honest comparison) | new article (affiliate) | en, pl, de, es, fr | `manager` | vendor pricing pages, disclosure rules |

Items 1–4 extend existing pages (no new URLs → no thin-content risk). Items 5–6 add 2–4 real
articles. Item 7 is affiliate content: needs a visible disclosure and must not copy vendor copy.

## Briefs

### 1. Password length (section in `how-to-create-strong-passwords` + home FAQ)
- H2 "How long should a password be?" with a 4-row table (8/12/16/20 chars → entropy at
  ~94-symbol alphabet, offline/online crack-time estimates).
- Callout: "Need exactly 12 characters? Use the generator with the 12-character preset" →
  link + preset button that sets the slider.
- FAQ entries mirroring autocomplete wording per locale:
  `password generator 12 characters`, `генератор паролів 12 символів`,
  `генератор паролей 16 символов`, `generator haseł ile znaków`.
- Do not create per-length URLs.

### 2. Passphrase mode (product)
- Generator toggle "Random characters / Words".
- EFF large wordlist (7,776 words), 4–6 words, separators `-`, `_`, space, dot; capitalize
  option; entropy display (log2(7776) × words).
- Landing copy: "Passphrase generator — memorable passwords with measurable entropy".
- Update `passphrase-vs-password-entropy` guide with a live example and CTA.
- This is the single largest unmet demand cluster.

### 3. What makes a password strong
- Sections: length > complexity; unpredictability; uniqueness per site; breach exposure;
  what *doesn't* matter (forced symbol rules, periodic rotation).
- Concrete weak/strong examples per locale (not translated placeholders).
- Link to the breach checker and to NIST/PCI guides.

### 4. Password managers by platform
- H2 per platform with a short recommendation + comparison table row set:
  Android (Google Password Manager vs dedicated), iPhone (Keychain vs dedicated),
  Chrome/desktop, work/team context.
- Internal links: `password-manager-vs-manual-storage`, `best-password-managers-2026`.
- Affiliate CTA stays after the comparison, with disclosure.

### 5. How to remember a strong password (new)
- Outline: why memory fails; passphrase method; mnemonic sentences; what not to do
  (reuse, patterns); password manager as the real answer; when to use each.
- 1,200–1,600 words, 6–8 cited claims, internal links to the generator and passphrase guide.

### 6. Password requirements cheat sheet (new)
- Table: NIST SP 800-63B vs PCI DSS 4.0 vs OWASP — length, complexity, rotation, breach checks,
  MFA. Short commentary on where company policies overreach.
- Targets corporate long-tail (`team-password-policy-template` traffic).

### 7. Comparison article (affiliate)
- Structure: methodology → table (price, platforms, features, breach alerts, MFA) → who should
  pick what → disclosure. No copied vendor text, no invented test results.

## Production pipeline

1. **Brief** (this file) → draft in EN.
2. **Sources**: NIST SP 800-63B, OWASP Authentication Cheat Sheet, EFF wordlist page, HIBP,
   vendor docs. Cite inline; keep a sources block.
3. **Localization**: EN + UA first (native quality), then adapt (not literal machine translation)
   for pl/de/es/fr/it/pt/ru/ja/zh. Mark machine-adapted text for human review.
4. **Technical SEO**: title ≤60 (keyword first), H1 matches intent, meta ≤155, FAQ schema where
   the page answers questions, internal links in/out, canonical/hreflang untouched.
5. **Publish** → `npm run indexnow` → GSC sitemap submit → request indexing for the new URL.
6. **Measure** after 2–4 weeks in GSC; rewrite titles/meta for pages at position 5–20.

## Cadence

- Week 1: items 1 + 3 (sections on existing pages, all locales).
- Week 2: item 2 (feature + landing) — needs a product decision.
- Week 3: item 4 + item 5 (article).
- Week 4: item 6; item 7 only after affiliate disclosure review.
- Then GSC-driven iteration instead of new content.
