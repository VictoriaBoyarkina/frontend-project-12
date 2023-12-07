import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './locales/index.js';

i18next 
  .use(initReactI18next) // передаем экземпляр i18n в react-i18next, который сделает его доступным для всех компонентов через context API.
  .init({
    resources, // передаем переводы текстов интерфейса в формате JSON
    debug: true,
    lng: 'ru',
    fallbackLng: 'ru', // если переводы на языке пользователя недоступны, то будет использоваться язык, указанный в этом поле
    interpolation: {
      escapeValue: false, // экранирование уже есть в React, поэтому отключаем
    },
  });

export default i18next;