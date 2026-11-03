# Bookmark This Tool

Implementation notes for the `BookmarkPrompt` feature on GeneratePasswordToMe.

The feature nudges returning visitors to save the tool as a browser bookmark. It is an
inline block under the generator — never a pop-up — and it never claims to know whether
the page was actually bookmarked.

## Files

Created:

| File | Purpose |
| --- | --- |
| `src/components/BookmarkPrompt/BookmarkPrompt.tsx` | Inline "Bookmark this tool" block, visibility/frequency logic, analytics. |
| `src/components/BookmarkPrompt/BookmarkInstructions.tsx` | "Save this tool for later" dialog (modal on desktop, bottom sheet on phones), focus trap, platform override. |
| `src/components/BookmarkPrompt/bookmarkUtils.mjs` | Pure helpers: platform detection, instruction plan, localStorage state, analytics params. |
| `src/components/BookmarkPrompt/bookmarkTypes.ts` | Shared TypeScript types. |
| `src/components/BookmarkPrompt/bookmarkUtils.test.mjs` | 44 unit tests for detection, state and analytics. |
| `src/components/BookmarkPrompt/bookmarkTranslations.test.mjs` | 6 tests validating all 12 locales (completeness, placeholders, CJK length). |
| `src/lib/modal-coordination.ts` | Tiny pub/sub so the bookmark dialog and the NordPass save modal never overlap. |
| `docs/screenshots/bookmark-prompt/*.png` | Desktop / tablet / mobile screenshots (light and dark). |

Modified:

| File | Change |
| --- | --- |
| `src/components/PasswordGenerator/PasswordGenerator.tsx` | Renders `<BookmarkPrompt>` directly under the generator card. No changes to generation, strength or HIBP logic. |
| `src/components/affiliate/SavePasswordModal.tsx` | Announces itself and closes when the bookmark dialog opens (and vice versa). |
| `src/components/lang.json` | 34 new `bookmark_*` keys × 12 languages (408 strings). |

## Architecture

```
PasswordGenerator
└── BookmarkPrompt            (renders nothing on the server)
    ├── inline <section>      appears once a password exists and the storage says it was not dismissed
    └── BookmarkInstructions  portal → document.body, only after an explicit CTA click
```

Data flow:

1. `bookmarkUtils.detectPlatform()` reads `navigator.userAgent`/`navigator.platform`
   plus feature signals (`matchMedia('(pointer: coarse)')`, `maxTouchPoints`,
   `innerWidth`) and returns `{ deviceType, os, browser, isReliable }`.
2. Brave hides behind a Chrome user agent; `detectBraveBrowser()` asks
   `navigator.brave.isBrave()` and upgrades the result (Chrome instructions work in
   Brave anyway).
3. `resolveBookmarkInstructions()` turns the platform into a translation-free plan
   (step ids, shortcut, note keys) so all copy stays in `lang.json`.
4. The prompt is allowed to render when: a password exists **and** the stored state is
   not a dismissal inside the 180-day window. It is revealed on the next animation
   frame so it never competes with the generator's first paint.
5. Opening the instructions is always a manual action; nothing is auto-opened.

### Platform → instructions

| Platform | Steps shown |
| --- | --- |
| Windows / Linux / ChromeOS / macOS desktop | Press `Ctrl + D` (`⌘ + D` on macOS) → confirm name and save, plus the OS hint and the browser-menu alternative. |
| Android (Chrome, Edge, Brave, Opera, Firefox, Samsung Internet) | Open browser menu → choose the bookmark option → confirm. |
| iOS / iPadOS Safari | Share → Add Bookmark → Save. |
| iOS / iPadOS other browsers | Browser/share menu → choose bookmark → save. |
| Unknown OS on a phone/tablet | Generic mobile recipe (browser menu). |
| Unknown everything | Generic desktop shortcut path (or generic mobile when the viewport/pointer says mobile). |

The dialog shows a "Detected: …" line and lets the visitor override the device type,
the system and the browser. Changing the system keeps the device type coherent
(Android/iOS → mobile, iPadOS → tablet, desktop systems → desktop) and vice versa.

### Persistence

`localStorage` key: `generatepassword_bookmark_prompt_v1`

```json
{
  "dismissed": true,
  "dismissedAt": 1793577600000,
  "markedDoneAt": null,
  "version": 1,
  "updatedAt": 1793577600000
}
```

- dismissal is respected for 180 days (`BOOKMARK_DISMISS_MS`);
- a malformed or missing timestamp never hides the prompt forever;
- no passwords, clipboard content, cookies or identifiers are stored;
- reads/writes are wrapped in `try/catch`: a blocked or throwing `localStorage` means
  "no state" and the prompt still works (it just cannot remember the dismissal);
- state is per browser/device, as specified; no server calls are made.

## Analytics

Events (GA4 snake_case, also mirrored to Vercel Analytics):

| Event | When |
| --- | --- |
| `bookmark_prompt_view` | The block becomes visible (once per mount). |
| `bookmark_prompt_click` | "How to bookmark" is pressed. |
| `bookmark_instructions_view` | The instructions dialog opens. |
| `bookmark_prompt_dismiss` | The block is dismissed. |
| `bookmark_instructions_close` | The dialog closes (extra `close_method`: `close`, `backdrop`, `escape`, `other_modal`). |
| `bookmark_marked_done` | The visitor states they saved the page. |

Every event carries `ui_language`, `device_type`, `browser`, `operating_system`,
`placement` (`home-under-generator`) and `prompt_version` (`1`). No password, clipboard
or page content is ever sent. `bookmark_marked_done` is a self-declared acknowledgement,
not a verified bookmark.

## Translations

34 keys × 12 locales: `en`, `ua`, `es`, `fr`, `de`, `it`, `pt`, `ru`, `zh`, `ja`, `pl`, `vi`.

Keys: `bookmark_title`, `bookmark_description`, `bookmark_cta`, `bookmark_dismiss`,
`bookmark_modal_title`, `bookmark_modal_description`, `bookmark_close`,
`bookmark_platform_select`, `bookmark_platform_desktop`, `bookmark_platform_tablet`,
`bookmark_platform_mobile`, `bookmark_platform_other`, `bookmark_manual_instructions`,
`bookmark_os_label`, `bookmark_browser_label`, `bookmark_detected`,
`bookmark_marked_done`, `bookmark_step_1`, `bookmark_step_2`, `bookmark_step_3`,
`bookmark_step_press_shortcut`, `bookmark_step_menu_alternative`,
`bookmark_step_share`, `bookmark_step_add_bookmark`, `bookmark_step_save`,
`bookmark_desktop_instruction`, `bookmark_windows_instruction`,
`bookmark_macos_instruction`, `bookmark_linux_instruction`,
`bookmark_android_instruction`, `bookmark_ios_instruction`,
`bookmark_mobile_instruction`, `bookmark_browser_menu`, `bookmark_keyboard_shortcut`.

Browser names and key combinations (`Ctrl + D`, `⌘ + D`, `Chrome`, `Safari`, …) are not
translated. Placeholders (`{{shortcut}}`, `{{browser}}`, `{{menu}}`, `{{device}}`,
`{{os}}`) are identical in every locale — enforced by
`bookmarkTranslations.test.mjs`, which also checks that `ua`/`ru`/`zh`/`ja` never fall
back to the English string and that CJK strings stay within 90 characters.

## Accessibility & theming

- `<section aria-labelledby>` for the block; `role="dialog"`, `aria-modal`,
  `aria-labelledby`, `aria-describedby` for the instructions.
- Focus moves to the close button on open, `Tab`/`Shift+Tab` are trapped inside the
  dialog, `Escape`, the close button and the backdrop all close it, and focus returns
  to the trigger afterwards.
- `aria-pressed` on the device selector, labelled `<select>`s for system and browser,
  visible `focus-visible` rings, AA contrast in both themes.
- `motion-reduce:animate-none` plus `prefers-reduced-motion` verification.
- Light and dark palettes reuse the existing colours (`#2A4E63`, `#05A9FF`, `#E5F6FF`,
  `#071016`, `#1c1c1c`, `#e0e0e0`).

## Verification

| Check | Result |
| --- | --- |
| `node --test "src/**/*.test.mjs"` | 52 tests pass: 44 `bookmarkUtils` + 6 translations + 2 pre-existing HIBP tests |
| `tsc --noEmit` | clean |
| `next build` | success — compiled, TypeScript checked, 353 static pages generated |
| Browser suite (headless Chrome, CDP) | 67/67 checks pass |
| SSR HTML for `/en` | contains no prompt markup (client-only reveal, no hydration mismatch) |

Browser checks covered: first visit, block placement, view/click/dismiss/close/marked
done events with their parameter bag, Escape/backdrop/focus-trap/focus-restore,
dismissal persistence across reloads, the 180-day expiry, blocked `localStorage`
(no uncaught errors), NordPass save modal coordination in both directions, iPhone
Safari vs. Samsung Internet instructions, manual device/system override, desktop /
tablet / 390 px phone layouts without horizontal scrolling, `prefers-reduced-motion`,
and all 12 locales (translated titles, no overflow).

Screenshots:

- `docs/screenshots/bookmark-prompt/desktop-light.png`
- `docs/screenshots/bookmark-prompt/desktop-instructions.png`
- `docs/screenshots/bookmark-prompt/desktop-dark.png`
- `docs/screenshots/bookmark-prompt/desktop-dark-instructions.png`
- `docs/screenshots/bookmark-prompt/desktop-ua.png`
- `docs/screenshots/bookmark-prompt/tablet-ipad.png`
- `docs/screenshots/bookmark-prompt/mobile-android.png`
- `docs/screenshots/bookmark-prompt/mobile-android-instructions.png`
- `docs/screenshots/bookmark-prompt/mobile-ios-instructions.png`
- `docs/screenshots/bookmark-prompt/mobile-de-instructions.png`

## Notes

- No new npm dependencies, no external APIs, no extra network requests.
- The cookie banner (vanilla-cookieconsent) uses a very high z-index, so on a first
  visit it can overlap the dialog until the visitor answers it — the same behaviour the
  existing NordPass save modal has. Both dialogs sit at `z-[10050]`/`z-[10060]`.
- The installed environment for this change had no `git` binary, so no commit or pull
  request could be created from it; the working tree contains the described changes.
