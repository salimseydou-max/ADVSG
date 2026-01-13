import * as React from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator, Share } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';
import { Link, useRouter } from 'expo-router';
import NetInfo from '@react-native-community/netinfo';

import { ADVICE_CATEGORIES, type AdviceCategory } from '../src/constants/categories';
import { useAppSettings } from '../src/context/AppSettingsContext';
import type { AdviceItem } from '../src/types/advice';
import { fetchAdviceSlipForCategory } from '../src/services/adviceSlip';
import { getOfflineAdvice } from '../src/services/offlineAdvice';
import { translateText } from '../src/services/translate';
import { getFavorites, removeFavorite, saveFavorite } from '../src/storage/favorites';

export default function HomeScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { language } = useAppSettings();

  const [category, setCategory] = React.useState<AdviceCategory>('life');
  const [advice, setAdvice] = React.useState<AdviceItem | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [isOffline, setIsOffline] = React.useState(false);
  const [didTranslate, setDidTranslate] = React.useState(true);
  const [isFavorited, setIsFavorited] = React.useState(false);

  React.useEffect(() => {
    const sub = NetInfo.addEventListener((state) => {
      setIsOffline(!(state.isConnected && state.isInternetReachable !== false));
    });
    return () => sub();
  }, []);

  const loadAdvice = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      let baseText: string;
      let source: AdviceItem['source'] = 'adviceSlip';
      let id: string;

      if (isOffline) {
        baseText = getOfflineAdvice(category);
        source = 'offline';
        id = `offline-${category}-${Date.now()}`;
      } else {
        const slip = await fetchAdviceSlipForCategory(category);
        baseText = slip.text;
        id = slip.id;
      }

      const translated = await translateText({ text: baseText, sourceLanguage: 'en', targetLanguage: language });

      setDidTranslate(translated.didTranslate || language === 'en');
      setAdvice({
        id: `${id}:${language}:${category}`,
        text: translated.text,
        language,
        category,
        source,
        createdAt: Date.now(),
      });
    } catch (e) {
      setError(t('errorTitle'));
      setAdvice(null);
    } finally {
      setIsLoading(false);
    }
  }, [category, isOffline, language, t]);

  React.useEffect(() => {
    loadAdvice();
  }, [loadAdvice]);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!advice) return;
      const favs = await getFavorites();
      if (!cancelled) setIsFavorited(favs.some((x) => x.id === advice.id));
    })();
    return () => {
      cancelled = true;
    };
  }, [advice]);

  const onShare = React.useCallback(async () => {
    if (!advice) return;
    await Share.share({ message: advice.text });
  }, [advice]);

  const onToggleFavorite = React.useCallback(async () => {
    if (!advice) return;
    if (isFavorited) {
      await removeFavorite(advice.id);
      setIsFavorited(false);
    } else {
      await saveFavorite(advice);
      setIsFavorited(true);
    }
  }, [advice, isFavorited]);

  return (
    <LinearGradient colors={['#F7F7FA', '#FFFFFF']} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('appName')}</Text>
        <Pressable
          onPress={() => router.push('/language')}
          accessibilityRole="button"
          style={({ pressed }) => [styles.headerButton, pressed && { opacity: 0.8 }]}
        >
          <Text style={styles.headerButtonText}>{t('language')}</Text>
        </Pressable>
      </View>

      <View style={styles.pills}>
        {ADVICE_CATEGORIES.map((c) => {
          const selected = c.key === category;
          return (
            <Pressable
              key={c.key}
              onPress={() => setCategory(c.key)}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              style={({ pressed }) => [
                styles.pill,
                selected && styles.pillSelected,
                pressed && { opacity: 0.85 },
              ]}
            >
              <Text style={[styles.pillText, selected && styles.pillTextSelected]}>{c.labelKey}</Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.card}>
        {isLoading ? (
          <View style={styles.center}>
            <ActivityIndicator />
            <Text style={styles.meta}>{t('loading')}</Text>
          </View>
        ) : error ? (
          <View style={styles.center}>
            <Text style={styles.errorTitle}>{t('errorTitle')}</Text>
            <Pressable onPress={loadAdvice} style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>{t('tryAgain')}</Text>
            </Pressable>
          </View>
        ) : (
          <>
            <Text style={styles.adviceText}>{advice?.text ?? ''}</Text>
            <View style={styles.metaRow}>
              {isOffline ? <Text style={styles.meta}>{t('offlineFallback')}</Text> : null}
              {!didTranslate && language !== 'en' ? (
                <Text style={styles.meta}>{t('translationUnavailable')}</Text>
              ) : null}
            </View>
          </>
        )}
      </View>

      <View style={styles.actions}>
        <Pressable onPress={loadAdvice} style={styles.primaryButton} accessibilityRole="button">
          <Text style={styles.primaryButtonText}>{t('refresh')}</Text>
        </Pressable>
        <Pressable onPress={onToggleFavorite} style={styles.secondaryButton} accessibilityRole="button">
          <Text style={styles.secondaryButtonText}>{isFavorited ? t('favorited') : t('favorite')}</Text>
        </Pressable>
        <Pressable onPress={onShare} style={styles.secondaryButton} accessibilityRole="button">
          <Text style={styles.secondaryButtonText}>{t('share')}</Text>
        </Pressable>
        <Link href="/favorites" asChild>
          <Pressable style={styles.secondaryButton} accessibilityRole="button">
            <Text style={styles.secondaryButtonText}>{t('favorites')}</Text>
          </Pressable>
        </Link>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 18, paddingHorizontal: 16 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  title: { fontSize: 28, fontWeight: '800' },
  headerButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(118,118,128,0.12)',
  },
  headerButtonText: { fontSize: 14, fontWeight: '600' },
  pills: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 14 },
  pill: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(118,118,128,0.10)',
  },
  pillSelected: { backgroundColor: 'rgba(0,122,255,0.14)' },
  pillText: { fontSize: 13, fontWeight: '600', opacity: 0.85 },
  pillTextSelected: { color: '#007AFF', opacity: 1 },
  card: {
    borderRadius: 20,
    padding: 18,
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(60,60,67,0.16)',
    minHeight: 220,
  },
  adviceText: { fontSize: 20, lineHeight: 28, fontWeight: '600', letterSpacing: -0.2 },
  metaRow: { marginTop: 12, gap: 6 },
  meta: { fontSize: 13, opacity: 0.6 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 10 },
  errorTitle: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
  actions: { flexDirection: 'row', gap: 10, marginTop: 14, alignItems: 'center' },
  primaryButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: '#007AFF',
    alignItems: 'center',
  },
  primaryButtonText: { color: 'white', fontWeight: '700', fontSize: 15 },
  secondaryButton: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: 'rgba(118,118,128,0.12)',
  },
  secondaryButtonText: { fontWeight: '700', fontSize: 14 },
});

