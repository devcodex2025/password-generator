#!/usr/bin/env node
/**
 * Keyword research via Google autocomplete (free, no API key).
 * Collects real user query suggestions for each locale/seed and writes
 * docs/keyword-research.json + a markdown summary for manual review.
 *
 * Usage: npm run keywords
 */
import fs from 'node:fs';
import path from 'node:path';

const LOCALES = {
  en: { hl: 'en', gl: 'us', seeds: ['password generator', 'strong password generator', 'random password', 'password manager', 'passphrase generator', 'how to create a strong password'] },
  ua: { hl: 'uk', gl: 'ua', seeds: ['генератор паролів', 'надійний пароль', 'менеджер паролів', 'як створити пароль', 'парольна фраза'] },
  ru: { hl: 'ru', gl: 'ru', seeds: ['генератор паролей', 'надежный пароль', 'менеджер паролей', 'как создать пароль', 'парольная фраза'] },
  pl: { hl: 'pl', gl: 'pl', seeds: ['generator haseł', 'silne hasło', 'menedżer haseł', 'jak stworzyć hasło'] },
  de: { hl: 'de', gl: 'de', seeds: ['passwort generator', 'sicheres passwort', 'passwort manager', 'wie erstelle ich ein sicheres passwort'] },
  es: { hl: 'es', gl: 'es', seeds: ['generador de contraseñas', 'contraseña segura', 'gestor de contraseñas', 'cómo crear una contraseña segura'] },
  fr: { hl: 'fr', gl: 'fr', seeds: ['générateur de mot de passe', 'mot de passe sécurisé', 'gestionnaire de mots de passe', 'comment créer un mot de passe sécurisé'] },
  it: { hl: 'it', gl: 'it', seeds: ['generatore di password', 'password sicura', 'gestore di password', 'come creare una password sicura'] },
  pt: { hl: 'pt', gl: 'pt', seeds: ['gerador de senhas', 'senha segura', 'gerenciador de senhas', 'como criar uma senha segura'] },
  ja: { hl: 'ja', gl: 'jp', seeds: ['パスワード 生成', '強力なパスワード', 'パスワード 管理', '安全なパスワード 作り方'] },
  zh: { hl: 'zh-CN', gl: 'cn', seeds: ['密码生成器', '强密码', '密码管理器', '如何创建强密码'] },
};

async function suggest(hl, gl, q) {
  const url =
    'https://suggestqueries.google.com/complete/search?client=firefox' +
    `&hl=${encodeURIComponent(hl)}&gl=${encodeURIComponent(gl)}&q=${encodeURIComponent(q)}`;
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  return Array.isArray(data[1]) ? data[1].map(String) : [];
}

const EXTRA_SEEDS = {
  en: ['password strength', 'how long should a password be', 'password manager app', 'breach password check', 'random pin generator', 'generate secure password'],
  ua: ['перевірити пароль', 'як запам’ятати пароль', 'згенерувати пароль', 'пароль з великими літерами', 'менеджер паролів онлайн'],
  ru: ['проверить пароль', 'как запомнить пароль', 'сгенерировать пароль', 'пароль из букв и цифр', 'менеджер паролей онлайн'],
  pl: ['sprawdzić hasło', 'jak zapamiętać hasło', 'generator pin', 'bezpieczne hasło przykład'],
  de: ['passwort prüfen', 'passwort merken', 'pin generator', 'sicheres passwort beispiel'],
  es: ['comprobar contraseña', 'recordar contraseña', 'generador de pin', 'ejemplo de contraseña segura'],
  fr: ['vérifier mot de passe', 'mémoriser mot de passe', 'générateur de code pin', 'exemple de mot de passe fort'],
  it: ['verificare password', 'ricordare password', 'generatore pin', 'esempio password sicura'],
  pt: ['verificar senha', 'lembrar senha', 'gerador de pin', 'exemplo de senha forte'],
  ja: ['パスワード 忘れた', '安全なパスワード 例', 'パスワード 自動生成'],
  zh: ['忘记密码', '安全密码 例子', '批量生成密码'],
};

async function main() {
  const out = { generatedAt: new Date().toISOString(), source: 'google-autocomplete', locales: {} };
  for (const [code, cfg] of Object.entries(LOCALES)) {
    console.log('locale', code);
    out.locales[code] = { hl: cfg.hl, gl: cfg.gl, seeds: [] };
    for (const seed of [...cfg.seeds, ...(EXTRA_SEEDS[code] || [])]) {
      try {
        const suggestions = await suggest(cfg.hl, cfg.gl, seed);
        out.locales[code].seeds.push({ seed, suggestions });
      } catch (e) {
        out.locales[code].seeds.push({ seed, error: String(e.message).slice(0, 120) });
      }
      await new Promise((r) => setTimeout(r, 250));
    }
  }

  const jsonPath = path.resolve('docs', 'keyword-research.json');
  fs.writeFileSync(jsonPath, JSON.stringify(out, null, 2) + '\n');

  const lines = ['# Keyword research (Google autocomplete)', '', `Generated: ${out.generatedAt}`, ''];
  for (const [code, data] of Object.entries(out.locales)) {
    const uniq = [];
    const seen = new Set();
    for (const s of data.seeds) {
      for (const suggestion of s.suggestions || []) {
        const key = suggestion.toLowerCase().trim();
        if (!seen.has(key)) {
          seen.add(key);
          uniq.push(suggestion.trim());
        }
      }
    }
    lines.push(`## ${code} (${uniq.length} suggestions)`);
    lines.push('');
    uniq.slice(0, 40).forEach((u) => lines.push(`- ${u}`));
    const errors = data.seeds.filter((s) => s.error);
    if (errors.length) lines.push('', 'Errors: ' + errors.map((e) => `${e.seed}: ${e.error}`).join('; '));
    lines.push('');
  }
  const mdPath = path.resolve('docs', 'keyword-research.md');
  fs.writeFileSync(mdPath, lines.join('\n'));

  const total = Object.values(out.locales).reduce(
    (n, l) => n + new Set(l.seeds.flatMap((s) => s.suggestions || [])).size,
    0
  );
  console.log(`done: ${total} unique suggestions -> docs/keyword-research.json + .md`);
}

main().catch((e) => {
  console.error('keyword research failed:', e.message);
  process.exitCode = 1;
});
