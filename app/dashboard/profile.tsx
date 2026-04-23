import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Text } from '@/components/ui/text';
import { usePersistentTheme } from '@/lib/theme-store';
import { useRouter } from 'expo-router';
import { Pencil } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const { theme, toggleTheme } = usePersistentTheme();

  return (
    <View className="flex-1 bg-background items-center justify-center gap-6 p-4">
      <Text className="text-3xl font-bold">Profile</Text>

      <View className="gap-6 w-full max-w-xs mt-8">
        {/* Edit Profile button */}
        <Button
          onPress={() => router.push({ pathname: '/onboarding', params: { mode: 'update' } })}
          className="w-full flex-row gap-2"
          variant="outline">
          <Icon as={Pencil} size={16} className="text-foreground" />
          <Text>Edit Profile</Text>
        </Button>

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
