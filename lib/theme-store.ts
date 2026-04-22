import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';
import { Uniwind, useUniwind } from 'uniwind';

const THEME_STORAGE_KEY = '@eagle_eye_careers_theme';

export function usePersistentTheme() {
  const { theme } = useUniwind();
  const [isReady, setIsReady] = useState(false);

  // Initialize theme from storage on mount
  useEffect(() => {
    async function loadTheme() {
      try {
        const storedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (storedTheme === 'dark' || storedTheme === 'light') {
          Uniwind.setTheme(storedTheme);
        }
      } catch (e) {
        console.error('Failed to load theme from storage', e);
      } finally {
        setIsReady(true);
      }
    }
    loadTheme();
  }, []);

  const toggleTheme = useCallback(async () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    Uniwind.setTheme(newTheme);
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch (e) {
      console.error('Failed to save theme to storage', e);
    }
  }, [theme]);

  const setTheme = useCallback(async (newTheme: 'light' | 'dark') => {
    Uniwind.setTheme(newTheme);
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch (e) {
      console.error('Failed to save theme to storage', e);
    }
  }, []);

  return { theme, toggleTheme, setTheme, isReady };
}
