import { Text } from '@/components/ui/text';
import React from 'react';
import { View } from 'react-native';

export default function JobsScreen() {
  return (
    <View className="flex-1 bg-background items-center justify-center gap-6 p-4">
      <Text className="text-3xl font-bold">Jobs</Text>
      <Text className="text-muted-foreground text-center">
        Browse and discover careers directly tailored to your profile.
      </Text>
    </View>
  );
}
