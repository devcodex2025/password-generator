import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  BOOKMARK_DISMISS_MS,
  BOOKMARK_EVENTS,
  BOOKMARK_PLACEMENT,
  BOOKMARK_PROMPT_VERSION,
  BOOKMARK_STORAGE_KEY,
  buildBookmarkEventParams,
  detectBraveBrowser,
  detectPlatform,
  dismissBookmarkPrompt,
  getLocalStorage,
  isBookmarkPromptHidden,
  parseBookmarkState,
  readBookmarkState,
  resolveBookmarkInstructions,
  resolveShortcut,
  trackBookmarkEvent,
  writeBookmarkState,
} from './bookmarkUtils.mjs';

const UA = {
  chromeWindows:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  edgeWindows:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 Edg/122.0.0.0',
  operaWindows:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36 OPR/107.0.0.0',
  firefoxLinux: 'Mozilla/5.0 (X11; Linux x86_64; rv:121.0) Gecko/20100101 Firefox/121.0',
  firefoxAndroid: 'Mozilla/5.0 (Android 13; Mobile; rv:109.0) Gecko/109.0 Firefox/115.0',
  chromeAndroid:
    'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
  chromeAndroidTablet:
    'Mozilla/5.0 (Linux; Android 13; SM-X700) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  samsungAndroid:
    'Mozilla/5.0 (Linux; Android 13; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/23.0 Chrome/115.0.0.0 Mobile Safari/537.36',
  safariMac:
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15',
  safariIPhone:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1',
  safariIPad:
    'Mozilla/5.0 (iPad; CPU OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1',
  chromeIPhone:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/122.0.6261.69 Mobile/15E148 Safari/604.1',
  chromeChromeOS:
    'Mozilla/5.0 (X11; CrOS x86_64 15633.69.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
};

/** Minimal in-memory Storage stand-in. */
function createMemoryStorage(initial = {}) {
  const map = new Map(Object.entries(initial));
  return {
    getItem: (key) => (map.has(key) ? map.get(key) : null),
    setItem: (key, value) => {
      map.set(key, String(value));
    },
    snapshot: () => JSON.parse(map.get(BOOKMARK_STORAGE_KEY) ?? 'null'),
  };
}

const FAILING_STORAGE = {
  getItem() {
    throw new Error('storage disabled');
  },
  setItem() {
    throw new Error('storage disabled');
  },
};

test('detects Chrome on Windows as a desktop Chromium browser', () => {
  assert.deepEqual(detectPlatform({ userAgent: UA.chromeWindows }), {
    deviceType: 'desktop',
    os: 'windows',
    browser: 'chrome',
    isReliable: true,
  });
});

test('detects Edge even though its user agent also contains Chrome and Safari', () => {
  const result = detectPlatform({ userAgent: UA.edgeWindows });
  assert.equal(result.browser, 'edge');
  assert.equal(result.os, 'windows');
});

test('detects Opera from the OPR token', () => {
  assert.equal(detectPlatform({ userAgent: UA.operaWindows }).browser, 'opera');
});

test('detects Firefox on Linux', () => {
  assert.deepEqual(detectPlatform({ userAgent: UA.firefoxLinux }), {
    deviceType: 'desktop',
    os: 'linux',
    browser: 'firefox',
    isReliable: true,
  });
});

test('detects Samsung Internet on Android', () => {
  const result = detectPlatform({ userAgent: UA.samsungAndroid });
  assert.equal(result.browser, 'samsung');
  assert.equal(result.os, 'android');
  assert.equal(result.deviceType, 'mobile');
});

test('detects Firefox on Android', () => {
  const result = detectPlatform({ userAgent: UA.firefoxAndroid });
  assert.equal(result.browser, 'firefox');
  assert.equal(result.os, 'android');
  assert.equal(result.deviceType, 'mobile');
});

test('detects Chrome on Android as mobile', () => {
  const result = detectPlatform({ userAgent: UA.chromeAndroid });
  assert.equal(result.browser, 'chrome');
  assert.equal(result.deviceType, 'mobile');
});

test('detects an Android tablet from the missing Mobile token', () => {
  assert.equal(detectPlatform({ userAgent: UA.chromeAndroidTablet }).deviceType, 'tablet');
});

test('detects Safari on macOS', () => {
  assert.deepEqual(detectPlatform({ userAgent: UA.safariMac }), {
    deviceType: 'desktop',
    os: 'macos',
    browser: 'safari',
    isReliable: true,
  });
});

test('detects Safari on iPhone', () => {
  const result = detectPlatform({ userAgent: UA.safariIPhone });
  assert.equal(result.os, 'ios');
  assert.equal(result.deviceType, 'mobile');
  assert.equal(result.browser, 'safari');
});

test('detects Chrome on iOS from the CriOS token', () => {
  assert.equal(detectPlatform({ userAgent: UA.chromeIPhone }).browser, 'chrome');
});

test('detects an iPad from its own user agent', () => {
  const result = detectPlatform({ userAgent: UA.safariIPad });
  assert.equal(result.os, 'ipados');
  assert.equal(result.deviceType, 'tablet');
});

test('detects iPadOS in desktop mode via multi-touch feature detection', () => {
  const result = detectPlatform({
    userAgent: UA.safariMac,
    platform: 'MacIntel',
    maxTouchPoints: 5,
    coarsePointer: true,
    viewportWidth: 1024,
  });
  assert.equal(result.os, 'ipados');
  assert.equal(result.deviceType, 'tablet');
});

test('detects ChromeOS', () => {
  assert.equal(detectPlatform({ userAgent: UA.chromeChromeOS }).os, 'chromeos');
});

test('falls back to unknown instead of guessing when the user agent is hidden', () => {
  const result = detectPlatform({ userAgent: '', platform: '', maxTouchPoints: 0 });
  assert.equal(result.os, 'unknown');
  assert.equal(result.browser, 'other');
  assert.equal(result.isReliable, false);
});

test('uses pointer and viewport heuristics when the user agent is hidden', () => {
  const phone = detectPlatform({ userAgent: '', coarsePointer: true, viewportWidth: 390 });
  assert.equal(phone.deviceType, 'mobile');
  assert.equal(phone.os, 'unknown');

  const tablet = detectPlatform({
    userAgent: '',
    coarsePointer: true,
    viewportWidth: 820,
    maxTouchPoints: 5,
  });
  assert.equal(tablet.deviceType, 'tablet');
});

test('a touchscreen laptop with a wide viewport stays a desktop', () => {
  const result = detectPlatform({
    userAgent: UA.chromeWindows,
    maxTouchPoints: 10,
    coarsePointer: false,
    viewportWidth: 1440,
  });
  assert.equal(result.deviceType, 'desktop');
});

test('detects Brave through its own API and degrades safely', async () => {
  assert.equal(await detectBraveBrowser({ brave: { isBrave: async () => true } }), true);
  assert.equal(await detectBraveBrowser({ brave: { isBrave: async () => false } }), false);
  assert.equal(await detectBraveBrowser({}), false);
  assert.equal(
    await detectBraveBrowser({
      brave: {
        isBrave: async () => {
          throw new Error('blocked');
        },
      },
    }),
    false
  );
});

test('resolves the platform keyboard shortcut', () => {
  assert.equal(resolveShortcut('macos'), '⌘ + D');
  assert.equal(resolveShortcut('windows'), 'Ctrl + D');
  assert.equal(resolveShortcut('linux'), 'Ctrl + D');
  assert.equal(resolveShortcut('chromeos'), 'Ctrl + D');
});

test('desktop instructions use a shortcut plus the browser menu alternative', () => {
  const plan = resolveBookmarkInstructions({
    deviceType: 'desktop',
    os: 'windows',
    browser: 'chrome',
    isReliable: true,
  });
  assert.deepEqual(plan.steps, ['press_shortcut', 'confirm']);
  assert.equal(plan.shortcut, 'Ctrl + D');
  assert.equal(plan.noteKey, 'bookmark_desktop_instruction');
  assert.equal(plan.osHintKey, 'bookmark_windows_instruction');
  assert.equal(plan.menuAlternative, true);
});

test('macOS instructions use the Command shortcut', () => {
  const plan = resolveBookmarkInstructions({
    deviceType: 'desktop',
    os: 'macos',
    browser: 'safari',
    isReliable: true,
  });
  assert.equal(plan.shortcut, '⌘ + D');
  assert.equal(plan.osHintKey, 'bookmark_macos_instruction');
});

test('Linux instructions point at the Linux hint', () => {
  const plan = resolveBookmarkInstructions({
    deviceType: 'desktop',
    os: 'linux',
    browser: 'firefox',
    isReliable: true,
  });
  assert.equal(plan.osHintKey, 'bookmark_linux_instruction');
});

test('ChromeOS has no dedicated OS hint but keeps the desktop shortcut', () => {
  const plan = resolveBookmarkInstructions({
    deviceType: 'desktop',
    os: 'chromeos',
    browser: 'chrome',
    isReliable: true,
  });
  assert.equal(plan.osHintKey, null);
  assert.equal(plan.shortcut, 'Ctrl + D');
});

test('Android instructions come from the browser menu, without a shortcut', () => {
  const plan = resolveBookmarkInstructions({
    deviceType: 'mobile',
    os: 'android',
    browser: 'samsung',
    isReliable: true,
  });
  assert.deepEqual(plan.steps, ['open_menu', 'choose_bookmark', 'confirm']);
  assert.equal(plan.shortcut, null);
  assert.equal(plan.noteKey, 'bookmark_android_instruction');
  assert.equal(plan.menuAlternative, false);
});

test('iOS Safari uses the Share sheet', () => {
  const plan = resolveBookmarkInstructions({
    deviceType: 'mobile',
    os: 'ios',
    browser: 'safari',
    isReliable: true,
  });
  assert.deepEqual(plan.steps, ['share', 'add_bookmark', 'save']);
  assert.equal(plan.noteKey, 'bookmark_ios_instruction');
});

test('other iOS browsers use their own menu to add a bookmark', () => {
  const plan = resolveBookmarkInstructions({
    deviceType: 'mobile',
    os: 'ios',
    browser: 'chrome',
    isReliable: true,
  });
  assert.deepEqual(plan.steps, ['open_menu', 'choose_bookmark', 'save']);
});

test('iPadOS follows the iOS instructions', () => {
  const plan = resolveBookmarkInstructions({
    deviceType: 'tablet',
    os: 'ipados',
    browser: 'safari',
    isReliable: true,
  });
  assert.deepEqual(plan.steps, ['share', 'add_bookmark', 'save']);
});

test('an unidentified mobile device gets the generic mobile recipe', () => {
  const plan = resolveBookmarkInstructions({
    deviceType: 'mobile',
    os: 'unknown',
    browser: 'other',
    isReliable: false,
  });
  assert.deepEqual(plan.steps, ['open_menu', 'choose_bookmark', 'confirm']);
  assert.equal(plan.noteKey, 'bookmark_mobile_instruction');
  assert.equal(plan.shortcut, null);
});

test('an unidentified desktop still gets the keyboard shortcut', () => {
  const plan = resolveBookmarkInstructions({
    deviceType: 'desktop',
    os: 'unknown',
    browser: 'other',
    isReliable: false,
  });
  assert.equal(plan.shortcut, 'Ctrl + D');
  assert.equal(plan.menuAlternative, true);
});

test('a Surface-like tablet keeps the desktop instructions', () => {
  const plan = resolveBookmarkInstructions({
    deviceType: 'tablet',
    os: 'windows',
    browser: 'edge',
    isReliable: true,
  });
  assert.deepEqual(plan.steps, ['press_shortcut', 'confirm']);
  assert.equal(plan.noteKey, 'bookmark_desktop_instruction');
});

test('parseBookmarkState normalizes valid state and ignores unknown fields', () => {
  const parsed = parseBookmarkState(
    JSON.stringify({ dismissed: true, dismissedAt: 123, version: 1, password: 'hunter2' })
  );
  assert.deepEqual(parsed, {
    dismissed: true,
    dismissedAt: 123,
    markedDoneAt: null,
    version: 1,
  });
  assert.equal('password' in parsed, false);
});

test('parseBookmarkState rejects corrupted values', () => {
  for (const raw of ['', 'not json', '[]', 'null', '"text"', '42']) {
    assert.equal(parseBookmarkState(raw), null, `expected null for ${JSON.stringify(raw)}`);
  }
  assert.equal(parseBookmarkState(undefined), null);
  assert.equal(parseBookmarkState(null), null);
});

test('writeBookmarkState merges with previous state and stamps the version', () => {
  const storage = createMemoryStorage();
  const state = writeBookmarkState({ dismissed: true, dismissedAt: 1000 }, storage, 2000);

  assert.equal(state.dismissed, true);
  assert.equal(state.dismissedAt, 1000);
  assert.equal(state.version, BOOKMARK_PROMPT_VERSION);
  assert.equal(state.updatedAt, 2000);
  assert.deepEqual(storage.snapshot(), state);
});

test('dismissBookmarkPrompt stores the dismissal and the optional acknowledgement', () => {
  const storage = createMemoryStorage();
  const state = dismissBookmarkPrompt({ markedDone: true }, storage, 5000);

  assert.equal(state.dismissed, true);
  assert.equal(state.dismissedAt, 5000);
  assert.equal(state.markedDoneAt, 5000);
  assert.equal(storage.snapshot().markedDoneAt, 5000);
});

test('the persisted payload contains no passwords or identifiers', () => {
  const storage = createMemoryStorage();
  dismissBookmarkPrompt({ markedDone: true }, storage, 777);
  const allowed = new Set(['dismissed', 'dismissedAt', 'markedDoneAt', 'version', 'updatedAt']);
  for (const key of Object.keys(storage.snapshot())) {
    assert.equal(allowed.has(key), true, `unexpected persisted key: ${key}`);
  }
});

test('a dismissal hides the prompt for 180 days and then expires', () => {
  const storage = createMemoryStorage();
  const state = dismissBookmarkPrompt({}, storage, 1_000_000);

  assert.equal(isBookmarkPromptHidden(state, 1_000_000 + 1000), true);
  assert.equal(isBookmarkPromptHidden(state, 1_000_000 + BOOKMARK_DISMISS_MS - 1), true);
  assert.equal(isBookmarkPromptHidden(state, 1_000_000 + BOOKMARK_DISMISS_MS), false);
  assert.equal(BOOKMARK_DISMISS_MS, 180 * 24 * 60 * 60 * 1000);
});

test('a dismissal with an unusable timestamp never hides the prompt forever', () => {
  assert.equal(isBookmarkPromptHidden({ dismissed: true, dismissedAt: null }), false);
  assert.equal(isBookmarkPromptHidden({ dismissed: true, dismissedAt: Number.NaN }), false);
  assert.equal(isBookmarkPromptHidden({ dismissed: false, dismissedAt: 1 }), false);
  assert.equal(isBookmarkPromptHidden(null), false);
});

test('storage failures are swallowed and treated as "no state"', () => {
  assert.equal(readBookmarkState(FAILING_STORAGE), null);
  assert.equal(writeBookmarkState({ dismissed: true }, FAILING_STORAGE), null);
  assert.equal(dismissBookmarkPrompt({}, FAILING_STORAGE), null);
  assert.equal(readBookmarkState(null), null);
  assert.equal(writeBookmarkState({}, null), null);
});

test('getLocalStorage returns null when window/localStorage is unavailable', () => {
  assert.equal(getLocalStorage(), null);
});

test('analytics params carry exactly the required dimensions', () => {
  const params = buildBookmarkEventParams(
    { deviceType: 'mobile', os: 'android', browser: 'chrome', isReliable: true },
    'ua'
  );

  assert.deepEqual(params, {
    ui_language: 'ua',
    device_type: 'mobile',
    browser: 'chrome',
    operating_system: 'android',
    placement: BOOKMARK_PLACEMENT,
    prompt_version: BOOKMARK_PROMPT_VERSION,
  });
  assert.deepEqual(
    Object.keys(params).sort(),
    ['browser', 'device_type', 'operating_system', 'placement', 'prompt_version', 'ui_language'].sort()
  );
});

test('analytics params degrade safely when detection failed', () => {
  const params = buildBookmarkEventParams(null, '');
  assert.equal(params.ui_language, 'en');
  assert.equal(params.device_type, 'desktop');
  assert.equal(params.browser, 'other');
  assert.equal(params.operating_system, 'unknown');
  assert.equal(params.placement, 'home-under-generator');
  assert.equal(params.prompt_version, 1);
});

test('the event names match the analytics contract', () => {
  assert.deepEqual(BOOKMARK_EVENTS, {
    promptView: 'bookmark_prompt_view',
    promptClick: 'bookmark_prompt_click',
    instructionsView: 'bookmark_instructions_view',
    promptDismiss: 'bookmark_prompt_dismiss',
    instructionsClose: 'bookmark_instructions_close',
    markedDone: 'bookmark_marked_done',
  });
});

test('trackBookmarkEvent forwards to gtag and Vercel Analytics exactly once', () => {
  const gtagCalls = [];
  const vaCalls = [];
  globalThis.window = {
    gtag: (...args) => gtagCalls.push(args),
    va: (...args) => vaCalls.push(args),
  };

  try {
    const params = buildBookmarkEventParams(
      { deviceType: 'desktop', os: 'windows', browser: 'firefox', isReliable: true },
      'pl'
    );
    trackBookmarkEvent(BOOKMARK_EVENTS.promptClick, params);

    assert.deepEqual(gtagCalls, [['event', 'bookmark_prompt_click', params]]);
    assert.deepEqual(vaCalls, [
      ['event', { name: 'bookmark_prompt_click', data: params }],
    ]);
  } finally {
    delete globalThis.window;
  }
});

test('trackBookmarkEvent survives a missing or throwing analytics runtime', () => {
  assert.doesNotThrow(() => trackBookmarkEvent(BOOKMARK_EVENTS.promptView, {}));

  globalThis.window = {
    gtag: () => {
      throw new Error('gtag blocked');
    },
  };
  try {
    assert.doesNotThrow(() => trackBookmarkEvent(BOOKMARK_EVENTS.promptView, {}));
  } finally {
    delete globalThis.window;
  }
});
