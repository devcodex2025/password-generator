import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

// A component calling useTranslation() must import the i18n module itself, or
// pages that never load it hit NO_I18NEXT_INSTANCE and hydration mismatches.
const walk = (d) => readdirSync(d).flatMap((n) => {
  const p = join(d, n);
  return statSync(p).isDirectory() ? walk(p) : [p];
});

test('every useTranslation consumer imports the i18n instance', () => {
  const bad = walk('src').filter((f) => /\.tsx?$/.test(f) && !/\.test\.|\/i18n\.ts$|I18nProvider/.test(f))
    .filter((f) => {
      const s = readFileSync(f, 'utf8');
      return /useTranslation\(/.test(s) && !/import\s+(\w+\s+from\s+)?['"](@\/components|\.)\/i18n['"]/.test(s);
    });
  assert.deepEqual(bad, []);
});
