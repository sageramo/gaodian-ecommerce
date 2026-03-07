import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation files
import zh from './locales/zh.json';
import en from './locales/en.json';
import ja from './locales/ja.json';

// Language detection function
const detectLanguage = () => {
  // First check localStorage
  const savedLanguage = localStorage.getItem('language');
  if (savedLanguage && ['zh', 'en', 'ja'].includes(savedLanguage)) {
    return savedLanguage;
  }

  // Then check browser language
  const browserLang = navigator.language || navigator.userLanguage;
  
  // Map browser language codes to our supported languages
  if (browserLang.startsWith('zh')) return 'zh';
  if (browserLang.startsWith('ja')) return 'ja';
  if (browserLang.startsWith('en')) return 'en';
  
  // Default to Chinese
  return 'zh';
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      zh: { translation: zh },
      en: { translation: en },
      ja: { translation: ja },
    },
    lng: detectLanguage(),
    fallbackLng: 'zh',
    supportedLngs: ['zh', 'en', 'ja'],
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    react: {
      useSuspense: true,
    },
  });

// Save language preference when it changes
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('language', lng);
});

export default i18n;
