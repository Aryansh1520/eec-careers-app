import { ForgotPasswordForm } from '@/components/forgot-password-form';
import React from 'react';
import { Platform, ScrollView, View, KeyboardAvoidingView } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ForgotPasswordScreen() {

  // 🌐 WEB — safe to center + max width
  if (Platform.OS === 'web') {
    return (
      <SafeAreaView className="flex-1 items-center justify-center px-4 bg-background">
        <Animated.View
          entering={FadeInDown.duration(400)}
          className="w-full max-w-md"
        >
          <ForgotPasswordForm />
        </Animated.View>
      </SafeAreaView>
    );
  }

  // 📱 MOBILE — no centering tricks inside ScrollView
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom', 'left', 'right']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            padding: 16,
            paddingTop: 300, // fixes top spacing on Android
          }}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View entering={FadeInDown.duration(400)}>
            <ForgotPasswordForm />
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
