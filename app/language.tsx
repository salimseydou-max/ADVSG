import * as React from 'react';
import { View, Text, TextInput, FlatList, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES } from '../src/constants/languages';
import { useAppSettings } from '../src/context/AppSettingsContext';
import { useTheme } from '../src/theme/useTheme';

export default function LanguageScreen() {
  const { t } = useTranslation();
  const { language, setLanguage } = useAppSettings();
  const theme = useTheme();
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
      <Text style={[styles.title, { color: theme.colors.text }]}>{t('chooseLanguage')}</Text>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder={t('searchLanguage')}
        placeholderTextColor={theme.colors.muted}
        style={[styles.search, { backgroundColor: theme.colors.card, color: theme.colors.text, borderColor: theme.colors.border }]}
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
                {
                  backgroundColor: selected ? theme.colors.primaryTint : theme.colors.card,
                  borderColor: theme.colors.border,
                },
                pressed && { opacity: 0.8 },
              ]}
            >
              <View style={{ flex: 1 }}>
                <Text style={[styles.rowTitle, { color: theme.colors.text }]}>
                  {item.nativeName}{' '}
                  <Text style={[styles.rowMeta, { color: theme.colors.subtext }]}>({item.name})</Text>
                </Text>
                <Text style={[styles.rowCode, { color: theme.colors.muted }]}>{item.code.toUpperCase()}</Text>
              </View>
              {selected ? <Text style={[styles.check, { color: theme.colors.primary }]}>✓</Text> : null}
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
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 12,
    fontSize: 16,
  },
  row: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
  },
  rowTitle: { fontSize: 16, fontWeight: '600' },
  rowMeta: { fontSize: 14, fontWeight: '400' },
  rowCode: { marginTop: 3, fontSize: 12 },
  check: { fontSize: 18, fontWeight: '700' },
});

