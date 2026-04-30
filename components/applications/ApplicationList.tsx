import React, { memo } from 'react';
import { View, Pressable, ScrollView, Platform } from 'react-native';
import { Icon } from '@/components/ui/icon';
import { MapPin, Briefcase } from 'lucide-react-native';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import Animated, { LinearTransition } from 'react-native-reanimated';

export interface AppType {
  id: string;
  current_status: string;
  applied_at: string;
  job: {
    id: string;
    title: string;
    company: { name: string };
    salary: { min: number; max: number; currency: string; visible?: boolean };
    location: { type: string; city: string | null; country: string };
    employment_type: string;
  };
}

interface ApplicationListProps {
  applications: AppType[];
  onSelectApp: (id: string) => void;
  selectedAppId?: string | null;
}

const skillColorMap = [
  { bg: 'bg-[var(--color-indigo-soft)]', text: 'text-[var(--color-primary)]', border: 'border-[var(--color-indigo-border)]' },
  { bg: 'bg-[var(--color-blue-soft)]', text: 'text-[var(--color-blue)]', border: 'border-[var(--color-blue-border)]' },
  { bg: 'bg-[var(--color-green-soft)]', text: 'text-[var(--color-green)]', border: 'border-[var(--color-green-border)]' },
  { bg: 'bg-[var(--color-amber-soft)]', text: 'text-[var(--color-amber)]', border: 'border-[var(--color-amber-border)]' },
];

export const STATUS_COLORS: Record<string, { bg: string, text: string, border: string }> = {
  'applied': { bg: 'bg-[var(--color-indigo-soft)]', text: 'text-[var(--color-primary)]', border: 'border-[var(--color-indigo-border)]' },
  'screening': { bg: 'bg-[var(--color-blue-soft)]', text: 'text-[var(--color-blue)]', border: 'border-[var(--color-blue-border)]' },
  'interview': { bg: 'bg-[var(--color-amber-soft)]', text: 'text-[var(--color-amber)]', border: 'border-[var(--color-amber-border)]' },
  'offer': { bg: 'bg-[var(--color-green-soft)]', text: 'text-[var(--color-green)]', border: 'border-[var(--color-green-border)]' },
  'rejected': { bg: 'bg-[var(--color-destructive-soft)]', text: 'text-[var(--color-destructive)]', border: 'border-[var(--color-destructive-border)]' },
};

export const ApplicationList = memo(function ApplicationList({
  applications,
  onSelectApp,
  selectedAppId,
}: ApplicationListProps) {
  return (
    <ScrollView className="flex-1 p-4" contentContainerStyle={{ paddingBottom: 24 }}>
      {applications.length === 0 ? (
        <Text className="text-center text-muted-foreground mt-4">No applications found.</Text>
      ) : (
        <View className="gap-3">
          {applications.map((app) => {
            const dateTxt = new Date(app.applied_at).toLocaleDateString();
            const isSelected = selectedAppId === app.id;
            const accentIndex = app.job.company.name.charCodeAt(0) % skillColorMap.length;
            const accent = skillColorMap[accentIndex];
            const statusKey = app.current_status.toLowerCase();
            const statusColor = STATUS_COLORS[statusKey] || { bg: 'bg-[var(--color-muted)]', text: 'text-foreground', border: 'border-transparent' };
            
            return (
              <Animated.View key={app.id} layout={LinearTransition.springify().damping(20).stiffness(150)}>
                <Pressable
                  onPress={() => onSelectApp(app.id)}
                  className={cn(
                    'rounded-xl border bg-[var(--color-surface-1)] border-[var(--color-border)]',
                    'flex-row items-stretch gap-4 p-4',
                    'shadow-[var(--shadow-sm)]',
                    isSelected && 'border-[var(--color-primary)] bg-[var(--color-primary-soft)] shadow-[var(--shadow-md)]',
                    Platform.select({
                      web: cn(
                        'cursor-pointer transition-all duration-200',
                        !isSelected && 'hover:border-[var(--color-primary-border)] hover:shadow-[var(--shadow-md)] hover:-translate-y-[1px]'
                      ),
                    })
                  )}
                >
                  {/* LEFT STRIP MONOGRAM */}
                  <View className="w-[60px] m-1">
                    <View
                      className={cn(
                        'flex-1 rounded-lg items-center justify-center border',
                        accent.bg,
                        accent.border
                      )}
                    >
                      <Text className={cn('text-lg font-bold', accent.text)}>
                        {app.job.company.name.charAt(0).toUpperCase()}
                      </Text>
                    </View>
                  </View>

                  {/* RIGHT CONTENT */}
                  <View className="flex-1 py-1">
                    <Text className="text-[15px] font-semibold text-[var(--color-foreground)] leading-tight mb-0.5" numberOfLines={2}>
                      {app.job.title}
                    </Text>
                    <Text className="text-xs text-[var(--color-muted-foreground)] mb-2" numberOfLines={1}>
                      {app.job.company.name}
                    </Text>
                    
                    <View className="flex-row flex-wrap items-center gap-x-3 gap-y-1 mb-3">
                       <View className="flex-row items-center gap-1">
                          <Icon as={MapPin} className="size-3 text-[var(--color-muted-foreground)]" />
                          <Text className="text-[11px] text-[var(--color-muted-foreground)]">
                           {app.job.location?.type === 'remote' ? 'Remote · ' + app.job.location.country : `${app.job.location?.city || ''}, ${app.job.location?.country || ''}`}
                          </Text>
                       </View>
                       <View className="flex-row items-center gap-1">
                          <Icon as={Briefcase} className="size-3 text-[var(--color-muted-foreground)]" />
                          <Text className="text-[11px] text-[var(--color-muted-foreground)] capitalize">
                            {app.job.employment_type?.replace('_', ' ') || 'Full Time'}
                          </Text>
                       </View>
                    </View>
                    
                    <View className="flex-row items-center justify-between mt-auto pt-2 border-t border-[var(--color-border)]">
                      <View>
                        <Text className="text-[12px] font-semibold text-[var(--color-green)]">
                           {app.job.salary?.min.toLocaleString()} - {app.job.salary?.max.toLocaleString()} {app.job.salary?.currency}
                        </Text>
                        <Text className="text-[10px] text-[var(--color-muted-foreground)] mt-0.5">
                           Applied: {dateTxt}
                        </Text>
                      </View>
                      {/* Status Tag */}
                      <View className={cn('px-2.5 py-1 rounded-full border', statusColor.bg, statusColor.border)}>
                        <Text className={cn('text-[10px] font-bold capitalize tracking-widest', statusColor.text)}>
                          {statusKey}
                        </Text>
                      </View>
                    </View>
                  </View>

                </Pressable>
              </Animated.View>
            );
          })}
        </View>
      )}
    </ScrollView>
  );
});
