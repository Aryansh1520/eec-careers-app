import React from 'react';
import { View, ScrollView, Platform, Dimensions } from 'react-native';
import { Text } from '@/components/ui/text';
import { useBreakpoint } from '@/lib/use-breakpoint';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { SummaryCard } from '@/components/dashboard/SummaryCard';
import { DonutChart } from '@/components/dashboard/DonutChart';
import { StatusBanner } from '@/components/company/StatusBanner';
import { RecentApplicationsCard } from '@/components/company/RecentApplicationsCard';
import { RecentJobsCard } from '@/components/company/RecentJobsCard';
import { AnalyticsPreview } from '@/components/company/AnalyticsPreview';
import { useCompanyStatus } from '@/lib/company-status-context';
import {
  companySummary,
  companyDonutData,
  companyRecentActivity,
  companyRecentJobs,
} from '@/lib/company-data';
import { Briefcase, Eye, Users, TrendingUp } from 'lucide-react-native';

export default function CompanyDashboardIndex() {
  const breakpoint = useBreakpoint();
  const isWeb = Platform.OS === 'web';
  const isMobile = breakpoint === 'mobile';
  const { status, isApproved } = useCompanyStatus();

  const Wrapper = isWeb ? View : SafeAreaView;

  const cards = [
    { title: 'Total Jobs', count: companySummary.total_jobs_posted, icon: Briefcase, color: 'text-primary' },
    { title: 'Active Listings', count: companySummary.active_listings, icon: Eye, color: 'text-[var(--color-green)]' },
    { title: 'Applications', count: companySummary.total_applications, icon: Users, color: 'text-[var(--color-blue)]' },
    { title: 'New This Week', count: companySummary.new_applications_this_week, icon: TrendingUp, color: 'text-[var(--color-amber)]' },
  ];

  /* ═════════ MOBILE LAYOUT ═════════ */
  if (isMobile) {
    return (
      <Wrapper style={{ flex: 1 }} className="bg-background">
        {/* Greeting Header */}
        <View className="bg-background/95 pb-4 pt-4 z-10 px-4 shadow-sm border-b border-border/50">
          <Text className="text-2xl font-extrabold text-foreground tracking-tight">Company Dashboard</Text>
          <Text className="text-xs text-muted-foreground mt-1">Manage your listings and applications.</Text>
        </View>

        <ScrollView className="flex-1" contentContainerStyle={{ padding: 16, paddingBottom: 120 }}>
          {/* Status Banner */}
          <StatusBanner status={status} className="mb-4" />

          {/* Summary Cards */}
          <View className="flex-row flex-wrap gap-3">
            {cards.map((c) => (
              <View key={c.title} style={{ width: '48%' }}>
                <SummaryCard title={c.title} count={c.count} icon={c.icon} iconColor={c.color} />
              </View>
            ))}
          </View>

          {/* Donut Chart */}
          <View className="mt-6 bg-card rounded-2xl border border-border p-4 shadow-sm items-center">
            <Text className="text-sm font-semibold text-foreground self-start mb-4 uppercase tracking-widest">
              Applications Status
            </Text>
            <DonutChart data={companyDonutData} size={180} strokeWidth={25} />
          </View>

          {/* Recent Applications */}
          <RecentApplicationsCard applications={companyRecentActivity} className="mt-6" />

          {/* Recent Jobs */}
          <RecentJobsCard jobs={companyRecentJobs} className="mt-6" />

          {/* Analytics Preview */}
          <AnalyticsPreview isRestricted={!isApproved} className="mt-6" />
        </ScrollView>
      </Wrapper>
    );
  }

  /* ═════════ DESKTOP / WEB LAYOUT ═════════ */
  return (
    <Wrapper style={{ flex: 1 }} className="bg-background">
      {/* Greeting Header (Sticky) */}
      <View className="w-full bg-background/95 z-50 shadow-sm border-b border-border/50">
        <View className="self-center w-full max-w-[1200px] px-6 h-[88px] justify-center">
          <Text className="text-3xl font-extrabold text-foreground tracking-tight">Company Dashboard</Text>
          <Text className="text-sm text-muted-foreground mt-1">Manage your listings and applications.</Text>
        </View>
      </View>

      <ScrollView className="flex-1 bg-background" contentContainerStyle={{ paddingBottom: 64 }}>
        <View className="self-center w-full max-w-[1200px] px-6 gap-y-6 pt-6">

          {/* Status Banner */}
          <StatusBanner status={status} />

          {/* 4 Summary Cards Row */}
          <View className="flex-row gap-4 mt-2">
            {cards.map((c) => (
              <View key={c.title} style={{ flex: 1 }}>
                <SummaryCard title={c.title} count={c.count} icon={c.icon} iconColor={c.color} />
              </View>
            ))}
          </View>

          {/* 60/40 Split: Donut | Applications */}
          <View className="flex-row gap-6 mt-2 h-[340px]">
            {/* Left Donut 60% */}
            <View className="flex-[6] bg-card rounded-2xl border border-border shadow-sm p-6 relative flex-row items-center justify-center">
              <Text className="absolute top-6 left-6 text-sm font-semibold text-foreground uppercase tracking-widest">
                Status Breakdown
              </Text>
              <View className="mt-6 ml-4">
                <DonutChart data={companyDonutData} size={220} strokeWidth={35} />
              </View>
            </View>

            {/* Right Recent Applications 40% */}
            <View className="flex-[4]">
              <RecentApplicationsCard applications={companyRecentActivity} className="h-full" />
            </View>
          </View>

          {/* Recent Jobs + Analytics (50/50) */}
          <View className="flex-row gap-6 mt-2">
            <View className="flex-1">
              <RecentJobsCard jobs={companyRecentJobs} />
            </View>
            <View className="flex-1">
              <AnalyticsPreview isRestricted={!isApproved} />
            </View>
          </View>
        </View>
      </ScrollView>
    </Wrapper>
  );
}
