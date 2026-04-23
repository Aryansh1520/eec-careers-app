import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import * as React from 'react';
import { Platform, View } from 'react-native';
import Animated, {
  FadeIn,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

const STEP_LABELS = [
  'Identity',
  'Professional',
  'Education',
  'Experience',
  'Resume',
  'Preferences',
  'Final',
];

type Props = {
  currentStep: number; // 0-indexed
  totalSteps?: number;
};

export function OnboardingProgress({ currentStep, totalSteps = 7 }: Props) {
  return (
    <View className="gap-3">
      {/* Step dots / circles */}
      <View className="flex-row items-center justify-between">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isUpcoming = index > currentStep;

          return (
            <React.Fragment key={index}>
              {/* Step circle */}
              <View className="items-center gap-1.5">
                <StepCircle
                  index={index}
                  isCompleted={isCompleted}
                  isCurrent={isCurrent}
                />
                <Text
                  className={cn(
                    'text-[10px] font-medium',
                    isCurrent
                      ? 'text-primary'
                      : isCompleted
                      ? 'text-primary/60'
                      : 'text-muted-foreground'
                  )}
                  numberOfLines={1}>
                  {STEP_LABELS[index]}
                </Text>
              </View>

              {/* Connector line */}
              {index < totalSteps - 1 && (
                <View className="mb-5 h-[2px] flex-1 mx-1">
                  <View
                    className={cn(
                      'h-full rounded-full',
                      index < currentStep
                        ? 'bg-primary'
                        : 'bg-border'
                    )}
                  />
                </View>
              )}
            </React.Fragment>
          );
        })}
      </View>

      {/* Progress text */}
      <Text className="text-muted-foreground text-center text-xs">
        Step {currentStep + 1} of {totalSteps}
      </Text>
    </View>
  );
}

function StepCircle({
  index,
  isCompleted,
  isCurrent,
}: {
  index: number;
  isCompleted: boolean;
  isCurrent: boolean;
}) {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withSpring(isCurrent ? 1.15 : 1, {
          damping: 15,
          stiffness: 200,
        }),
      },
    ],
  }));

  return (
    <Animated.View
      style={animatedStyle}
      className={cn(
        'size-8 items-center justify-center rounded-full',
        isCompleted && 'bg-primary',
        isCurrent && 'bg-primary shadow-sm shadow-primary/30',
        !isCompleted && !isCurrent && 'bg-muted border-border border'
      )}>
      <Text
        className={cn(
          'text-xs font-bold',
          isCompleted || isCurrent
            ? 'text-primary-foreground'
            : 'text-muted-foreground'
        )}>
        {isCompleted ? '✓' : index + 1}
      </Text>
    </Animated.View>
  );
}
