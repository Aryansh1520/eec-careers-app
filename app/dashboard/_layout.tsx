import { Icon } from '@/components/ui/icon';
import { Tabs } from 'expo-router';
import { Briefcase, FileText, Home, User } from 'lucide-react-native';
import React from 'react';
import { Platform, Pressable, View } from 'react-native';
import Animated, { useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';

function TabItem({ IconComponent, isFocused, onPress }: any) {
  const bgStyle = useAnimatedStyle(() => ({
    opacity: withTiming(isFocused ? 1 : 0, { duration: 250 }),
    transform: [
      { scale: withSpring(isFocused ? 1 : 0.5, { damping: 15, stiffness: 200 }) }
    ]
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: withSpring(isFocused ? 1.15 : 1, { damping: 12, stiffness: 250 }) }
    ]
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
          className={`size-6 ${isFocused ? 'text-primary-foreground' : 'text-muted-foreground'
            }`}
        />
      </Animated.View>
    </Pressable>
  );
}

function GlassmorphicTabBar({ state, navigation }: any) {
  const ORDER = ['index', 'jobs', 'applications', 'profile'];

  const icons: any = {
    index: Home,
    jobs: Briefcase,
    applications: FileText,
    profile: User,
  };

  const currentRouteName = state.routes[state.index]?.name;

  return (
    <View pointerEvents="box-none" className="absolute bottom-6 left-0 right-0 items-center justify-center">
      <View
        className={
          'flex-row rounded-full py-3 border border-border/50 shadow-lg shadow-black/10 ' +
          Platform.select({
            web: 'px-4 bg-background/60 backdrop-blur-md',
            android: 'px-12 bg-background/90',
            default: 'px-5 bg-background/90',
          })
        }
        style={{
          gap: Platform.select({
            android: 35,
            ios: 28,
            web: 24,
            default: 28,
          }),
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

export default function Layout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <GlassmorphicTabBar {...props} />}
    >
      <Tabs.Screen name="index" options={{ title: 'Dashboard' }} />
      <Tabs.Screen name="jobs" options={{ title: 'Jobs' }} />
      <Tabs.Screen name="applications" options={{ title: 'Applications' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}
