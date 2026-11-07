#!/usr/bin/env node
/**
 * SEO locale coverage guard.
 *
 * Fails when a locale supported by the site is missing from any of the
 * per-language maps that drive titles, keywords, visible SEO copy or the
 * generator mode labels. A missing entry silently falls back to English,
 * which is how the `/vi` pages ended up with English SEO text.
 *
 * Run with: npm run seo:locales
 */
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();

const FILES = {
  metadata: 'src/lib/home-metadata.ts',
  semanticCore: 'docs/semantic-core.json',
  seoData: 'src/components/SeoData.js',
  seoKeywords: 'src/components/SEOKeywords.tsx',
  generatorModes: 'src/components/PasswordGenerator/generatorModes.ts',
};

function read(file) {
  const abs = path.resolve(ROOT, file);
  if (!fs.existsSync(abs)) {
    throw new Error(`File not found: ${file}`);
  }
  return fs.readFileSync(abs, 'utf8');
}

function readJson(file) {
  return JSON.parse(read(file));
}

/** Extracts a top-level string array literal that starts at `marker`. */
function extractStringArray(source, marker, file) {
  const markerIndex = source.indexOf(marker);
  if (markerIndex === -1) {
    throw new Error(`Could not find "${marker}" in ${file}`);
  }

  const openIndex = source.indexOf('[', markerIndex);
  if (openIndex === -1) {
    throw new Error(`Could not find the array opening bracket after "${marker}" in ${file}`);
  }

  const closeIndex = source.indexOf(']', openIndex);
  if (closeIndex === -1) {
    throw new Error(`Could not find the array closing bracket in ${file}`);
  }

  const literal = source.slice(openIndex + 1, closeIndex);
  const values = [];
  const pattern = /['"]([^'"]+)['"]/g;
  let match;
  while ((match = pattern.exec(literal)) !== null) {
    values.push(match[1]);
  }
  return values;
}

/**
 * Extracts the source of an object literal that starts at `marker`.
 * Brace matching ignores braces inside single/double quoted strings and
 * template literals, so translated copy cannot terminate the block early.
 */
function extractObjectBlock(source, marker, file) {
  const markerIndex = source.indexOf(marker);
  if (markerIndex === -1) {
    throw new Error(`Could not find "${marker}" in ${file}`);
  }

  const openIndex = source.indexOf('{', markerIndex);
  if (openIndex === -1) {
    throw new Error(`Could not find the object opening brace after "${marker}" in ${file}`);
  }

  let depth = 0;
  let quote = null;
  let escaped = false;

  for (let i = openIndex; i < source.length; i += 1) {
    const char = source[i];

    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (char === '\\') {
        escaped = true;
      } else if (char === quote) {
        quote = null;
      }
      continue;
    }

    if (char === '"' || char === "'" || char === '`') {
      quote = char;
      continue;
    }

    if (char === '{') {
      depth += 1;
    } else if (char === '}') {
      depth -= 1;
      if (depth === 0) {
        return source.slice(openIndex + 1, i);
      }
    }
  }

  throw new Error(`Unterminated object literal after "${marker}" in ${file}`);
}

/** Returns the raw value source for every top-level entry of an object block. */
function extractObjectEntries(block) {
  const entries = new Map();
  const lines = block.split(/\r?\n/);

  for (let i = 0; i < lines.length; i += 1) {
    const match = lines[i].match(/^\s{2}([A-Za-z0-9_-]+)\s*:\s*(.*)$/);
    if (!match) continue;

    const [, key, firstLine] = match;
    let value = firstLine;
    let depth = countDepth(firstLine);

    // Support multi-line values (e.g. a long array or object) until the entry
    // closes at the same depth it started at.
    while (depth > 0 && i + 1 < lines.length) {
      i += 1;
      value += `\n${lines[i]}`;
      depth += countDepth(lines[i]);
    }

    entries.set(key, value.replace(/,\s*$/, '').trim());
  }

  return entries;
}

function countDepth(text) {
  let depth = 0;
  let quote = null;
  let escaped = false;

  for (const char of text) {
    if (quote) {
      if (escaped) escaped = false;
      else if (char === '\\') escaped = true;
      else if (char === quote) quote = null;
      continue;
    }
    if (char === '"' || char === "'" || char === '`') {
      quote = char;
      continue;
    }
    if (char === '{' || char === '[' || char === '(') depth += 1;
    if (char === '}' || char === ']' || char === ')') depth -= 1;
  }

  return depth;
}

const normalize = (value) => value.replace(/\s+/g, ' ').trim();

function main() {
  const supported = extractStringArray(
    read(FILES.metadata),
    'export const SUPPORTED_LANGS =',
    FILES.metadata,
  );

  if (supported.length === 0) {
    throw new Error('No supported locales found in src/lib/home-metadata.ts');
  }

  const semanticCore = readJson(FILES.semanticCore);

  const maps = [
    {
      name: 'docs/semantic-core.json keywords',
      file: FILES.semanticCore,
      keys: supported.filter((locale) => {
        const tiers = semanticCore.keywords?.[locale];
        return (
          Array.isArray(tiers?.high) && tiers.high.length > 0 &&
          Array.isArray(tiers?.medium) && tiers.medium.length > 0 &&
          Array.isArray(tiers?.low) && tiers.low.length > 0
        );
      }),
    },
  ];

  const objectMaps = [
    ['LONG_TAIL_BY_LANG', FILES.seoData, 'const LONG_TAIL_BY_LANG = {'],
    ['naturalTextByLang', FILES.seoKeywords, 'const naturalTextByLang: Record<string, string> = {'],
    ['MODE_LABELS', FILES.generatorModes, 'const MODE_LABELS: Record<string, ModeLabels> = {'],
  ];

  const parsedMaps = objectMaps.map(([name, file, marker]) => {
    const entries = extractObjectEntries(extractObjectBlock(read(file), marker, file));
    return { name, file, entries };
  });

  for (const map of parsedMaps) {
    maps.push({ name: map.name, file: map.file, keys: supported.filter((locale) => map.entries.has(locale)) });
  }

  const errors = [];

  if (!Array.isArray(semanticCore.languages) || !supported.every((locale) => semanticCore.languages.includes(locale))) {
    const missing = supported.filter((locale) => !Array.isArray(semanticCore.languages) || !semanticCore.languages.includes(locale));
    errors.push(`${FILES.semanticCore}: "languages" is missing ${missing.join(', ')}`);
  }

  for (const map of maps) {
    const missing = supported.filter((locale) => !map.keys.includes(locale));
    if (missing.length > 0) {
      errors.push(`${map.name} (${map.file}) is missing: ${missing.join(', ')}`);
    }
  }

  const englishTiers = semanticCore.keywords?.en;
  if (englishTiers) {
    for (const locale of supported) {
      if (locale === 'en') continue;
      const tiers = semanticCore.keywords?.[locale];
      if (!tiers) continue;
      for (const tier of ['high', 'medium', 'low']) {
        const localized = Array.isArray(tiers[tier]) ? tiers[tier] : [];
        const english = Array.isArray(englishTiers[tier]) ? englishTiers[tier] : [];
        if (localized.length > 0 && normalize(localized.join(',')) === normalize(english.join(','))) {
          errors.push(
            `${FILES.semanticCore}: keywords.${locale}.${tier} is an untranslated copy of the English list`,
          );
        }
      }
    }
  }

  // A locale entry copied verbatim from English is an English fallback even
  // though the key exists. Only compare entries that are present in both.
  for (const { name, file, entries } of parsedMaps) {
    const english = entries.get('en');
    if (!english) {
      errors.push(`${name} (${file}) has no "en" entry to compare against`);
      continue;
    }

    const normalizedEnglish = normalize(english);
    for (const locale of supported) {
      if (locale === 'en') continue;
      const value = entries.get(locale);
      if (!value) continue;
      if (normalize(value) === normalizedEnglish) {
        errors.push(`${name} (${file}) "${locale}" is an untranslated copy of the English entry`);
      }
    }
  }

  if (errors.length > 0) {
    console.error('SEO locale check failed:\n');
    for (const error of errors) {
      console.error(`  - ${error}`);
    }
    console.error(`\n${errors.length} problem(s) found across ${maps.length} per-language map(s).`);
    process.exit(1);
  }

  console.log(
    `SEO locale check passed: ${supported.length} locales (${supported.join(', ')}) covered by ${maps.length} per-language map(s).`,
  );
}

main();
