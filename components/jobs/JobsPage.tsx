import { FilterChips, type FilterChip } from '@/components/jobs/FilterChips';
import { FiltersPanel } from '@/components/jobs/FiltersPanel';
import { JobList } from '@/components/jobs/JobList';
import { JobPreview } from '@/components/jobs/JobPreview';
import { JobSearchBar } from '@/components/jobs/JobSearchBar';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DUMMY_JOBS,
  EMPTY_FILTERS,
  EMPLOYMENT_TYPE_LABELS,
  EXPERIENCE_LEVEL_LABELS,
  LOCATION_TYPE_LABELS,
  SORT_LABELS,
  filterJobs,
  sortJobs,
  type EmploymentType,
  type ExperienceLevel,
  type Job,
  type JobFilters,
  type LocationType,
  type SortOption,
} from '@/lib/jobs-data';
import { useBreakpoint } from '@/lib/use-breakpoint';
import { cn } from '@/lib/utils';
import { SlidersHorizontal, X } from 'lucide-react-native';
import React, { useCallback, useMemo, useState } from 'react';
import { Modal, Platform, Pressable, View } from 'react-native';

// ──────────────────────────────────────────────────
// Quick‑filter ↔ data filter mapping
// ──────────────────────────────────────────────────

const QUICK_FILTER_MAP: Record<string, Partial<JobFilters>> = {
  Remote: { locationTypes: ['remote'] },
  'Full Time': { employmentTypes: ['full_time'] },
  'Part Time': { employmentTypes: ['part_time'] },
  Contract: { employmentTypes: ['contract'] },
};

function applyQuickFilter(
  current: JobFilters,
  label: string,
  active: string[]
): { filters: JobFilters; activeQuick: string[] } {
  const mapping = QUICK_FILTER_MAP[label];
  if (!mapping) return { filters: current, activeQuick: active };

  const isActive = active.includes(label);
  const newActive = isActive ? active.filter((a) => a !== label) : [...active, label];

  // Rebuild filters from scratch based on active quick filters
  let rebuilt: JobFilters = { ...current };

  if (mapping.locationTypes) {
    const type = mapping.locationTypes[0];
    rebuilt = {
      ...rebuilt,
      locationTypes: isActive
        ? rebuilt.locationTypes.filter((t) => t !== type)
        : [...rebuilt.locationTypes.filter((t) => t !== type), type],
    };
  }
  if (mapping.employmentTypes) {
    const type = mapping.employmentTypes[0];
    rebuilt = {
      ...rebuilt,
      employmentTypes: isActive
        ? rebuilt.employmentTypes.filter((t) => t !== type)
        : [...rebuilt.employmentTypes.filter((t) => t !== type), type],
    };
  }

  return { filters: rebuilt, activeQuick: newActive };
}

// ──────────────────────────────────────────────────
// Build filter chips from active filters
// ──────────────────────────────────────────────────

function buildFilterChips(filters: JobFilters): FilterChip[] {
  const chips: FilterChip[] = [];

  filters.employmentTypes.forEach((t) =>
    chips.push({ key: `emp:${t}`, label: EMPLOYMENT_TYPE_LABELS[t] })
  );
  filters.experienceLevels.forEach((l) =>
    chips.push({ key: `exp:${l}`, label: EXPERIENCE_LEVEL_LABELS[l] })
  );
  filters.locationTypes.forEach((t) =>
    chips.push({ key: `loc:${t}`, label: LOCATION_TYPE_LABELS[t] })
  );
  filters.skills.forEach((s) => chips.push({ key: `skill:${s}`, label: s }));

  return chips;
}

function removeFilterByChipKey(filters: JobFilters, key: string): JobFilters {
  const [type, value] = key.split(':');
  switch (type) {
    case 'emp':
      return { ...filters, employmentTypes: filters.employmentTypes.filter((t) => t !== value) };
    case 'exp':
      return { ...filters, experienceLevels: filters.experienceLevels.filter((l) => l !== value) };
    case 'loc':
      return { ...filters, locationTypes: filters.locationTypes.filter((t) => t !== value) };
    case 'skill':
      return { ...filters, skills: filters.skills.filter((s) => s !== value) };
    default:
      return filters;
  }
}

// ──────────────────────────────────────────────────
// Main component
// ──────────────────────────────────────────────────

export function JobsPage() {
  const breakpoint = useBreakpoint();

  // ── State ──
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [filters, setFilters] = useState<JobFilters>(EMPTY_FILTERS);
  const [activeQuickFilters, setActiveQuickFilters] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>('newest');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [jobs, setJobs] = useState(DUMMY_JOBS);

  // ── Handlers ──
  const handleQuickFilterToggle = useCallback(
    (label: string) => {
      const result = applyQuickFilter(filters, label, activeQuickFilters);
      setFilters(result.filters);
      setActiveQuickFilters(result.activeQuick);
    },
    [filters, activeQuickFilters]
  );

  const handleToggleSave = useCallback((jobId: string) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, is_saved: !j.is_saved } : j))
    );
    setSelectedJob((prev) =>
      prev?.id === jobId ? { ...prev, is_saved: !prev.is_saved } : prev
    );
  }, []);

  const handleSelectJob = useCallback(
    (job: Job) => {
      if (breakpoint === 'mobile') {
        // On mobile, pick the job to show in the preview via modal
        setSelectedJob(job);
      } else {
        setSelectedJob(job);
      }
    },
    [breakpoint]
  );

  const handleRemoveChip = useCallback(
    (key: string) => {
      const updated = removeFilterByChipKey(filters, key);
      setFilters(updated);
      // Sync quick filters
      setActiveQuickFilters((prev) =>
        prev.filter((label) => {
          const mapping = QUICK_FILTER_MAP[label];
          if (!mapping) return true;
          if (mapping.locationTypes?.[0]) {
            return updated.locationTypes.includes(mapping.locationTypes[0] as LocationType);
          }
          if (mapping.employmentTypes?.[0]) {
            return updated.employmentTypes.includes(mapping.employmentTypes[0] as EmploymentType);
          }
          return true;
        })
      );
    },
    [filters]
  );

  const handleClearAll = useCallback(() => {
    setFilters(EMPTY_FILTERS);
    setActiveQuickFilters([]);
  }, []);

  // ── Derived data ──
  const filteredJobs = useMemo(
    () => sortJobs(filterJobs(jobs, filters, searchQuery, locationQuery), sortOption),
    [jobs, filters, searchQuery, locationQuery, sortOption]
  );

  const filterChips = useMemo(() => buildFilterChips(filters), [filters]);

  const isDesktop = breakpoint === 'desktop';
  const isTablet = breakpoint === 'tablet';
  const isMobile = breakpoint === 'mobile';

  // ──────────────────────────────────────────────────
  // MOBILE LAYOUT
  // ──────────────────────────────────────────────────

  if (isMobile) {
    return (
      <View className="bg-background flex-1">
        <JobSearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          locationQuery={locationQuery}
          onLocationChange={setLocationQuery}
          activeQuickFilters={activeQuickFilters}
          onQuickFilterToggle={handleQuickFilterToggle}
        />

        {/* Single row: result count + filter button + sort */}
        <View className="flex-row items-center justify-between px-4 py-2">
          <Text className="text-muted-foreground text-sm">
            {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'}
          </Text>
          <View className="flex-row items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onPress={() => setFilterModalVisible(true)}
            >
              <Icon as={SlidersHorizontal} className="text-foreground size-4" />
              <Text>Filters</Text>
              {filterChips.length > 0 && (
                <View className="bg-primary ml-1 size-5 items-center justify-center rounded-full">
                  <Text className="text-primary-foreground text-[10px] font-bold">
                    {filterChips.length}
                  </Text>
                </View>
              )}
            </Button>
            <View className="w-36">
              <Select
                value={{ value: sortOption, label: SORT_LABELS[sortOption] }}
                onValueChange={(option) => {
                  if (option) setSortOption(option.value as SortOption);
                }}
              >
                <SelectTrigger className="h-9">
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
        </View>

        {/* Filter chips (only shown when active) */}
        {filterChips.length > 0 && (
          <View className="px-4 pb-2">
            <FilterChips
              chips={filterChips}
              onRemove={handleRemoveChip}
              onClearAll={handleClearAll}
            />
          </View>
        )}

        <JobList
          jobs={filteredJobs}
          sortOption={sortOption}
          onSortChange={setSortOption}
          onSelectJob={handleSelectJob}
          onToggleSave={handleToggleSave}
          hideSortHeader
        />

        {/* Filter modal */}
        <Modal
          visible={filterModalVisible}
          animationType="slide"
          presentationStyle="pageSheet"
          onRequestClose={() => setFilterModalVisible(false)}
        >
          <View className="bg-background flex-1 mt-10">
            <FiltersPanel
              filters={filters}
              onFiltersChange={setFilters}
              onClose={() => setFilterModalVisible(false)}
              isModal
            />
          </View>
        </Modal>

        {/* Mobile job detail modal */}
        <Modal
          visible={!!selectedJob && isMobile}
          animationType="slide"
          presentationStyle="pageSheet"
          onRequestClose={() => setSelectedJob(null)}
        >
          <View className="bg-background flex-1">
            <View className="flex-row items-center justify-between border-b border-border px-4 mt-13">
              <Text className="text-foreground text-base font-semibold">Job Details</Text>
              <Pressable onPress={() => setSelectedJob(null)} hitSlop={12}>
                <Icon as={X} className="text-foreground size-5" />
              </Pressable>
            </View>
            <JobPreview
              job={selectedJob}
              onToggleSave={handleToggleSave}
            />
          </View>
        </Modal>
      </View>
    );
  }

  // ──────────────────────────────────────────────────
  // TABLET LAYOUT (2-column)
  // ──────────────────────────────────────────────────

  if (isTablet) {
    return (
      <View className="bg-background flex-1">
        <JobSearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          locationQuery={locationQuery}
          onLocationChange={setLocationQuery}
          activeQuickFilters={activeQuickFilters}
          onQuickFilterToggle={handleQuickFilterToggle}
        />

        {/* Collapsible filter section */}
        <View className="gap-2 px-4 py-2">
          <View className="flex-row items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onPress={() => setFilterModalVisible(!filterModalVisible)}
            >
              <Icon as={SlidersHorizontal} className="text-foreground size-4" />
              <Text>Filters</Text>
            </Button>
          </View>
          <FilterChips
            chips={filterChips}
            onRemove={handleRemoveChip}
            onClearAll={handleClearAll}
          />
        </View>

        {filterModalVisible && (
          <View className="border-border max-h-72 border-b">
            <FiltersPanel
              filters={filters}
              onFiltersChange={setFilters}
              onClose={() => setFilterModalVisible(false)}
              isModal
            />
          </View>
        )}

        {/* Two columns */}
        <View className="flex-1 flex-row">
          {/* Left: Job list */}
          <View className="border-border flex-1 border-r">
            <JobList
              jobs={filteredJobs}
              selectedJobId={selectedJob?.id}
              compact
              sortOption={sortOption}
              onSortChange={setSortOption}
              onSelectJob={handleSelectJob}
              onToggleSave={handleToggleSave}
            />
          </View>

          {/* Right: Preview */}
          <View className="flex-1">
            <JobPreview
              job={selectedJob}
              onToggleSave={handleToggleSave}
            />
          </View>
        </View>
      </View>
    );
  }

  // ──────────────────────────────────────────────────
  // DESKTOP LAYOUT (3-column)
  // ──────────────────────────────────────────────────

  return (
    <View className="bg-background flex-1">
      <JobSearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        locationQuery={locationQuery}
        onLocationChange={setLocationQuery}
        activeQuickFilters={activeQuickFilters}
        onQuickFilterToggle={handleQuickFilterToggle}
      />

      {/* Active filter chips */}
      {filterChips.length > 0 && (
        <View className="border-border border-b px-4 py-2">
          <FilterChips
            chips={filterChips}
            onRemove={handleRemoveChip}
            onClearAll={handleClearAll}
          />
        </View>
      )}

      {/* Three columns */}
      <View className="flex-1 flex-row">
        {/* Left sidebar: Persistent filters */}
        <View
          className="border-border border-r"
          style={{ width: 260 }}
        >
          <FiltersPanel
            filters={filters}
            onFiltersChange={setFilters}
          />
        </View>

        {/* Center: Job list */}
        <View className="border-border min-w-0 flex-1 border-r">
          <JobList
            jobs={filteredJobs}
            selectedJobId={selectedJob?.id}
            compact
            sortOption={sortOption}
            onSortChange={setSortOption}
            onSelectJob={handleSelectJob}
            onToggleSave={handleToggleSave}
          />
        </View>

        {/* Right: Preview */}
        <View className="min-w-0 flex-1">
          <JobPreview
            job={selectedJob}
            onToggleSave={handleToggleSave}
          />
        </View>
      </View>
    </View>
  );
}
