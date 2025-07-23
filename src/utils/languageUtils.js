import lang from '../components/lang.json';

// Функція для отримання всіх доступних мов з lang.json
export const getAvailableLanguages = () => {
  // Знаходимо перший ключ, який має об'єкт з мовами
  const firstKeyWithLanguages = Object.keys(lang).find(key => 
    typeof lang[key] === 'object' && lang[key] !== null
  );
  
  if (!firstKeyWithLanguages) {
    return [];
  }
  
  // Отримуємо всі ключі мов з першого об'єкта
  return Object.keys(lang[firstKeyWithLanguages]);
};

// Мапа кодів країн для прапорців
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
};

// Мапа назв мов
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
};

// Функція для отримання об'єкта мов з інформацією про прапорці та назвами
export const getLanguagesWithFlags = () => {
  const availableLanguages = getAvailableLanguages();
  
  return availableLanguages.map(langCode => ({
    value: langCode,
    label: languageNamesMap[langCode] || langCode.toUpperCase(),
    flagCode: countryCodeMap[langCode] || 'UN'
  }));
};

// Функція для отримання перекладу "Виберіть мову" для кожної мови
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
    'pl': 'Wybierz język'
  };
  
  return languageSelectionMap[language] || 'Choose language';
};

// Функція для отримання перекладу "Тема" для кожної мови
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
    'pl': 'Motyw'
  };
  
  return themeMap[language] || 'Theme';
}; 