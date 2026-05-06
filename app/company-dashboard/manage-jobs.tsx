import React, { useState, useMemo } from 'react';
import { View, ScrollView, Platform, Pressable } from 'react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBreakpoint } from '@/lib/use-breakpoint';
import { useCompanyStatus } from '@/lib/company-status-context';
import { StatusBanner } from '@/components/company/StatusBanner';
import { CompanyJobCard } from '@/components/company/CompanyJobCard';
import { companyJobsList, type CompanyJob, type JobStatus } from '@/lib/company-jobs-data';
import { cn } from '@/lib/utils';
import {
  Briefcase, Plus, Users, Eye, Star, Clock,
  Edit2, XCircle, ChevronRight,
} from 'lucide-react-native';

// ─────────────────────────────────────────────────
// Left sidebar — stats + filter
// ─────────────────────────────────────────────────

const STATUS_FILTERS: { value: JobStatus | 'all'; label: string; color: string }[] = [
  { value: 'all', label: 'All', color: 'bg-muted-foreground' },
  { value: 'published', label: 'Published', color: 'bg-green-500' },
  { value: 'draft', label: 'Draft', color: 'bg-amber-400' },
  { value: 'paused', label: 'Paused', color: 'bg-amber-300' },
  { value: 'closed', label: 'Closed', color: 'bg-muted-foreground/40' },
  { value: 'archived', label: 'Archived', color: 'bg-muted-foreground/20' },
];

function SidebarLeft({
  jobs,
  activeFilter,
  onFilter,
}: {
  jobs: CompanyJob[];
  activeFilter: JobStatus | 'all';
  onFilter: (f: JobStatus | 'all') => void;
}) {
  const totalApplicants = jobs.reduce((s, j) => s + (j.applicant_count ?? 0), 0);
  const avgApplicants = jobs.length ? (totalApplicants / jobs.length).toFixed(1) : '0';

  const countFor = (status: JobStatus | 'all') =>
    status === 'all' ? jobs.length : jobs.filter((j) => j.status === status).length;

  return (
    <ScrollView className="flex-1 bg-secondary/30" contentContainerStyle={{ paddingBottom: 32 }}>
      {/* Overview stats */}
      <Text className="text-xs font-semibold uppercase tracking-widest text-muted-foreground px-4 pt-5 pb-3">
        Overview
      </Text>
      {[
        { label: 'Total postings', value: jobs.length },
        { label: 'Total applicants', value: totalApplicants },
        { label: 'Avg. per posting', value: avgApplicants },
      ].map((stat) => (
        <View
          key={stat.label}
          className="flex-row items-center justify-between px-4 py-2"
        >
          <Text className="text-xs text-muted-foreground">{stat.label}</Text>
          <Text className="text-sm font-medium text-foreground">{stat.value}</Text>
        </View>
      ))}

      <View className="h-px bg-border mx-4 my-3" />

      {/* Status filter */}
      <Text className="text-xs font-semibold uppercase tracking-widest text-muted-foreground px-4 pb-2">
        Filter by status
      </Text>
      {STATUS_FILTERS.map((f) => {
        const isActive = activeFilter === f.value;
        return (
          <Pressable
            key={f.value}
            onPress={() => onFilter(f.value)}
            className={cn(
              'flex-row items-center gap-2.5 px-4 py-2.5',
              isActive && 'bg-background border-r-2 border-primary'
            )}
          >
            <View className={cn('size-2 rounded-full', f.color)} />
            <Text
              className={cn(
                'text-sm flex-1',
                isActive ? 'text-foreground font-medium' : 'text-muted-foreground'
              )}
            >
              {f.label}
            </Text>
            <Text className="text-xs text-muted-foreground">{countFor(f.value)}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

// ─────────────────────────────────────────────────
// Right panel — selected job detail + actions
// ─────────────────────────────────────────────────

function JobDetailPanel({
  job,
  isRestricted,
}: {
  job: CompanyJob | null;
  isRestricted: boolean;
}) {
  if (!job) {
    return (
      <View className="flex-1 items-center justify-center px-6 bg-secondary/30">
        <Icon as={Briefcase} className="size-8 text-muted-foreground opacity-30 mb-3" />
        <Text className="text-sm text-muted-foreground text-center">
          Select a job to see details and actions
        </Text>
      </View>
    );
  }

  const daysActive = Math.floor(
    (Date.now() - new Date(job.posted_at).getTime()) / (1000 * 60 * 60 * 24)
  );

  const metrics = [
    { label: 'Applicants', value: job.applicant_count, icon: Users },
    { label: 'Skills', value: job.skills.length, icon: Star },
    { label: 'Days active', value: daysActive, icon: Clock },
  ];

  const statusColor =
    job.status === 'published' ? 'text-green-600 bg-green-50 border-green-200'
      : job.status === 'draft' ? 'text-amber-700 bg-amber-50 border-amber-200'
        : job.status === 'paused' ? 'text-amber-600 bg-amber-50 border-amber-200'
          : 'text-muted-foreground bg-secondary border-border';

  return (
    <ScrollView className="flex-1 bg-secondary/30" contentContainerStyle={{ paddingBottom: 32 }}>
      {/* Header */}
      <View className="px-4 pt-5 pb-4 border-b border-border">
        <Text className="text-sm font-semibold text-foreground" numberOfLines={2}>
          {job.title}
        </Text>
        {(job.location.city || job.location.type) && (
          <Text className="text-xs text-muted-foreground mt-0.5">
            {[job.location.city, job.location.country].filter(Boolean).join(', ')}
            {job.location.type ? ` · ${job.location.type}` : ''}
          </Text>
        )}
        <View className="flex-row flex-wrap gap-1.5 mt-2.5">
          <View className={cn('rounded-full px-2.5 py-0.5 border', statusColor)}>
            <Text className={cn('text-xs font-medium capitalize', statusColor.split(' ')[0])}>
              {job.status}
            </Text>
          </View>
          {job.employment_type && (
            <View className="rounded-full px-2.5 py-0.5 border border-border bg-background">
              <Text className="text-xs text-muted-foreground">{job.employment_type}</Text>
            </View>
          )}
          {job.experience_level && (
            <View className="rounded-full px-2.5 py-0.5 border border-border bg-background">
              <Text className="text-xs text-muted-foreground">{job.experience_level}</Text>
            </View>
          )}
        </View>
      </View>

      {/* Metric grid */}
      <View className="flex-row flex-wrap p-3 gap-2">
        {metrics.map((m) => (
          <View
            key={m.label}
            className="bg-background border border-border rounded-xl p-3"
            style={{ width: '47%' }}
          >
            <Text className="text-xs text-muted-foreground">{m.label}</Text>
            <Text className="text-xl font-semibold text-foreground mt-0.5">{m.value}</Text>
          </View>
        ))}
      </View>

      <View className="h-px bg-border mx-4 mb-3" />

      {/* Actions */}
      <View className="px-4 gap-2">
        <Button
          size="sm"
          className="w-full flex-row gap-2"
          disabled={isRestricted || job.status === 'closed' || job.status === 'archived'}
        >
          <Icon as={Users} className="size-3.5 text-primary-foreground" />
          <Text>View applicants</Text>
          <View className="ml-auto">
            <Icon as={ChevronRight} className="size-3.5 text-primary-foreground" />
          </View>
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="w-full flex-row gap-2"
          disabled={isRestricted}
        >
          <Icon as={Edit2} className="size-3.5 text-foreground" />
          <Text>Edit posting</Text>
        </Button>

        {(job.status === 'published' || job.status === 'paused') && (
          <Button
            variant="outline"
            size="sm"
            className="w-full flex-row gap-2 border-red-200"
            disabled={isRestricted}
          >
            <Icon as={XCircle} className="size-3.5 text-red-500" />
            <Text className="text-red-500">Close posting</Text>
          </Button>
        )}

        {job.status === 'draft' && (
          <Button
            size="sm"
            className="w-full flex-row gap-2 bg-green-600"
            disabled={isRestricted}
          >
            <Icon as={Briefcase} className="size-3.5 text-white" />
            <Text className="text-white">Publish draft</Text>
          </Button>
        )}
      </View>
    </ScrollView>
  );
}

// ─────────────────────────────────────────────────
// Top bar
// ─────────────────────────────────────────────────

function TopBar({
  totalJobs,
  isRestricted,
}: {
  totalJobs: number;
  isRestricted: boolean;
}) {
  return (
    <View className="flex-row items-center gap-3 px-5 py-3 border-b border-border bg-background">
      <Icon as={Briefcase} className="size-4 text-muted-foreground" />
      <View>
        <Text className="text-sm font-semibold text-foreground">Manage jobs</Text>
        <Text className="text-xs text-muted-foreground">{totalJobs} job postings</Text>
      </View>
      <View className="ml-auto flex-row gap-2 items-center">
        {isRestricted && (
          <View className="bg-amber-50 border border-amber-200 rounded-full px-2.5 py-0.5">
            <Text className="text-[10px] font-medium text-amber-800">Pending approval</Text>
          </View>
        )}
        <Button size="sm" className="flex-row gap-1.5" disabled={isRestricted}>
          <Icon as={Plus} className="size-3.5 text-primary-foreground" />
          <Text>New job</Text>
        </Button>
      </View>
    </View>
  );
}

// ─────────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────────

export default function ManageJobsScreen() {
  const breakpoint = useBreakpoint();
  const isWeb = Platform.OS === 'web';
  const isMobile = breakpoint === 'mobile';
  const { status, isApproved } = useCompanyStatus();
  const isRestricted = !isApproved;

  const [statusFilter, setStatusFilter] = useState<JobStatus | 'all'>('all');
  const [selectedJob, setSelectedJob] = useState<CompanyJob | null>(null);

  const jobs = companyJobsList;

  const filteredJobs = useMemo(
    () => statusFilter === 'all' ? jobs : jobs.filter((j) => j.status === statusFilter),
    [jobs, statusFilter]
  );

  const Wrapper = isWeb ? View : SafeAreaView;

  // ── MOBILE: unchanged ────────────────────────────────────────
  if (isMobile) {
    return (
      <Wrapper style={{ flex: 1 }} className="bg-background">
        <View className="bg-background/95 pb-4 pt-4 z-10 px-4 shadow-sm border-b border-border/50">
          <Text className="text-2xl font-extrabold text-foreground tracking-tight">Manage Jobs</Text>
          <Text className="text-xs text-muted-foreground mt-1">
            {jobs.length} job postings
          </Text>
        </View>
        <ScrollView className="flex-1" contentContainerStyle={{ padding: 16, paddingBottom: 120 }}>
          {isRestricted && <StatusBanner status={status} className="mb-4" />}
          <View className="gap-4">
            {jobs.map((job) => (
              <CompanyJobCard key={job.id} job={job} isRestricted={isRestricted} />
            ))}
          </View>
        </ScrollView>
      </Wrapper>
    );
  }

  // ── DESKTOP: 3-column, mirrors JobsPage ─────────────────────
  return (
    <Wrapper style={{ flex: 1 }} className="bg-background">
      {/* Top bar — like JobSearchBar */}
      <TopBar totalJobs={jobs.length} isRestricted={isRestricted} />

      {/* Restricted banner */}
      {isRestricted && (
        <View className="px-5 py-2 border-b border-border">
          <StatusBanner status={status} />
        </View>
      )}

      {/* Three columns */}
      <View className="flex-1 flex-row">
        {/* Left: stats + status filter — like FiltersPanel */}
        <View className="border-r border-border" style={{ width: 220 }}>
          <SidebarLeft
            jobs={jobs}
            activeFilter={statusFilter}
            onFilter={setStatusFilter}
          />
        </View>

        {/* Center: job cards — like JobList */}
        <ScrollView
          className="flex-1 bg-background"
          contentContainerStyle={{ padding: 16, paddingBottom: 48 }}
          style={{ borderRightWidth: 0.5 }}
        >
          {filteredJobs.length === 0 ? (
            <View className="flex-1 items-center justify-center py-20">
              <Icon as={Briefcase} className="size-8 text-muted-foreground opacity-30 mb-3" />
              <Text className="text-sm text-muted-foreground">No jobs match this filter</Text>
            </View>
          ) : (
            <View className="gap-3">
              {filteredJobs.map((job) => (
                <Pressable
                  key={job.id}
                  onPress={() => setSelectedJob(job)}
                  className={cn(
                    'rounded-xl border overflow-hidden',
                    selectedJob?.id === job.id
                      ? 'border-primary border-[1.5px]'
                      : 'border-border'
                  )}
                >
                  <CompanyJobCard
                    job={job}
                    isRestricted={isRestricted}
                    compact
                  />
                </Pressable>
              ))}
            </View>
          )}
        </ScrollView>

        {/* Right: job detail + actions — like JobPreview */}
        <View style={{ width: 260 }} className="border-l border-border min-w-0">
          <JobDetailPanel job={selectedJob} isRestricted={isRestricted} />
        </View>
      </View>
    </Wrapper>
  );
}
