import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

function readJson(filePath) {
  const abs = path.resolve(process.cwd(), filePath);
  if (!fs.existsSync(abs)) {
    throw new Error(`File not found: ${filePath}`);
  }
  return JSON.parse(fs.readFileSync(abs, 'utf8'));
}

function normalizeText(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenize(text) {
  const matches = normalizeText(text).match(/[\p{L}\p{N}]+/gu);
  if (!matches) return [];

  const cjkPattern = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/u;
  const tokens = [];
  for (const match of matches) {
    let latin = '';
    for (const char of match) {
      if (cjkPattern.test(char)) {
        if (latin.length >= 2) tokens.push(latin);
        latin = '';
        tokens.push(char);
      } else {
        latin += char;
      }
    }
    if (latin.length >= 2) tokens.push(latin);
  }
  return tokens;
}

function wordCount(text) {
  return tokenize(text).length;
}

function buildArticleText(item) {
  const sections = Array.isArray(item.sections) ? item.sections : [];
  const sectionText = sections
    .map((s) => {
      const parts = [];
      parts.push(s?.heading || '');
      if (Array.isArray(s?.paragraphs)) parts.push(...s.paragraphs);
      if (Array.isArray(s?.bullets)) parts.push(...s.bullets);
      return parts.join(' ');
    })
    .join(' ');

  return [item.title, item.excerpt, item.seoTitle, item.seoDescription, sectionText].filter(Boolean).join(' ');
}

function toTokenSet(text) {
  return new Set(tokenize(text));
}

function jaccard(aSet, bSet) {
  if (aSet.size === 0 && bSet.size === 0) return 1;
  let intersection = 0;
  for (const token of aSet) {
    if (bSet.has(token)) intersection += 1;
  }
  const union = aSet.size + bSet.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

function parseArgs(argv) {
  const args = {
    content: 'docs/content-agent-output.sample.json',
    brief: 'docs/content-agent-brief.json',
    semantic: 'docs/semantic-core.json',
    profile: 'agent',
  };

  for (let i = 2; i < argv.length; i += 1) {
    const key = argv[i];
    const inline = key.startsWith('--') && key.includes('=');
    const value = inline ? key.slice(key.indexOf('=') + 1) : argv[i + 1];
    const name = inline ? key.slice(0, key.indexOf('=')) : key;
    if (!value) continue;
    if (name === '--content') args.content = value;
    if (name === '--brief') args.brief = value;
    if (name === '--semantic') args.semantic = value;
    if (name === '--profile') args.profile = value;
  }
  return args;
}

function ensureArrayPayload(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.items)) return payload.items;
  throw new Error('Content payload must be JSON array or object with "items" array.');
}

function getSemanticKeywordsByLocale(semantic) {
  if (!semantic || typeof semantic !== 'object') return {};
  return semantic.keywords || {};
}

function includesKeyword(text, keyword) {
  return normalizeText(text).includes(normalizeText(keyword));
}

function validate() {
  const { content, brief, semantic, profile } = parseArgs(process.argv);
  const isSiteProfile = profile === 'site';
  const briefJson = readJson(brief);
  const payload = ensureArrayPayload(readJson(content));
  const semanticJson = fs.existsSync(path.resolve(process.cwd(), semantic)) ? readJson(semantic) : null;

  const expectedLocales = new Set(briefJson.languages || []);
  const articleBySlug = new Map((briefJson.articles || []).map((a) => [a.slug, a]));
  const expectedPairs = new Set();
  for (const slug of articleBySlug.keys()) {
    for (const locale of expectedLocales) {
      expectedPairs.add(`${slug}::${locale}`);
    }
  }

  const semanticKeywordsByLocale = getSemanticKeywordsByLocale(semanticJson);

  const errors = [];
  const warnings = [];
  const addQuality = (message) => (isSiteProfile ? warnings : errors).push(message);
  const minWords = isSiteProfile ? 200 : 900;
  const seenPairs = new Set();
  const localeBuckets = new Map();
  const exactFingerprints = new Map();

  for (const item of payload) {
    const required = ['slug', 'locale', 'title', 'excerpt', 'seoTitle', 'seoDescription', 'keywords', 'sections'];
    for (const key of required) {
      if (item?.[key] === undefined || item?.[key] === null) {
        errors.push(`[missing-field] ${item?.slug || 'unknown'} ${item?.locale || 'unknown'}: ${key}`);
      }
    }
    if (!Array.isArray(item?.keywords)) {
      errors.push(`[invalid-field] ${item?.slug || 'unknown'} ${item?.locale || 'unknown'}: keywords must be array`);
    }
    if (!Array.isArray(item?.sections)) {
      errors.push(`[invalid-field] ${item?.slug || 'unknown'} ${item?.locale || 'unknown'}: sections must be array`);
    }

    const pairKey = `${item.slug}::${item.locale}`;
    if (!articleBySlug.has(item.slug)) {
      errors.push(`[unknown-slug] ${item.slug}`);
    }
    if (!expectedLocales.has(item.locale)) {
      errors.push(`[unknown-locale] ${item.slug} ${item.locale}`);
    }
    if (seenPairs.has(pairKey)) {
      errors.push(`[duplicate-record] ${pairKey}`);
    }
    seenPairs.add(pairKey);

    const text = buildArticleText(item);
    const wc = wordCount(text);
    if (wc < minWords) {
      addQuality(`[word-count] ${pairKey} has ${wc}, required >= ${minWords}`);
    }

    const excerptLen = String(item.excerpt || '').length;
    const seoTitleLen = String(item.seoTitle || '').length;
    const seoDescLen = String(item.seoDescription || '').length;
    if (excerptLen < 140 || excerptLen > 220) {
      addQuality(`[excerpt-length] ${pairKey} has ${excerptLen}, required 140-220`);
    }
    if (seoTitleLen < 50 || seoTitleLen > 65) {
      addQuality(`[seo-title-length] ${pairKey} has ${seoTitleLen}, required 50-65`);
    }
    if (seoDescLen < 140 || seoDescLen > 160) {
      addQuality(`[seo-description-length] ${pairKey} has ${seoDescLen}, required 140-160`);
    }

    const briefArticle = articleBySlug.get(item.slug);
    // Primary-keyword checks describe new agent output. Site content already
    // ships its own localized keyword sets, so the site profile skips them.
    const primaryKeywords = isSiteProfile
      ? []
      : Array.isArray(briefArticle?.primary_keywords)
        ? briefArticle.primary_keywords
        : [];
    const loweredKeywordsArray = (item.keywords || []).map((k) => normalizeText(k));

    for (const kw of primaryKeywords) {
      const kwNorm = normalizeText(kw);
      const inKeywordsArray = loweredKeywordsArray.includes(kwNorm);
      const inText = includesKeyword(text, kw);
      if (!inKeywordsArray) {
        addQuality(`[missing-primary-keyword-array] ${pairKey} missing "${kw}" in keywords[]`);
      }
      if (!inText) {
        addQuality(`[missing-primary-keyword-text] ${pairKey} missing "${kw}" in article text`);
      }
    }

    const localeCloud = semanticKeywordsByLocale[item.locale];
    if (localeCloud && typeof localeCloud === 'object') {
      const high = Array.isArray(localeCloud.high) ? localeCloud.high : [];
      const medium = Array.isArray(localeCloud.medium) ? localeCloud.medium : [];
      const highInText = high.filter((kw) => includesKeyword(text, kw)).length;
      const mediumInText = medium.filter((kw) => includesKeyword(text, kw)).length;
      if (high.length > 0 && highInText < 2) {
        warnings.push(`[keyword-cloud-high] ${pairKey} has ${highInText} high keywords in text (recommended >= 2)`);
      }
      if (medium.length > 0 && mediumInText < 1) {
        warnings.push(`[keyword-cloud-medium] ${pairKey} has ${mediumInText} medium keywords in text (recommended >= 1)`);
      }
    } else {
      warnings.push(`[keyword-cloud-missing-locale] ${pairKey} no keyword cloud for locale "${item.locale}"`);
    }

    const fingerprint = normalizeText(text);
    if (exactFingerprints.has(fingerprint)) {
      errors.push(`[exact-duplicate-text] ${pairKey} duplicates ${exactFingerprints.get(fingerprint)}`);
    } else {
      exactFingerprints.set(fingerprint, pairKey);
    }

    if (!localeBuckets.has(item.locale)) {
      localeBuckets.set(item.locale, []);
    }
    localeBuckets.get(item.locale).push({
      pairKey,
      set: toTokenSet(text),
    });
  }

  for (const pair of expectedPairs) {
    if (!seenPairs.has(pair)) {
      errors.push(`[missing-record] ${pair}`);
    }
  }

  for (const [locale, items] of localeBuckets.entries()) {
    for (let i = 0; i < items.length; i += 1) {
      for (let j = i + 1; j < items.length; j += 1) {
        const sim = jaccard(items[i].set, items[j].set);
        if (sim >= 0.82) {
          errors.push(
            `[near-duplicate] locale=${locale} ${items[i].pairKey} vs ${items[j].pairKey} similarity=${sim.toFixed(3)}`,
          );
        }
      }
    }
  }

  console.log('Content validation summary');
  console.log(`- Profile: ${profile}`);
  console.log(`- Records: ${payload.length}`);
  console.log(`- Errors: ${errors.length}`);
  console.log(`- Warnings: ${warnings.length}`);

  if (warnings.length) {
    console.log('\nWarnings:');
    const shown = isSiteProfile ? warnings.slice(0, 10) : warnings;
    for (const w of shown) console.log(`- ${w}`);
    if (isSiteProfile && warnings.length > shown.length) {
      console.log(`- ... and ${warnings.length - shown.length} more`);
    }
  }

  if (errors.length) {
    console.log('\nErrors:');
    for (const e of errors) console.log(`- ${e}`);
    process.exit(1);
  }

  console.log('\nValidation passed.');
}

try {
  validate();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}

