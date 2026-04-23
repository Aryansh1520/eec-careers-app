import { OnboardingContainer } from '@/components/onboarding/onboarding-container';
import React from 'react';
import {
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  View,
  Image,
  Text
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function OnboardingScreen() {
  const router = useRouter();
  const { mode } = useLocalSearchParams<{ mode?: string }>();

  // mode can be string or string[] on native depending on how it was passed
  const rawMode = Array.isArray(mode) ? mode[0] : mode;
  const onboardingMode = rawMode === 'update' ? 'update' : 'new';

  function handleComplete() {
    router.replace('/dashboard');
  }

  function handleSaveExit() {
    router.replace('/dashboard');
  }

  const content = (
    <OnboardingContainer
      mode={onboardingMode}
      onComplete={handleComplete}
      onSaveExit={handleSaveExit}
    />
  );

  // 🌐 WEB — split layout + vertical centering (fixed)
  if (Platform.OS === 'web') {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-1 flex-row">

          {/* LEFT PANEL */}
          <View className="w-1/2 h-full px-8 py-10">
            <View className="w-full h-full rounded-3xl overflow-hidden border border-border/50 shadow-lg shadow-black/10 bg-background">

              <Image
                source={require('@/assets/images/onboarding.png')}
                className="w-full h-full"
                resizeMode="cover"
              />

            </View>
          </View>

          {/* RIGHT PANEL */}
          <ScrollView
            className="w-1/2"
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerClassName="flex-grow justify-center items-center px-8 py-12 min-h-full">
            <View className="w-full max-w-xl">
              <View className="rounded-2xl border border-border bg-background shadow-lg shadow-black/10 p-6">
                {content}
              </View>
            </View>
          </ScrollView>

        </View>
      </SafeAreaView>
    );
  }

  // 📱 MOBILE — stable scroll layout
  return (
    <SafeAreaView
      style={{ flex: 1 }}
      edges={['top', 'bottom', 'left', 'right']}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            padding: 16,
            paddingTop: 40,
          }}
        >
          {content}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
