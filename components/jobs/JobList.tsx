import { JobCard } from '@/components/jobs/JobCard';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import type { Job, SortOption } from '@/lib/jobs-data';
import { SORT_LABELS } from '@/lib/jobs-data';
import React, { useCallback, useRef } from 'react';
import { FlatList, Platform, View } from 'react-native';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface JobListProps {
  jobs: Job[];
  selectedJobId?: string | null;
  compact?: boolean;
  sortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
  onSelectJob: (job: Job) => void;
  onToggleSave?: (jobId: string) => void;
  hideSortHeader?: boolean;
  className?: string;
}

// Stable outside the component — never recreated
const contentContainerStyleNormal = { padding: 16, paddingBottom: 100, gap: 12 };
const contentContainerStyleCompact = { padding: 16, paddingBottom: 100, gap: 8 };

export function JobList({
  jobs,
  selectedJobId,
  compact = false,
  sortOption,
  onSortChange,
  onSelectJob,
  onToggleSave,
  hideSortHeader = false,
  className,
}: JobListProps) {
  const flatListRef = useRef<FlatList>(null);

  // Stable callbacks — deps are primitives/stable refs, not object recreations
  const handleSelectJob = useCallback(
    (job: Job) => onSelectJob(job),
    [onSelectJob]
  );

  const handleToggleSave = useCallback(
    (jobId: string) => onToggleSave?.(jobId),
    [onToggleSave]
  );

  const renderItem = useCallback(
    ({ item }: { item: Job }) => (
      <JobCard
        job={item}
        isSelected={selectedJobId === item.id}
        compact={compact}
        onPress={() => handleSelectJob(item)}
        onToggleSave={() => handleToggleSave(item.id)}
      />
    ),
    // selectedJobId and compact are the only values that change rendering per-item
    [selectedJobId, compact, handleSelectJob, handleToggleSave]
  );

  const keyExtractor = useCallback((item: Job) => item.id, []);

  const sortValue = { value: sortOption, label: SORT_LABELS[sortOption] };

  return (
    <View className={cn('flex-1', className)}>
      {!hideSortHeader && (
        <View className="flex-row items-center justify-between px-4 py-3">
          <Text className="text-muted-foreground text-sm">
            <Text className="text-foreground font-semibold">{jobs.length}</Text>{' '}
            {jobs.length === 1 ? 'job' : 'jobs'} found
          </Text>

          <View className="w-44">
            <Select
              value={sortValue}
              onValueChange={(option) => {
                if (option) onSortChange(option.value as SortOption);
              }}
            >
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(SORT_LABELS) as SortOption[]).map((key) => (
                  <SelectItem key={key} value={key} label={SORT_LABELS[key]} />
                ))}
              </SelectContent>
            </Select>
          </View>
        </View>
      )}

      <FlatList
        ref={flatListRef}
        data={jobs}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={
          compact ? contentContainerStyleCompact : contentContainerStyleNormal
        }
        showsVerticalScrollIndicator={false}
        // ---- Performance props ----
        removeClippedSubviews={Platform.OS !== 'web'}
        maxToRenderPerBatch={8}
        updateCellsBatchingPeriod={50}
        initialNumToRender={10}
        windowSize={5}
        ListEmptyComponent={
          <View className="items-center justify-center py-20">
            <Text className="text-muted-foreground text-sm">
              No jobs match your filters
            </Text>
            <Text className="text-muted-foreground mt-1 text-xs">
              Try adjusting your search or filters
            </Text>
          </View>
        }
      />
    </View>
  );
}
