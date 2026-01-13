import * as React from 'react';
import { useColorScheme } from 'react-native';

export type AppTheme = {
  isDark: boolean;
  colors: {
    bgStart: string;
    bgEnd: string;
    card: string;
    border: string;
    text: string;
    subtext: string;
    muted: string;
    primary: string;
    primaryTint: string;
    danger: string;
    dangerTint: string;
  };
};

export function useTheme(): AppTheme {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  return React.useMemo(() => {
    if (isDark) {
      return {
        isDark,
        colors: {
          bgStart: '#0B0B0F',
          bgEnd: '#12121A',
          card: 'rgba(255,255,255,0.06)',
          border: 'rgba(235,235,245,0.16)',
          text: '#FFFFFF',
          subtext: 'rgba(235,235,245,0.72)',
          muted: 'rgba(235,235,245,0.50)',
          primary: '#0A84FF',
          primaryTint: 'rgba(10,132,255,0.22)',
          danger: '#FF453A',
          dangerTint: 'rgba(255,69,58,0.22)',
        },
      } satisfies AppTheme;
    }
    return {
      isDark,
      colors: {
        bgStart: '#F7F7FA',
        bgEnd: '#FFFFFF',
        card: 'rgba(255,255,255,0.86)',
        border: 'rgba(60,60,67,0.16)',
        text: '#111111',
        subtext: 'rgba(60,60,67,0.72)',
        muted: 'rgba(60,60,67,0.55)',
        primary: '#007AFF',
        primaryTint: 'rgba(0,122,255,0.14)',
        danger: '#FF3B30',
        dangerTint: 'rgba(255,59,48,0.14)',
      },
    } satisfies AppTheme;
  }, [isDark]);
}

