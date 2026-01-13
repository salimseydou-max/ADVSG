import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resources } from './resources';

export const DEFAULT_LANGUAGE = 'en';

/**
 * App UI translations:
 * - We ship a small UI dictionary for core labels (English/Spanish/French/Arabic).
 * - For other user-selected languages, the UI falls back to English, while advice
 *   text can be translated dynamically via the serverless endpoint.
 */
export function initI18n(initialLanguage?: string) {
  if (i18n.isInitialized) return i18n;

  i18n.use(initReactI18next).init({
    resources,
    lng: initialLanguage ?? DEFAULT_LANGUAGE,
    fallbackLng: DEFAULT_LANGUAGE,
    interpolation: { escapeValue: false },
    // Keep missing keys visible during development.
    returnEmptyString: false,
  });

  return i18n;
}

export default i18n;

