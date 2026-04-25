import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { MapPin, Search } from 'lucide-react-native';
import React from 'react';
import { Platform, Pressable, View } from 'react-native';

interface JobSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  locationQuery: string;
  onLocationChange: (location: string) => void;
  quickFilters?: string[];
  activeQuickFilters?: string[];
  onQuickFilterToggle?: (filter: string) => void;
  className?: string;
}

export function JobSearchBar({
  searchQuery,
  onSearchChange,
  locationQuery,
  onLocationChange,
  quickFilters = ['Remote', 'Full Time', 'Part Time', 'Contract'],
  activeQuickFilters = [],
  onQuickFilterToggle,
  className,
}: JobSearchBarProps) {
  return (
    <View
      className={cn(
        'bg-background border-border gap-3 border-b px-4 pb-3 pt-4',
        Platform.select({
          web: 'sticky top-0 z-30',
        }),
        className
      )}
    >
      {/* Search fields row */}
      <View className="flex-row gap-3">
        <View className="min-w-0 flex-1">
          <View className="pointer-events-none absolute left-3 top-0 bottom-0 z-10 justify-center">
            <Icon as={Search} className="text-muted-foreground size-4" />
          </View>
          <Input
            value={searchQuery}
            onChangeText={onSearchChange}
            placeholder="Job title, skill, or company..."
            className="pl-9"
          />
        </View>
        <View className="min-w-0 flex-1">
          <View className="pointer-events-none absolute left-3 top-0 bottom-0 z-10 justify-center">
            <Icon as={MapPin} className="text-muted-foreground size-4" />
          </View>
          <Input
            value={locationQuery}
            onChangeText={onLocationChange}
            placeholder="City, country, or remote..."
            className="pl-9"
          />
        </View>
      </View>

      {/* Quick filter chips */}
      {quickFilters.length > 0 && (
        <View className="flex-row flex-wrap gap-2">
          {quickFilters.map((filter) => {
            const isActive = activeQuickFilters.includes(filter);
            return (
              <Pressable
                key={filter}
                onPress={() => onQuickFilterToggle?.(filter)}
                className={cn(
                  'rounded-full border px-3 py-1',
                  isActive
                    ? 'bg-primary border-primary'
                    : 'border-border bg-secondary',
                  Platform.select({
                    web: 'cursor-pointer transition-colors',
                  })
                )}
              >
                <Text
                  className={cn(
                    'text-xs font-medium',
                    isActive ? 'text-primary-foreground' : 'text-secondary-foreground'
                  )}
                >
                  {filter}
                </Text>
              </Pressable>
            );
          })}
        </View>
      )}
    </View>
  );
}
