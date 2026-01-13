import * as React from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { getFavorites, removeFavorite } from '../src/storage/favorites';
import type { AdviceItem } from '../src/types/advice';
import { useTheme } from '../src/theme/useTheme';

export default function FavoritesScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const [items, setItems] = React.useState<AdviceItem[]>([]);

  const load = React.useCallback(async () => {
    setItems(await getFavorites());
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.colors.text }]}>{t('favorites')}</Text>
      <FlatList
        data={items}
        keyExtractor={(i) => i.id}
        ListEmptyComponent={<Text style={[styles.empty, { color: theme.colors.muted }]}>No favorites yet.</Text>}
        contentContainerStyle={{ paddingBottom: 24 }}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
            <Text style={[styles.text, { color: theme.colors.text }]}>{item.text}</Text>
            <View style={styles.row}>
              <Text style={[styles.meta, { color: theme.colors.muted }]}>{item.category.replace('_', ' ')}</Text>
              <Pressable
                onPress={async () => {
                  await removeFavorite(item.id);
                  await load();
                }}
                style={({ pressed }) => [
                  styles.remove,
                  { backgroundColor: theme.colors.dangerTint, borderColor: theme.colors.border },
                  pressed && { opacity: 0.8 },
                ]}
                accessibilityRole="button"
              >
                <Text style={[styles.removeText, { color: theme.colors.danger }]}>Remove</Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 16, paddingHorizontal: 16 },
  title: { fontSize: 22, fontWeight: '800', marginBottom: 12 },
  empty: { opacity: 0.6, fontSize: 14, paddingTop: 16 },
  card: {
    padding: 14,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: StyleSheet.hairlineWidth,
  },
  text: { fontSize: 16, lineHeight: 22, fontWeight: '600' },
  row: { marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  meta: { fontSize: 12, textTransform: 'capitalize' },
  remove: { paddingHorizontal: 10, paddingVertical: 8, borderRadius: 12, borderWidth: StyleSheet.hairlineWidth },
  removeText: { fontWeight: '700' },
});

