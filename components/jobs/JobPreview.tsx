import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import type { Job } from '@/lib/jobs-data';
import { formatSalary, timeAgo } from '@/lib/jobs-data';
import { Platform, StatusBar } from 'react-native';

const topSpacing =
  Platform.OS === 'android'
    ? StatusBar.currentHeight ?? 24
    : 44;
import {
  Bookmark,
  BookmarkCheck,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  Globe,
  MapPin,
  Send,
  Zap,
  type LucideIcon,
} from 'lucide-react-native';
import React from 'react';
import { ScrollView, View, Pressable } from 'react-native';

interface JobPreviewProps {
  job: Job | null;
  onToggleSave?: (jobId: string) => void;
  className?: string;
}

/* ─── Pill / tag color cycles ───────────────────────── */
const TAG_PALETTES = [
  { bg: 'bg-[var(--color-primary-soft)]', text: 'text-[var(--color-primary)]' },
  { bg: 'bg-[var(--color-blue-soft)]',    text: 'text-[var(--color-blue)]'    },
  { bg: 'bg-[var(--color-green-soft)]',   text: 'text-[var(--color-green)]'   },
  { bg: 'bg-[var(--color-amber-soft)]',   text: 'text-[var(--color-amber)]'   },
];

/* ─── Empty State ───────────────────────────────────── */
function EmptyState({ className }: { className?: string }) {
  return (
    <View
      className={cn(
        'flex-1 items-center justify-center gap-4',
        'bg-[var(--color-surface-1)]',
        className
      )}
    >
      <View className="size-16 rounded-2xl items-center justify-center bg-[var(--color-surface-3)]">
        <Icon as={Briefcase} className="size-7 text-[var(--color-muted-foreground)]" />
      </View>
      <Text className="text-sm text-[var(--color-muted-foreground)] text-center max-w-[180px] leading-relaxed">
        Pick a listing to see the full details
      </Text>
    </View>
  );
}

/* ─── Stat Chip ─────────────────────────────────────── */
function StatChip({
  icon: Ic,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <View className="flex-1 min-w-[40%] rounded-2xl p-3 bg-[var(--color-surface-2)] border border-[var(--color-border)]">
      <View className="flex-row items-center gap-1.5 mb-1.5">
        <Icon as={Ic} className="size-3 text-[var(--color-muted-foreground)]" />
        <Text className="text-[10px] uppercase tracking-widest font-semibold text-[var(--color-muted-foreground)]">
          {label}
        </Text>
      </View>
      <Text className="text-sm font-semibold text-[var(--color-foreground)] leading-snug capitalize">
        {value}
      </Text>
    </View>
  );
}

/* ─── Requirement Row ───────────────────────────────── */
function Req({ text }: { text: string }) {
  return (
    <View className="flex-row items-start gap-3 py-3 border-b border-[var(--color-border)]">
      <View className="mt-[5px] size-1.5 rounded-full bg-[var(--color-primary)]" />
      <Text className="flex-1 text-sm text-[var(--color-foreground)] leading-relaxed">{text}</Text>
    </View>
  );
}

/* ─── Main Component ────────────────────────────────── */
export function JobPreview({ job, onToggleSave, className }: JobPreviewProps) {
  if (!job) return <EmptyState className={className} />;

  const locationText =
    job.location.type === 'remote'
      ? `Remote · ${job.location.country}`
      : `${job.location.city}, ${job.location.country}`;

  return (
    <ScrollView
      className={cn('flex-1 bg-[var(--color-surface-1)]', className)}
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingBottom: 64 }}
      showsVerticalScrollIndicator={false}
    >

      {/* ══════════════════════════════════════════════
          HERO BAND — company initial + title
      ══════════════════════════════════════════════ */}
<View
  className="px-5 pb-5 gap-4 bg-[var(--color-surface-2)] border-b border-[var(--color-border)]"
  style={{ paddingTop: topSpacing }}
>
        {/* Avatar row */}
        <View className="flex-row items-center gap-4">
          {/* Large monogram */}
          <View
            className="size-14 rounded-2xl items-center justify-center"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            <Text className="text-2xl font-bold text-white">
              {job.company.name.charAt(0).toUpperCase()}
            </Text>
          </View>

          <View className="flex-1 gap-0.5">
            <Text className="text-[11px] uppercase tracking-widest font-semibold text-[var(--color-muted-foreground)]">
              {job.company.name}
            </Text>
            <Text
              className="text-xl font-bold text-[var(--color-foreground)] leading-snug"
              numberOfLines={2}
            >
              {job.title}
            </Text>
          </View>
        </View>

        {/* Status badges */}
        {(job.has_applied || job.is_saved) && (
          <View className="flex-row gap-2">
            {job.has_applied && (
              <View className="flex-row items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-green-soft)]">
                <Icon as={CheckCircle2} className="size-3 text-[var(--color-green)]" />
                <Text className="text-xs font-semibold text-[var(--color-green)]">Applied</Text>
              </View>
            )}
            {job.is_saved && (
              <View className="flex-row items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-blue-soft)]">
                <Icon as={BookmarkCheck} className="size-3 text-[var(--color-blue)]" />
                <Text className="text-xs font-semibold text-[var(--color-blue)]">Saved</Text>
              </View>
            )}
          </View>
        )}

        {/* CTA row */}
        <View className="flex-row gap-2 pt-1">
          <Button
            className="flex-1 rounded-2xl h-12"
            style={{ backgroundColor: 'var(--color-primary)' }}
            disabled={job.has_applied}
          >
            <Icon as={Send} className="size-4 text-white" />
            <Text className="text-sm font-bold text-white ml-1.5">
              {job.has_applied ? 'Already Applied' : 'Apply Now'}
            </Text>
          </Button>

          <Pressable
            onPress={() => onToggleSave?.(job.id)}
            className={cn(
              'size-12 rounded-2xl items-center justify-center border',
              job.is_saved
                ? 'bg-[var(--color-blue-soft)] border-[var(--color-blue-border)]'
                : 'bg-transparent border-[var(--color-border)]'
            )}
          >
            <Icon
              as={job.is_saved ? BookmarkCheck : Bookmark}
              className={cn(
                'size-5',
                job.is_saved ? 'text-[var(--color-blue)]' : 'text-[var(--color-muted-foreground)]'
              )}
            />
          </Pressable>
        </View>
      </View>

      {/* ══════════════════════════════════════════════
          QUICK STATS GRID
      ══════════════════════════════════════════════ */}
      <View className="px-5 pt-5">
        <Text className="text-[10px] uppercase tracking-widest font-semibold text-[var(--color-muted-foreground)] mb-3">
          Overview
        </Text>
        <View className="flex-row flex-wrap gap-2">
          <StatChip icon={MapPin}    label="Location"   value={locationText} />
          <StatChip icon={Briefcase} label="Type"       value={job.employment_type} />
          <StatChip icon={Building2} label="Level"      value={job.experience_level} />
          <StatChip icon={Calendar}  label="Posted"     value={timeAgo(job.posted_at)} />
          {job.salary.visible && (
            <View className="w-full rounded-2xl p-3 bg-[var(--color-green-soft)] border border-[var(--color-green-border)] flex-row items-center justify-between">
              <View className="flex-row items-center gap-1.5">
                <Icon as={DollarSign} className="size-3.5 text-[var(--color-green)]" />
                <Text className="text-[10px] uppercase tracking-widest font-semibold text-[var(--color-green)]">
                  Salary
                </Text>
              </View>
              <Text className="text-sm font-bold text-[var(--color-green)]">
                {formatSalary(job.salary)}
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* ══════════════════════════════════════════════
          SKILLS
      ══════════════════════════════════════════════ */}
      <View className="px-5 pt-6">
        <Text className="text-[10px] uppercase tracking-widest font-semibold text-[var(--color-muted-foreground)] mb-3">
          Skills
        </Text>
        <View className="flex-row flex-wrap gap-2">
          {job.skills.map((skill, i) => {
            const p = TAG_PALETTES[i % TAG_PALETTES.length];
            return (
              <View key={skill} className={cn('px-3 py-1.5 rounded-full', p.bg)}>
                <Text className={cn('text-xs font-semibold', p.text)}>{skill}</Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* ══════════════════════════════════════════════
          ABOUT THE ROLE
      ══════════════════════════════════════════════ */}
      <View className="px-5 pt-6">
        <Text className="text-[10px] uppercase tracking-widest font-semibold text-[var(--color-muted-foreground)] mb-3">
          About the Role
        </Text>
        <Text className="text-sm text-[var(--color-muted-foreground)] leading-7">
          {job.description}
        </Text>
      </View>

      {/* ══════════════════════════════════════════════
          REQUIREMENTS
      ══════════════════════════════════════════════ */}
      {job.requirements.length > 0 && (
        <View className="px-5 pt-6">
          <Text className="text-[10px] uppercase tracking-widest font-semibold text-[var(--color-muted-foreground)] mb-1">
            Requirements
          </Text>
          {job.requirements.map((req, i) => (
            <Req key={i} text={req} />
          ))}
        </View>
      )}

    </ScrollView>
  );
}
