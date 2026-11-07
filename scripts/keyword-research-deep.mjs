#!/usr/bin/env node
/**
 * Deep keyword research using free autocomplete endpoints only (no API keys):
 *   - Google Suggest  (client=chrome, gives 15 results + relevance score)
 *   - Bing Suggest    (osjson.aspx)
 *   - DuckDuckGo      (ac/?type=list)
 *
 * Algorithm per locale:
 *   1. Query every core seed, then sweep `seed + <suffix>` for the locale
 *      alphabet (a-z, 0-9 for Latin; common characters/words for ja/zh).
 *   2. Pick the strongest newly discovered heads, expand them the same way.
 *   3. Repeat until the locale reaches its target or heads run out.
 *
 * Outputs:
 *   docs/keyword-research.json                  (compatible with keyword-map/cloud)
 *   docs/keyword-research.md                   (human summary)
 *   docs/keyword-map/keywords.json             (full records + metadata)
 *   docs/keyword-map/keywords.csv              (all locales, spreadsheet-ready)
 *   docs/keyword-map/locales/<code>.csv        (per-locale slices)
 *   docs/keyword-map/README.md                 (methodology + totals + top terms)
 *
 * Usage:
 *   npm run keywords:deep
 *   node scripts/keyword-research-deep.mjs --locales=en,ua --min=1200
 *   node scripts/keyword-research-deep.mjs --rounds=2 --refresh
 *
 * NOTE: this collects real autocomplete queries, not search volumes. The
 * `demandScore` is a transparent heuristic built from suggestion frequency,
 * engine coverage, rank and Google relevance. See README output.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = path.join(ROOT, 'docs', 'keyword-map');
const CACHE_DIR = path.join(os.tmpdir(), 'password-generator-keyword-cache');
const GENERATED_AT = new Date().toISOString();

const LATIN_SUFFIXES = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('');

const CJK_SUFFIXES = {
  ja: [
    'の', 'を', 'と', 'は', 'が', 'で', 'に', 'から', 'まで', '無料', '作成', '生成', '変更',
    '確認', '例', '作り方', '文字', '記号', '安全', '最強', 'ランダム', '管理', 'アプリ',
    'おすすめ', 'スマホ', 'iphone', 'android', 'wifi', 'excel', 'pdf', '忘れ', '英語', '意味',
    '一覧', '比較', 'ツール', '強度', 'policy', '12', '16', '20',
  ],
  zh: [
    '的', '了', '和', '怎么', '如何', '忘记', '生成', '创建', '修改', '查看', '例子', '大全',
    '免费', '在线', '工具', '软件', '管理', '安全', '强度', '12位', '16位', '8位', '字母',
    '数字', '符号', '特殊', 'wifi', '手机', '电脑', '苹果', '安卓', '英文', '中文', '密码',
    '短语', '策略', '检查', '要求', '规则', '破解',
  ],
};

const LOCALES = {
  en: {
    label: 'English', hl: 'en', gl: 'us', bing: 'en-US',
    seeds: [
      'password generator', 'strong password', 'random password', 'password manager',
      'passphrase', 'how to create a strong password', 'password strength',
      'generate secure password', 'password ideas', '12 character password',
      'good passwords', 'wifi password', 'password checker', 'best password manager',
      'password policy', 'memorable password', 'password examples',
    ],
    match: (n) => /password|passphrase|pass word|\bpwd\b|passkey/.test(n),
    suffixes: LATIN_SUFFIXES,
  },
  ua: {
    label: 'Ukrainian', hl: 'uk', gl: 'ua', bing: 'uk-UA',
    seeds: [
      'генератор паролів', 'надійний пароль', 'пароль онлайн', 'згенерувати пароль',
      'придумати пароль', 'менеджер паролів', 'парольна фраза',
      'як створити надійний пароль', 'перевірити пароль', 'пароль з 12 символів',
      'гарний пароль', 'пароль wifi', 'запамʼятати пароль', 'приклади паролів',
      'політика паролів', 'випадковий пароль', 'безпечний пароль',
    ],
    match: (n) => /парол|парольн/.test(n),
    suffixes: LATIN_SUFFIXES,
  },
  ru: {
    label: 'Russian', hl: 'ru', gl: 'ru', bing: 'ru-RU',
    seeds: [
      'генератор паролей', 'надежный пароль', 'пароль онлайн', 'сгенерировать пароль',
      'придумать пароль', 'менеджер паролей', 'парольная фраза',
      'как создать надежный пароль', 'проверить пароль', 'пароль из 12 символов',
      'хороший пароль', 'пароль wifi', 'запомнить пароль', 'примеры паролей',
      'политика паролей', 'случайный пароль', 'безопасный пароль',
    ],
    match: (n) => /парол|парольн/.test(n),
    suffixes: LATIN_SUFFIXES,
  },
  pl: {
    label: 'Polish', hl: 'pl', gl: 'pl', bing: 'pl-PL',
    seeds: [
      'generator haseł', 'silne hasło', 'losowe hasło', 'menedżer haseł',
      'fraza hasłowa', 'jak stworzyć silne hasło', 'siła hasła', 'wygeneruj hasło',
      'przykłady haseł', 'hasło 12 znaków', 'dobre hasła', 'hasło wifi',
      'sprawdź hasło', 'najlepszy menedżer haseł', 'zasady haseł',
      'bezpieczne hasło', 'hasło do wifi',
    ],
    match: (n) => /has[łl]/.test(n),
    suffixes: LATIN_SUFFIXES,
  },
  de: {
    label: 'German', hl: 'de', gl: 'de', bing: 'de-DE',
    seeds: [
      'passwort generator', 'sicheres passwort', 'zufälliges passwort',
      'passwort manager', 'passphrase', 'wie erstelle ich ein sicheres passwort',
      'passwort stärke', 'passwort erstellen', 'passwort beispiele',
      'passwort 12 zeichen', 'gute passwörter', 'wlan passwort', 'passwort prüfen',
      'bester passwort manager', 'passwort richtlinien', 'starkes passwort',
      'passwort vergessen',
    ],
    match: (n) => /passwort|kennwort|passphrase/.test(n),
    suffixes: LATIN_SUFFIXES,
  },
  es: {
    label: 'Spanish', hl: 'es', gl: 'es', bing: 'es-ES',
    seeds: [
      'generador de contraseñas', 'contraseña segura', 'contraseña aleatoria',
      'gestor de contraseñas', 'frase de contraseña',
      'cómo crear una contraseña segura', 'seguridad de contraseña',
      'crear contraseña', 'ejemplos de contraseñas', 'contraseña de 12 caracteres',
      'buenas contraseñas', 'contraseña wifi', 'verificar contraseña',
      'mejor gestor de contraseñas', 'política de contraseñas',
      'contraseña fuerte', 'generar contraseña',
    ],
    match: (n) =>
      /contrase[ñn]/.test(n) ||
      /clave (segura|wifi|de|maestra|generador|aleatoria|seguridad)/.test(n),    suffixes: LATIN_SUFFIXES,
  },
  fr: {
    label: 'French', hl: 'fr', gl: 'fr', bing: 'fr-FR',
    seeds: [
      'générateur de mot de passe', 'mot de passe sécurisé', 'mot de passe aléatoire',
      'gestionnaire de mots de passe', 'phrase de passe',
      'comment créer un mot de passe sécurisé', 'force du mot de passe',
      'créer un mot de passe', 'exemples de mots de passe',
      'mot de passe 12 caractères', 'bons mots de passe', 'mot de passe wifi',
      'vérifier mot de passe', 'meilleur gestionnaire de mots de passe',
      'politique de mots de passe', 'mot de passe fort', 'générer un mot de passe',
    ],
    match: (n) => /mot de passe|motdepasse|\bmdp\b/.test(n),
    suffixes: LATIN_SUFFIXES,
  },
  it: {
    label: 'Italian', hl: 'it', gl: 'it', bing: 'it-IT',
    seeds: [
      'generatore di password', 'password sicura', 'password casuale',
      'gestore di password', 'passphrase', 'come creare una password sicura',
      'forza della password', 'creare password', 'esempi di password',
      'password di 12 caratteri', 'buone password', 'password wifi',
      'verificare password', 'miglior gestore di password',
      'politica delle password', 'password forte', 'genera password',
    ],
    match: (n) => /password|parola d.ordine|passphrase|frase d.accesso/.test(n),
    suffixes: LATIN_SUFFIXES,
  },
  pt: {
    label: 'Portuguese (BR)', hl: 'pt', gl: 'br', bing: 'pt-BR',
    seeds: [
      'gerador de senhas', 'senha segura', 'senha aleatória', 'gerenciador de senhas',
      'frase secreta', 'como criar uma senha segura', 'força da senha',
      'criar senha', 'exemplos de senhas', 'senha de 12 caracteres',
      'boas senhas', 'senha wifi', 'verificar senha',
      'melhor gerenciador de senhas', 'política de senhas', 'senha forte',
      'gerar senha',
    ],
    match: (n) => /senha|palavra.?passe|passphrase/.test(n),
    suffixes: LATIN_SUFFIXES,
  },
  ja: {
    label: 'Japanese', hl: 'ja', gl: 'jp', bing: 'ja-JP',
    seeds: [
      'パスワード 生成', '安全なパスワード', 'ランダム パスワード', 'パスワード 管理',
      'パスフレーズ', 'パスワード 作り方', 'パスワード 強度', 'パスワード 作成',
      'パスワード 例', '12文字 パスワード', '良いパスワード', 'wifi パスワード',
      'パスワード 確認', 'おすすめ パスワード管理', 'パスワード ポリシー',
      'パスワード 忘れた', 'パスワード 自動生成',
    ],
    match: (n) => /パスワード|パスフレーズ|暗証番号|パスコード/.test(n),
    suffixes: CJK_SUFFIXES.ja,
  },
  zh: {
    label: 'Chinese (Simplified)', hl: 'zh-CN', gl: 'cn', bing: 'zh-CN',
    seeds: [
      '密码生成器', '强密码', '随机密码', '密码管理', '密码短语', '如何创建强密码',
      '密码强度', '生成密码', '密码 例子', '12位密码', '好密码', 'wifi密码',
      '密码 检查', '最好的密码管理器', '密码策略', '忘记密码', '密码 大全',
    ],
    match: (n) => /密码|密碼|口令|通行码/.test(n),
    suffixes: CJK_SUFFIXES.zh,
  },
  vi: {
    label: 'Vietnamese', hl: 'vi', gl: 'vn', bing: 'vi-VN',
    seeds: [
      'tạo mật khẩu', 'mật khẩu mạnh', 'mật khẩu ngẫu nhiên',
      'trình quản lý mật khẩu', 'cụm mật khẩu', 'cách tạo mật khẩu mạnh',
      'độ mạnh mật khẩu', 'tạo mật khẩu mới', 'ví dụ mật khẩu',
      'mật khẩu 12 ký tự', 'mật khẩu tốt', 'mật khẩu wifi', 'kiểm tra mật khẩu',
      'trình quản lý mật khẩu tốt nhất', 'chính sách mật khẩu',
      'mật khẩu an toàn', 'tạo mật khẩu ngẫu nhiên',
    ],
    match: (n) => /mật khẩu|mat khau|passphrase|cụm mật khẩu/.test(n),
    suffixes: LATIN_SUFFIXES,
  },
};

// Locales most likely to need the deepest coverage.
const TARGETS = { en: 2500, ua: 2000, ru: 1800, _default: 1200 };

const ALLOW_ADJACENT =
  /(2fa|mfa|otp|totp|authenticator|passkey|passwordless|have i been pwned|breach|leak|pwned|wifi|router|wi-fi)/i;
const BLOCK =
  /(\bgame\b|\bmovie\b|\bfilm\b|\bseries\b|\bsong\b|\blyrics\b|\bporn|\bxxx\b|\bnude|\bhack(ing|er|ed)?\b|\bcrack(ing|er|ed)?\b|\bbypass\b|\bsteal|\bhackear|\bcrackear|\bвзлом|\bзлом|破解|fort boyard|the last of us|\bgta\b|roblox|minecraft|fortnite|zelda|pokemon|call of duty|avasta)/i;

const BRAND =
  /(lastpass|bitwarden|1password|dashlane|nordpass|roboform|keepass|keeper|google|apple|chrome|safari|edge|firefox|samsung|microsoft|norton|mcafee)/i;

const CLUSTER_TARGETS = {
  generator: { path: (l) => `/${l}`, status: 'exists', note: 'Home generator + H1/meta' },
  strength: { path: (l) => `/${l}/guides/how-to-create-strong-passwords`, status: 'exists', note: 'Strong-password guide' },
  howto: { path: (l) => `/${l}/guides/how-to-create-strong-passwords`, status: 'exists', note: 'How-to guide' },
  length: { path: (l) => `/${l}/guides/how-to-create-strong-passwords`, status: 'gap-section', note: 'Add length presets 8/12/16/20 + FAQ' },
  check: { path: (l) => `/${l}/guides/how-to-create-strong-passwords`, status: 'partial', note: 'Strength-test wording; consider checker tool' },
  examples: { path: (l) => `/${l}/guides/how-to-create-strong-passwords`, status: 'partial', note: 'Add example block' },
  passphrase: { path: (l) => `/${l}/guides/passphrase-vs-password-entropy`, status: 'gap-feature', note: 'Add words-mode generator' },
  manager: { path: (l) => `/${l}/best-password-managers-2026`, status: 'partial', note: 'Platform sections (Android/iPhone/Chrome)' },
  policy: { path: (l) => `/${l}/guides/team-password-policy-template`, status: 'exists', note: 'Policy template guide' },
  breach: { path: (l) => `/${l}/guides/what-to-do-after-password-breach`, status: 'exists', note: 'Breach response guide' },
  twofa: { path: (l) => `/${l}/guides/two-factor-authentication-basics`, status: 'exists', note: '2FA basics guide' },
  pin: { path: (l) => `/${l}`, status: 'gap-feature', note: 'Add PIN mode to generator' },
  wifi: { path: (l) => `/${l}/guides/wifi-password-guide`, status: 'gap-new', note: 'New Wi-Fi password guide' },
  account: { path: (l) => `/${l}`, status: 'review', note: 'Account-reset intent; low brand fit' },
  platform: { path: (l) => `/${l}/best-password-managers-2026`, status: 'partial', note: 'Platform comparison sections' },
  ideas: { path: (l) => `/${l}/guides/how-to-create-strong-passwords`, status: 'partial', note: 'Add idea list section' },
  other: { path: (l) => `/${l}`, status: 'review', note: 'Manual review' },
};

const CLUSTER_RULES = [
  ['length', /(\d+\s*(characters?|chars?|symbols?|digits?|letters?|lettres|zeichen|znak|znaków|znakow|liter|caracteres|caratteri|caractères|ký tự)|characters?|символ|знак|zeichen|znak|caracteres|caratteri|caractères|lettres|文字|字符|\d位|\d桁|ký tự|\bchar\b|\b\d{3,}\b|пароль \d{1,2}$|mot de passe \d{1,2}$)/i],
  ['passphrase', /(passphrase|pass ?phrase|phrase de passe|password words?|memorable|easy to remember|diceware|словами|слов|фраз|wyraz|słow|fraza|fraz|frase|frasi|frases|satz|簡単|覚え|短语|单词|助记|パスフレーズ|cụm mật khẩu|cụm từ|dễ nhớ)/i],
  ['manager', /(manager|management|keeper|bitwarden|1password|lastpass|dashlane|nordpass|roboform|keepass|password app|менеджер|управління|gestor|gestionnaire|gestore|gerenciador|menedżer|verwaltung|管理|quản lý)/i],
  ['account', /(forgot|vergessen|забы|забув|oubli|olvid|dimentic|esquec|zapomnia|忘记|忘れ|quên|reset|віднов|восстанов|réinitial|restablecer|redefinir|reimpost|zresetuj|重置|リセット|khôi phục)/i],
  ['howto', /^(how to|how do|how can|what is|what are|why |як |как |come |comment |como |cómo |jak |如何|怎么|怎样|что |cos'è|o que|qual )|作り方/i],
  ['twofa', /(2fa|two.factor|two factor|\bmfa\b|\botp\b|totp|authenticator|passkey|passwordless|двофактор|двухфактор|authentification|autenticación|autenticação|二次|两步|xác thực)/i],
  ['breach', /(breach|leak|pwned|compromis|злив|утеч|витік|filtrad|fuite|violazione|vazamento|wyciek|geleakt|泄露|流出|rò rỉ)/i],
  ['check', /(check|\btest\b|verify|vérif|verifi|провер|перевір|prüf|sprawd|検|检查|檢查|確認|チェック|kiểm tra)/i],
  ['wifi', /(wifi|wi-fi|wlan|router|роутер|маршрутизатор|路由器|ルーター)/i],
  ['pin', /(\bpin\b|pincode|pin code|暗証番号|ピン|mã pin)/i],
  ['examples', /(example|ejemplo|ejemplos|beispiel|beispiele|exemple|exemples|esempio|esempi|exemplo|exemplos|przykład|przykłady|приклад|приклади|пример|примеры|例|ví dụ)/i],
  ['policy', /(policy|policies|rules|requirements|richtlinie|regeln|polityka|zasady|política|politica|politique|reglas|règles|regole|regras|политик|політик|правила|требования|规则|策略|ポリシー|chính sách|quy định|best practice|buone pratiche)/i],
  ['ideas', /(\bideas?\b|запам|ідеї|идеи|pomysły|ideen|idées|idee|ideias|アイデア|想法|ý tưởng)/i],
  ['strength', /(strong|secure|safe|strength|good password|best password|unique password|good \w+ passwords?|senhas boas|complex|protect|bezpieczn|sił|siła|force|fuerte|força|forca|boas senhas|\bfort\b|buena|buenas|bon mot de passe|un bon mot de passe|надежн|надійн|безпечн|гарн|хорош|добр|silne|siln|sicher|stark|segura|seguridad|forte|sécurisé|sicura|強力|強度|安全|强|好密码|mạnh|an toàn)/i],
  ['generator', /(generator|generate|genera|générateur|generateur|gerador|random|aléatoire|aleatoire|casuale|aleatoria|aleatória|losow|création|creation|zufällig|zufallig|випадков|create|make|згенер|генератор|сгенерир|придум|создать|створити|crear|generar|creér|créer|creer|générer|generer|creare|generare|criar|gerar|wygener|generuj|erstell|generier|生成|作成|作る|随机|隨機|tạo|ngẫu nhiên|xáo trộn|онлайн|online)/i],
  ['platform', /(android|iphone|\bios\b|chrome|хром|google|apple|samsung|windows|macbook|\bmac\b|\bexcel\b|\bword\b|\bpdf\b|outlook|\bemail\b|gmail|amazon|paypal|spotify|netflix|handy|telefon|телефон|смартфон|phone|smartphone|7zip|\bzip\b|\brar\b|3ds|livebox|скриньк|пошт|computer|laptop|tablet|аккаунт|акаунт|\bcuenta\b|compte|\bconta\b|konto|アカウント|账号|tài khoản)/i],
];

const args = parseArgs(process.argv.slice(2));
const CONCURRENCY = args.concurrency || 4;
const MAX_ROUNDS = args.rounds || 4;
const MIN_KEYWORDS = args.min || 0;
const REFRESH = Boolean(args.refresh);
const ENGINE_OFF = new Set((args['no-engine'] || '').split(',').filter(Boolean));

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function parseArgs(argv) {
  const out = {};
  for (const raw of argv) {
    if (!raw.startsWith('--')) continue;
    const [k, v] = raw.slice(2).split('=');
    out[k] = v === undefined ? true : v;
  }
  return out;
}

function normalize(term) {
  return String(term)
    .normalize('NFKC')
    .replace(/[’‘`´]/g, "'")
    .replace(/\s+/g, ' ')
    .replace(/^[\s"'\-–—•]+|[\s"'\-–—•]+$/g, '')
    .toLowerCase();
}

function cleanTerm(term) {
  return String(term)
    .normalize('NFKC')
    .replace(/[’‘`´]/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

async function fetchJson(url, { retries = 2, timeout = 12000 } = {}) {
  let lastError;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0',
          Accept: 'application/json,text/javascript,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
        },
        signal: AbortSignal.timeout(timeout),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = (await res.text()).replace(/^\uFEFF/, '').trim();
      return JSON.parse(text);
    } catch (err) {
      lastError = err;
      // A 403 means the endpoint is rate-limiting/blocking us. Retrying deepens it.
      if (/HTTP 403/.test(err.message)) break;
      if (attempt < retries) {
        const base = /HTTP 429/.test(err.message) ? 3000 : 600;
        await sleep(base * 2 ** attempt + Math.random() * 400);
      }
    }
  }
  throw lastError;
}

async function mapPool(items, limit, worker) {
  let cursor = 0;
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor++;
      await worker(items[index], index);
    }
  });
  await Promise.all(runners);
}

function loadCache(locale) {
  if (REFRESH) return new Map();
  const file = path.join(CACHE_DIR, `${locale}.json`);
  try {
    const raw = JSON.parse(fs.readFileSync(file, 'utf8'));
    return new Map(Object.entries(raw));
  } catch {
    return new Map();
  }
}

function saveCache(locale, cache) {
  try {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
    fs.writeFileSync(path.join(CACHE_DIR, `${locale}.json`), JSON.stringify(Object.fromEntries(cache)));
  } catch (err) {
    console.warn(`[${locale}] cache write failed: ${err.message}`);
  }
}

async function googleSuggest(cfg, query, cache) {
  const key = `google|${cfg.hl}|${cfg.gl}|${query}`;
  if (cache.has(key)) return cache.get(key);
  const url =
    'https://suggestqueries.google.com/complete/search?client=firefox' +
    `&hl=${encodeURIComponent(cfg.hl)}&gl=${encodeURIComponent(cfg.gl)}` +
    `&q=${encodeURIComponent(query)}`;
  const data = await fetchJson(url);
  const list = Array.isArray(data?.[1]) ? data[1] : [];
  // client=chrome adds relevance scores; client=firefox is far less rate-limited.
  const relevance = data?.[4]?.['google:suggestrelevance'] || [];
  const out = list.map((term, i) => ({
    term: String(term),
    rank: i + 1,
    relevance: Number(relevance[i] || 0),
  }));
  cache.set(key, out);
  return out;
}

async function bingSuggest(cfg, query, cache) {
  const key = `bing|${cfg.bing}|${query}`;
  if (cache.has(key)) return cache.get(key);
  const url = `https://api.bing.com/osjson.aspx?query=${encodeURIComponent(query)}&mkt=${encodeURIComponent(cfg.bing)}`;
  const data = await fetchJson(url);
  const list = Array.isArray(data?.[1]) ? data[1] : [];
  const out = list.map((term, i) => ({ term: String(term), rank: i + 1, relevance: 0 }));
  cache.set(key, out);
  return out;
}

async function ddgSuggest(cfg, query, cache) {
  const key = `ddg|${query}`;
  if (cache.has(key)) return cache.get(key);
  const url = `https://duckduckgo.com/ac/?q=${encodeURIComponent(query)}&type=list`;
  const data = await fetchJson(url);
  const out = (Array.isArray(data) ? data : []).map((item, i) => ({
    term: String(typeof item === 'string' ? item : item?.phrase || ''),
    rank: i + 1,
    relevance: 0,
  }));
  cache.set(key, out);
  return out;
}

function getSuggest(engine, cfg, query, cache) {
  if (engine === 'google') return googleSuggest(cfg, query, cache);
  if (engine === 'bing') return bingSuggest(cfg, query, cache);
  return ddgSuggest(cfg, query, cache);
}

function classifyCluster(norm) {
  for (const [name, re] of CLUSTER_RULES) if (re.test(norm)) return name;
  return 'other';
}

function classifyIntent(norm, cluster) {
  if (BRAND.test(norm)) return 'navigational';
  if (cluster === 'manager' || /\b(best|top|review|vs|alternative|comparison)\b|найкращ|лучш|bester|meilleur|migliore|melhor|najlepsz|tốt nhất/i.test(norm)) {
    return 'commercial';
  }
  if (cluster === 'howto') return 'informational';
  if (cluster === 'generator' || cluster === 'pin') return 'tool';
  if (/\b(generator|generate|random|online|free)\b|генератор|згенер|сгенерир|придум|crear|generar|créer|générer|creare|generare|criar|gerar|wygener|generuj|erstell|generier|生成|作成|作る|tạo/i.test(norm)) {
    return 'tool';
  }
  return 'informational';
}

function seedPrior(norm, seedNorms) {
  if (seedNorms.has(norm)) return 1;
  for (const seed of seedNorms) {
    if (norm.startsWith(`${seed} `) || norm.endsWith(` ${seed}`) || norm.includes(` ${seed} `)) return 0.7;
  }
  const words = norm.split(' ').length;
  if (words <= 2) return 0.5;
  if (words <= 4) return 0.35;
  return 0.2;
}

function demandScore(rec, seedNorms) {
  // Deliberately excludes Google's relevance field: only client=chrome returns it,
  // so using it would make locales collected via client=firefox score lower.
  const coverage = Math.min(1, Math.log2(1 + rec.queryHits) / 5);
  const rank = rec.bestRank ? Math.max(0, (11 - rec.bestRank) / 10) : 0.2;
  const engines = Object.keys(rec.engines).length / 3;
  const prior = seedPrior(rec.norm, seedNorms);
  const raw = 0.4 * prior + 0.3 * coverage + 0.2 * rank + 0.1 * engines;
  return Math.round(raw * 100);
}

function priorityOf(rec) {
  if (rec.intent === 'navigational' && rec.cluster === 'account') return 'P3';
  if (rec.demandScore >= 60) return 'P1';
  if (rec.demandScore >= 45) return 'P2';
  return 'P3';
}

function csvEscape(value) {
  const s = String(value ?? '');
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function toCsv(rows, columns) {
  const head = columns.join(',');
  const lines = rows.map((row) => columns.map((c) => csvEscape(row[c])).join(','));
  return [head, ...lines].join('\n') + '\n';
}

async function researchLocale(code, cfg) {
  const target = Number(args.min || TARGETS[code] || TARGETS._default);
  const cache = loadCache(code);
  const requests = { google: 0, googleCached: 0, googleErrors: 0, bing: 0, ddg: 0 };
  const queried = new Set();
  const expanded = new Set();
  const keywords = new Map();
  let consecutive403 = 0;
  let googleBlocked = false;
  let blockedWarnings = 0;

  const addResults = (engine, results, originSeed) => {
    for (const { term, rank, relevance } of results) {
      const norm = normalize(term);
      if (!norm || norm.length < 2 || norm.length > 90) continue;
      let rec = keywords.get(norm);
      if (!rec) {
        rec = {
          term: cleanTerm(term),
          norm,
          engines: {},
          queryHits: 0,
          bestRank: Infinity,
          bestRelevance: 0,
          origins: new Set(),
        };
        keywords.set(norm, rec);
      }
      const eng = (rec.engines[engine] = rec.engines[engine] || { hits: 0, bestRank: Infinity, bestRelevance: 0 });
      eng.hits += 1;
      eng.bestRank = Math.min(eng.bestRank, rank);
      eng.bestRelevance = Math.max(eng.bestRelevance, relevance || 0);
      rec.queryHits += 1;
      rec.bestRank = Math.min(rec.bestRank, rank);
      rec.bestRelevance = Math.max(rec.bestRelevance, relevance || 0);
      rec.origins.add(originSeed);
    }
  };

  const runQueries = async (queries, originSeed) => {
    const fresh = queries.filter((q) => q && !queried.has(`${originSeed}|${q}`));
    fresh.forEach((q) => queried.add(`${originSeed}|${q}`));
    await mapPool(fresh, CONCURRENCY, async (query) => {
      if (googleBlocked) return;
      const key = `google|${cfg.hl}|${cfg.gl}|${query}`;
      const wasCached = cache.has(key);
      try {
        const results = await getSuggest('google', cfg, query, cache);
        if (wasCached) requests.googleCached += 1;
        else requests.google += 1;
        consecutive403 = 0;
        addResults('google', results, originSeed);
      } catch (err) {
        requests.googleErrors += 1;
        if (/HTTP 403/.test(err.message)) {
          consecutive403 += 1;
          if (consecutive403 >= 25 && !googleBlocked) {
            googleBlocked = true;
            console.warn(`[${code}] Google is returning 403 — stopping Google calls for this locale`);
          }
          if (blockedWarnings++ < 3) {
            console.warn(`[${code}] google "${query.slice(0, 40)}" failed: ${err.message}`);
          }
        } else {
          consecutive403 = 0;
          console.warn(`[${code}] google "${query.slice(0, 40)}" failed: ${err.message}`);
        }
      }
      if (!wasCached) await sleep(70 + Math.random() * 90);
    });
  };

  const sweep = async (heads, origins) => {
    for (let i = 0; i < heads.length; i++) {
      const head = heads[i];
      const origin = origins[i];
      const batch = [head, ...cfg.suffixes.map((s) => `${head} ${s}`)];
      await runQueries(batch, origin);
    }
  };

  console.log(`[${code}] round 1: ${cfg.seeds.length} seeds x ${cfg.suffixes.length + 1}`);

  // Round 1 — core seeds, plus Bing/DDG for the seeds themselves.
  await sweep(cfg.seeds, cfg.seeds);
  saveCache(code, cache);
  cfg.seeds.forEach((s) => expanded.add(normalize(s)));

  const engineSeeds = cfg.seeds.slice(0, 14);
  for (const engine of ['bing', 'ddg']) {
    if (ENGINE_OFF.has(engine)) continue;
    for (const seed of engineSeeds) {
      try {
        const results = await getSuggest(engine, cfg, seed, cache);
        requests[engine] += 1;
        addResults(engine, results, seed);
      } catch (err) {
        console.warn(`[${code}] ${engine} "${seed.slice(0, 30)}" failed: ${err.message}`);
      }
      await sleep(120);
    }
  }
  saveCache(code, cache);

  console.log(`[${code}] after round 1: ${keywords.size} raw terms`);

  for (let round = 2; round <= MAX_ROUNDS; round++) {
    const kept = [...keywords.values()].filter((r) => cfg.match(r.norm) && !BLOCK.test(r.norm));
    if (kept.length >= Math.max(target, MIN_KEYWORDS)) break;

    const candidates = kept
      .filter((r) => !expanded.has(r.norm) && r.term.length <= 42 && r.norm.split(' ').length <= 6)
      .sort((a, b) => {
        const sa = Math.log2(1 + a.queryHits) * 3 + a.bestRelevance / 300 + (a.term.length <= 20 ? 1 : 0);
        const sb = Math.log2(1 + b.queryHits) * 3 + b.bestRelevance / 300 + (b.term.length <= 20 ? 1 : 0);
        return sb - sa;
      })
      .slice(0, Number(args.heads || 24));

    if (!candidates.length) break;

    console.log(`[${code}] round ${round}: expanding ${candidates.length} heads`);
    await sweep(
      candidates.map((r) => r.term),
      candidates.map((r) => [...r.origins][0] || cfg.seeds[0])
    );
    candidates.forEach((r) => expanded.add(r.norm));
    saveCache(code, cache);
    console.log(`[${code}] after round ${round}: ${keywords.size} raw terms`);
  }

  // Keep and enrich.
  const seedNorms = new Set(cfg.seeds.map(normalize));
  const rows = [];
  for (const rec of keywords.values()) {
    if (!cfg.match(rec.norm) && !ALLOW_ADJACENT.test(rec.norm)) continue;
    if (BLOCK.test(rec.norm)) continue;
    if (rec.norm.split(' ').length > 12) continue;
    const cluster = classifyCluster(rec.norm);
    const intent = classifyIntent(rec.norm, cluster);
    const demand = demandScore(rec, seedNorms);
    const target = CLUSTER_TARGETS[cluster] || CLUSTER_TARGETS.other;
    const row = {
      locale: code,
      language: cfg.label,
      keyword: rec.term,
      cluster,
      intent,
      demandScore: demand,
      priority: '',
      bestRank: rec.bestRank === Infinity ? '' : rec.bestRank,
      googleRelevance: rec.bestRelevance || '',
      engines: Object.keys(rec.engines).join('+'),
      engineCount: Object.keys(rec.engines).length,
      queryHits: rec.queryHits,
      targetPage: target.path(code),
      status: target.status,
      note: target.note,
      originSeed: [...rec.origins][0] || '',
      isSeed: seedNorms.has(rec.norm) ? 1 : 0,
    };
    row.priority = priorityOf(row);
    rows.push(row);
  }

  rows.sort(
    (a, b) =>
      b.demandScore - a.demandScore ||
      a.cluster.localeCompare(b.cluster) ||
      a.keyword.localeCompare(b.keyword)
  );

  const clusterCounts = {};
  const intentCounts = {};
  for (const row of rows) {
    clusterCounts[row.cluster] = (clusterCounts[row.cluster] || 0) + 1;
    intentCounts[row.intent] = (intentCounts[row.intent] || 0) + 1;
  }

  return {
    label: cfg.label,
    hl: cfg.hl,
    gl: cfg.gl,
    totalUnique: rows.length,
    requests,
    clusterCounts,
    intentCounts,
    rows,
    cache,
  };
}

function writeOutputs(results) {
  fs.mkdirSync(path.join(OUT_DIR, 'locales'), { recursive: true });

  const allRows = [];
  for (const [code, data] of Object.entries(results)) {
    for (const row of data.rows) allRows.push(row);
    fs.writeFileSync(
      path.join(OUT_DIR, 'locales', `${code}.csv`),
      '\uFEFF' +
        toCsv(data.rows, [
          'keyword', 'cluster', 'intent', 'priority', 'demandScore', 'bestRank',
          'engines', 'engineCount', 'queryHits', 'targetPage', 'status', 'note', 'isSeed',
        ])
    );
  }

  const columns = [
    'locale', 'language', 'keyword', 'cluster', 'intent', 'priority', 'demandScore', 'bestRank',
    'engines', 'engineCount', 'queryHits', 'targetPage', 'status', 'originSeed', 'isSeed',
  ];
  allRows.sort(
    (a, b) =>
      a.locale.localeCompare(b.locale) ||
      b.demandScore - a.demandScore ||
      a.keyword.localeCompare(b.keyword)
  );
  fs.writeFileSync(path.join(OUT_DIR, 'keywords.csv'), '\uFEFF' + toCsv(allRows, columns));

  const totals = {
    locales: Object.keys(results).length,
    keywords: allRows.length,
    byLocale: {},
    byCluster: {},
    byIntent: {},
    byPriority: {},
  };
  for (const row of allRows) {
    totals.byLocale[row.locale] = (totals.byLocale[row.locale] || 0) + 1;
    totals.byCluster[row.cluster] = (totals.byCluster[row.cluster] || 0) + 1;
    totals.byIntent[row.intent] = (totals.byIntent[row.intent] || 0) + 1;
    totals.byPriority[row.priority] = (totals.byPriority[row.priority] || 0) + 1;
  }

  const json = {
    generatedAt: GENERATED_AT,
    sources: ['google-suggest', 'bing-suggest', 'duckduckgo-autocomplete'],
    methodology: {
      expansion: 'seed + alphabet/character sweep, two to four rounds of head expansion',
      demandScore:
        'Heuristic 0-100: 40% seed/head prior, 30% suggestion frequency (log), 20% best rank, 10% engine coverage. Not a search volume.',
      filtering:
        'Kept queries containing the locale password root or a security-adjacent term; excluded game/movie/hack/crack/NSFW intents.',
      targets: 'Mapped to existing Next.js routes; gap-new/gap-feature flagged for new content or product work.',
    },
    totals,
    locales: {},
  };

  for (const [code, data] of Object.entries(results)) {
    json.locales[code] = {
      label: data.label,
      hl: data.hl,
      gl: data.gl,
      totalUnique: data.totalUnique,
      requests: data.requests,
      clusterCounts: data.clusterCounts,
      intentCounts: data.intentCounts,
      topKeywords: data.rows.slice(0, 40).map((r) => ({
        keyword: r.keyword,
        cluster: r.cluster,
        intent: r.intent,
        demandScore: r.demandScore,
        priority: r.priority,
        targetPage: r.targetPage,
      })),
      keywords: data.rows,
    };
  }

  fs.writeFileSync(path.join(OUT_DIR, 'keywords.json'), JSON.stringify(json, null, 2) + '\n');

  // Compatibility file consumed by scripts/keyword-map.mjs and keyword-cloud.mjs.
  const legacy = {
    generatedAt: GENERATED_AT,
    source: 'google-autocomplete+bing+duckduckgo',
    locales: {},
  };
  for (const [code, data] of Object.entries(results)) {
    const bySeed = new Map();
    for (const row of data.rows) {
      const seed = row.originSeed || 'deep expansion';
      if (!bySeed.has(seed)) bySeed.set(seed, []);
      bySeed.get(seed).push(row.keyword);
    }
    legacy.locales[code] = {
      hl: data.hl,
      gl: data.gl,
      label: data.label,
      totalUnique: data.totalUnique,
      seeds: [...bySeed.entries()].map(([seed, suggestions]) => ({ seed, suggestions })),
    };
  }
  fs.writeFileSync(path.join(ROOT, 'docs', 'keyword-research.json'), JSON.stringify(legacy, null, 2) + '\n');
  fs.writeFileSync(path.join(ROOT, 'docs', 'keyword-research.md'), renderResearchMd(results, totals));

  fs.writeFileSync(path.join(OUT_DIR, 'README.md'), renderReadme(results, totals, allRows));
  fs.writeFileSync(path.join(OUT_DIR, 'cluster-matrix.csv'), renderMatrix(results));

  const hreflang = { ua: 'uk', pt: 'pt-BR', zh: 'zh-CN' };
  const languageRows = Object.entries(results).map(([code, data]) => ({
    code,
    language: data.label,
    hreflang: hreflang[code] || code,
    keywords: data.totalUnique,
    file: `locales/${code}.csv`,
  }));
  fs.writeFileSync(
    path.join(OUT_DIR, 'languages.csv'),
    '\uFEFF' + toCsv(languageRows, ['code', 'language', 'hreflang', 'keywords', 'file'])
  );
}

function renderResearchMd(results, totals) {
  const lines = ['# Keyword research (deep autocomplete sweep)', '', `Generated: ${GENERATED_AT}`, ''];
  lines.push(`Total: **${totals.keywords}** unique keywords across **${totals.locales}** locales.`, '');
  lines.push('| Locale | Keywords | Google calls | Bing calls | DDG calls |');
  lines.push('|---|---|---|---|---|');
  for (const [code, data] of Object.entries(results)) {
    lines.push(`| ${code} | ${data.totalUnique} | ${data.requests.google + (data.requests.googleCached || 0)} | ${data.requests.bing} | ${data.requests.ddg} |`);
  }
  lines.push('');
  for (const [code, data] of Object.entries(results)) {
    lines.push(`## ${code} — ${data.totalUnique} keywords`, '');
    lines.push(data.rows.slice(0, 30).map((r) => `- ${r.keyword} (${r.demandScore})`).join('\n'));
    lines.push('');
  }
  return lines.join('\n');
}

function renderReadme(results, totals, allRows) {
  const codes = Object.keys(results);
  const minLocale = codes.reduce((m, c) => (results[c].totalUnique < results[m].totalUnique ? c : m), codes[0]);
  const maxLocale = codes.reduce((m, c) => (results[c].totalUnique > results[m].totalUnique ? c : m), codes[0]);
  const clusterNames = Object.keys(CLUSTER_TARGETS);
  const globalUnique = new Set(allRows.map((r) => r.keyword.toLowerCase())).size;

  const lines = [];
  lines.push('# Keyword map — password & security queries (all locales)');
  lines.push('');
  lines.push(`Generated: **${GENERATED_AT}**`);
  lines.push('');
  lines.push(
    `**${totals.keywords.toLocaleString('en-US')} keyword rows** (${globalUnique.toLocaleString('en-US')} distinct phrases, unique within each locale) across **${totals.locales} locales**, collected exclusively from free autocomplete endpoints (Google, Bing, DuckDuckGo). No paid SEO API, no search-volume estimates passed off as facts.`
  );
  lines.push('');
  lines.push(`**Languages (${codes.length}/${codes.length}):** ` + codes.map((c) => `\`${c}\` ${results[c].label}`).join(' · '));
  lines.push('');
  lines.push('## Coverage check');
  lines.push('');
  lines.push(`- Largest locale: **${maxLocale}** with **${results[maxLocale].totalUnique.toLocaleString('en-US')}** keywords.`);
  lines.push(`- Smallest locale: **${minLocale}** with **${results[minLocale].totalUnique.toLocaleString('en-US')}** keywords.`);
  lines.push(
    `- Goal check (at least 1,000 for one language): **${
      results[maxLocale].totalUnique >= 1000 ? 'PASS' : 'FAIL'
    }**, ${codes.filter((c) => results[c].totalUnique >= 1000).length}/${codes.length} locales at 1,000+.`
  );
  lines.push('');
  lines.push('| Locale | Language | Keywords | P1 | P2 | P3 | Top cluster | Requests (G/B/D) |');
  lines.push('|---|---|---:|---:|---:|---:|---|---|');
  for (const code of codes) {
    const data = results[code];
    const p = { P1: 0, P2: 0, P3: 0 };
    for (const r of data.rows) p[r.priority] += 1;
    const topCluster = Object.entries(data.clusterCounts).sort((a, b) => b[1] - a[1])[0];
    lines.push(
      `| \`${code}\` | ${data.label} | **${data.totalUnique.toLocaleString('en-US')}** | ${p.P1} | ${p.P2} | ${p.P3} | ${topCluster[0]} (${topCluster[1]}) | ${data.requests.google + (data.requests.googleCached || 0)}/${data.requests.bing}/${data.requests.ddg} |`
    );
  }
  lines.push('');
  lines.push('Every locale in the site is covered. Codes follow the app (`ua`, not `uk`); exported hreflang equivalents: `ua → uk`, `pt → pt-BR`, `zh → zh-CN`. Per-language slices are in `locales/<code>.csv`; `languages.csv` is the index.');
  lines.push('');
  lines.push('## Method');
  lines.push('');
  lines.push('1. **Seeds** — 17 commercial and informational heads per locale (generator, strength, manager, passphrase, policy, Wi-Fi, examples…).');
  lines.push('2. **Sweep** — every seed queried alone and with each alphabet/character suffix (`password a…z0…9`, `密码 的/怎么/…`), returning 10–15 real Google suggestions per call.');
  lines.push('3. **Head expansion** — the strongest newly discovered heads are expanded again, up to four rounds or until the locale target is met.');
  lines.push('4. **Cross-engine** — Bing Suggest and DuckDuckGo Autocomplete run on the core seeds for diversity.');
  lines.push('5. **Filter** — keep queries containing the locale password root (or a security-adjacent term), drop game/movie/hack/crack/NSFW intents.');
  lines.push('6. **Score** — `demandScore` 0–100 = 40% seed/head prior, 30% suggestion frequency (log), 20% best rank, 10% engine coverage. Google relevance is not used because only one client variant returns it. Scores are calibrated within a locale — use them to prioritise inside a language, not as an absolute cross-language ranking.');
  lines.push('7. **Map** — each keyword gets a cluster, intent, priority and a target route; uncovered demand is flagged `gap-new` / `gap-feature`.');
  lines.push('');
  lines.push('> **Rate limiting:** Google blocks high-volume clients with HTTP 403. Requests are spaced 70–160 ms apart; after 25 consecutive 403s the collector stops that locale rather than hammering the endpoint. Google Suggest is queried via `client=firefox` (10 results); early locales were captured via `client=chrome` (15 results), so counts are conservative, not inflated.');
  lines.push('');
  lines.push('> **Honest limitation:** autocomplete provides real query wording and relative demand signals, not absolute monthly volumes. Attach Google Search Console or Keyword Planner data before forecasting traffic.');
  lines.push('');
  lines.push('## Sources');
  lines.push('');
  lines.push('| Source | Status | Role |');
  lines.push('|---|---|---|');
  lines.push('| Google Suggest (`client=firefox` / `client=chrome`) | Used | Primary query corpus and ranking signal |');
  lines.push('| Bing Suggest (`osjson.aspx`, per-market) | Used | Cross-engine suggestions for core seeds |');
  lines.push('| DuckDuckGo Autocomplete | Used | Cross-engine suggestions for core seeds |');
  lines.push('| Google Trends | Not used | Returned HTTP 429 from this network during collection |');
  lines.push('| Google Search Console | Not used | Needs property access/credentials; best source of real impressions |');
  lines.push('| Ahrefs / Semrush / Ubersuggest free tiers | Not used | Interactive accounts/CAPTCHA; no API access from this environment |');
  lines.push('');
  lines.push('## Cluster matrix (keyword counts)');
  lines.push('');
  lines.push('| Cluster | ' + codes.join(' | ') + ' | Total |');
  lines.push('|---|' + codes.map(() => '---:').join('|') + '|---:|');
  for (const cluster of clusterNames) {
    const counts = codes.map((c) => results[c].clusterCounts[cluster] || 0);
    const total = counts.reduce((a, b) => a + b, 0);
    if (!total) continue;
    lines.push(`| ${cluster} | ${counts.join(' | ')} | ${total} |`);
  }
  lines.push('');
  lines.push('## Gaps worth building');
  lines.push('');
  const gaps = new Map();
  for (const row of allRows) {
    if (!['gap-new', 'gap-feature'].includes(row.status)) continue;
    const key = `${row.cluster}|${row.targetPage}`;
    const entry = gaps.get(key) || { cluster: row.cluster, target: row.targetPage, count: 0, score: 0, sample: [] };
    entry.count += 1;
    entry.score += row.demandScore;
    if (entry.sample.length < 6) entry.sample.push(row.keyword);
    gaps.set(key, entry);
  }
  lines.push('| Cluster | Proposed target | Keywords | Avg score | Examples |');
  lines.push('|---|---|---:|---:|---|');
  for (const g of [...gaps.values()].sort((a, b) => b.score / b.count - a.score / a.count).slice(0, 15)) {
    lines.push(
      `| ${g.cluster} | \`${g.target}\` | ${g.count} | ${Math.round(g.score / g.count)} | ${g.sample.slice(0, 4).join(' · ')} |`
    );
  }
  lines.push('');
  lines.push('## Top keywords per locale');
  lines.push('');
  for (const code of codes) {
    const data = results[code];
    lines.push(`<details><summary><strong>${code}</strong> — ${data.label} (${data.totalUnique} keywords)</summary>`);
    lines.push('');
    lines.push('| # | Keyword | Cluster | Intent | Score | Target |');
    lines.push('|---:|---|---|---|---:|---|');
    data.rows.slice(0, 30).forEach((r, i) => {
      lines.push(
        `| ${i + 1} | ${r.keyword.replace(/\|/g, '\\|')} | ${r.cluster} | ${r.intent} | ${r.demandScore} | \`${r.targetPage}\` |`
      );
    });
    lines.push('');
    lines.push('</details>');
    lines.push('');
  }
  lines.push('## Files');
  lines.push('');
  lines.push('- `keywords.csv` — every keyword, all locales (UTF-8 BOM, Excel-ready).');
  lines.push('- `keywords.json` — full records, scores, engine metadata and per-locale totals.');
  lines.push('- `locales/<code>.csv` — per-locale slice for content planning.');
  lines.push('- `languages.csv` — language index with codes, hreflang aliases, counts and file paths.');
  lines.push('- `cluster-matrix.csv` — locale × cluster keyword counts.');
  lines.push('- `../keyword-research.json` — compatible input for `npm run keywords:map` and `keywords:cloud`.');
  lines.push('');
  lines.push('## Refresh');
  lines.push('');
  lines.push('```bash');
  lines.push('npm run keywords:deep            # collect (resumable via temp cache)');
  lines.push('npm run keywords:map             # cluster -> page mapping report');
  lines.push('npm run keywords:cloud           # weighted term/bigram cloud');
  lines.push('```');
  lines.push('');
  lines.push('Useful flags: `--locales=en,ua`, `--min=1500`, `--rounds=2`, `--refresh`, `--heads=30`.');
  lines.push('');
  return lines.join('\n');
}

function renderMatrix(results) {
  const codes = Object.keys(results);
  const clusters = Object.keys(CLUSTER_TARGETS);
  const lines = ['cluster,' + codes.join(',') + ',total'];
  for (const cluster of clusters) {
    const counts = codes.map((c) => results[c].clusterCounts[cluster] || 0);
    const total = counts.reduce((a, b) => a + b, 0);
    if (!total) continue;
    lines.push([cluster, ...counts, total].join(','));
  }
  return lines.join('\n') + '\n';
}

async function main() {
  const requested = String(args.locales || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const codes = requested.length ? requested : Object.keys(LOCALES);
  const unknown = codes.filter((c) => !LOCALES[c]);
  if (unknown.length) throw new Error(`Unknown locales: ${unknown.join(', ')}`);

  console.log(
    `deep keyword research: ${codes.length} locales, concurrency ${CONCURRENCY}, max ${MAX_ROUNDS} rounds`
  );
  const started = Date.now();
  const results = {};
  for (const code of codes) {
    results[code] = await researchLocale(code, LOCALES[code]);
    saveCache(code, results[code].cache);
    console.log(
      `[${code}] done: ${results[code].totalUnique} keywords (${results[code].requests.google} google calls)`
    );
  }

  writeOutputs(results);

  const total = Object.values(results).reduce((n, r) => n + r.totalUnique, 0);
  console.log(`\nwrote ${total} keywords across ${codes.length} locales -> docs/keyword-map/`);
  for (const [code, data] of Object.entries(results)) {
    console.log(`  ${code}: ${data.totalUnique}`);
  }
  console.log(`elapsed: ${Math.round((Date.now() - started) / 1000)}s`);
}

main().catch((err) => {
  console.error('deep keyword research failed:', err.stack || err.message);
  process.exitCode = 1;
});
