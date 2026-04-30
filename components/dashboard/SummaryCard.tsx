import React from 'react';
import { View, Platform } from 'react-native';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';

interface SummaryCardProps {
  title: string;
  count: number;
  icon: any;
  className?: string;
  iconColor?: string;
}

export function SummaryCard({ title, count, icon, className, iconColor = 'text-primary' }: SummaryCardProps) {
  return (
    <View 
      className={cn(
        "rounded-2xl bg-card border border-border p-4 flex-col justify-between shadow-sm",
        className
      )}
      style={{ height: Platform.OS === 'web' ? 100 : 90 }}
    >
      <View className="flex-row items-center justify-between">
        <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{title}</Text>
        <View className="size-8 rounded-full bg-surface-2 items-center justify-center">
          <Icon as={icon} className={cn("size-4", iconColor)} />
        </View>
      </View>
      <Text className="text-2xl font-bold mt-1 text-foreground">{count}</Text>
    </View>
  );
}
