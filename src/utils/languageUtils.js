import lang from '../components/lang.json';

// Collect every language code from lang.json.
export const getAvailableLanguages = () => {
  // The first key that holds a language object defines the available codes.
  const firstKeyWithLanguages = Object.keys(lang).find(key => 
    typeof lang[key] === 'object' && lang[key] !== null
  );
  
  if (!firstKeyWithLanguages) {
    return [];
  }
  
  // Read the language keys from that first object.
  return Object.keys(lang[firstKeyWithLanguages]);
};

// Country codes for the flag icons.
const countryCodeMap = {
  'en': '840', // USA
  'ua': '804', // Ukraine
  'es': '724', // Spain
  'fr': '250', // France
  'de': '276', // Germany
  'it': '380', // Italy
  'pt': '620', // Portugal
  'ru': '643', // Russia
  'zh': '156', // China
  'ja': '392', // Japan
  'pl': '616', // Poland
  'vi': '704', // Vietnam
};

// Language display names.
const languageNamesMap = {
  'en': 'English',
  'ua': 'Українська',
  'es': 'Español',
  'fr': 'Français',
  'de': 'Deutsch',
  'it': 'Italiano',
  'pt': 'Português',
  'ru': 'Русский',
  'zh': '中文',
  'ja': '日本語',
  'pl': 'Polski',
  'vi': 'Tiếng Việt',
};

// Build the language list with flags and display names.
export const getLanguagesWithFlags = () => {
  const availableLanguages = getAvailableLanguages();
  
  return availableLanguages.map(langCode => ({
    value: langCode,
    label: languageNamesMap[langCode] || langCode.toUpperCase(),
    flagCode: countryCodeMap[langCode] || 'UN'
  }));
};

// Localized "choose a language" label.
export const getLanguageSelectionText = (language) => {
  const languageSelectionMap = {
    'en': 'Choose language',
    'ua': 'Виберіть мову',
    'es': 'Elegir idioma',
    'fr': 'Choisir la langue',
    'de': 'Sprache wählen',
    'it': 'Scegli lingua',
    'pt': 'Escolher idioma',
    'ru': 'Выберите язык',
    'zh': '选择语言',
    'ja': '言語を選択',
    'pl': 'Wybierz język',
    'vi': 'Chọn ngôn ngữ'
  };
  
  return languageSelectionMap[language] || 'Choose language';
};

// Localized theme label.
export const getThemeText = (language) => {
  const themeMap = {
    'en': 'Theme',
    'ua': 'Тема',
    'es': 'Tema',
    'fr': 'Thème',
    'de': 'Thema',
    'it': 'Tema',
    'pt': 'Tema',
    'ru': 'Тема',
    'zh': '主题',
    'ja': 'テーマ',
    'pl': 'Motyw',
    'vi': 'Chủ đề'
  };
  
  return themeMap[language] || 'Theme';
}; 