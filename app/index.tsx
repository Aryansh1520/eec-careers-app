import '@/global.css'
import { Text } from '@/components/ui/text';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useUniwind } from 'uniwind';

const LOGO = {
  light: require('@/assets/images/react-native-reusables-light.png'),
  dark: require('@/assets/images/react-native-reusables-dark.png'),
};

export default function Index() {
  const router = useRouter();
  const { theme } = useUniwind();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/role-selection');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View className="flex-1 bg-background items-center justify-center gap-6">
      <Image
        source={LOGO[theme ?? 'light']}
        style={styles.logo}
        resizeMode="contain"
      />
      <View className="items-center gap-2">
        <Text className="text-3xl font-bold tracking-tight text-primary">
          Eagle's Eye
        </Text>
        <Text className="text-muted-foreground text-base tracking-widest uppercase">
          Careers
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 120,
    height: 120,
  },
});
