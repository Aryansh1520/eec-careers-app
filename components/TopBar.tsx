import { View, Text, Platform, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Icon } from '@/components/ui/icon';
import { ArrowLeft } from 'lucide-react-native';

type TopBarProps = {
  title: string;
  showBack?: boolean;
};

export default function TopBar({ title, showBack = true }: TopBarProps) {
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === 'web';
  const router = useRouter();

  const handleBack = () => {
    router.replace('/dashboard');
  };

  const showRightButton = title === 'Jobs';

  return (
    <View
      style={{ paddingTop: isWeb ? 4 : 0 }}
      className="border-b border-border bg-background/95 backdrop-blur-md"
    >
      <View className="flex-row items-center px-4 py-3">

        {/* LEFT */}
        <View className="w-[80px] items-start">
          {showBack && (
            <Pressable onPress={handleBack} className="p-2 active:opacity-70">
              <Icon as={ArrowLeft} className="size-5 text-foreground" />
            </Pressable>
          )}
        </View>

        {/* CENTER */}
        <View className="flex-1 items-center">
          <Text numberOfLines={1} className="text-base font-semibold text-foreground">
            {title}
          </Text>
        </View>

        {/* RIGHT */}
        <View className="w-[80px] items-end">
          {showRightButton && (
            <Pressable onPress={() => { }}>
              <Text className="text-blue-500 font-medium">
                Saved Jobs
              </Text>
            </Pressable>
          )}
        </View>

      </View>
    </View>
  );
}
