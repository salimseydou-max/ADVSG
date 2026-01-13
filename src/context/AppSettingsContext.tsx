import * as React from 'react';
import { useAppLanguage } from '../hooks/useAppLanguage';

type AppSettings = ReturnType<typeof useAppLanguage>;

const AppSettingsContext = React.createContext<AppSettings | null>(null);

export function AppSettingsProvider({ children }: { children: React.ReactNode }) {
  const languageState = useAppLanguage();
  return <AppSettingsContext.Provider value={languageState}>{children}</AppSettingsContext.Provider>;
}

export function useAppSettings() {
  const ctx = React.useContext(AppSettingsContext);
  if (!ctx) throw new Error('useAppSettings must be used within AppSettingsProvider');
  return ctx;
}

