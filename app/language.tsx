import * as React from 'react';
import { View, Text, TextInput, FlatList, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES } from '../src/constants/languages';
import { useAppSettings } from '../src/context/AppSettingsContext';

export default function LanguageScreen() {
  const { t } = useTranslation();
  const { language, setLanguage } = useAppSettings();
  const [query, setQuery] = React.useState('');

  const data = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SUPPORTED_LANGUAGES;
    return SUPPORTED_LANGUAGES.filter(
      (l) => l.name.toLowerCase().includes(q) || l.nativeName.toLowerCase().includes(q) || l.code === q
    );
  }, [query]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('chooseLanguage')}</Text>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder={t('searchLanguage')}
        placeholderTextColor="rgba(60,60,67,0.45)"
        style={styles.search}
        autoCapitalize="none"
        autoCorrect={false}
        accessibilityLabel={t('searchLanguage')}
      />

      <FlatList
        data={data}
        keyExtractor={(item) => item.code}
        contentContainerStyle={{ paddingBottom: 24 }}
        renderItem={({ item }) => {
          const selected = item.code === language;
          return (
            <Pressable
              onPress={() => setLanguage(item.code)}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              style={({ pressed }) => [
                styles.row,
                selected && styles.rowSelected,
                pressed && { opacity: 0.8 },
              ]}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.rowTitle}>
                  {item.nativeName} <Text style={styles.rowMeta}>({item.name})</Text>
                </Text>
                <Text style={styles.rowCode}>{item.code.toUpperCase()}</Text>
              </View>
              {selected ? <Text style={styles.check}>✓</Text> : null}
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 16, paddingHorizontal: 16 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
  search: {
    height: 44,
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(118,118,128,0.12)',
    marginBottom: 12,
    fontSize: 16,
  },
  row: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: 'rgba(118,118,128,0.08)',
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowSelected: { backgroundColor: 'rgba(0,122,255,0.12)' },
  rowTitle: { fontSize: 16, fontWeight: '600' },
  rowMeta: { fontSize: 14, fontWeight: '400', opacity: 0.7 },
  rowCode: { marginTop: 3, fontSize: 12, opacity: 0.6 },
  check: { fontSize: 18, fontWeight: '700', color: '#007AFF' },
});

