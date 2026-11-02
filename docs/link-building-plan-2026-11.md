# Link-building plan — generatepasswordto.me (November 2026)

Based on the structure of the `link-building` skill in `E:\Projects\link-building-skills`
(donor discovery → placement → JSON logging), but **without** the temp-mail / mass-registration
mechanism it prescribes. Reason: bulk registrations with disposable emails are link spam under
Google's spam policies and violate the terms of every forum used that way. For a 3-day-old
domain this is the fastest route to a manual action and a permanent block.

The previous attempt in `E:\Projects\generatepassword linkbuilding` produced 150 log entries and
zero real posts (the "posted_link" values are fake URLs and plaintext temp passwords). Do not
rerun it.

## What we actually have to offer

1. **Original data**: 437 real autocomplete queries across 11 locales, clustered by intent
   (`docs/keyword-research.json`). Nobody else publishes this.
2. **A calculator-grade crack-time/entropy table** for 8/12/16/20 characters and 4–7 word
   passphrases (`/password-statistics-2026`).
3. **A local-only generator** (Web Crypto, no server round-trip) in 11 languages, with
   passphrase and PIN modes.
4. **11-language coverage** — useful for international "best tools" roundups.

Editors and directories link to data and tools, not to "please visit my site" posts.

## Phases

### Phase 0 — Asset + tracking (done in this commit)
- `/en/password-statistics-2026` and `/ua/password-statistics-2026` data page with the table,
  the query-cluster data and citations.
- `docs/link-building-tracking.json` — machine-readable status log (no credentials).
- `docs/link-building-donors.json` — 34 researched targets with requirements.

### Phase 1 — Zero-friction directories (week 1, ~2 h)
No account creation beyond a normal signup; each is reviewed by a human.

| # | Donor | Type | Requires | Notes |
|---|---|---|---|---|
| 1 | tools.org.ua | UA tool directory | email + form | competitor is listed there with 69/100 |
| 2 | saashub.com | SaaS/tool directory | account | fast approval |
| 3 | alternativeto.net | alternatives directory | account | list as alternative to NordPass/1Password |
| 4 | producthunt.com | launch | account | schedule Tue–Thu, gallery image |
| 5 | betalist.com | launch | account | free tier |
| 6 | devhunt.org | dev tools | GitHub login | good fit for the 11-locale angle |
| 7 | uneed.best | tool directory | account | free listing |
| 8 | microlaunch.net | launch | account | free |
| 9 | startupstash.com | directory | form | free tier |
| 10 | toolify.ai | AI/tool directory | account | free |

### Phase 2 — Communities (weeks 2–4, participation first)
| # | Donor | Type | Rule |
|---|---|---|---|
| 11 | reddit.com/r/passwords | forum | answer questions; link only when directly relevant |
| 12 | reddit.com/r/privacy | forum | no promo posts; comments only |
| 13 | reddit.com/r/cybersecurity | forum | strict; read rules |
| 14 | security.stackexchange.com | Q&A | answer, link only if it adds value |
| 15 | news.ycombinator.com (Show HN) | launch | technical angle: local-only generation + 11 locales |
| 16 | lobste.rs | link community | invite required |
| 17 | dev.to | blog | technical article with canonical to our guide |
| 18 | hashnode.com | blog | same |
| 19 | indiehackers.com | community | "Show IH" with the data angle |
| 20 | dou.ua | UA dev community | blog post in Ukrainian |

### Phase 3 — Editorial / outreach (month 2+)
| # | Target | Angle |
|---|---|---|
| 21 | GitHub `awesome-privacy` / `awesome-selfhosted` lists | PR adding the tool (needs your GitHub) |
| 22 | privacytools.io | submission form |
| 23 | Cybernews / Tom's Guide / PCMag tool roundups | pitch with the data page |
| 24 | Dev.ua / AIN.ua / Speka | op-ed: "why a password generator must never see your password" |
| 25 | DOU blogs | technical post with benchmark numbers |
| 26 | university security-resource pages | polite email with the guide |
| 27 | security newsletters (tl;dr sec, Unsupervised Learning) | short pitch with data |
| 28 | UA Telegram security channels | ask admins first |
| 29 | "best password generators 2026" listicles | inclusion request |
| 30–34 | niche blogs (password managers, privacy) | guest post with original data |

## Anchor strategy

- 50% brand/naked: `generatepasswordto.me`, `GeneratePasswordTo`
- 30% generic: `password generator`, `free password generator`
- 20% partial/long-tail: `password generator with passphrase mode`, `генератор паролів онлайн`
- Never repeat the exact same anchor twice in a row; never buy links; no link exchanges at scale.

## Schedule

| Week | Actions |
|---|---|
| 1 | Phase 1 (10 directories) + publish the data page + IndexNow |
| 2 | Show HN + 2 Reddit answers + dev.to article |
| 3 | DOU/Dev.ua pitch + 5 more directories |
| 4 | Editorial outreach (10 emails) + review results |

## KPIs

- 30 days: 5–10 referring domains, at least 3 from pages that themselves rank.
- 90 days: 15–25 referring domains, ≥1 editorial mention.
- Track in GSC → Links (UI) weekly; log every placement in `docs/link-building-tracking.json`.

## Machine-readable source catalog

The manual phases above are the strategy. The working list lives in
[`docs/backlink-sources-2026-11.md`](./backlink-sources-2026-11.md) (256 candidates, tiered,
with a batch queue helper: `node scripts/backlink-queue.mjs --check`). That file also documents why a
"1000 registration-free services" run is not possible without link spam.

## What I can execute vs what needs you

I can (and did): donor research, submission copy, tracking file, the linkable data asset.
I cannot: create accounts, pass captchas, or post on forums — that needs your identity and would
violate platform rules if automated. Each submission takes 3–5 minutes in Phase 1.
