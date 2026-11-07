# Link building kit — generatepasswordto.me (November 2026)

What is already done in the codebase: internal linking covers all 231 sitemap URLs (0 orphans as of
2026-11-07 — the statistics pages previously had no inbound links and now do), IndexNow and sitemap
submission work, structured data is in place.

What cannot be automated from this repository: every item below requires **your accounts**
(Product Hunt, Reddit, directory profiles, email). This file is the ready-to-use kit so the
work is copy-paste instead of research.

## Rules

- No paid links, no PBNs, no link exchanges at scale, no exact-match anchor spam — these are
  Google spam policies violations and a manual-action risk for a new domain.
- One good link from a relevant page beats fifty directory listings.
- Every published page should link to the tool's home with a natural anchor
  ("password generator", "генератор паролів") — vary anchors.
- Track results in GSC → Links after 2–4 weeks; add UTM only for campaigns you measure in GA4.

## Tier 1 — product directories and launch (week 1–2)

| Platform | What to submit | Notes |
|---|---|---|
| Product Hunt | Launch post + gallery image | Schedule Tuesday–Thursday, 00:01 PT |
| AlternativeTo | "Password generator" alternative listing | Links back to site |
| SaaSHub | Free tool listing | Fast approval |
| Slant | "Best password generators" entry | Community votes |
| Uneed / MicroLaunch / Startup Stash / Toolify | Product listings | Low effort, low value |
| Indie Hackers | "Show IH" post | Story angle, not pure promo |
| Hacker News | Show HN | Only with a genuine technical angle |
| dev.to / Hashnode / Medium | Technical article with canonical link to the site | Use `rel=canonical` to our guide |

## Tier 2 — communities (week 2–4, careful with rules)

- **r/passwords**, **r/privacy**, **r/cybersecurity** — participate first, link only when
  directly answering a question. Most subs remove drive-by promo.
- **DOU.ua** (UA dev community) — blog post about client-side password generation.
- **Dev.ua** — pitch a short op-ed: "чому генератори паролів не мають відправляти пароль на сервер".
- **Telegram** — UA cybersecurity channels; ask admins before posting.
- **Stack Exchange / Security** — answer questions, link only if it genuinely helps.

## Tier 3 — content-led links (month 2+)

- Guest posts on security blogs (pitch: original data, e.g. "we analysed 437 real password
  queries across 11 languages").
- Digital PR angle: "how password length translates to crack time" with our table as a source.
- University/course link pages (security literacy resources) — polite email with the guide link.
- Tool roundups: pitch inclusion in "best free password generators 2026" listicles.

## Ready-to-paste copy

**Tagline (60 chars)**
`Free password generator — local, NIST-aligned, 11 languages`

**Short description (160 chars)**
`Generate strong random passwords or memorable passphrases in your browser. Nothing is sent to a server. NIST 800-63B guidance, 11 languages.`

**Long description**
`GeneratePasswordTo.Me is a free password generator that runs entirely in your browser. It creates cryptographically random passwords from 8 to 100 characters, memorable passphrase modes built on the EFF wordlist, and numeric PINs. Every option is explained with the standards behind it (NIST SP 800-63B, PCI DSS, OWASP), and the site is available in 11 languages. Passwords are never transmitted or stored — generation happens locally with the Web Crypto API.`

**Tags**
`password generator, passphrase generator, random password, security, privacy, NIST, free tool`

**Show HN / IH post opener**
`I built a password generator that never sends anything to a server — and documented the standards it follows. After noticing that most "generators" still rank with 300-word pages, I added length/entropy explanations, a passphrase mode and 11 localizations. Would love feedback on the passphrase UX.`

**Ukrainian post opener**
`Зробив безкоштовний генератор паролів, який працює повністю у браузері: пароль не йде на сервер. Є режим парольних фраз (EFF-словник), PIN, пояснення стандартів NIST/PCI DSS і 11 мов. Буду вдячний за фідбек щодо UX режиму слів.`

## Outreach email template

Subject: `Password generator with local-only generation (source + standards)`

> Hi {name},
> I maintain generatepasswordto.me — a free password generator that runs entirely client-side
> (Web Crypto, no server round-trip) and documents the standards behind each option.
> If you keep a resources page on password security, it may fit there: {url}.
> Happy to answer questions or provide data for an article. Either way, thanks for the work
> you publish on {topic}.
> {signature}

## Success criteria

- 10–15 referring domains in the first 2 months (quality over quantity).
- At least 3 links from pages that themselves rank for security topics.
- GSC → Links shows new domains within 2–4 weeks of publication.
