import * as React from 'react';
import { I18nManager, Platform } from 'react-native';
import * as Updates from 'expo-updates';
import { getLanguageByCode } from '../constants/languages';
import { getStoredLanguage, setStoredLanguage } from '../storage/settings';
import { DEFAULT_LANGUAGE, initI18n } from '../i18n/i18n';

type UseAppLanguageResult = {
  isReady: boolean;
  language: string;
  isRTL: boolean;
  setLanguage: (code: string) => Promise<void>;
};

/**
 * Centralized language + RTL control.
 *
 * Notes:
 * - For true RTL layout on native, React Native requires a reload when toggling RTL.
 * - We reload via expo-updates (works in Expo Go / dev client / builds).
 */
export function useAppLanguage(): UseAppLanguageResult {
  const [isReady, setIsReady] = React.useState(false);
  const [language, setLanguageState] = React.useState(DEFAULT_LANGUAGE);
  const [isRTL, setIsRTL] = React.useState(I18nManager.isRTL);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      const stored = await getStoredLanguage();
      const initial = stored ?? DEFAULT_LANGUAGE;

      initI18n(initial);

      if (!cancelled) {
        setLanguageState(initial);
        setIsRTL(!!getLanguageByCode(initial)?.rtl);
        setIsReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const setLanguage = React.useCallback(async (code: string) => {
    await setStoredLanguage(code);

    initI18n(code);
    await import('../i18n/i18n').then(({ default: i18n }) => i18n.changeLanguage(code));

    const nextRTL = !!getLanguageByCode(code)?.rtl;
    setLanguageState(code);
    setIsRTL(nextRTL);

    // Only native needs RTL toggling; web handles direction via CSS/layout.
    if (Platform.OS !== 'web') {
      const needsReload = I18nManager.isRTL !== nextRTL;
      if (needsReload) {
        I18nManager.allowRTL(true);
        I18nManager.forceRTL(nextRTL);
        // Small delay helps avoid rare "reload during render" issues.
        setTimeout(() => {
          Updates.reloadAsync();
        }, 150);
      }
    }
  }, []);

  return { isReady, language, isRTL, setLanguage };
}

