import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const config = require(path.join(repoRoot, 'next-sitemap.config.js'));

test('internal /cjk URLs are dropped (the proxy redirects them to /zh and /ja)', async () => {
  for (const p of ['/cjk', '/cjk/zh', '/cjk/ja/guides/wifi-password-guide']) {
    assert.equal(await config.transform(config, p), null, p);
  }
  assert.ok(await config.transform(config, '/zh/guides'));
});

test('password-statistics-2026 is listed only for en, ua and vi', async () => {
  const urls = (await config.additionalPaths(config)).map((e) => e.loc);
  const stats = urls.filter((loc) => loc.endsWith('/password-statistics-2026')).sort();
  assert.deepEqual(stats, ['/en/', '/ua/', '/vi/'].map((l) => `${l.slice(0, -1)}/password-statistics-2026`));
});
