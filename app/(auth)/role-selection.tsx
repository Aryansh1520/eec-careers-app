import { AuthLayout } from '@/components/auth';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { useRouter } from 'expo-router';
import { Building2, UserRound } from 'lucide-react-native';
import * as React from 'react';
import { Image, Platform, Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useUniwind } from 'uniwind';

const LOGO = {
  light: require('@/assets/images/react-native-reusables-light.png'),
  dark: require('@/assets/images/react-native-reusables-dark.png'),
};

const native = StyleSheet.create({
  header: {
    width: '100%',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 4,
  },
  title: {
    textAlign: 'center',
    width: '100%',
  },
  subtitle: {
    textAlign: 'center',
    width: '100%',
  },
  stack: {
    width: '100%',
    gap: 16,
  },
  root: {
    width: '100%',
    gap: 32,
    paddingVertical: 8,
  },
  cardInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 20,
  },
});

export default function RoleSelectionScreen() {
  const router = useRouter();
  const { theme } = useUniwind();
  const isWeb = Platform.OS === 'web';

  const header = isWeb ? (
    <View className="items-center gap-2">
      <Image
        source={LOGO[theme ?? 'light']}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text className="text-center text-2xl font-bold tracking-tight text-foreground">
        Choose your path
      </Text>
      <Text className="text-center text-sm text-muted-foreground px-1">
        Continue as a job seeker or sign in to your company workspace.
      </Text>
    </View>
  ) : (
    <View style={native.header}>
      <Image
        source={LOGO[theme ?? 'light']}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={native.title} className="text-2xl font-bold tracking-tight text-foreground">
        Choose your path
      </Text>
      <Text style={native.subtitle} className="text-sm text-muted-foreground">
        Continue as a job seeker or sign in to your company workspace.
      </Text>
    </View>
  );

  const cards = (
    <View className={isWeb ? 'gap-4' : ''} style={!isWeb ? native.stack : undefined}>
      <Animated.View entering={FadeInDown.delay(80).duration(400)}>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push('/login')}
          className="web:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 web:focus-visible:ring-offset-background active:opacity-95"
        >
          <View
            style={!isWeb ? native.cardInner : undefined}
            className={
              isWeb
                ? 'flex-row items-center gap-4 rounded-2xl border border-border bg-surface-1 p-5 shadow-md shadow-black/5 web:hover:border-primary/40 web:hover:shadow-lg web:hover:shadow-primary/5'
                : 'rounded-2xl border border-border bg-surface-1 shadow-md shadow-black/5'
            }
          >
            <View className="size-12 items-center justify-center rounded-xl bg-[var(--color-green-soft)]">
              <Icon as={UserRound} className="size-6 text-[var(--color-green)]" />
            </View>
            <View className="flex-1 gap-0.5">
              <Text className="text-lg font-semibold text-foreground">Continue as Candidate</Text>
              <Text className="text-sm text-muted-foreground">
                Search roles, build your profile, and apply
              </Text>
            </View>
          </View>
        </Pressable>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(140).duration(400)}>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push('/company-login')}
          className="web:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 web:focus-visible:ring-offset-background active:opacity-95"
        >
          <View
            style={!isWeb ? native.cardInner : undefined}
            className={
              isWeb
                ? 'flex-row items-center gap-4 rounded-2xl border border-border bg-surface-1 p-5 shadow-md shadow-black/5 web:hover:border-primary/40 web:hover:shadow-lg web:hover:shadow-primary/5'
                : 'rounded-2xl border border-border bg-surface-1 shadow-md shadow-black/5'
            }
          >
            <View className="size-12 items-center justify-center rounded-xl bg-[var(--color-blue-soft)]">
              <Icon as={Building2} className="size-6 text-[var(--color-blue)]" />
            </View>
            <View className="flex-1 gap-0.5">
              <Text className="text-lg font-semibold text-foreground">Continue as Company</Text>
              <Text className="text-sm text-muted-foreground">
                Post jobs, review applicants, and manage hiring
              </Text>
            </View>
          </View>
        </Pressable>
      </Animated.View>
    </View>
  );

  return (
    <AuthLayout variant="neutral" animateContent={false}>
      <View className={isWeb ? 'gap-8 py-2' : ''} style={!isWeb ? native.root : undefined}>
        {header}
        {cards}
      </View>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 64,
    height: 64,
  },
});
