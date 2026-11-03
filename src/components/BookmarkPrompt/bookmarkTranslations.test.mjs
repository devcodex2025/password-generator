import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const lang = JSON.parse(readFileSync(new URL('../lang.json', import.meta.url), 'utf8'));

const LANGS = ['en', 'ua', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'pl', 'vi'];

/** Keys required by the Bookmark This Tool specification. */
const REQUIRED_KEYS = [
  'bookmark_title',
  'bookmark_description',
  'bookmark_cta',
  'bookmark_dismiss',
  'bookmark_modal_title',
  'bookmark_modal_description',
  'bookmark_desktop_instruction',
  'bookmark_mobile_instruction',
  'bookmark_ios_instruction',
  'bookmark_android_instruction',
  'bookmark_windows_instruction',
  'bookmark_macos_instruction',
  'bookmark_linux_instruction',
  'bookmark_step_1',
  'bookmark_step_2',
  'bookmark_step_3',
  'bookmark_browser_menu',
  'bookmark_keyboard_shortcut',
  'bookmark_close',
  'bookmark_platform_select',
  'bookmark_platform_desktop',
  'bookmark_platform_mobile',
  'bookmark_platform_tablet',
  'bookmark_manual_instructions',
];

const BOOKMARK_KEYS = Object.keys(lang).filter((key) => key.startsWith('bookmark_'));

const placeholders = (value) =>
  [...String(value).matchAll(/\{\{\s*([\w.]+)\s*\}\}/g)].map((match) => match[1]).sort();

test('every translation key required by the spec exists', () => {
  for (const key of REQUIRED_KEYS) {
    assert.equal(typeof lang[key], 'object', `missing translation key: ${key}`);
  }
});

test('every bookmark key is translated into all 12 site languages', () => {
  assert.ok(BOOKMARK_KEYS.length >= REQUIRED_KEYS.length, 'expected the bookmark key set');

  for (const key of BOOKMARK_KEYS) {
    const entry = lang[key];
    assert.equal(typeof entry, 'object', `${key} is not a translation object`);

    const languages = Object.keys(entry).sort();
    assert.deepEqual(languages, [...LANGS].sort(), `${key} has unexpected languages`);

    for (const locale of LANGS) {
      const value = entry[locale];
      assert.equal(typeof value, 'string', `${key}.${locale} is not a string`);
      assert.ok(value.trim().length > 0, `${key}.${locale} is empty`);
      assert.equal(value, value.trim(), `${key}.${locale} has stray whitespace`);
    }
  }
});

test('interpolation placeholders are preserved in every language', () => {
  for (const key of BOOKMARK_KEYS) {
    const expected = placeholders(lang[key].en);
    for (const locale of LANGS) {
      assert.deepEqual(
        placeholders(lang[key][locale]),
        expected,
        `${key}.${locale} does not use the same placeholders as English`
      );
    }
  }
});

test('non-Latin and Cyrillic locales are actually translated, not copied from English', () => {
  for (const locale of ['ua', 'ru', 'zh', 'ja']) {
    for (const key of BOOKMARK_KEYS) {
      assert.notEqual(
        lang[key][locale],
        lang[key].en,
        `${key}.${locale} is still the English string`
      );
    }
  }
});

test('Chinese and Japanese strings stay short enough for the compact layout', () => {
  for (const locale of ['zh', 'ja']) {
    for (const key of BOOKMARK_KEYS) {
      const length = [...lang[key][locale]].length;
      assert.ok(length <= 90, `${key}.${locale} is ${length} chars long`);
    }
  }
});

test('the copy mentions the product name and the CTA is localized', () => {
  assert.match(lang.bookmark_description.en, /GeneratePasswordToMe/);
  for (const locale of LANGS) {
    assert.match(lang.bookmark_description[locale], /GeneratePasswordToMe/);
    if (locale !== 'en') {
      assert.notEqual(
        lang.bookmark_cta[locale],
        'How to bookmark',
        `bookmark_cta.${locale} is still the English CTA`
      );
    }
  }
});
