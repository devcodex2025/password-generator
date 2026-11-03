import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  CHARACTER_SETS,
  DEFAULT_LENGTHS,
  buildPassword,
  planGenerationEvent,
  withModeLength,
} from './generatorCore.mjs';

// deterministic randomIndex (mulberry32) so failures are reproducible
function seeded(seed = 42) {
  let a = seed >>> 0;
  return (max) => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return (((t ^ (t >>> 14)) >>> 0) % max);
  };
}

const ALL_SETS = ['A-Z', 'a-z', '0-9', '#$%'];
const rules = (overrides = {}) => ({
  mode: 'chars',
  passwordLength: 12,
  selectedCharacterSets: ALL_SETS,
  selectedStandard: 'custom',
  separator: '-',
  capitalize: true,
  ...overrides,
});
const FAKE_WORDS = Array.from({ length: 50 }, (_, i) => `word${i}`);
const SYMBOL = /^[!@#$%^&*()]$/;
const hasAllClasses = (p) => /[A-Z]/.test(p) && /[a-z]/.test(p) && /[0-9]/.test(p) && /[!@#$%^&*()]/.test(p);

test('custom with all sets uses the requested length and only pool characters', () => {
  const pool = Object.values(CHARACTER_SETS).join('');
  const p = buildPassword(rules({ passwordLength: 20 }), null, seeded());
  assert.equal(p.length, 20);
  assert.ok([...p].every((c) => pool.includes(c)));
});

test('custom with only #$% produces only symbols', () => {
  const p = buildPassword(rules({ passwordLength: 16, selectedCharacterSets: ['#$%'] }), null, seeded());
  assert.equal(p.length, 16);
  assert.ok([...p].every((c) => SYMBOL.test(c)));
});

test('custom with no character sets returns an empty string', () => {
  assert.equal(buildPassword(rules({ selectedCharacterSets: [] }), null, seeded()), '');
});

test('nist at length 8 always contains every required class', () => {
  const random = seeded(7);
  for (let i = 0; i < 1000; i++) {
    const p = buildPassword(rules({ selectedStandard: 'nist', passwordLength: 8 }), null, random);
    assert.equal(p.length, 8);
    assert.ok(hasAllClasses(p), p);
  }
});

test('pci raises a length below its minimum to 12', () => {
  assert.equal(buildPassword(rules({ selectedStandard: 'pci', passwordLength: 4 }), null, seeded()).length, 12);
});

test('nist keeps every required class even when only A-Z is selected', () => {
  const random = seeded(3);
  for (let i = 0; i < 200; i++) {
    const p = buildPassword(rules({ selectedStandard: 'nist', passwordLength: 8, selectedCharacterSets: ['A-Z'] }), null, random);
    assert.equal(p.length, 8);
    assert.ok(hasAllClasses(p), p);
  }
});

test('pin length is clamped to 4..12 digits', () => {
  assert.match(buildPassword(rules({ mode: 'pin', passwordLength: 1 }), null, seeded()), /^\d{4}$/);
  assert.match(buildPassword(rules({ mode: 'pin', passwordLength: 20 }), null, seeded()), /^\d{12}$/);
});

test('word count is clamped to 3..8 words', () => {
  const count = (len) => buildPassword(rules({ mode: 'words', passwordLength: len }), FAKE_WORDS, seeded()).split('-').length;
  assert.equal(count(1), 3);
  assert.equal(count(20), 8);
});

test('words mode without a wordlist returns an empty string', () => {
  assert.equal(buildPassword(rules({ mode: 'words', passwordLength: 4 }), null, seeded()), '');
});

test('words use the separator and capitalize exactly one word', () => {
  const p = buildPassword(rules({ mode: 'words', passwordLength: 5, separator: '_', capitalize: true }), FAKE_WORDS, seeded());
  const parts = p.split('_');
  assert.equal(parts.length, 5);
  assert.equal(parts.filter((w) => /^[A-Z]/.test(w)).length, 1);
});

test('each mode keeps its own length', () => {
  let lengths = withModeLength(DEFAULT_LENGTHS, 'words', 7);
  assert.equal(lengths.chars, 12);
  assert.equal(lengths.words, 7);
  lengths = withModeLength(lengths, 'chars', 20);
  assert.equal(lengths.words, 7);
  assert.equal(DEFAULT_LENGTHS.words, 4, 'defaults are not mutated');
});

const plan = (previousQuantity, nextQuantity, generated, overrides = {}) =>
  planGenerationEvent({ previousQuantity, nextQuantity, generated, rules: rules(overrides), language: 'en' });

test('first generation sends passwords_generated_batch with count 1', () => {
  const event = plan(0, 1, ['aaaaaaaaaaaa']);
  assert.equal(event.name, 'passwords_generated_batch');
  assert.equal(event.params.count, 1);
});

test('quantity increase counts only the added rows', () => {
  const event = plan(1, 3, ['aaaaaaaaaaaa', 'bbbbbbbbbbbb']);
  assert.equal(event.name, 'passwords_generated_batch');
  assert.equal(event.params.count, 2);
});

test('quantity decrease sends no event', () => {
  assert.equal(plan(3, 2, ['aaaaaaaaaaaa', 'bbbbbbbbbbbb']), null);
});

test('rule change with the same quantity sends passwords_regenerated for the whole list', () => {
  const event = plan(2, 2, ['aaaaaaaaaaaa', 'bbbbbbbbbbbb']);
  assert.equal(event.name, 'passwords_regenerated');
  assert.equal(event.params.count, 2);
});

test('failed generation sends no event', () => {
  assert.equal(plan(0, 1, ['']), null);
  assert.equal(plan(1, 1, []), null);
});

test('words length is reported in words, character length separately', () => {
  const event = plan(1, 1, ['alpha-bravo-charlie-delta'], { mode: 'words', passwordLength: 4 });
  assert.equal(event.params.length, 4);
  assert.equal(event.params.char_length, 25);
});

test('standard is sent only for chars mode', () => {
  assert.equal(plan(1, 1, ['aaaaaaaaaaaa'], { selectedStandard: 'nist' }).params.standard, 'nist');
  assert.ok(!('standard' in plan(1, 1, ['123456'], { mode: 'pin', selectedStandard: 'nist' }).params));
});
