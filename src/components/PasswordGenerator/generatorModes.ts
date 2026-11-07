export type GeneratorMode = 'chars' | 'words' | 'pin';

export interface ModeLabels {
  chars: string;
  words: string;
  pin: string;
  wordCount: string;
  separator: string;
  capitalize: string;
}

const MODE_LABELS: Record<string, ModeLabels> = {
  en: { chars: 'Characters', words: 'Words', pin: 'PIN', wordCount: 'Words', separator: 'Separator', capitalize: 'Capitalize one word' },
  ua: { chars: 'Символи', words: 'Слова', pin: 'PIN', wordCount: 'Слів', separator: 'Роздільник', capitalize: 'Одне слово з великої літери' },
  ru: { chars: 'Символы', words: 'Слова', pin: 'PIN', wordCount: 'Слов', separator: 'Разделитель', capitalize: 'Одно слово с заглавной' },
  pl: { chars: 'Znaki', words: 'Słowa', pin: 'PIN', wordCount: 'Słów', separator: 'Separator', capitalize: 'Jedno słowo wielką literą' },
  de: { chars: 'Zeichen', words: 'Wörter', pin: 'PIN', wordCount: 'Wörter', separator: 'Trennzeichen', capitalize: 'Ein Wort groß schreiben' },
  es: { chars: 'Caracteres', words: 'Palabras', pin: 'PIN', wordCount: 'Palabras', separator: 'Separador', capitalize: 'Una palabra en mayúscula' },
  fr: { chars: 'Caractères', words: 'Mots', pin: 'PIN', wordCount: 'Mots', separator: 'Séparateur', capitalize: 'Un mot en majuscule' },
  it: { chars: 'Caratteri', words: 'Parole', pin: 'PIN', wordCount: 'Parole', separator: 'Separatore', capitalize: 'Una parola maiuscola' },
  pt: { chars: 'Caracteres', words: 'Palavras', pin: 'PIN', wordCount: 'Palavras', separator: 'Separador', capitalize: 'Uma palavra em maiúscula' },
  ja: { chars: '文字', words: '単語', pin: 'PIN', wordCount: '単語数', separator: '区切り文字', capitalize: '1語を大文字に' },
  zh: { chars: '字符', words: '单词', pin: 'PIN', wordCount: '单词数', separator: '分隔符', capitalize: '一个单词大写' },
  vi: { chars: 'Ký tự', words: 'Từ', pin: 'PIN', wordCount: 'Số từ', separator: 'Dấu phân cách', capitalize: 'Viết hoa một từ' },
};

export function getModeLabels(language: string | undefined): ModeLabels {
  const code = (language || 'en').slice(0, 2).toLowerCase();
  return MODE_LABELS[code] || MODE_LABELS.en;
}

export const WORDLIST_PATH = '/eff-large-wordlist.txt';
export const EFF_LARGE_WORD_COUNT = 7776;
export const ENTROPY_PER_WORD = Math.log2(EFF_LARGE_WORD_COUNT); // ≈ 12.9 bits

let wordlistPromise: Promise<string[]> | null = null;

/** Loads the EFF large wordlist once and caches the parsed words. */
export function loadWordlist(): Promise<string[]> {
  if (!wordlistPromise) {
    wordlistPromise = fetch(WORDLIST_PATH)
      .then((res) => {
        if (!res.ok) throw new Error(`wordlist HTTP ${res.status}`);
        return res.text();
      })
      .then((text) =>
        text
          .split(/\r?\n/)
          .map((line) => line.split('\t')[1]?.trim() || line.trim())
          .filter(Boolean)
      )
      .catch((error) => {
        wordlistPromise = null; // let the next attempt retry instead of failing for the whole session
        throw error;
      });
  }
  return wordlistPromise;
}
