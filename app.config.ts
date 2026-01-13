import 'dotenv/config';
import type { ExpoConfig } from 'expo/config';

/**
 * App Store / production notes:
 * - Set bundle identifiers via env (see .env.example).
 * - Keep secrets out of the client. Only EXPO_PUBLIC_* are exposed to the app.
 */
export default ({ config }: { config: ExpoConfig }): ExpoConfig => ({
  ...config,
  name: 'Advice',
  slug: 'advice',
  scheme: 'advice',
  version: '1.0.0',
  orientation: 'portrait',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  icon: './assets/icon.png',
  splash: {
    image: './assets/splash-icon.png',
    resizeMode: 'contain',
    backgroundColor: '#FFFFFF',
  },
  plugins: ['expo-router', 'expo-localization'],
  ios: {
    supportsTablet: false,
    bundleIdentifier: process.env.IOS_BUNDLE_IDENTIFIER ?? 'com.example.advice',
    buildNumber: process.env.IOS_BUILD_NUMBER ?? '1',
  },
  android: {
    package: process.env.ANDROID_PACKAGE ?? 'com.example.advice',
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
  },
  web: {
    favicon: './assets/favicon.png',
    bundler: 'metro',
  },
});

