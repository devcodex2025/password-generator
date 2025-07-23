import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Define the Lang interface based on expected JSON structure
interface Lang {
  [key: string]: {
    [langCode: string]: string;
  };
}

// Load language file with proper typing
const lang: Lang = require('./lang.json');

// Build resources object with proper typing
const resources: {
  [langCode: string]: {
    translation: { [key: string]: string };
  };
} = {};

// Transform lang data into i18next resources format
Object.keys(lang).forEach((key) => {
  const translations = lang[key];
  Object.keys(translations).forEach((langCode) => {
    if (!resources[langCode]) {
      resources[langCode] = { translation: {} };
    }
    resources[langCode].translation[key] = translations[langCode];
  });
});

// Initialize i18next
i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    lng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
  });

export default i18n;