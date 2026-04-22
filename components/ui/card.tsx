import * as React from 'react';
import { View, type ViewProps } from 'react-native';
import { Text, TextClassContext } from '@/components/ui/text';
import { cn } from '@/lib/utils';

type CardProps = ViewProps & { className?: string };
type TextProps = React.ComponentProps<typeof Text> & { className?: string };

// Root
export function Card({ className, ...props }: CardProps) {
  return (
    <TextClassContext.Provider value="text-card-foreground">
      <View
        className={cn(
          'bg-card border-border flex flex-col gap-6 rounded-xl border py-6 shadow-sm shadow-black/5',
          className
        )}
        {...props}
      />
    </TextClassContext.Provider>
  );
}

// Header
export function CardHeader({ className, ...props }: CardProps) {
  return <View className={cn('flex flex-col gap-1.5 px-6', className)} {...props} />;
}

// Title
export function CardTitle({ className, ...props }: TextProps) {
  return (
    <Text
      role="heading"
      aria-level={3}
      className={cn('font-semibold leading-none', className)}
      {...props}
    />
  );
}

// Description
export function CardDescription({ className, ...props }: TextProps) {
  return <Text className={cn('text-muted-foreground text-sm', className)} {...props} />;
}

// Content
export function CardContent({ className, ...props }: CardProps) {
  return <View className={cn('px-6', className)} {...props} />;
}

// Footer
export function CardFooter({ className, ...props }: CardProps) {
  return <View className={cn('flex flex-row items-center px-6', className)} {...props} />;
}
