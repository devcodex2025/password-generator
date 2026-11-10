# Design direction

This file records the direction the site already follows. It is not a wish list:
a change that contradicts it needs a reason written here first.

For UI work, read this file for direction, then apply the antislop rules as the filter.

## Identity

A tool, not a SaaS landing page. The generator is the product, so the first screen
holds one job: produce a password. Everything below it explains, verifies or offers,
and never competes with the generator for attention.

Question the direction should survive: swap the logo and the product name, and the
page should still read as a password generator, not as a generic template.

## Dials

`ENERGY 2 / RHYTHM 2 / MOTION 1`

- ENERGY 2: confident and calm. One focal point per screen, no glow or neon.
- RHYTHM 2: mostly consistent sections with a few deliberate breaks (the leak check,
  the guides list, the affiliate offer use different shapes).
- MOTION 1: hover and state transitions only. One short reward animation exists
  (see Motion) and nothing else moves on scroll.

## Palette

Core:

| Token | Value | Use |
| --- | --- | --- |
| Primary | `#2A4E63` | Text, borders, focus ring in light mode |
| Surface accent | `#E5F6FF` | Tinted surfaces and card borders |
| Accent | `#05a9ff` | Primary action fill and links |
| Accent hover | `#38beff` | Hover state and focus ring in dark mode only |

Neutrals: `#ffffff`, `#f7fcff`, `#071016`, `#374151`, `#6b7280`, `#e0e0e0`,
`#121212`, `#171717`. Status colours (success, warning, error) are semantic and are
not part of the core palette.

Reason: a three colour core plus neutrals keeps the generator readable and lets the
dark theme reuse the same tokens instead of inventing a second accent. `#38beff` is
a hover and focus token, never a second brand accent.

## Typography

| Family | Role | Reason |
| --- | --- | --- |
| Arsenal | Headings and navigation | Humanist curves separate the brand from default Inter-style interfaces and stay readable at 30 px and up |
| Varela Round | Small labels, footer links | Rounded forms soften short utility text without reducing legibility |
| Noto Sans SC / JP | CJK locales | Native coverage for Chinese and Japanese glyphs; the Latin brand faces do not cover them |

One scale for every locale. No locale gets a different font in the header or footer.

## Radius scale

| Token | Value | Applies to |
| --- | --- | --- |
| `sm` | 8 px | Inputs, small chips |
| `md` | 12 px | Buttons, menu items |
| `lg` | 16 px | Feature cards, banners |
| `xl` | 24 px | Section panels |
| `hero` | 48 px | The generator card |
| `pill` | 120 px | Password field only |

The password pill is the identity motif: it is the one fully rounded surface, because
it holds the product's output. Primary CTAs may also be pills, and nothing else is.

## Spacing

Vertical rhythm between sections is 48 to 80 px on desktop and 32 to 48 px on mobile.
Space separates groups; it is not applied uniformly to every element.

## Surfaces, gradients and blur

- Flat surfaces first. A tinted background (`#E5F6FF` or a dark neutral) separates a
  block; decorative gradients are not used.
- Blur is reserved for modal and overlay backdrops (at most two layers). No blur on
  navigation, progress bars or passive prompts.

## Icons

One icon set: `@mui/icons-material`. An icon must describe the action next to it. No
hand-drawn path sets and no second icon library. Arrows are not added to buttons as
decoration; the one arrow that stays describes a menu path in the bookmark
instructions.

## Motion

Motion is feedback, not decoration. The single reward animation (confetti on a
successful copy) marks the one moment where the user needs confirmation that the
password left the page. It is skipped entirely under `prefers-reduced-motion: reduce`
and it never runs for a failed copy. Everything else is a CSS transition on hover,
focus or open state.

## Layout decisions

- **Generator first.** The hero is the tool itself, not a headline with a screenshot.
- **Uneven argument cards.** The first "why choose us" argument (local generation and
  open standards) is the strongest, so it takes more space than the other three.
- **Guides as a list.** Guides are a reading list, not a third card grid, so they are
  presented as rows with a date and a category. This breaks the rhythm on purpose and
  avoids three identical card sections in a row.
- **Verification before promotion.** The breach check sits between the tool and the
  affiliate offer, so the page gives value before it asks for anything.

## Contrast and focus

Body text meets WCAG AA on its surface in both themes. Every keyboard focus shows a
2 px outline or a ring: `#2A4E63` on light surfaces, `#38beff` on `#121212`. Focus is
never removed without a replacement.
