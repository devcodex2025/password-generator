#!/usr/bin/env node
/**
 * Trigger the GA4 purchase sync (Phase 2).
 *
 * The work happens in /api/affiliate/sync, so this command needs the deployed endpoint and the
 * same CRON_SECRET that Vercel holds. Env (or .env.local):
 *   SYNC_URL       default https://www.generatepasswordto.me/api/affiliate/sync
 *   CRON_SECRET    required, must match the Vercel environment variable
 *
 * Usage:
 *   npm.cmd run affiliate:sync
 *   npm.cmd run affiliate:sync -- --days=7
 *   npm.cmd run affiliate:sync -- --validate      # GA4 validation endpoint, writes nothing
 *   npm.cmd run affiliate:sync -- --dry
 */
import { loadEnvFiles } from './lib/google-auth.mjs';

loadEnvFiles(['.env.local', '.env']);

const args = process.argv.slice(2);
const getArg = (name, fallback = '') => {
  const hit = args.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.split('=').slice(1).join('=') : fallback;
};

const base = process.env.SYNC_URL || 'https://www.generatepasswordto.me/api/affiliate/sync';
const secret = process.env.CRON_SECRET;

if (!secret) {
  console.error('CRON_SECRET is not set. Add it to .env.local (it must match Vercel).');
  process.exit(2);
}

const url = new URL(base);
url.searchParams.set('days', getArg('days', '30'));
if (args.includes('--validate')) url.searchParams.set('validate', '1');
if (args.includes('--dry')) url.searchParams.set('dry', '1');
if (args.includes('--pending')) url.searchParams.set('pending', '1');

const response = await fetch(url, {
  headers: { Authorization: `Bearer ${secret}`, Accept: 'application/json' },
  signal: AbortSignal.timeout(90000),
});

const body = await response.json().catch(() => null);
if (!response.ok) {
  console.error(`Sync failed: HTTP ${response.status}`, body?.error || '');
  process.exit(1);
}

console.log(
  `sync ${body.mode} | last ${body.days} days | conversions ${body.conversions} | ` +
    `sent ${body.sent} | skipped ${body.skipped} | invalid ${body.invalid}`
);
for (const row of body.results || []) {
  const detail = row.reason || row.validationMessages?.map((m) => m.description).join('; ') || '';
  console.log(
    `  ${row.conversionId || '-'} | ${row.status}${row.httpStatus ? ` ${row.httpStatus}` : ''} | ` +
      `${row.value !== undefined ? `$${row.value}` : ''} ${detail}`.trimEnd()
  );
}
