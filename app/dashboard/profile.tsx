import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Text } from '@/components/ui/text';
import { usePersistentTheme } from '@/lib/theme-store';
import { useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const { theme, toggleTheme } = usePersistentTheme();

  return (
    <View className="flex-1 bg-background items-center justify-center gap-6 p-4">
      <Text className="text-3xl font-bold">Profile</Text>

      <View className="gap-6 w-full max-w-xs mt-8">
        <View className="flex-row items-center justify-between border border-border/50 bg-muted/20 p-4 rounded-xl">
          <Label className="text-base" onPress={toggleTheme}>Dark Mode</Label>
          <Switch 
            checked={theme === 'dark'} 
            onCheckedChange={toggleTheme} 
          />
        </View>

        <Button
          onPress={() => router.replace('/login')}
          className="w-full mt-4"
          variant="destructive">
          <Text>Log out</Text>
        </Button>
      </View>
    </View>
  );
}
