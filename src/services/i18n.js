import i18next from 'i18next';
// import localeEN from '../../build/locales/i18n-en.json';
// import localeES from '../../public/locales/i18n-es.json';
import localeEN from '../../i18n/en/resource.json';
import localeES from '../../i18n/es/resource.json';
import localeFR from '../../i18n/fr/resource.json';
import { initReactI18next } from 'react-i18next';

const defaultLanguage = 'en';

export const initTranslations = (callback) => {
  i18next
    .use(initReactI18next)
    .init({
      lng: localStorage.getItem('language') || defaultLanguage,
      whitelist: ['en', 'es', 'fr'],
      fallbackLng: 'en',
      keySeparator: false,
      // resources: {
      //   ...localeEN,
      //   ...localeES,
      // },
      resources: {
        en: {
          translation: localeEN,
        },
        es: {
          translation: localeES,
        },
        fr: {
          translation: localeFR,
        },
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
  const translation =
    i18next.t(id, values) !== '__STRING_NOT_TRANSLATED__'
      ? i18next.t(id, values)
      : id;

  if (translation === id && process.env.NODE_ENV !== 'none') {
    console.warn(`ID ${id} has no translation!`);
  }

  return translation;
};

export const changeLanguage = async (language) =>
  await i18next
    .changeLanguage(language, (err, t) => {
      if (err) return console.log('something went wrong loading', err);

      localStorage.setItem('language', language);
    })
    .then(() => {
      window.location.href = `${window.location.href}`;
    });
