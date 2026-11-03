// Pure generation logic: no React, no crypto, no network, so it can be tested with a seeded randomIndex.

/** @typedef {'chars' | 'words' | 'pin'} GeneratorMode */
/**
 * @typedef {{
 *   mode: GeneratorMode,
 *   passwordLength: number,
 *   selectedCharacterSets: string[],
 *   selectedStandard: string,
 *   separator: string,
 *   capitalize: boolean,
 * }} GeneratorRules
 */

/** @type {Record<string, string>} */
export const CHARACTER_SETS = {
  'A-Z': 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  'a-z': 'abcdefghijklmnopqrstuvwxyz',
  '0-9': '0123456789',
  '#$%': '!@#$%^&*()',
};

/** @type {Record<string, { minLength: number, requiredSets: string[] }>} */
export const PASSWORD_STANDARDS = {
  nist: { minLength: 8, requiredSets: ['A-Z', 'a-z', '0-9', '#$%'] },
  pci: { minLength: 12, requiredSets: ['A-Z', 'a-z', '0-9', '#$%'] },
  custom: { minLength: 4, requiredSets: [] },
};

/** Each mode keeps its own slider value. @type {Record<GeneratorMode, number>} */
export const DEFAULT_LENGTHS = { chars: 12, words: 4, pin: 6 };

/**
 * @param {Record<GeneratorMode, number>} lengths
 * @param {GeneratorMode} mode
 * @param {number} length
 * @returns {Record<GeneratorMode, number>}
 */
export function withModeLength(lengths, mode, length) {
  return { ...lengths, [mode]: length };
}

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

/**
 * Length in slider units: characters for chars/PIN, word count for words.
 * @param {GeneratorRules} rules
 */
export function effectiveLength(rules) {
  if (rules.mode === 'pin') return clamp(rules.passwordLength, 4, 12);
  if (rules.mode === 'words') return clamp(rules.passwordLength, 3, 8);
  return Math.max(rules.passwordLength, PASSWORD_STANDARDS[rules.selectedStandard].minLength);
}

/**
 * Builds one password; '' when it cannot be built (no character set, or words mode without a wordlist).
 * @param {GeneratorRules} rules
 * @param {string[] | null} words
 * @param {(max: number) => number} randomIndex
 * @returns {string}
 */
export function buildPassword(rules, words, randomIndex) {
  const length = effectiveLength(rules);

  if (rules.mode === 'pin') {
    let pin = '';
    for (let i = 0; i < length; i++) pin += String(randomIndex(10));
    return pin;
  }

  if (rules.mode === 'words') {
    if (!words || words.length === 0) return '';
    const picked = [];
    for (let i = 0; i < length; i++) picked.push(words[randomIndex(words.length)]);
    if (rules.capitalize) {
      const at = randomIndex(picked.length);
      picked[at] = picked[at].charAt(0).toUpperCase() + picked[at].slice(1);
    }
    return picked.join(rules.separator);
  }

  const pool = rules.selectedCharacterSets.map((set) => CHARACTER_SETS[set] ?? '').join('');
  if (pool.length === 0) return '';

  // one character from every set the standard requires, the rest from the selected pool
  const chars = PASSWORD_STANDARDS[rules.selectedStandard].requiredSets.map((set) => {
    const required = CHARACTER_SETS[set];
    return required.charAt(randomIndex(required.length));
  });
  while (chars.length < length) chars.push(pool.charAt(randomIndex(pool.length)));

  // Fisher-Yates shuffle
  for (let i = chars.length - 1; i > 0; i--) {
    const j = randomIndex(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.join('');
}

/**
 * GA params shared by every generation event. No password content is included.
 * @param {GeneratorRules} rules
 * @param {string} sample a generated password, used only for its character length
 * @param {string} language
 */
export function generationEventParams(rules, sample, language) {
  return {
    mode: rules.mode,
    length: effectiveLength(rules),
    char_length: sample.length,
    ...(rules.mode === 'chars' ? { standard: rules.selectedStandard } : {}),
    ui_language: language,
    surface: 'home',
  };
}

/**
 * Which GA event a list update should send.
 * - first generation or quantity increase: passwords_generated_batch, count = rows added
 * - rule change (same quantity): passwords_regenerated, count = list size
 * - quantity decrease or failed generation: none
 * @param {{ previousQuantity: number, nextQuantity: number, generated: string[], rules: GeneratorRules, language: string }} input
 * @returns {{ name: string, params: Record<string, string | number> } | null}
 */
export function planGenerationEvent({ previousQuantity, nextQuantity, generated, rules, language }) {
  if (generated.length === 0 || generated.some((p) => !p)) return null;
  if (nextQuantity < previousQuantity) return null;
  const name = nextQuantity > previousQuantity ? 'passwords_generated_batch' : 'passwords_regenerated';
  return { name, params: { count: generated.length, ...generationEventParams(rules, generated[0], language) } };
}
