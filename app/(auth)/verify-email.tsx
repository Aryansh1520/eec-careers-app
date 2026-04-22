import { VerifyEmailForm } from '@/components/verify-email-form';
import React from 'react';
import { Platform, ScrollView, KeyboardAvoidingView } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function VerifyEmailScreen() {

  // 🌐 WEB (centered)
  if (Platform.OS === 'web') {
    return (
      <SafeAreaView className="flex-1 items-center justify-center px-4 bg-background">
        <Animated.View
          entering={FadeInDown.duration(400)}
          className="w-full max-w-md"
        >
          <VerifyEmailForm />
        </Animated.View>
      </SafeAreaView>
    );
  }

  // 📱 MOBILE (stable)
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
            paddingTop:260,
          }}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View entering={FadeInDown.duration(400)}>
            <VerifyEmailForm />
          </Animated.View>
        </ScrollView>

      </KeyboardAvoidingView>

    </SafeAreaView>
  );
}
