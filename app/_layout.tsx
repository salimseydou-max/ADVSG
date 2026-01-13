import { Stack } from 'expo-router';
import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppSettingsProvider } from '../src/context/AppSettingsContext';

export default function RootLayout() {
  return (
    <AppSettingsProvider>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerShadowVisible: false,
          headerTitleStyle: { fontWeight: '600' },
        }}
      />
    </AppSettingsProvider>
  );
}

