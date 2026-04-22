import { ResetPasswordForm } from '@/components/reset-password-form';
import React from 'react';
import { Platform, ScrollView, View, KeyboardAvoidingView } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ResetPasswordScreen() {

  // 🌐 WEB (safe to center)
  if (Platform.OS === 'web') {
    return (
      <SafeAreaView className="flex-1 items-center justify-center px-4">
        <Animated.View
          entering={FadeInDown.duration(400)}
          className="w-full max-w-md"
        >
          <ResetPasswordForm />
        </Animated.View>
      </SafeAreaView>
    );
  }

  // 📱 MOBILE (no centering tricks)
  return (
    <SafeAreaView style={{ flex: 1 }}>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >

        <ScrollView
          contentContainerStyle={{
            padding: 16,
            paddingTop: 250,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View entering={FadeInDown.duration(400)}>
            <ResetPasswordForm />
          </Animated.View>
        </ScrollView>

      </KeyboardAvoidingView>

    </SafeAreaView>
  );
}
