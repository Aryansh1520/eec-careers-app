import { Text } from '@/components/ui/text';
import React from 'react';
import { View } from 'react-native';

export default function ApplicationsScreen() {
  return (
    <View className="flex-1 bg-background items-center justify-center gap-6 p-4">
      <Text className="text-3xl font-bold">Applications</Text>
      <Text className="text-muted-foreground text-center">
        Track your applied jobs and interview status.
      </Text>
    </View>
  );
}
