/**
 * BookmarkPrompt helpers: platform detection, localStorage persistence and
 * analytics. Kept as plain ESM (same pattern as `src/utils/parseHibpRange.mjs`)
 * so the pure logic is covered by the repo's `node --test` suite.
 *
 * Privacy rules for this module:
 * - only the dismissal flags/timestamps below are persisted;
 * - no passwords, clipboard content, cookies or identifiers are read or sent;
 * - every side effect is guarded so a blocked storage or missing analytics
 *   runtime can never break the generator.
 */

/** localStorage key recommended by the spec (versioned, feature-scoped). */
export const BOOKMARK_STORAGE_KEY = 'generatepassword_bookmark_prompt_v1';

/** Bump when the prompt copy/behaviour changes in a way that should re-prompt. */
export const BOOKMARK_PROMPT_VERSION = 1;

/** Placement identifier shared by every analytics event of this feature. */
export const BOOKMARK_PLACEMENT = 'home-under-generator';

/** How long a dismissal is respected before the prompt may be shown again. */
export const BOOKMARK_DISMISS_DAYS = 180;
export const BOOKMARK_DISMISS_MS = BOOKMARK_DISMISS_DAYS * 24 * 60 * 60 * 1000;

/** Analytics event names (GA4 snake_case). */
export const BOOKMARK_EVENTS = Object.freeze({
  promptView: 'bookmark_prompt_view',
  promptClick: 'bookmark_prompt_click',
  instructionsView: 'bookmark_instructions_view',
  promptDismiss: 'bookmark_prompt_dismiss',
  instructionsClose: 'bookmark_instructions_close',
  markedDone: 'bookmark_marked_done',
});

/** Display names are proper nouns and stay untranslated. */
/** @type {Record<string, string>} */
export const OPERATING_SYSTEM_LABELS = Object.freeze({
  windows: 'Windows',
  macos: 'macOS',
  linux: 'Linux',
  chromeos: 'ChromeOS',
  android: 'Android',
  ios: 'iOS',
  ipados: 'iPadOS',
});

/** @type {Record<string, string>} */
export const BROWSER_LABELS = Object.freeze({
  chrome: 'Chrome',
  edge: 'Edge',
  firefox: 'Firefox',
  safari: 'Safari',
  brave: 'Brave',
  opera: 'Opera',
  samsung: 'Samsung Internet',
});

const DESKTOP_OPERATING_SYSTEMS = new Set(['windows', 'macos', 'linux', 'chromeos']);

/**
 * @param {unknown} value
 * @returns {value is number}
 */
function isTimestamp(value) {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0;
}

/**
 * Detect the OS from the user agent, using the platform hint as a fallback.
 * The user agent is a hint only: the caller treats `os: 'unknown'` as
 * "show the generic instructions".
 *
 * @param {{ ua: string, platform: string, maxTouchPoints: number }} input
 * @returns {string}
 */
function detectOperatingSystem({ ua, platform, maxTouchPoints }) {
  if (/android/.test(ua)) return 'android';
  if (/iphone|ipod/.test(ua)) return 'ios';
  if (/ipad/.test(ua)) return 'ipados';

  // iPadOS 13+ reports itself as desktop Safari ("Macintosh; Intel Mac OS X")
  // and can only be told apart by the multi-touch capability.
  if (platform === 'macintel' && maxTouchPoints > 1) return 'ipados';

  if (/cros/.test(ua)) return 'chromeos';
  if (/windows|win32|win64|wow64/.test(ua) || platform === 'win32' || platform === 'win64') {
    return 'windows';
  }
  if (/mac os x|macintosh|macintel/.test(ua) || platform.startsWith('mac')) return 'macos';
  if (/linux|x11/.test(ua) || platform.startsWith('linux')) return 'linux';
  return 'unknown';
}

/**
 * Browser detection order matters: Chromium derivatives all contain
 * "Chrome" and every WebKit browser contains "Safari" in its UA.
 *
 * @param {string} ua
 * @returns {string}
 */
function detectBrowser(ua) {
  if (/edg(e|a|ios)?\//.test(ua)) return 'edge';
  if (/opr\/|opera mini|opera mobi|opera\//.test(ua)) return 'opera';
  if (/samsungbrowser/.test(ua)) return 'samsung';
  if (/fxios|firefox|fennec/.test(ua)) return 'firefox';
  if (/crios|chrome|chromium/.test(ua)) return 'chrome';
  if (/safari/.test(ua)) return 'safari';
  return 'other';
}

/**
 * @param {{ os: string, ua: string, coarsePointer: boolean, viewportWidth: number, maxTouchPoints: number }} input
 * @returns {string}
 */
function detectDeviceType({ os, ua, coarsePointer, viewportWidth, maxTouchPoints }) {
  if (os === 'android') return /mobile/.test(ua) ? 'mobile' : 'tablet';
  if (os === 'ios') return 'mobile';
  if (os === 'ipados') return 'tablet';

  // Tablets with a desktop OS (Surface) and phones with a hidden user agent
  // are still recognisable through their primary pointer and viewport.
  if (coarsePointer && viewportWidth > 0) {
    if (viewportWidth < 768) return 'mobile';
    if (viewportWidth < 1024 && maxTouchPoints > 1) return 'tablet';
  }

  return 'desktop';
}

/**
 * Identify device type, OS and browser without any third-party library.
 *
 * @param {import('./bookmarkTypes').PlatformSignals} [signals]
 * @returns {import('./bookmarkTypes').PlatformInfo}
 */
export function detectPlatform(signals = {}) {
  const ua = String(signals.userAgent ?? '').toLowerCase();
  const platform = String(signals.platform ?? '').toLowerCase();
  const maxTouchPoints = Number(signals.maxTouchPoints ?? 0);
  const coarsePointer = signals.coarsePointer === true;
  const viewportWidth = Number(signals.viewportWidth ?? 0);

  const os = detectOperatingSystem({ ua, platform, maxTouchPoints });
  const browser = detectBrowser(ua);
  const deviceType = detectDeviceType({ os, ua, coarsePointer, viewportWidth, maxTouchPoints });

  return {
    deviceType,
    os,
    browser,
    isReliable: os !== 'unknown' && browser !== 'other',
  };
}

/**
 * Brave deliberately reports a Chrome user agent, so it can only be detected
 * through its own (async) API. Failures degrade to the Chrome instructions,
 * which lead to the same result in Brave.
 *
 * @param {{ brave?: { isBrave?: () => Promise<boolean> } }} [navigatorLike]
 * @returns {Promise<boolean>}
 */
export async function detectBraveBrowser(navigatorLike) {
  try {
    const isBrave = navigatorLike?.brave?.isBrave;
    if (typeof isBrave !== 'function') return false;
    return (await isBrave.call(navigatorLike.brave)) === true;
  } catch {
    return false;
  }
}

/**
 * @param {string} os
 * @returns {string}
 */
export function resolveShortcut(os) {
  return os === 'macos' ? '⌘ + D' : 'Ctrl + D';
}

/**
 * Resolve which instruction steps to show for a platform. Pure and
 * translation-free: callers map the returned keys to `lang.json` entries.
 *
 * @param {import('./bookmarkTypes').PlatformInfo} platform
 * @returns {import('./bookmarkTypes').BookmarkInstructionsPlan}
 */
export function resolveBookmarkInstructions(platform) {
  const os = platform?.os ?? 'unknown';
  const deviceType = platform?.deviceType ?? 'desktop';
  const browser = platform?.browser ?? 'other';

  if (os === 'android') {
    return {
      steps: ['open_menu', 'choose_bookmark', 'confirm'],
      shortcut: null,
      noteKey: 'bookmark_android_instruction',
      osHintKey: null,
      menuAlternative: false,
    };
  }

  if (os === 'ios' || os === 'ipados') {
    // Safari adds bookmarks through the Share sheet; every other iOS browser
    // exposes it in its own menu.
    const steps =
      browser === 'safari'
        ? ['share', 'add_bookmark', 'save']
        : ['open_menu', 'choose_bookmark', 'save'];

    return {
      steps,
      shortcut: null,
      noteKey: 'bookmark_ios_instruction',
      osHintKey: null,
      menuAlternative: false,
    };
  }

  // A mobile/tablet device whose OS could not be identified gets the generic
  // mobile recipe instead of a keyboard shortcut it may not have.
  if (os === 'unknown' && deviceType !== 'desktop') {
    return {
      steps: ['open_menu', 'choose_bookmark', 'confirm'],
      shortcut: null,
      noteKey: 'bookmark_mobile_instruction',
      osHintKey: null,
      menuAlternative: false,
    };
  }

  const osHintKey =
    os === 'windows'
      ? 'bookmark_windows_instruction'
      : os === 'macos'
        ? 'bookmark_macos_instruction'
        : os === 'linux'
          ? 'bookmark_linux_instruction'
          : null;

  return {
    steps: ['press_shortcut', 'confirm'],
    shortcut: resolveShortcut(os),
    noteKey: 'bookmark_desktop_instruction',
    osHintKey,
    menuAlternative: DESKTOP_OPERATING_SYSTEMS.has(os) || os === 'unknown',
  };
}

/**
 * Parse a raw persisted value into a normalized state. Returns `null` when the
 * stored data is absent, not JSON, or not an object so a corrupted entry can
 * never crash (or permanently hide) the prompt.
 *
 * @param {string | null | undefined} raw
 * @returns {import('./bookmarkTypes').BookmarkState | null}
 */
export function parseBookmarkState(raw) {
  if (typeof raw !== 'string' || raw.trim() === '') return null;

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return null;
  }

  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return null;

  return {
    dismissed: parsed.dismissed === true,
    dismissedAt: isTimestamp(parsed.dismissedAt) ? parsed.dismissedAt : null,
    markedDoneAt: isTimestamp(parsed.markedDoneAt) ? parsed.markedDoneAt : null,
    version: isTimestamp(parsed.version) ? parsed.version : BOOKMARK_PROMPT_VERSION,
  };
}

/**
 * Access `localStorage` defensively: it throws in sandboxed iframes, in
 * privacy modes and when storage is disabled by the browser.
 *
 * @returns {import('./bookmarkTypes').StorageLike | null}
 */
export function getLocalStorage() {
  try {
    if (typeof window === 'undefined') return null;
    const storage = window.localStorage;
    return storage && typeof storage.getItem === 'function' ? storage : null;
  } catch {
    return null;
  }
}

/**
 * @param {import('./bookmarkTypes').StorageLike | null} [storage]
 * @returns {import('./bookmarkTypes').BookmarkState | null}
 */
export function readBookmarkState(storage = getLocalStorage()) {
  try {
    if (!storage) return null;
    return parseBookmarkState(storage.getItem(BOOKMARK_STORAGE_KEY));
  } catch {
    return null;
  }
}

/**
 * Merge `patch` into the stored state. Returns the written state, or `null`
 * when persistence is unavailable.
 *
 * @param {Partial<import('./bookmarkTypes').BookmarkState>} patch
 * @param {import('./bookmarkTypes').StorageLike | null} [storage]
 * @param {number} [now]
 * @returns {import('./bookmarkTypes').BookmarkState | null}
 */
export function writeBookmarkState(patch, storage = getLocalStorage(), now = Date.now()) {
  try {
    if (!storage) return null;

    const previous = readBookmarkState(storage);
    /** @type {import('./bookmarkTypes').BookmarkState} */
    const next = {
      dismissed: previous?.dismissed === true,
      dismissedAt: previous?.dismissedAt ?? null,
      markedDoneAt: previous?.markedDoneAt ?? null,
      ...patch,
      version: BOOKMARK_PROMPT_VERSION,
      updatedAt: now,
    };

    storage.setItem(BOOKMARK_STORAGE_KEY, JSON.stringify(next));
    return next;
  } catch {
    return null;
  }
}

/**
 * Persist the dismissal (and optional "I already saved it" acknowledgement).
 *
 * @param {{ markedDone?: boolean }} [options]
 * @param {import('./bookmarkTypes').StorageLike | null} [storage]
 * @param {number} [now]
 * @returns {import('./bookmarkTypes').BookmarkState | null}
 */
export function dismissBookmarkPrompt(options = {}, storage = getLocalStorage(), now = Date.now()) {
  const patch = { dismissed: true, dismissedAt: now };
  if (options.markedDone === true) patch.markedDoneAt = now;
  return writeBookmarkState(patch, storage, now);
}

/**
 * True while a dismissal is still inside the 180-day window.
 * A malformed/absent timestamp never hides the prompt forever.
 *
 * @param {import('./bookmarkTypes').BookmarkState | null} state
 * @param {number} [now]
 * @returns {boolean}
 */
export function isBookmarkPromptHidden(state, now = Date.now()) {
  if (!state || state.dismissed !== true) return false;
  if (!isTimestamp(state.dismissedAt)) return false;
  return now - state.dismissedAt < BOOKMARK_DISMISS_MS;
}

/**
 * Build the parameter bag shared by every bookmark analytics event.
 * Only coarse platform facts are included — never passwords or page content.
 *
 * @param {import('./bookmarkTypes').PlatformInfo | null} platform
 * @param {string} uiLanguage
 * @returns {Record<string, string | number>}
 */
export function buildBookmarkEventParams(platform, uiLanguage) {
  return {
    ui_language: typeof uiLanguage === 'string' && uiLanguage ? uiLanguage : 'en',
    device_type: platform?.deviceType ?? 'desktop',
    browser: platform?.browser ?? 'other',
    operating_system: platform?.os ?? 'unknown',
    placement: BOOKMARK_PLACEMENT,
    prompt_version: BOOKMARK_PROMPT_VERSION,
  };
}

/**
 * Send an event to the existing GA4/GTM and Vercel Analytics integrations.
 * Analytics must never break the UI, so every failure is swallowed.
 *
 * @param {string} eventName
 * @param {Record<string, string | number>} params
 * @returns {void}
 */
export function trackBookmarkEvent(eventName, params) {
  try {
    if (typeof window === 'undefined') return;
    if (typeof window.gtag === 'function') window.gtag('event', eventName, params);
    if (typeof window.va === 'function') window.va('event', { name: eventName, data: params });
  } catch {
    /* analytics is best-effort */
  }
}
