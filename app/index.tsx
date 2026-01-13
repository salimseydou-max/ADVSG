import { Redirect } from 'expo-router';
import * as React from 'react';
import { useAppSettings } from '../src/context/AppSettingsContext';

export default function Index() {
  const { isReady, language } = useAppSettings();
  if (!isReady) return null;

  // If language is not yet persisted, default is English; still allow explicit selection.
  // We route to Home and expose language selection from there.
  return <Redirect href={language ? '/home' : '/language'} />;
}

