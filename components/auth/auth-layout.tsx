import { useBreakpoint } from '@/lib/use-breakpoint';
import * as React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthVisualPanel, type AuthVisualVariant } from './auth-visual-panel';

export type { AuthVisualVariant };

const NATIVE_FORM_MAX_WIDTH = 448;

const nativeStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  flex1Min: {
    flex: 1,
    minHeight: 0,
  },
  column: {
    flex: 1,
    flexDirection: 'column',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    minHeight: 0,
  },
  nativeWideRight: {
    flex: 1,
    minHeight: 0,
    paddingVertical: 24,
    justifyContent: 'center',
  },
  kavMobile: {
    flex: 1,
    marginTop: -28,
    minHeight: 0,
    zIndex: 10,
  },
  kavWide: {
    flex: 1,
    minHeight: 0,
  },
  sheetShell: {
    flex: 1,
    minHeight: 0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  innerForm: {
    width: '100%',
    maxWidth: NATIVE_FORM_MAX_WIDTH,
    alignSelf: 'center',
  },
});

type AuthContentPanelProps = {
  children: React.ReactNode;
  animateEnter?: boolean;
};

export function AuthContentPanel({
  children,
  animateEnter = true,
}: AuthContentPanelProps) {
  const isWeb = Platform.OS === 'web';
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === 'mobile';
  const { height } = useWindowDimensions();

  const inner = animateEnter ? (
    <Animated.View entering={FadeInDown.duration(400)}>
      {children}
    </Animated.View>
  ) : (
    children
  );

  const scrollContentWebMobile = React.useMemo(
    () => ({
      flexGrow: 1,
      paddingHorizontal: 20,
      paddingTop: 8,
      paddingBottom: 28,
    }),
    []
  );

  const scrollContentWebWide = React.useMemo(
    () => ({
      flexGrow: 1,
      justifyContent: 'center' as const,
      paddingHorizontal: 24,
      paddingVertical: 32,
      minHeight: Math.max(height * 0.85, 480),
    }),
    [height]
  );

  const scrollContentNativeMobile = React.useMemo(
    () => ({
      flexGrow: 1,
      paddingHorizontal: 20,
      paddingTop: 8,
      paddingBottom: 28,
    }),
    []
  );

  const scrollContentNativeWide = React.useMemo(
    () => ({
      flexGrow: 1,
      justifyContent: 'center' as const,
      paddingHorizontal: 24,
      paddingVertical: 32,
      minHeight: Math.max(height * 0.85, 480),
    }),
    [height]
  );

  if (isWeb) {
    return (
      <KeyboardAvoidingView
        className={isMobile ? 'flex-1 -mt-7 min-h-0 z-10' : 'flex-1 min-h-0'}
        style={{ flex: 1 }}
        behavior={undefined}
      >
        <View
          className={
            isMobile
              ? 'flex-1 min-h-0 rounded-t-3xl border border-border/60 bg-card shadow-lg shadow-black/10 web:shadow-black/15'
              : 'flex-1 min-h-0'
          }
        >
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={
              isMobile ? scrollContentWebMobile : scrollContentWebWide
            }
          >
            <View className="mx-auto w-full max-w-md">{inner}</View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    );
  }

  return (
    <KeyboardAvoidingView
      style={isMobile ? nativeStyles.kavMobile : nativeStyles.kavWide}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View
        style={nativeStyles.flex1Min}
        className={
          isMobile
            ? 'rounded-t-3xl border border-border/60 bg-card shadow-lg shadow-black/10'
            : undefined
        }
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            isMobile ? scrollContentNativeMobile : scrollContentNativeWide
          }
        >
          <View style={nativeStyles.innerForm}>{inner}</View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

type AuthLayoutProps = {
  variant: AuthVisualVariant;
  children: React.ReactNode;
  animateContent?: boolean;
};

export function AuthLayout({
  variant,
  children,
  animateContent = true,
}: AuthLayoutProps) {
  const isWeb = Platform.OS === 'web';
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === 'mobile';

  if (isWeb) {
    if (isMobile) {
      return (
        <SafeAreaView
          className="flex-1 bg-background"
          edges={['top', 'left', 'right', 'bottom']}
        >
          <View className="flex-1 flex-col">
            <AuthVisualPanel variant={variant} breakpoint={breakpoint} />
            <AuthContentPanel animateEnter={animateContent}>
              {children}
            </AuthContentPanel>
          </View>
        </SafeAreaView>
      );
    }

    return (
      <SafeAreaView
        className="flex-1 bg-background"
        edges={['top', 'bottom', 'left', 'right']}
      >
        <View className="min-h-0 flex-1 flex-row">
          <AuthVisualPanel variant={variant} breakpoint={breakpoint} />
          <View className="min-h-0 flex-1 py-6">
            <AuthContentPanel animateEnter={animateContent}>
              {children}
            </AuthContentPanel>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  if (isMobile) {
    return (
      <SafeAreaView
        style={nativeStyles.safeArea}
        className="bg-background"
        edges={['top', 'left', 'right', 'bottom']}
      >
        <View style={nativeStyles.column}>
          <AuthVisualPanel variant={variant} breakpoint={breakpoint} />
          <AuthContentPanel animateEnter={animateContent}>
            {children}
          </AuthContentPanel>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={nativeStyles.safeArea}
      className="bg-background"
      edges={['top', 'bottom', 'left', 'right']}
    >
      <View style={nativeStyles.row}>
        <AuthVisualPanel variant={variant} breakpoint={breakpoint} />
        <View style={nativeStyles.nativeWideRight}>
          <AuthContentPanel animateEnter={animateContent}>
            {children}
          </AuthContentPanel>
        </View>
      </View>
    </SafeAreaView>
  );
}
