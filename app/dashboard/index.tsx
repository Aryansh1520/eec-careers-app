import React, { useEffect, useState } from 'react';
import { View, ScrollView, Platform, Dimensions } from 'react-native';
import { Text } from '@/components/ui/text';
import { useBreakpoint } from '@/lib/use-breakpoint';
import Animated, { FadeIn, FadeOut, SlideInDown, withTiming, withDelay } from 'react-native-reanimated';
import { dashboardData } from '@/lib/dashboard-data';
import { SummaryCard } from '@/components/dashboard/SummaryCard';
import { DonutChart } from '@/components/dashboard/DonutChart';
import { ActivityItem } from '@/components/dashboard/ActivityItem';
import { JobCard } from '@/components/jobs/JobCard';
import { FileText, Bookmark, CheckCircle, XCircle } from 'lucide-react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

let hasShownGreeting = false;

export default function DashboardIndex() {
  const breakpoint = useBreakpoint();
  const isWeb = Platform.OS === 'web';
  const isMobile = breakpoint === 'mobile';
  const isTablet = breakpoint === 'tablet';
  const insets = useSafeAreaInsets();

  const Wrapper = isWeb ? View : SafeAreaView;

  const [showMobileGreeting, setShowMobileGreeting] = useState(!hasShownGreeting && isMobile);

  useEffect(() => {
    if (showMobileGreeting) {
      setTimeout(() => {
        setShowMobileGreeting(false);
        hasShownGreeting = true;
      }, 2000); // Overlay disappears after 2 seconds
    } else if (!isMobile) {
      hasShownGreeting = true; // Mark as shown so if they resize they don't get the splash
    }
  }, [showMobileGreeting, isMobile]);

  // Derived Cards
  const cards = [
    { title: "Jobs Applied", count: dashboardData.summary.jobs_applied, icon: FileText, color: "text-blue-500" },
    { title: "Jobs Saved", count: dashboardData.summary.jobs_saved, icon: Bookmark, color: "text-amber-500" },
    { title: "Accepted", count: dashboardData.summary.applications_accepted, icon: CheckCircle, color: "text-green-500" },
    { title: "Rejected", count: dashboardData.summary.applications_rejected, icon: XCircle, color: "text-destructive" },
  ];

  /* ═════════ MOBILE LAYOUT ═════════ */
  if (isMobile) {
    const fullWidth = Dimensions.get('window').width - 32;
    return (
      <Wrapper style={{ flex: 1 }} className="bg-background">
        {showMobileGreeting && (
          <Animated.View
            exiting={FadeOut.duration(800)}
            className="absolute inset-0 z-50 bg-background/95 backdrop-blur-2xl items-center justify-center flex-1"
            style={{ paddingTop: insets.top }}
          >
            <Animated.Text entering={FadeIn.duration(800)} className="text-xs font-bold text-primary tracking-widest uppercase mb-3 drop-shadow-sm">Eagle Eye Careers</Animated.Text>
            <Animated.Text entering={SlideInDown.springify().mass(0.5).damping(12)} className="text-4xl font-black text-foreground tracking-tighter shadow-sm">Good Morning</Animated.Text>
            <Animated.Text entering={FadeIn.delay(300).duration(800)} className="text-xl font-bold text-muted-foreground mt-1">User</Animated.Text>
          </Animated.View>
        )}

        {/* Inline Greeting for Mobile */}
        <View className="bg-background/95 pb-4 pt-4 z-10 px-4 shadow-sm border-b border-border/50">
          <Text className="text-2xl font-extrabold text-foreground tracking-tight">Good Morning, User</Text>
          <Text className="text-xs text-muted-foreground mt-1">Here is your application snapshot for today.</Text>
        </View>

        <ScrollView className="flex-1" contentContainerStyle={{ padding: 16, paddingBottom: 120 }}>
          {/* Summary Cards */}
          <View className="flex-row flex-wrap gap-3">
            {cards.map((c) => (
              <View key={c.title} style={{ width: '48%' }}>
                <SummaryCard title={c.title} count={c.count} icon={c.icon} iconColor={c.color} />
              </View>
            ))}
          </View>

          {/* Donut Chart */}
          <View className="mt-8 bg-card rounded-2xl border border-border p-4 shadow-sm items-center">
            <Text className="text-sm font-semibold text-foreground self-start mb-4 uppercase tracking-widest">Applications Status</Text>
            <DonutChart data={dashboardData.donut_data} size={180} strokeWidth={25} />
          </View>

          {/* Recent Activity */}
          <View className="mt-6 bg-card rounded-2xl border border-border px-4 py-2 shadow-sm">
            <Text className="text-sm font-semibold text-foreground my-3 uppercase tracking-widest">Recent Activity</Text>
            {dashboardData.recent_activity.slice(0, 4).map((act, i) => (
              <ActivityItem
                key={i}
                type={act.type}
                status={act.status}
                jobTitle={act.job_title}
                company={act.company}
                createdAt={act.created_at}
              />
            ))}
          </View>

          {/* Top Jobs Horizontal */}
          <View className="mt-8">
            <Text className="text-sm font-semibold text-foreground mb-4 uppercase tracking-widest">Recommended Jobs</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="overflow-visible" snapToInterval={fullWidth + 16} decelerationRate="fast">
              {dashboardData.top_jobs.map((job) => (
                <View key={job.id} style={{ width: fullWidth, marginRight: 16 }}>
                  <JobCard job={job as any} compact={false} />
                </View>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      </Wrapper>
    );
  }

  /* ═════════ DESKTOP / WEB LAYOUT ═════════ */
  return (
    <Wrapper style={{ flex: 1 }} className="bg-background">
      {/* Inline Greeting (Sticky) */}
      <View className="w-full bg-background/95 z-50 shadow-sm border-b border-border/50">
        <View className="self-center w-full max-w-[1200px] px-6 h-[88px] justify-center">
            <Text className="text-3xl font-extrabold text-foreground tracking-tight">Good Morning, User</Text>
            <Text className="text-sm text-muted-foreground mt-1">Here is your application snapshot for today.</Text>
        </View>
      </View>

      <ScrollView className="flex-1 bg-background" contentContainerStyle={{ paddingBottom: 64 }}>
        <View className="self-center w-full max-w-[1200px] px-6 gap-y-6 pt-6">

          {/* 4 Summary Cards Row */}
          <View className="flex-row gap-4">
            {cards.map((c) => (
              <View key={c.title} style={{ flex: 1 }}>
                <SummaryCard title={c.title} count={c.count} icon={c.icon} iconColor={c.color} />
              </View>
            ))}
          </View>

          {/* 60/40 Split: Donut | Activity */}
          <View className="flex-row gap-6 mt-2 h-[340px]">
            {/* Left Donut 60% */}
            <View className="flex-[6] bg-card rounded-2xl border border-border shadow-sm p-6 relative flex-row items-center justify-center">
              <Text className="absolute top-6 left-6 text-sm font-semibold text-foreground uppercase tracking-widest">Status Breakdown</Text>
              <View className="mt-6 ml-4">
                <DonutChart data={dashboardData.donut_data} size={220} strokeWidth={35} />
              </View>
            </View>

            {/* Right Activity 40% */}
            <View className="flex-[4] bg-card rounded-2xl border border-border shadow-sm p-6">
              <Text className="text-sm font-semibold text-foreground mb-4 uppercase tracking-widest">Recent Activity</Text>
              <View className="flex-1 gap-1 justify-center">
                {dashboardData.recent_activity.slice(0, 5).map((act, i) => (
                  <ActivityItem
                    key={i}
                    type={act.type}
                    status={act.status}
                    jobTitle={act.job_title}
                    company={act.company}
                    createdAt={act.created_at}
                  />
                ))}
              </View>
            </View>
          </View>

          {/* Top Jobs Grid */}
          <View className="mt-4">
            <Text className="text-sm font-semibold text-foreground mb-4 uppercase tracking-widest">Recommended Jobs</Text>
            <View className="flex-row flex-wrap" style={{ marginHorizontal: -8 }}>
              {/* Repeat dummy top job data artificially to show grid if there's only 1 */}
              {Array.from({ length: 4 }).map((_, idx) => {
                const job = dashboardData.top_jobs[0];
                return (
                  <View key={idx} style={{ paddingHorizontal: 8, width: '50%', marginBottom: 16 }}>
                    <JobCard job={job as any} compact={false} />
                  </View>
                );
              })}
            </View>
          </View>

        </View>
      </ScrollView>
    </Wrapper>
  );
}
