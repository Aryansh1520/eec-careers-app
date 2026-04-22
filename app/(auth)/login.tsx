import { SignInForm } from '@/components/sign-in-form';
import React from 'react';
import { Platform, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {

  // 🌐 WEB LAYOUT (browser behaves well)
  if (Platform.OS === 'web') {
    return (
      <SafeAreaView className="flex-1 items-center justify-center px-4">
        <View className="w-full max-w-md">
          <SignInForm />
        </View>
      </SafeAreaView>
    );
  }

  // 📱 MOBILE LAYOUT (NO centering tricks)
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          padding: 16,
          paddingTop: 150, // fix your "top padding missing" issue
        }}
        keyboardShouldPersistTaps="handled"
      >
        <SignInForm />
      </ScrollView>
    </SafeAreaView>
  );
}
