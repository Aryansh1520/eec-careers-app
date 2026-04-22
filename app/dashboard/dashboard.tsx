import { Text } from '@/components/ui/text';
import React from 'react';
import { View } from 'react-native';

export default function DashboardIndex() {
  return (
    <View className="flex-1 bg-background items-center justify-center gap-6 p-4">
      <Text className="text-3xl font-bold">Dashboard</Text>
      <Text className="text-muted-foreground text-center">
        Welcome! You've successfully logged in.
      </Text>
    </View>
  );
}
