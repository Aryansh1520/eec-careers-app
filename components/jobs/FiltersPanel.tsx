import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import {
  EMPLOYMENT_TYPE_LABELS,
  EXPERIENCE_LEVEL_LABELS,
  LOCATION_TYPE_LABELS,
  ALL_SKILLS,
  type EmploymentType,
  type ExperienceLevel,
  type JobFilters,
  type LocationType,
} from '@/lib/jobs-data';
import React, { useState } from 'react';
import { Platform, Pressable, ScrollView, View } from 'react-native';

interface FiltersPanelProps {
  filters: JobFilters;
  onFiltersChange: (filters: JobFilters) => void;
  onClose?: () => void;
  isModal?: boolean;
  className?: string;
}

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View className="gap-2.5">
      <Text className="text-foreground text-sm font-semibold tracking-wide">{title}</Text>
      {children}
    </View>
  );
}

function CheckboxRow({
  label,
  checked,
  onToggle,
}: {
  label: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <Pressable
      onPress={onToggle}
      className={cn(
        'flex-row items-center gap-2.5 py-1',
        Platform.select({ web: 'cursor-pointer' })
      )}
    >
      <Checkbox checked={checked} onCheckedChange={onToggle} />
      <Text className="text-foreground text-sm">{label}</Text>
    </Pressable>
  );
}

export function FiltersPanel({
  filters,
  onFiltersChange,
  onClose,
  isModal,
  className,
}: FiltersPanelProps) {
  const [showAllSkills, setShowAllSkills] = useState(false);

  const toggleArrayItem = <T extends string>(arr: T[], item: T): T[] =>
    arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item];

  const hasActiveFilters =
    filters.employmentTypes.length > 0 ||
    filters.experienceLevels.length > 0 ||
    filters.locationTypes.length > 0 ||
    filters.skills.length > 0;

  const clearAll = () =>
    onFiltersChange({
      employmentTypes: [],
      experienceLevels: [],
      locationTypes: [],
      skills: [],
    });

  const displayedSkills = showAllSkills ? ALL_SKILLS : ALL_SKILLS.slice(0, 8);

  return (
    <ScrollView
      className={cn('bg-background', className)}
      contentContainerClassName="p-4 gap-5 pb-8"
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View className="flex-row items-center justify-between">
        <Text className="text-foreground text-base font-bold">Filters</Text>
        <View className="flex-row items-center gap-3">
          {hasActiveFilters && (
            <Pressable onPress={clearAll}>
              <Text className="text-destructive text-xs font-medium">Reset</Text>
            </Pressable>
          )}
          {isModal && onClose && (
            <Button variant="ghost" size="sm" onPress={onClose}>
              <Text>Done</Text>
            </Button>
          )}
        </View>
      </View>

      <Separator />

      {/* Employment Type */}
      <FilterSection title="Employment Type">
        {(Object.keys(EMPLOYMENT_TYPE_LABELS) as EmploymentType[]).map((type) => (
          <CheckboxRow
            key={type}
            label={EMPLOYMENT_TYPE_LABELS[type]}
            checked={filters.employmentTypes.includes(type)}
            onToggle={() =>
              onFiltersChange({
                ...filters,
                employmentTypes: toggleArrayItem(filters.employmentTypes, type),
              })
            }
          />
        ))}
      </FilterSection>

      <Separator />

      {/* Experience Level */}
      <FilterSection title="Experience Level">
        {(Object.keys(EXPERIENCE_LEVEL_LABELS) as ExperienceLevel[]).map((level) => (
          <CheckboxRow
            key={level}
            label={EXPERIENCE_LEVEL_LABELS[level]}
            checked={filters.experienceLevels.includes(level)}
            onToggle={() =>
              onFiltersChange({
                ...filters,
                experienceLevels: toggleArrayItem(filters.experienceLevels, level),
              })
            }
          />
        ))}
      </FilterSection>

      <Separator />

      {/* Location Type */}
      <FilterSection title="Location Type">
        {(Object.keys(LOCATION_TYPE_LABELS) as LocationType[]).map((type) => (
          <CheckboxRow
            key={type}
            label={LOCATION_TYPE_LABELS[type]}
            checked={filters.locationTypes.includes(type)}
            onToggle={() =>
              onFiltersChange({
                ...filters,
                locationTypes: toggleArrayItem(filters.locationTypes, type),
              })
            }
          />
        ))}
      </FilterSection>

      <Separator />

      {/* Skills */}
      <FilterSection title="Skills">
        {displayedSkills.map((skill) => (
          <CheckboxRow
            key={skill}
            label={skill}
            checked={filters.skills.includes(skill)}
            onToggle={() =>
              onFiltersChange({
                ...filters,
                skills: toggleArrayItem(filters.skills, skill),
              })
            }
          />
        ))}
        {ALL_SKILLS.length > 8 && (
          <Pressable onPress={() => setShowAllSkills(!showAllSkills)}>
            <Text className="text-primary text-xs font-medium mt-1">
              {showAllSkills ? 'Show less' : `Show all (${ALL_SKILLS.length})`}
            </Text>
          </Pressable>
        )}
      </FilterSection>
    </ScrollView>
  );
}
