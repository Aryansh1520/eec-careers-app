import React from 'react';
import { View, Platform } from 'react-native';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { Eye, Users, TrendingUp, Lock } from 'lucide-react-native';

interface AnalyticsPreviewProps {
  isRestricted: boolean;
  className?: string;
}

const ANALYTICS_ITEMS = [
  { label: 'Profile Views', value: '1,247', icon: Eye, color: 'text-[var(--color-blue)]', bg: 'bg-[var(--color-blue-soft)]' },
  { label: 'Total Applications', value: '142', icon: Users, color: 'text-[var(--color-green)]', bg: 'bg-[var(--color-green-soft)]' },
  { label: 'Conversion Rate', value: '11.4%', icon: TrendingUp, color: 'text-[var(--color-amber)]', bg: 'bg-[var(--color-amber-soft)]' },
];

export function AnalyticsPreview({ isRestricted, className }: AnalyticsPreviewProps) {
  return (
    <View className={cn('bg-card rounded-2xl border border-border shadow-sm p-4 relative', className)}>
      <Text className="text-sm font-semibold text-foreground mb-4 uppercase tracking-widest">
        Analytics Overview
      </Text>

      <View className="gap-3" style={{ opacity: isRestricted ? 0.35 : 1 }}>
        {ANALYTICS_ITEMS.map((item) => (
          <View key={item.label} className="flex-row items-center gap-3">
            <View className={cn('size-10 rounded-xl items-center justify-center', item.bg)}>
              <Icon as={item.icon} className={cn('size-5', item.color)} />
            </View>
            <View className="flex-1">
              <Text className="text-xs text-muted-foreground">{item.label}</Text>
              <Text className="text-lg font-bold text-foreground">{item.value}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Restricted Overlay */}
      {isRestricted && (
        <View className="absolute inset-0 rounded-2xl items-center justify-center bg-background/60">
          <View className="items-center gap-2">
            <View className="size-10 rounded-full bg-muted items-center justify-center">
              <Icon as={Lock} className="size-5 text-muted-foreground" />
            </View>
            <Text className="text-xs font-semibold text-muted-foreground text-center">
              Analytics available after approval
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}
