import { Icon } from '@/components/ui/icon';
import { Tabs } from 'expo-router';
import { Home, PlusCircle, Briefcase, Building2 } from 'lucide-react-native';
import React from 'react';
import { Platform, Pressable, View, Text } from 'react-native';
import Animated, { useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CompanyStatusProvider, useCompanyStatus } from '@/lib/company-status-context';
import type { CompanyStatus } from '@/lib/company-data';

/* ─── Status Switcher (Dev Mode) ──────────── */
const STATUSES: CompanyStatus[] = ['approved', 'pending', 'rejected', 'suspended'];
const STATUS_COLORS: Record<CompanyStatus, string> = {
  approved: 'bg-[var(--color-green)]',
  pending: 'bg-[var(--color-amber)]',
  rejected: 'bg-destructive',
  suspended: 'bg-destructive',
};

function StatusSwitcher() {
  const { status, setStatus } = useCompanyStatus();
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === 'web';

  return (
    <View
      style={{ paddingTop: isWeb ? 12 : insets.top }}
      className="w-full border-b border-border bg-background px-4"
    >


      {/* Dev Status Switcher */}
      <View className="flex-row items-center gap-2 p-4">
        <Text className="text-[10px] text-muted-foreground uppercase tracking-wider mr-1">Status:</Text>
        {STATUSES.map((s) => (
          <Pressable
            key={s}
            onPress={() => setStatus(s)}
            className={`px-2.5 py-1 rounded-full border ${
              status === s ? 'border-primary' : 'border-border'
            }`}
          >
            <View className="flex-row items-center gap-1.5">
              <View className={`size-2 rounded-full ${STATUS_COLORS[s]}`} />
              <Text
                className={`text-[10px] font-semibold capitalize ${
                  status === s ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {s}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

/* ─── Tab Item (same as candidate) ──────────── */
function TabItem({ IconComponent, isFocused, onPress }: any) {
  const bgStyle = useAnimatedStyle(() => ({
    opacity: withTiming(isFocused ? 1 : 0, { duration: 250 }),
    transform: [
      { scale: withSpring(isFocused ? 1 : 0.5, { damping: 15, stiffness: 200 }) },
    ],
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: withSpring(isFocused ? 1.15 : 1, { damping: 12, stiffness: 250 }) },
    ],
  }));

  return (
    <Pressable onPress={onPress} className="items-center justify-center rounded-full p-2">
      <Animated.View
        style={[{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }, bgStyle]}
        className="rounded-full bg-primary"
      />
      <Animated.View style={iconStyle}>
        <Icon
          as={IconComponent}
          className={`size-6 ${isFocused ? 'text-primary-foreground' : 'text-muted-foreground'}`}
        />
      </Animated.View>
    </Pressable>
  );
}

/* ─── Glassmorphic Tab Bar (same as candidate) ──────────── */
function GlassmorphicTabBar({ state, navigation }: any) {
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === 'web';

  const ORDER = ['index', 'create-job', 'manage-jobs', 'profile'];
  const icons: any = {
    index: Home,
    'create-job': PlusCircle,
    'manage-jobs': Briefcase,
    profile: Building2,
  };

  const currentRouteName = state.routes[state.index]?.name;

  return (
    <View
      pointerEvents="box-none"
      className="absolute left-0 right-0 items-center justify-center"
      style={{
        bottom: isWeb ? 24 : Math.max(insets.bottom, 12),
      }}
    >
      <View
        className={
          'flex-row rounded-full py-3 border border-primary/25 ' +
          Platform.select({
            web: 'px-4 bg-card/80 backdrop-blur-md',
            android: 'px-12 bg-card',
            default: 'px-5 bg-card',
          })
        }
        style={{
          gap: Platform.select({
            android: 35,
            ios: 28,
            web: 24,
            default: 28,
          }),
          marginBottom: isWeb ? 0 : 4,
          elevation: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: Platform.OS === 'ios' ? 0.18 : 0.35,
          shadowRadius: 16,
        }}
      >
        {ORDER.map((name) => {
          const route = state.routes.find((r: any) => r.name === name);
          if (!route) return null;

          const isFocused = currentRouteName === name;
          const IconComponent = icons[name];

          return (
            <TabItem
              key={route.key}
              IconComponent={IconComponent}
              isFocused={isFocused}
              onPress={() => navigation.navigate(name)}
            />
          );
        })}
      </View>
    </View>
  );
}

/* ─── Layout ──────────── */
function CompanyDashboardInner() {
  return (
    <View style={{ flex: 1 }}>
      <StatusSwitcher />
      <Tabs
        screenOptions={{ headerShown: false }}
        tabBar={(props) => <GlassmorphicTabBar {...props} />}
      >
        <Tabs.Screen name="index" options={{ title: 'Dashboard' }} />
        <Tabs.Screen name="create-job" options={{ title: 'Create Job' }} />
        <Tabs.Screen name="manage-jobs" options={{ title: 'Manage Jobs' }} />
        <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
      </Tabs>
    </View>
  );
}

export default function CompanyDashboardLayout() {
  return (
    <CompanyStatusProvider>
      <CompanyDashboardInner />
    </CompanyStatusProvider>
  );
}
