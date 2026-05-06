import React from 'react';
import { Platform, ScrollView, View, Pressable, KeyboardAvoidingView } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { Link, useRouter } from 'expo-router';
import { Building2 } from 'lucide-react-native';

export default function CompanySignUpScreen() {
  const router = useRouter();
  const passwordInputRef = React.useRef<any>(null);

  function onSubmit() {
    router.replace('/company-dashboard');
  }

  const form = (
    <View className="gap-6">
      <Card className="border-border/0 sm:border-border shadow-none sm:shadow-sm sm:shadow-black/5">
        <CardHeader>
          <View className="flex-row items-center gap-2 justify-center sm:justify-start mb-1">
            <View className="size-8 rounded-lg bg-primary-soft items-center justify-center">
              <Icon as={Building2} className="size-4 text-primary" />
            </View>
            <CardTitle className="text-center text-xl sm:text-left">Register Company</CardTitle>
          </View>
          <CardDescription className="text-center sm:text-left">
            Create a company account to post jobs and manage applications
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-6">
          <View className="gap-6">
            <View className="gap-1.5">
              <Label htmlFor="company-name">Company Name</Label>
              <Input
                id="company-name"
                placeholder="Your Company Name"
                autoCapitalize="words"
                returnKeyType="next"
              />
            </View>
            <View className="gap-1.5">
              <Label htmlFor="company-email">Company Email</Label>
              <Input
                id="company-email"
                placeholder="hr@company.com"
                keyboardType="email-address"
                autoComplete="email"
                autoCapitalize="none"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
                returnKeyType="next"
                submitBehavior="submit"
              />
            </View>
            <View className="gap-1.5">
              <Label htmlFor="company-password">Password</Label>
              <Input
                ref={passwordInputRef}
                id="company-password"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={onSubmit}
              />
            </View>
            <Button className="w-full" onPress={onSubmit}>
              <Text>Create Company Account</Text>
            </Button>
          </View>
          <Text className="text-center text-sm">
            Already have a company account?{' '}
            <Link href="/company-login" asChild>
              <Pressable>
                <Text className="text-sm underline underline-offset-4">Sign in</Text>
              </Pressable>
            </Link>
          </Text>
          <Text className="text-center text-sm text-muted-foreground">
            <Link href="/sign-up" asChild>
              <Pressable>
                <Text className="text-sm text-muted-foreground underline underline-offset-4">← Back to candidate sign up</Text>
              </Pressable>
            </Link>
          </Text>
        </CardContent>
      </Card>
    </View>
  );

  if (Platform.OS === 'web') {
    return (
      <SafeAreaView className="flex-1 items-center justify-center px-4 bg-background">
        <Animated.View entering={FadeInDown.duration(400)} className="w-full max-w-md">
          {form}
        </Animated.View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom', 'left', 'right']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ padding: 16, paddingTop: 100 }}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View entering={FadeInDown.duration(400)}>
            {form}
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
