# Link-building campaign — 2026-11-02: 10 placements

## Objective

Place at least 10 links. Captcha-protected platforms were skipped by the owner's instruction; no captcha, Cloudflare challenge, payment or badge/reciprocal link was bypassed or accepted.

## Result

**10/10 placements verified.** All pages: HTTP 200, `noindex=false`, exactly one link to the target, `rel="nofollow"`, 500+ words.

| # | Page | URL | Target | Anchor | Words | HTTP | noindex | rel |
|---|---|---|---|---|---|---|---|---|
| 1 | How long does it take to crack a password? A working estimate | https://telegra.ph/How-long-does-it-take-to-crack-a-password-A-working-estimate-11-02 | https://www.generatepasswordto.me/en/password-statistics-2026 | crack-time dataset | 734 | 200 | false | nofollow |
| 2 | Passphrase or complex password: which is actually stronger? | https://telegra.ph/Passphrase-or-complex-password-which-is-actually-stronger-11-02 | https://www.generatepasswordto.me/en/guides/passphrase-vs-password-entropy | passphrase entropy guide | 560 | 200 | false | nofollow |
| 3 | What NIST 800-63B actually requires from a password | https://telegra.ph/What-NIST-800-63B-actually-requires-from-a-password-11-02 | https://www.generatepasswordto.me/en/guides/secure-password-generator-guide | secure password generator guide | 504 | 200 | false | nofollow |
| 4 | Password reuse is the real breach multiplier | https://telegra.ph/Password-reuse-is-the-real-breach-multiplier-11-02 | https://www.generatepasswordto.me/en/guides/secure-password-generator-guide | practical password security guide | 571 | 200 | false | nofollow |
| 5 | PINs, passwords and passphrases: when each one fits | https://telegra.ph/PINs-passwords-and-passphrases-when-each-one-fits-11-02 | https://www.generatepasswordto.me/en | the generator | 516 | 200 | false | nofollow |
| 6 | Why breached-password lists matter more than complexity rules | https://telegra.ph/Why-breached-password-lists-matter-more-than-complexity-rules-11-02 | https://www.generatepasswordto.me/en/guides/secure-password-generator-guide | breached-password guidance | 537 | 200 | false | nofollow |
| 7 | How password managers change what you need to memorise | https://telegra.ph/How-password-managers-change-what-you-need-to-memorise-11-02 | https://www.generatepasswordto.me/en/best-password-managers-2026 | password manager comparison | 526 | 200 | false | nofollow |
| 8 | Entropy without the maths: what makes a password strong | https://telegra.ph/Entropy-without-the-maths-what-makes-a-password-strong-11-02 | https://www.generatepasswordto.me/en/password-statistics-2026 | entropy data | 535 | 200 | false | nofollow |
| 9 | Two-factor authentication does not fix a weak password | https://telegra.ph/Two-factor-authentication-does-not-fix-a-weak-password-11-02 | https://www.generatepasswordto.me/en/guides/secure-password-generator-guide | password security guide | 542 | 200 | false | nofollow |
| 10 | Generating passwords offline: what client-side actually means | https://telegra.ph/Generating-passwords-offline-what-client-side-actually-means-11-02 | https://www.generatepasswordto.me/en | client-side password generator | 532 | 200 | false | nofollow |

## Verification evidence

Raw output of `node scripts/backlink-queue.mjs --verify=<URL>` for each page:

- `docs/verification-2026-11-02-telegraph-01.json` … `-10.json`

Every file shows `"http": 200`, `"noindex": false`, `"found": 1`, and the link with `"rel": "nofollow"`.

## What was skipped (captcha or equivalent)

| Platform | Blocker |
|---|---|
| dev.to | reCAPTCHA on submit |
| SaaSHub | captcha on registration |
| Uneed | Cloudflare Turnstile |
| GitLab | Arkose Labs captcha |
| Codeberg | image captcha |
| Medium, WordPress.com, Tumblr, About.me | captcha |
| Product Hunt, Peerlist, Indie Hackers | Cloudflare 403 + account |
| Hacker News | account creation disabled |
| Substack | creator session lost on navigation (retry later) |
| Hashnode | auth entry point not available (email field disabled, /signin 404) |

**Linktree** page `https://linktr.ee/generatepasswordto` was created and contains the link, but the page is `noindex`, so it is not counted.

## Totals

| Metric | Value |
|---|---|
| New placements in this campaign | 10 |
| Referring domains added | 1 (`telegra.ph`) |
| Total links on site | 21 (11 `tools.org.ua` + 10 `telegra.ph`) |
| Referring domains total | 2 |
| dofollow / nofollow | 11 / 10 |

## Risk notes

- All ten new links are on one domain and are `nofollow`. They are brand/indexation signals, not ranking levers.
- Ten pages on a single free platform is a volume pattern; content is unique and each page has one contextual link, but this should not be repeated at larger scale.
- The durable path to dofollow referring domains remains the Tier S actions (SaaSHub, DevHunt, dev.to, DOU) with a human solving captcha/account steps.

## Files

- `docs/link-building-campaign-2026-11-02.json` — machine-readable copy of this report.
- `docs/link-building-tracking.json` — 10 `verified` entries added.
- `docs/backlink-sources.csv` — A01 note updated with the page count.

## Distinct domains (second objective)

| Domain | What was done | Blocker |
|---|---|---|
| telegra.ph | 10 pages published and verified | indexable, but one domain only |
| substack.com | publication + post published (HTTP 200) | page returns `<meta name="robots" content="noindex">`; URL stayed plain text, no anchor |
| linktr.ee | page created with the link | page is `noindex` |
| firsto.co | account created and verified | no free launch dates; paid only |
| write.as | signup attempt | `ERR_TUNNEL_CONNECTION_FAILED` |
| notion.site | signup attempt | app stuck on "Loading..." |
| hashnode.com | signup/login attempt | `/signin` → 404; `/onboard` email field disabled |
| keybase.io | signup attempt | no web signup form (app only) |
| sideprojectors.com | signup attempt | no server-side form (SPA) |
| npmjs.com / pypi.org / gitlab.com / codeberg.org / dev.to | signup attempts | 403 or captcha |

**Result: 0 new distinct domains.** Only `telegra.ph` is indexable and reachable without captcha, so 10 different domains cannot be produced under the current constraint.

### Legacy directory batch (39 domains)

Probed 39 legacy/regional directories from the 2026 submission lists:

| Result | Count | Domains (examples) |
|---|---:|---|
| Dead / no response | 11 | free-web-directory1.org, dmozo.org, submitfreeurl.info, naturalentries.com, everyonerated.com, codedlistings.com, bpubs.com, suggest-url.net, zendirectory.com.ar, justlink.org, linkdir4u.com |
| 403 / 429 | 3 | izdirectory.com, ranaf.com, cipinet.com |
| No submit link / search only | 13 | grotal.com, webworldindex.com, alistdirectory.com, quickapprovaldirectory.com, urlshack.com, pageranktarget.com, whiterosedirectory.com, allinfolisted.com, busybits.com, nonar.com, mavensearch.com, allsitessorted.com, domico.info |
| Form with image CAPTCHA or password | 12 | 10directory.com, prolinkdirectory.com, digabusiness.com, buyersindex.com, admyurl.com, indiabook.com, homedirectory.biz, freeweblink.org, harddirectory.net, submissionwebdirectory.com |
| Form page 404 / search only | 2 | domainnamesseo.com, submit.biz |

**Usable for an anonymous listing: 0.** The three phpLD-style forms that looked promising (10directory.com, prolinkdirectory.com, digabusiness.com) all include a CAPTCHA[text] field plus IMAGEHASH, i.e. an image captcha.

## Distinct domain total

| Source pool | Domains probed | Usable new domains |
|---|---:|---:|
| Repository catalog (65 live no-registration) | 65 | 0 |
| Startup/AI directories | 62 | 0 |
| Account-based sources (S/A/C) | 82 | 0 |
| Ukrainian directories | 7 | 0 |
| Legacy/regional directories | 39 | 0 |
| Non-captcha publishing platforms | 6 | 0 (noindex/auth) |
| **Total** | **261** | **0** |

Only telegra.ph (10 pages) and the pre-existing tools.org.ua remain. 10 different domains require captcha, an account session, or a paid tier.

### Full 1700+ directory list

Extracted **1,640 domains** from the rgbwebtech directory list and probed them:

| Stage | Count |
|---|---:|
| Domains extracted | 1,640 |
| Probed (homepage) | 1,634 |
| Live (HTTP 200) | 687 |
| With a submit/add link | 252 |
| With a form and no detected reCAPTCHA/hCaptcha/Turnstile | 21 |
| Free and publishable without payment/reciprocal/JS | **0** |

Close inspection of the 9 most promising forms:

| Domain | Outcome |
|---|---|
| informationcrawler.com | form accepted, redirected to `payment.php?id=1392323` — paid |
| elitesitesdirectory.com | 3-step form + email confirmation, then `The listing fee is $29 / year` — paid |
| avivadirectory.com | submission guidelines state a fee (no refunds) — paid |
| search-group.com | pricing page + reciprocal link — paid/link exchange |
| directory32.com | `RECPR_URL` + paid options — link exchange/paid |
| joeant.com | paid confirmation flow |
| morefunz.com | HTTP 403 Access denied on submit |
| bahiacar.com | form is AJAX-only (category suggestion), plain POST does nothing |
| entireweb.com | service status suggestion, not a public directory listing |

The remaining 12 forms either required reciprocal links (`britainbusinessdirectory.com`), accounts/payments (`jasminedirectory.com`, `webdirectorylisting.com`), or were blog comments (`nipao.org`).

**Result across the full 1,640-domain list: 0 free, indexable listings.**

## Distinct domain total (all pools)

| Source pool | Domains probed | Usable new domains |
|---|---:|---:|
| Repository catalog | 65 | 0 |
| Startup/AI directories | 62 | 0 |
| Account-based sources | 82 | 0 |
| Ukrainian directories | 7 | 0 |
| Legacy/regional directories | 39 | 0 |
| Full 1700+ list (rgbwebtech) | 1,634 | 0 |
| Non-captcha publishing platforms | 6 | 0 |
| **Total** | **1,895** | **0** |
