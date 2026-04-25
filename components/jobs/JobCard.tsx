import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import type { Job } from '@/lib/jobs-data';
import { formatSalary, timeAgo } from '@/lib/jobs-data';
import {
  Bookmark,
  BookmarkCheck,
  Briefcase,
  CheckCircle2,
  Clock,
  MapPin,
} from 'lucide-react-native';
import React, { memo } from 'react';
import { Platform, Pressable, View } from 'react-native';

interface JobCardProps {
  job: Job;
  isSelected?: boolean;
  compact?: boolean;
  onPress?: () => void;
  onToggleSave?: () => void;
}

const skillColorMap = [
  {
    bg: 'bg-[var(--color-indigo-soft)]',
    text: 'text-[var(--color-primary)]',
    border: 'border-[var(--color-indigo-border)]',
  },
  {
    bg: 'bg-[var(--color-blue-soft)]',
    text: 'text-[var(--color-blue)]',
    border: 'border-[var(--color-blue-border)]',
  },
  {
    bg: 'bg-[var(--color-green-soft)]',
    text: 'text-[var(--color-green)]',
    border: 'border-[var(--color-green-border)]',
  },
  {
    bg: 'bg-[var(--color-amber-soft)]',
    text: 'text-[var(--color-amber)]',
    border: 'border-[var(--color-amber-border)]',
  },
];

function JobCardComponent({
  job,
  isSelected,
  compact,
  onPress,
  onToggleSave,
}: JobCardProps) {
  const accentIndex = job.company.name.charCodeAt(0) % skillColorMap.length;
  const accent = skillColorMap[accentIndex];

  return (
    <Pressable
      onPress={onPress}
      className={cn(
        'rounded-xl border bg-[var(--color-surface-1)] border-[var(--color-border)]',
        'flex-row items-stretch gap-4 p-4',
        'shadow-[var(--shadow-sm)]',
        isSelected &&
          'border-[var(--color-primary)] bg-[var(--color-primary-soft)] shadow-[var(--shadow-md)]',
        Platform.select({
          web: cn(
            'cursor-pointer transition-all duration-200',
            !isSelected &&
              'hover:border-[var(--color-primary-border)] hover:shadow-[var(--shadow-md)] hover:-translate-y-[1px]'
          ),
        })
      )}
    >
      {/* LEFT STRIP */}
      <View className="w-32 m-1">
        <View
          className={cn(
            'flex-1 rounded-lg items-center justify-center border',
            accent.bg,
            accent.border
          )}
        >
          <Text className={cn('text-base font-bold', accent.text)}>
            {job.company.name.charAt(0)}
          </Text>
        </View>
      </View>

      {/* RIGHT CONTENT */}
      <View className="flex-1">
        {/* TOP */}
        <View className="flex-row items-start justify-between gap-2">
          <View className="flex-1">
            <Text
              className="text-[15px] font-semibold text-[var(--color-foreground)] leading-tight"
              numberOfLines={2}
            >
              {job.title}
            </Text>
            <Text
              className="text-xs text-[var(--color-muted-foreground)] mt-1"
              numberOfLines={1}
            >
              {job.company.name}
            </Text>
          </View>

          <Pressable
            onPress={(e) => {
              e.stopPropagation?.();
              onToggleSave?.();
            }}
            hitSlop={10}
            className="p-1 rounded-md active:scale-90"
          >
            <Icon
              as={job.is_saved ? BookmarkCheck : Bookmark}
              className={cn(
                'size-5',
                job.is_saved
                  ? 'text-[var(--color-blue)]'
                  : 'text-[var(--color-muted-foreground)]'
              )}
            />
          </Pressable>
        </View>

        {/* META */}
        <View className="flex-row flex-wrap items-center gap-x-3 gap-y-1 mt-2">
          <View className="flex-row items-center gap-1">
            <Icon as={MapPin} className="size-3.5 text-[var(--color-muted-foreground)]" />
            <Text className="text-xs text-[var(--color-muted-foreground)]">
              {job.location.type === 'remote'
                ? `Remote · ${job.location.country}`
                : `${job.location.city}, ${job.location.country}`}
            </Text>
          </View>

          <View className="flex-row items-center gap-1">
            <Icon as={Briefcase} className="size-3.5 text-[var(--color-muted-foreground)]" />
            <Text className="text-xs text-[var(--color-muted-foreground)] capitalize">
              {job.employment_type.replace('_', ' ')}
            </Text>
          </View>

          <View className="flex-row items-center gap-1">
            <Icon as={Clock} className="size-3.5 text-[var(--color-muted-foreground)]" />
            <Text className="text-xs text-[var(--color-muted-foreground)]">
              {timeAgo(job.posted_at)}
            </Text>
          </View>
        </View>

        {/* SALARY + STATUS */}
        <View className="flex-row items-center justify-between mt-3">
          {job.salary.visible && (
            <Text className="text-sm font-semibold text-[var(--color-green)]">
              {formatSalary(job.salary)}
            </Text>
          )}
          {job.has_applied && (
            <View className="flex-row items-center gap-1 rounded-full bg-[var(--color-green-soft)] px-2 py-0.5">
              <Icon as={CheckCircle2} className="size-3 text-[var(--color-green)]" />
              <Text className="text-[10px] font-semibold text-[var(--color-green)]">
                Applied
              </Text>
            </View>
          )}
        </View>

        {/* SKILLS */}
        <View className="flex-row flex-wrap gap-2 mt-3">
          {job.skills.slice(0, compact ? 3 : 5).map((skill, i) => {
            const color = skillColorMap[i % skillColorMap.length];
            return (
              <View
                key={skill}
                className={cn('px-2.5 py-1 rounded-md border', color.bg, color.border)}
              >
                <Text className={cn('text-[11px] font-medium', color.text)}>
                  {skill}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </Pressable>
  );
}

// Custom comparator — only re-render when fields that affect the UI change
export const JobCard = memo(JobCardComponent, (prev, next) => {
  return (
    prev.job.id === next.job.id &&
    prev.job.is_saved === next.job.is_saved &&
    prev.job.has_applied === next.job.has_applied &&
    prev.isSelected === next.isSelected &&
    prev.compact === next.compact &&
    prev.onPress === next.onPress &&
    prev.onToggleSave === next.onToggleSave
  );
});
