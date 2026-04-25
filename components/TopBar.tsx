import { View, Text, Platform, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useNavigation } from 'expo-router';
import { Icon } from '@/components/ui/icon';
import { ArrowLeft } from 'lucide-react-native';

type TopBarProps = {
  title: string;
  showBack?: boolean;
  right?: React.ReactNode;
};

export default function TopBar({ title, showBack = false, right }: TopBarProps) {
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === 'web';

  const router = useRouter();
  const navigation = useNavigation();

  const handleBack = () => {
    router.replace('/dashboard')
  };

  return (
    <View
      style={{ paddingTop: isWeb ? 12 : Math.max(insets.top - 48, 8) }}
      className="border-b border-border bg-background/95 backdrop-blur-md"
    >
      <View className="flex-row items-center justify-between px-4 py-3">

        {/* LEFT */}
        <View className="flex-row items-center gap-2 min-w-[120px]">
          {/* Back button (mobile + nested routes) */}
          {showBack && (
            <Pressable
              onPress={handleBack}
              className="rounded-full p-2 active:opacity-70"
            >
              <Icon as={ArrowLeft} className="size-5 text-foreground" />
            </Pressable>
          )}

          {/* Branding (desktop only) */}
          {isWeb && (
            <Text className="text-base font-semibold text-foreground">
              Eagle Eye Careers
            </Text>
          )}
        </View>

        {/* CENTER */}
        <View className="flex-1 items-center justify-center">
          <Text
            numberOfLines={1}
            className="text-base font-semibold text-foreground"
          >
            {title}
          </Text>
        </View>

        {/* RIGHT */}
        <View className="min-w-[120px] items-end justify-center">
          {right}
        </View>
      </View>
    </View>
  );
}
