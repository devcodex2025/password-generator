# AdSense readiness — generatepasswordto.me

Status as of 2026-11-01. Everything technical is in place; approval itself is an account-level
action that only the site owner can perform.

## Checklist

| Requirement | Status | Where |
|---|---|---|
| `ads.txt` with the publisher ID | ✅ live | `https://www.generatepasswordto.me/ads.txt` |
| AdSense crawler allowed | ✅ added to generated `robots.txt` (`Mediapartners-Google: Allow`) |
| Privacy policy page | ✅ exists in 11 locales | `/{locale}/privacy-policy` |
| Third-party advertising disclosure | ✅ added (Google/DoubleClick, opt-out links) |
| Cookie consent (CMP) | ✅ vanilla-cookieconsent, categories analytics/marketing |
| Google Consent Mode v2 | ✅ default denied → updated on consent |
| Terms of service | ✅ exists | `/{locale}/terms-of-service` |
| Contact page | ✅ exists | `/{locale}/contact` |
| Ad units in code | ✅ SmartAdBanner / AdBanner components render `adsbygoogle` |
| No prohibited content | ✅ tool site, no adult/violent/pirated content |
| Core Web Vitals | ✅ Lighthouse 100/100/100 on the home page |
| HTTPS + canonical + hreflang | ✅ |

## How to apply

1. AdSense → Sites → **Add site** → `generatepasswordto.me` (the verification snippet is not
   needed: `ads.txt` and the existing ad code cover it, but adding the meta tag is harmless).
2. Wait for review (typically 2–14 days). Reviews are stricter for low-content sites, so the
   first decision may be "needs more content" — that is a content signal, not a code problem.
3. After approval: Ads → By site → enable Auto ads or keep the existing manual slots.

## Common rejection reasons to avoid

- Thin/duplicate content: we have 11 localized guides + FAQ sections; keep growing them.
- Missing privacy policy or cookie disclosure: covered above.
- Site under construction / no navigation: covered (205 pages, guides, legal pages).
- Traffic that looks artificial: never buy traffic or clicks; IndexNow is fine, click farms are not.

## After approval

- Keep Consent Mode v2 wiring untouched; EEA traffic must stay consent-gated.
- Monitor AdSense Policy Center weekly for the first month.
- Do not place ads above the fold on the generator itself (policy risk + UX), keep the current
  below-content placement.
