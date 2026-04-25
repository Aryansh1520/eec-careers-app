import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react-native';
import React from 'react';
import { Platform, Pressable, ScrollView, View } from 'react-native';

export interface FilterChip {
  key: string;
  label: string;
}

interface FilterChipsProps {
  chips: FilterChip[];
  onRemove: (key: string) => void;
  onClearAll?: () => void;
  className?: string;
}

export function FilterChips({ chips, onRemove, onClearAll, className }: FilterChipsProps) {
  if (chips.length === 0) return null;

  return (
    <View className={cn('flex-row items-center gap-2', className)}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 6, alignItems: 'center' }}
      >
        {chips.map((chip) => (
          <Pressable
            key={chip.key}
            onPress={() => onRemove(chip.key)}
            className={cn(
              'bg-primary/10 flex-row items-center gap-1 rounded-full px-2.5 py-1',
              Platform.select({
                web: 'cursor-pointer transition-colors hover:bg-primary/20',
              })
            )}
          >
            <Text className="text-primary text-xs font-medium">{chip.label}</Text>
            <Icon as={X} className="text-primary size-3" />
          </Pressable>
        ))}
      </ScrollView>

      {chips.length > 1 && onClearAll && (
        <Pressable onPress={onClearAll}>
          <Text className="text-destructive text-xs font-medium">Clear all</Text>
        </Pressable>
      )}
    </View>
  );
}
