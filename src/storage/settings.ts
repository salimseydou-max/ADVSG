import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from './keys';

export async function getStoredLanguage(): Promise<string | null> {
  return await AsyncStorage.getItem(STORAGE_KEYS.language);
}

export async function setStoredLanguage(code: string): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEYS.language, code);
}

