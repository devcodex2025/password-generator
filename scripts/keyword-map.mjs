#!/usr/bin/env node
/**
 * Builds a keyword map per locale from docs/keyword-research.json.
 * Classifies autocomplete suggestions into intent clusters and maps each cluster
 * to the page that should rank for it (existing page or a documented gap).
 *
 * Output: docs/keyword-map.json + docs/keyword-map.md
 * Usage: npm run keywords:map
 */
import fs from 'node:fs';
import path from 'node:path';

const research = JSON.parse(fs.readFileSync(path.resolve('docs', 'keyword-research.json'), 'utf8'));

const charWord = /(characters?|символ|zeichen|znak|caracteres|caratteri|文字|字符|char)/i;
const passphrase = /(passphrase|pass ?phrase|password (with )?words?|\bwords?\b|easy to remember|словами|слов|фраз|wyraz|słownik|slownik|latw|łatw|frase|frasi|frases|簡単|覚え|語|短语|单词|助记)/i;
const manager = /(password ?manager|менеджер|gestor|gestionnaire|gestore|gerenciador|管理|keepass|bitwarden|1password|lastpass|nordpass|dashlane|roboform)/i;
const howto = /^(how to|how do|як |как |come |comment |como |cómo |jak |如何)|作り方|作成方法|如何創建|如何创建/i;
const strength = /(strong password|secure password|safe password|password strength|надійний пароль|безпечний пароль|надежный пароль|silne hasło|sicheres passwort|contraseña segura|mot de passe sécurisé|password sicura|senha segura|強力なパスワード|安全なパスワード|强密码|安全密码)/i;
const check = /(check|перевір|провер|test|prüf|verif|sprawdz|検|检查|checker)/i;
const core = /(generator|генератор|generador|générateur|generatore|gerador|生成器|パスワード ?生成|password gen|gen password)/i;

const URLS = {
  home: (l) => `/${l}`,
  guides: (l) => `/${l}/guides`,
  length: (l) => `/${l}/guides/how-to-create-strong-passwords`,
  passphraseGuide: (l) => `/${l}/guides/passphrase-vs-password-entropy`,
  howto: (l) => `/${l}/guides/how-to-create-strong-passwords`,
  managers: (l) => `/${l}/best-password-managers-2026`,
  managerVsManual: (l) => `/${l}/guides/password-manager-vs-manual-storage`,
  breach: (l) => `/${l}/guides/what-to-do-after-password-breach`,
  nist: (l) => `/${l}/guides/nist-800-63b-password-rules`,
  team: (l) => `/${l}/guides/team-password-policy-template`,
};

function classify(text, seed) {
  const t = ` ${text} `;
  if (charWord.test(t) && /\d/.test(t)) return 'length';
  if (passphrase.test(t)) return 'passphrase';
  if (howto.test(text.trim())) return 'howto';
  // "password generator lastpass/google" is still a generator query, not a manager query
  if (core.test(t)) return 'core';
  if (manager.test(t)) return 'manager';
  if (strength.test(t)) return 'strength';
  if (check.test(t)) return 'check';
  if (seed && core.test(seed)) return 'core';
  return 'other';
}

const MAP = {
  core: { target: URLS.home, status: 'exists', note: 'home title/H1/meta' },
  length: { target: URLS.length, status: 'gap-section', note: 'FAQ + presets 8/12/16/20 + guide H2' },
  passphrase: { target: URLS.passphraseGuide, status: 'gap-feature', note: 'add words-mode generator + landing section' },
  manager: { target: URLS.managers, status: 'partial', note: 'platform sections (Android/iPhone/Chrome)' },
  howto: { target: URLS.howto, status: 'exists', note: 'align FAQ wording with query' },
  strength: { target: URLS.howto, status: 'exists', note: 'add "what makes a password strong" section + examples' },
  check: { target: URLS.howto, status: 'partial', note: 'strength-test wording; consider dedicated checker section' },
  other: { target: URLS.home, status: 'review', note: 'manual review' },
};

const out = { generatedAt: new Date().toISOString(), source: 'google-autocomplete', locales: {} };

for (const [code, data] of Object.entries(research.locales)) {
  const clusters = {};
  const seen = new Set();
  for (const s of data.seeds) {
    for (const suggestion of s.suggestions || []) {
      const key = suggestion.toLowerCase().trim();
      if (!key || seen.has(key)) continue;
      seen.add(key);
      const cluster = classify(key, s.seed);
      clusters[cluster] = clusters[cluster] || [];
      clusters[cluster].push(suggestion.trim());
    }
  }
  out.locales[code] = {
    locale: code,
    totalUnique: seen.size,
    clusters: Object.fromEntries(
      Object.entries(clusters)
        .sort((a, b) => b[1].length - a[1].length)
        .map(([name, list]) => [
          name,
          {
            count: list.length,
            target: MAP[name].target(code),
            status: MAP[name].status,
            note: MAP[name].note,
            keywords: list.slice(0, 8),
          },
        ])
    ),
  };
}

fs.writeFileSync(path.resolve('docs', 'keyword-map.json'), JSON.stringify(out, null, 2) + '\n');

const lines = [
  '# Keyword map by locale',
  '',
  `Generated: ${out.generatedAt}`,
  '',
  'Every cluster is mapped to the page that must rank for it. Status: `exists` (page exists,',
  'verify on-page), `partial` (page exists, needs sections), `gap-section` (content to add),',
  '`gap-feature` (product feature needed), `review` (manual review).',
  '',
];

const clusterTotals = {};
for (const data of Object.values(out.locales)) {
  for (const name of Object.keys(data.clusters)) {
    if (name === 'other') continue;
    clusterTotals[name] = (clusterTotals[name] || 0) + 1;
  }
}

lines.push('## Coverage across locales', '');
lines.push('| Cluster | Locales with demand |');
lines.push('|---|---|');
Object.entries(clusterTotals)
  .sort((a, b) => b[1] - a[1])
  .forEach(([n, c]) => lines.push(`| ${n} | ${c}/11 |`));
lines.push('');

for (const [code, data] of Object.entries(out.locales)) {
  lines.push(`## ${code} — ${data.totalUnique} unique queries`);
  lines.push('');
  lines.push('| Cluster | Queries | Target | Status | Action |');
  lines.push('|---|---|---|---|---|');
  for (const [name, c] of Object.entries(data.clusters)) {
    lines.push(`| ${name} | ${c.count} | \`${c.target}\` | ${c.status} | ${c.note} |`);
  }
  lines.push('');
  lines.push('<details><summary>top keywords</summary>');
  lines.push('');
  for (const [name, c] of Object.entries(data.clusters)) {
    lines.push(`**${name}**: ${c.keywords.join(' · ')}`);
    lines.push('');
  }
  lines.push('</details>');
  lines.push('');
}

fs.writeFileSync(path.resolve('docs', 'keyword-map.md'), lines.join('\n'));

const totals = Object.values(out.locales).reduce((n, l) => n + l.totalUnique, 0);
console.log('keyword map written:', totals, 'queries,', Object.keys(out.locales).length, 'locales');
console.log('cluster coverage:', JSON.stringify(clusterTotals));
