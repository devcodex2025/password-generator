#!/usr/bin/env node
/**
 * Imports affiliate banner creatives into the site.
 *
 *   node scripts/import-creatives.mjs <folder> [--dry]
 *
 * Expects files named with a locale (and optionally a size), e.g.
 *   nordpass_de_728x90.png
 *   NordVPN-fr-300x250.jpg
 *   lock_es.png
 * Anything without a recognisable locale is treated as English.
 *
 * Copies files to public/affiliate/ and fills src/content/affiliate/banners.json
 * placements by size:
 *   728x90 / 970x250 / 1200x120  -> home-under-tool
 *   300x250 / 336x280 / 250x250  -> comparison-top
 *   1200x628 / 1200x630          -> skipped (OG image size, not a banner)
 */

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const BANNERS_JSON = path.join(ROOT, 'src/content/affiliate/banners.json');
const PUBLIC_DIR = path.join(ROOT, 'public/affiliate');

const LOCALES = ['en', 'ua', 'uk', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'pl', 'nl', 'ko', 'ar', 'tr', 'br'];
const IMAGE_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg']);

const args = process.argv.slice(2);
const dry = args.includes('--dry');
const folder = args.find((a) => !a.startsWith('--'));

if (!folder) {
  console.error('Usage: node scripts/import-creatives.mjs <folder> [--dry]');
  process.exit(2);
}

function imageSize(file) {
  const buffer = fs.readFileSync(file);
  const ext = path.extname(file).toLowerCase();

  if (ext === '.png' && buffer.length > 24) {
    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  }
  if (ext === '.gif' && buffer.length > 10) {
    return { width: buffer.readUInt16LE(6), height: buffer.readUInt16LE(8) };
  }
  if (ext === '.jpg' || ext === '.jpeg') {
    let offset = 2;
    while (offset < buffer.length - 9) {
      if (buffer[offset] !== 0xff) { offset += 1; continue; }
      const marker = buffer[offset + 1];
      const length = buffer.readUInt16BE(offset + 2);
      if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
        return { height: buffer.readUInt16BE(offset + 5), width: buffer.readUInt16BE(offset + 7) };
      }
      offset += 2 + length;
    }
  }
  if (ext === '.svg') {
    const text = buffer.toString('utf8', 0, 2000);
    const w = text.match(/width="(\d+)/);
    const h = text.match(/height="(\d+)/);
    if (w && h) return { width: Number(w[1]), height: Number(h[1]) };
  }
  return null;
}

function detectLocale(name) {
  const tokens = name.toLowerCase().replace(/\.[a-z0-9]+$/, '').split(/[^a-z]+/).filter(Boolean);
  for (const token of tokens) {
    if (token === 'br' || token === 'ptbr' || token === 'pt-br') return 'pt';
    if (LOCALES.includes(token)) return token === 'uk' ? 'ua' : token;
  }
  return 'en';
}

function placementFor(width, height) {
  const wide = width / height >= 3;
  if (width >= 900 && wide) return 'home-under-tool';
  if (width >= 1100 && !wide) return null; // OG image, not a banner
  if (width >= 240 && width <= 400) return 'comparison-top';
  return wide ? 'home-under-tool' : null;
}

const files = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (IMAGE_EXT.has(path.extname(entry.name).toLowerCase())) files.push(full);
  }
}
walk(folder);

const manifest = JSON.parse(fs.readFileSync(BANNERS_JSON, 'utf8'));
if (!dry) fs.mkdirSync(PUBLIC_DIR, { recursive: true });

let imported = 0;
const report = [];

for (const file of files) {
  const size = imageSize(file);
  if (!size?.width || !size?.height) {
    report.push(['skip (unknown size)', path.basename(file), '', '']);
    continue;
  }
  const placement = placementFor(size.width, size.height);
  if (!placement) {
    report.push(['skip (not a banner size)', path.basename(file), `${size.width}x${size.height}`, '']);
    continue;
  }

  const locale = detectLocale(path.basename(file));
  const slug = `nord-${locale}-${size.width}x${size.height}${path.extname(file).toLowerCase()}`;
  const target = path.join(PUBLIC_DIR, slug);

  if (!dry) {
    fs.copyFileSync(file, target);
    const placementConfig = manifest.placements[placement] ?? (manifest.placements[placement] = { byLocale: {} });
    placementConfig.byLocale[locale] = {
      src: `/affiliate/${slug}`,
      width: size.width,
      height: size.height,
      alt: `Password manager offer (${locale})`,
    };
  }

  imported += 1;
  report.push([placement, path.basename(file), `${size.width}x${size.height}`, locale]);
}

if (!dry) {
  manifest.updatedAt = new Date().toISOString().slice(0, 10);
  fs.writeFileSync(BANNERS_JSON, JSON.stringify(manifest, null, 2) + '\n');
}

const widths = [0, 1, 2, 3].map((i) => Math.max(...report.map((r) => String(r[i]).length), 4));
console.log(report.map((r) => r.map((c, i) => String(c).padEnd(widths[i])).join('  ')).join('\n'));
console.log(`\n${dry ? 'would import' : 'imported'}: ${imported} / ${files.length} files`);
if (!dry && imported > 0) console.log(`manifest: ${path.relative(ROOT, BANNERS_JSON)}`);
