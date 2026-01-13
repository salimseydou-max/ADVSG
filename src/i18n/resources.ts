export type I18nResources = Record<
  string,
  {
    translation: Record<string, string>;
  }
>;

/**
 * Keep UI translations intentionally small and high-impact.
 * Advice text itself is translated dynamically (serverless or fallback) so we don't
 * ship massive static datasets for 50 languages.
 */
export const resources: I18nResources = {
  en: {
    translation: {
      appName: 'Advice',
      language: 'Language',
      chooseLanguage: 'Choose your language',
      searchLanguage: 'Search languages',
      continue: 'Continue',
      category: 'Category',
      refresh: 'Refresh',
      favorite: 'Save',
      favorited: 'Saved',
      favorites: 'Favorites',
      share: 'Share',
      loading: 'Loading…',
      errorTitle: 'Something went wrong',
      tryAgain: 'Try again',
      offlineFallback: 'Offline fallback',
      translationUnavailable: 'Translation unavailable — showing English.',
    },
  },
  es: {
    translation: {
      appName: 'Consejo',
      language: 'Idioma',
      chooseLanguage: 'Elige tu idioma',
      searchLanguage: 'Buscar idiomas',
      continue: 'Continuar',
      category: 'Categoría',
      refresh: 'Actualizar',
      favorite: 'Guardar',
      favorited: 'Guardado',
      favorites: 'Favoritos',
      share: 'Compartir',
      loading: 'Cargando…',
      errorTitle: 'Algo salió mal',
      tryAgain: 'Intentar de nuevo',
      offlineFallback: 'Sin conexión',
      translationUnavailable: 'Traducción no disponible — se muestra en inglés.',
    },
  },
  fr: {
    translation: {
      appName: 'Conseil',
      language: 'Langue',
      chooseLanguage: 'Choisissez votre langue',
      searchLanguage: 'Rechercher des langues',
      continue: 'Continuer',
      category: 'Catégorie',
      refresh: 'Actualiser',
      favorite: 'Enregistrer',
      favorited: 'Enregistré',
      favorites: 'Favoris',
      share: 'Partager',
      loading: 'Chargement…',
      errorTitle: 'Une erreur est survenue',
      tryAgain: 'Réessayer',
      offlineFallback: 'Hors ligne',
      translationUnavailable: "Traduction indisponible — affichage en anglais.",
    },
  },
  ar: {
    translation: {
      appName: 'نصيحة',
      language: 'اللغة',
      chooseLanguage: 'اختر لغتك',
      searchLanguage: 'ابحث عن اللغات',
      continue: 'متابعة',
      category: 'الفئة',
      refresh: 'تحديث',
      favorite: 'حفظ',
      favorited: 'محفوظ',
      favorites: 'المحفوظات',
      share: 'مشاركة',
      loading: 'جارٍ التحميل…',
      errorTitle: 'حدث خطأ ما',
      tryAgain: 'حاول مرة أخرى',
      offlineFallback: 'غير متصل',
      translationUnavailable: 'الترجمة غير متاحة — سيتم عرض الإنجليزية.',
    },
  },
};

