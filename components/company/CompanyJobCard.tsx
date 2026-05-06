import React from 'react';
import { View, Pressable, Platform } from 'react-native';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import {
  MapPin,
  Users,
  Calendar,
  Pencil,
  Pause,
  Play,
  XCircle,
  Eye,
  EyeOff,
} from 'lucide-react-native';
import type { CompanyJob, JobStatus } from '@/lib/company-jobs-data';

const STATUS_CHIP: Record<JobStatus, { bg: string; text: string }> = {
  draft: { bg: 'bg-muted', text: 'text-muted-foreground' },
  published: { bg: 'bg-[var(--color-green-soft)]', text: 'text-[var(--color-green)]' },
  paused: { bg: 'bg-[var(--color-amber-soft)]', text: 'text-[var(--color-amber)]' },
  closed: { bg: 'bg-destructive/10', text: 'text-destructive' },
  archived: { bg: 'bg-muted', text: 'text-muted-foreground' },
};

interface CompanyJobCardProps {
  job: CompanyJob;
  isRestricted: boolean;
  className?: string;
}

export function CompanyJobCard({ job, isRestricted, className }: CompanyJobCardProps) {
  const chip = STATUS_CHIP[job.status] || STATUS_CHIP.draft;
  const postedDate = new Date(job.posted_at).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const locationStr = job.location.city
    ? `${job.location.city}, ${job.location.country}`
    : job.location.country;

  const salaryStr = job.salary.visible
    ? `₹${(job.salary.min / 100000).toFixed(1)}L – ₹${(job.salary.max / 100000).toFixed(1)}L`
    : 'Salary hidden';

  const actionsDisabled = isRestricted || job.status === 'archived' || job.status === 'closed';

  return (
    <View
      className={cn(
        'bg-card rounded-2xl border border-border shadow-sm p-4',
        isRestricted && 'opacity-70',
        className
      )}
    >
      {/* Header: Title + Status */}
      <View className="flex-row items-start justify-between mb-2">
        <View className="flex-1 mr-3">
          <Text className="text-base font-bold text-foreground" numberOfLines={1}>
            {job.title}
          </Text>
          <Text className="text-xs text-muted-foreground mt-0.5 capitalize">
            {job.employment_type} · {job.experience_level}
          </Text>
        </View>
        <View className={cn('px-2.5 py-1 rounded-full', chip.bg)}>
          <Text className={cn('text-[10px] font-bold uppercase tracking-wider', chip.text)}>
            {job.status}
          </Text>
        </View>
      </View>

      {/* Details Row */}
      <View className="flex-row flex-wrap gap-3 mt-2">
        <View className="flex-row items-center gap-1">
          <Icon as={MapPin} className="size-3.5 text-muted-foreground" />
          <Text className="text-xs text-muted-foreground">{locationStr}</Text>
        </View>
        <View className="flex-row items-center gap-1">
          <Icon as={Users} className="size-3.5 text-muted-foreground" />
          <Text className="text-xs text-muted-foreground">{job.applicant_count} applicants</Text>
        </View>
        <View className="flex-row items-center gap-1">
          <Icon as={Calendar} className="size-3.5 text-muted-foreground" />
          <Text className="text-xs text-muted-foreground">{postedDate}</Text>
        </View>
      </View>

      {/* Salary */}
      <Text className="text-sm font-semibold text-foreground mt-3">{salaryStr}</Text>

      {/* Skills */}
      <View className="flex-row flex-wrap gap-1.5 mt-3">
        {job.skills.slice(0, 4).map((skill) => (
          <View key={skill} className="bg-primary-soft px-2.5 py-1 rounded-full">
            <Text className="text-[10px] font-semibold text-primary">{skill}</Text>
          </View>
        ))}
      </View>

      {/* Actions Row */}
      <View className="flex-row items-center gap-2 mt-4 pt-3 border-t border-border/50">
        <Pressable
          disabled={actionsDisabled}
          className={cn(
            'flex-1 flex-row items-center justify-center gap-1.5 py-2 rounded-xl bg-primary-soft',
            actionsDisabled && 'opacity-40'
          )}
        >
          <Icon as={Pencil} className="size-3.5 text-primary" />
          <Text className="text-xs font-semibold text-primary">Edit</Text>
        </Pressable>

        {job.status === 'published' ? (
          <Pressable
            disabled={actionsDisabled}
            className={cn(
              'flex-1 flex-row items-center justify-center gap-1.5 py-2 rounded-xl bg-[var(--color-amber-soft)]',
              actionsDisabled && 'opacity-40'
            )}
          >
            <Icon as={Pause} className="size-3.5 text-[var(--color-amber)]" />
            <Text className="text-xs font-semibold text-[var(--color-amber)]">Pause</Text>
          </Pressable>
        ) : job.status === 'paused' ? (
          <Pressable
            disabled={actionsDisabled}
            className={cn(
              'flex-1 flex-row items-center justify-center gap-1.5 py-2 rounded-xl bg-[var(--color-green-soft)]',
              actionsDisabled && 'opacity-40'
            )}
          >
            <Icon as={Play} className="size-3.5 text-[var(--color-green)]" />
            <Text className="text-xs font-semibold text-[var(--color-green)]">Resume</Text>
          </Pressable>
        ) : job.status === 'draft' ? (
          <Pressable
            disabled={actionsDisabled}
            className={cn(
              'flex-1 flex-row items-center justify-center gap-1.5 py-2 rounded-xl bg-[var(--color-green-soft)]',
              actionsDisabled && 'opacity-40'
            )}
          >
            <Icon as={Eye} className="size-3.5 text-[var(--color-green)]" />
            <Text className="text-xs font-semibold text-[var(--color-green)]">Publish</Text>
          </Pressable>
        ) : null}

        {(job.status === 'published' || job.status === 'paused' || job.status === 'draft') && (
          <Pressable
            disabled={actionsDisabled}
            className={cn(
              'flex-row items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-destructive/10',
              actionsDisabled && 'opacity-40'
            )}
          >
            <Icon as={XCircle} className="size-3.5 text-destructive" />
          </Pressable>
        )}
      </View>
    </View>
  );
}
