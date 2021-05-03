import i18next from 'i18next';
import localeEN from '../../build/locales/i18n-en.json';
import localeES from '../../public/locales/i18n-es.json';
import { initReactI18next } from 'react-i18next';

const defaultLanguage = 'en';

export const initTranslations = (callback) => {
  i18next
    .use(initReactI18next)
    .init({
      lng: localStorage.getItem('language') || defaultLanguage,
      whitelist: ['en', 'es'],
      fallbackLng: 'en',
      keySeparator: false,
      resources: {
        ...localeEN,
        ...localeES,
      },
      interpolation: {
        prefix: '{',
        suffix: '}',
      },
      react: {
        wait: true,
        omitBoundRerender: false,
      },
    })
    .then(() => {
      if (!localStorage.getItem('language')) {
        localStorage.setItem('language', defaultLanguage);
      }
    })
    .then(callback);
};

export const translate = (id, values) => {
  const translation = i18next.t(id, values) || id;

  if (translation === id && process.env.NODE_ENV !== 'none') {
    console.warn(`ID ${id} has no translation!`);
  }

  return translation;
};

export const changeLanguage = language => i18next.changeLanguage(language, (err, t) => {
  if (err) return console.log('something went wrong loading', err);

  localStorage.setItem('language', language);
});