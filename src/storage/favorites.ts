import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from './keys';
import type { AdviceItem } from '../types/advice';

function safeParse<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function getFavorites(): Promise<AdviceItem[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEYS.favorites);
  const parsed = safeParse<AdviceItem[]>(raw);
  return Array.isArray(parsed) ? parsed : [];
}

export async function saveFavorite(item: AdviceItem): Promise<void> {
  const current = await getFavorites();
  if (current.some((x) => x.id === item.id)) return;
  await AsyncStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify([item, ...current]));
}

export async function removeFavorite(id: string): Promise<void> {
  const current = await getFavorites();
  await AsyncStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(current.filter((x) => x.id !== id)));
}

