#!/usr/bin/env node
/**
 * Production CDN / TTFB smoke check.
 *
 * Runs against the live site by default and reports which edge served the
 * response, cache status, TTFB, compression, the geo cookie, apex redirect,
 * immutable static assets, sitemap and robots.txt. Useful before/after a
 * Cloudflare cutover.
 *
 * Usage:
 *   npm run cdn:check
 *   npm run cdn:check -- --url https://preview.example.com --runs 3
 */
const args = process.argv.slice(2);

function argValue(name, fallback) {
  const index = args.indexOf(name);
  return index >= 0 && args[index + 1] ? args[index + 1] : fallback;
}

const SITE = argValue('--url', 'https://www.generatepasswordto.me').replace(/\/+$/, '');
const RUNS = Math.max(1, Number(argValue('--runs', '5')) || 5);
const TIMEOUT_MS = 20000;

const results = [];
const BADGE = { pass: 'PASS', warn: 'WARN', fail: 'FAIL' };

function record(level, label, detail) {
  results.push({ level, label, detail });
  console.log(`${BADGE[level]}  ${label}${detail ? ` — ${detail}` : ''}`);
}

async function request(url, options = {}) {
  const started = performance.now();
  const response = await fetch(url, {
    redirect: 'manual',
    signal: AbortSignal.timeout(TIMEOUT_MS),
    ...options,
  });
  return { response, ms: Math.round(performance.now() - started) };
}

function header(response, name) {
  return response.headers.get(name) || '';
}

function setCookies(response) {
  if (typeof response.headers.getSetCookie === 'function') {
    return response.headers.getSetCookie();
  }
  const raw = response.headers.get('set-cookie');
  return raw ? [raw] : [];
}

async function main() {
  console.log(`\nCDN check — ${SITE}\n`);

  let html = '';
  const ttfb = [];
  const caches = new Set();
  let lastResponse = null;

  for (let run = 1; run <= RUNS; run += 1) {
    try {
      const { response, ms } = await request(SITE);
      lastResponse = response;
      ttfb.push(ms);
      html = await response.text();
      caches.add(
        header(response, 'x-vercel-cache') ||
          header(response, 'cf-cache-status') ||
          'n/a',
      );
      if (!response.ok) {
        record('fail', `Homepage run ${run}`, `HTTP ${response.status}`);
      }
    } catch (error) {
      record('fail', `Homepage run ${run}`, error.message);
    }
  }

  if (!lastResponse) {
    record('fail', 'Homepage', 'no response');
    return finish();
  }

  const server = header(lastResponse, 'server') || 'unknown';
  const isCloudflare = Boolean(header(lastResponse, 'cf-ray')) || /cloudflare/i.test(server);
  const isVercel = /vercel/i.test(server) || Boolean(header(lastResponse, 'x-vercel-id'));
  record(
    'pass',
    'Edge',
    `${isCloudflare ? 'Cloudflare' : 'no Cloudflare'} → ${isVercel ? 'Vercel' : 'unknown origin'} (${server})`,
  );

  if (ttfb.length) {
    const min = Math.min(...ttfb);
    const max = Math.max(...ttfb);
    const avg = Math.round(ttfb.reduce((sum, value) => sum + value, 0) / ttfb.length);
    record(avg < 800 ? 'pass' : 'warn', 'TTFB', `min ${min} ms / avg ${avg} ms / max ${max} ms`);
  }

  record(
    caches.has('HIT') || caches.has('REVALIDATED') ? 'pass' : 'warn',
    'HTML cache',
    [...caches].join(', ') || 'n/a',
  );
  record(
    header(lastResponse, 'content-encoding') ? 'pass' : 'warn',
    'Compression',
    header(lastResponse, 'content-encoding') || 'none',
  );

  const cacheControl = header(lastResponse, 'cache-control');
  if (cacheControl) console.log(`      Cache-Control: ${cacheControl}`);

  const hasGeo = setCookies(lastResponse).some((cookie) => /(?:^|;\s*)geo=[A-Za-z]{2}/.test(cookie));
  record(
    hasGeo ? 'pass' : 'warn',
    'Geo cookie',
    hasGeo ? 'set by origin' : 'not set on this response',
  );

  if (isCloudflare && /BYPASS|MISS|DYNAMIC/i.test([...caches].join(' '))) {
    record(
      'warn',
      'Cloudflare HTML cache',
      'HTML is not cached at the edge; Cloudflare adds a hop without the TTFB win',
    );
  }

  const assetMatch = html.match(/(?:src|href)="(\/_next\/static\/[^"]+\.(?:js|css))"/);
  if (assetMatch) {
    try {
      const { response, ms } = await request(`${SITE}${assetMatch[1]}`);
      const immutable = /immutable/i.test(header(response, 'cache-control'));
      record(
        response.ok && immutable ? 'pass' : 'warn',
        'Static asset',
        `HTTP ${response.status}, ${ms} ms, cache-control: ${header(response, 'cache-control') || 'n/a'}`,
      );
    } catch (error) {
      record('warn', 'Static asset', error.message);
    }
  }

  const url = new URL(SITE);
  if (url.hostname.startsWith('www.')) {
    const apex = `${url.protocol}//${url.hostname.slice(4)}`;
    try {
      const { response } = await request(apex);
      const location = header(response, 'location');
      record(
        [301, 308].includes(response.status) && location.startsWith(SITE)
          ? 'pass'
          : 'warn',
        'Apex → www',
        `HTTP ${response.status}${location ? ` → ${location}` : ''}`,
      );
    } catch (error) {
      record('warn', 'Apex → www', error.message);
    }
  }

  try {
    const { response } = await request(`${SITE}/sitemap.xml`);
    const xml = await response.text();
    const count = (xml.match(/<loc>/g) || []).length;
    record(response.ok && count > 0 ? 'pass' : 'fail', 'Sitemap', `HTTP ${response.status}, ${count} URLs`);
  } catch (error) {
    record('fail', 'Sitemap', error.message);
  }

  try {
    const { response } = await request(`${SITE}/robots.txt`);
    record(response.ok ? 'pass' : 'fail', 'robots.txt', `HTTP ${response.status}`);
  } catch (error) {
    record('fail', 'robots.txt', error.message);
  }

  return finish();
}

function finish() {
  const failures = results.filter((item) => item.level === 'fail').length;
  const warnings = results.filter((item) => item.level === 'warn').length;
  console.log(`\n${results.length - failures - warnings} passed, ${warnings} warnings, ${failures} failures\n`);
  process.exitCode = failures > 0 ? 1 : 0;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
