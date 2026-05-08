import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseHibpRange } from './parseHibpRange.mjs';

const FAKE_RANGE_BODY = [
  'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA:42',
  'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB:7',
].join('\n');

test('parseHibpRange returns breached:true with the count when the suffix matches', () => {
  assert.deepEqual(
    parseHibpRange(FAKE_RANGE_BODY, 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'),
    { breached: true, count: 42 },
  );
});

test('parseHibpRange returns breached:false with count 0 when the suffix is missing', () => {
  assert.deepEqual(
    parseHibpRange(FAKE_RANGE_BODY, 'CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC'),
    { breached: false, count: 0 },
  );
});
