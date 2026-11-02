#!/usr/bin/env node
/**
 * Builds a weighted keyword cloud per locale from Google autocomplete data.
 * Input:  docs/keyword-research.json (npm run keywords)
 * Output: docs/keyword-cloud.json + docs/keyword-cloud.md
 *
 * Cloud = unigrams and bigrams with frequencies, split by intent cluster,
 * plus phrase-level keywords. Stopwords per language are removed.
 *
 * Usage: npm run keywords:cloud
 */
import fs from 'node:fs';
import path from 'node:path';

const researchPath = path.resolve('docs', 'keyword-research.json');
const research = JSON.parse(fs.readFileSync(researchPath, 'utf8'));

const STOPWORDS = {
  en: new Set(['a','an','the','to','of','for','in','on','with','and','or','is','are','how','what','best','my','your','you','it','that','this','be','can','do','does','from','at','by','as','vs','free','online','new','use','using','make','create','good','safe','secure']),
  ua: new Set(['як','що','для','на','з','та','і','в','у','до','по','це','чи','або','від','про','не','є','можна','краще','найкращий','онлайн','безкоштовний','створити','зробити','пароль']),
  ru: new Set(['как','что','для','на','с','и','в','у','до','по','это','или','от','про','не','есть','можно','лучше','лучший','онлайн','бесплатный','создать','сделать','пароль']),
  pl: new Set(['jak','co','dla','na','z','i','w','do','po','to','lub','od','o','nie','jest','mozna','lepiej','najlepszy','online','darmowy','stworzyc','haslo']),
  de: new Set(['wie','was','für','auf','mit','und','oder','ist','zu','von','im','in','das','der','die','ein','eine','man','kann','besser','beste','online','kostenlos','erstellen','passwort']),
  es: new Set(['como','que','para','con','y','o','es','de','en','el','la','los','las','un','una','se','puede','mejor','online','gratis','crear','contraseña']),
  fr: new Set(['comment','que','pour','avec','et','ou','est','de','du','des','le','la','les','un','une','on','peut','meilleur','en','ligne','gratuit','créer','mot','passe']),
  it: new Set(['come','che','per','con','e','o','è','di','da','in','il','la','lo','gli','le','un','una','si','può','migliore','online','gratis','creare','password']),
  pt: new Set(['como','que','para','com','e','ou','é','de','do','da','em','o','a','os','as','um','uma','se','pode','melhor','online','grátis','criar','senha']),
  ja: new Set(['の','を','に','は','が','と','で','や','から','まで','より','する','した','して','です','ます','パスワード']),
  zh: new Set(['的','了','和','与','或','是','在','我','你','他','这','那','什么','怎么','如何','密码']),
};

const INTENT = [
  { name: 'generator', re: /(generator|генератор|generador|générateur|generatore|gerador|生成器|パスワード ?生成|password gen)/i },
  { name: 'passphrase', re: /(passphrase|words?\b|словами|слов|фраз|wyraz|słownik|frase|frasi|簡単|覚え|短语|单词)/i },
  { name: 'length', re: /(characters?|символ|zeichen|znak|caracteres|caratteri|文字|字符)/i },
  { name: 'manager', re: /(manager|менеджер|gestor|gestionnaire|gestore|gerenciador|管理|keepass|bitwarden|1password|lastpass)/i },
  { name: 'howto', re: /^(how to|як |как |come |comment |como |cómo |jak |作り方|如何)/i },
];

const tokenize = (s) =>
  s
    .toLowerCase()
    .normalize('NFKC')
    .replace(/[’'`]/g, '')
    .split(/[^\p{L}\p{N}]+/u)
    .filter(Boolean);

const isStop = (lang, w) => (STOPWORDS[lang] || new Set()).has(w) || w.length < 2;

const out = { generatedAt: new Date().toISOString(), source: 'google-autocomplete', locales: {} };

for (const [locale, data] of Object.entries(research.locales)) {
  const phrases = [];
  const seen = new Set();
  for (const s of data.seeds) {
    for (const suggestion of s.suggestions || []) {
      const key = suggestion.toLowerCase().trim();
      if (!key || seen.has(key)) continue;
      seen.add(key);
      phrases.push(suggestion.trim());
    }
  }

  const unigrams = {};
  const bigrams = {};
  for (const phrase of phrases) {
    const tokens = tokenize(phrase);
    tokens.forEach((w) => {
      if (!isStop(locale, w)) unigrams[w] = (unigrams[w] || 0) + 1;
    });
    for (let i = 0; i < tokens.length - 1; i++) {
      const a = tokens[i];
      const b = tokens[i + 1];
      if (isStop(locale, a) || isStop(locale, b)) continue;
      const bg = `${a} ${b}`;
      bigrams[bg] = (bigrams[bg] || 0) + 1;
    }
  }

  const intents = {};
  for (const p of phrases) {
    const hit = INTENT.find((i) => i.re.test(p));
    const key = hit ? hit.name : 'general';
    (intents[key] = intents[key] || []).push(p);
  }

  const topTerms = Object.entries(unigrams).sort((a, b) => b[1] - a[1]).slice(0, 40);
  const topBigrams = Object.entries(bigrams).sort((a, b) => b[1] - a[1]).slice(0, 30);

  out.locales[locale] = {
    phrases: phrases.length,
    topTerms: topTerms.map(([term, count]) => ({ term, count })),
    topBigrams: topBigrams.map(([term, count]) => ({ term, count })),
    intentPhrases: Object.fromEntries(
      Object.entries(intents).map(([k, v]) => [k, v.slice(0, 25)])
    ),
    useInSeo: {
      title: (intents.generator || phrases).slice(0, 3),
      h1: (intents.generator || phrases).slice(0, 2),
      faq: (intents.length || intents.passphrase || phrases).slice(0, 5),
      internalLinks: (intents.manager || intents.howto || phrases).slice(0, 5),
    },
  };
}

fs.writeFileSync(path.resolve('docs', 'keyword-cloud.json'), JSON.stringify(out, null, 2) + '\n');

const md = ['# Keyword cloud per locale', '', `Generated: ${out.generatedAt}`, '', 'Weight = number of distinct autocomplete suggestions containing the term.', ''];
for (const [locale, data] of Object.entries(out.locales)) {
  md.push(`## ${locale} — ${data.phrases} phrases`, '');
  md.push('**Top terms (term × weight):**', '');
  md.push(data.topTerms.slice(0, 25).map((t) => `${t.term} (${t.count})`).join(' · '));
  md.push('', '**Top bigrams:**', '');
  md.push(data.topBigrams.slice(0, 15).map((t) => `${t.term} (${t.count})`).join(' · '));
  md.push('', '**By intent:**', '');
  for (const [intent, list] of Object.entries(data.intentPhrases)) {
    md.push(`- **${intent}**: ${list.slice(0, 8).join(' · ')}`);
  }
  md.push('', '**Where to use:**', '');
  md.push(`- title: ${data.useInSeo.title.join(' / ')}`);
  md.push(`- H1: ${data.useInSeo.h1.join(' / ')}`);
  md.push(`- FAQ: ${data.useInSeo.faq.join(' / ')}`);
  md.push('');
}
fs.writeFileSync(path.resolve('docs', 'keyword-cloud.md'), md.join('\n'));

const total = Object.values(out.locales).reduce((n, l) => n + l.phrases, 0);
console.log('keyword cloud written:', total, 'phrases across', Object.keys(out.locales).length, 'locales');
for (const [locale, data] of Object.entries(out.locales)) {
  console.log(locale, '| top:', data.topTerms.slice(0, 6).map((t) => `${t.term}(${t.count})`).join(', '));
}
