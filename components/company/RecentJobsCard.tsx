import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

type JobStatus = 'draft' | 'published' | 'paused' | 'closed' | 'archived';

const STATUS_CHIP: Record<JobStatus, { bg: string; text: string }> = {
  draft: { bg: 'bg-muted', text: 'text-muted-foreground' },
  published: { bg: 'bg-[var(--color-green-soft)]', text: 'text-[var(--color-green)]' },
  paused: { bg: 'bg-[var(--color-amber-soft)]', text: 'text-[var(--color-amber)]' },
  closed: { bg: 'bg-destructive/10', text: 'text-destructive' },
  archived: { bg: 'bg-muted', text: 'text-muted-foreground' },
};

interface RecentJob {
  id: string;
  title: string;
  status: JobStatus;
  applicant_count: number;
  posted_at: string;
  employment_type: string;
  location: string;
}

interface RecentJobsCardProps {
  jobs: RecentJob[];
  className?: string;
}

export function RecentJobsCard({ jobs, className }: RecentJobsCardProps) {
  return (
    <View className={cn('bg-card rounded-2xl border border-border shadow-sm p-4', className)}>
      <Text className="text-sm font-semibold text-foreground mb-3 uppercase tracking-widest">
        Recent Postings
      </Text>
      {jobs.map((job, i) => {
        const chip = STATUS_CHIP[job.status] || STATUS_CHIP.draft;
        const postedDate = new Date(job.posted_at).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
        });

        return (
          <View
            key={job.id}
            className={cn(
              'flex-row items-center justify-between py-3',
              i < jobs.length - 1 && 'border-b border-border/50'
            )}
          >
            <View className="flex-1">
              <Text className="text-sm font-semibold text-foreground" numberOfLines={1}>
                {job.title}
              </Text>
              <Text className="text-xs text-muted-foreground mt-0.5">
                {job.applicant_count} applicants · {postedDate}
              </Text>
            </View>
            <View className={cn('px-2.5 py-1 rounded-full', chip.bg)}>
              <Text className={cn('text-[10px] font-bold uppercase tracking-wider', chip.text)}>
                {job.status}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}
