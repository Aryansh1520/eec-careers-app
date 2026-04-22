
import '@/global.css';

import { NAV_THEME } from '@/lib/theme';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { usePersistentTheme } from '@/lib/theme-store';

export {
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  const { theme, isReady } = usePersistentTheme();

  // Always have a safe fallback
  const currentTheme = theme ?? 'light';

  return (
    <ThemeProvider value={NAV_THEME[currentTheme]}>
      <StatusBar style={currentTheme === 'dark' ? 'light' : 'dark'} />

      {/* App navigation */}
      <Stack screenOptions={{ headerShown: false }} />

      {/* Portal (modals, sheets, etc.) */}
      <PortalHost />
    </ThemeProvider>
  );
}

