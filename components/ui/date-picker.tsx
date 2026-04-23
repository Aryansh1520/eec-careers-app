import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { Calendar } from 'lucide-react-native';
import * as React from 'react';
import { Platform, Pressable } from 'react-native';

type DatePickerProps = {
  /** Currently displayed date string (null = placeholder) */
  value?: string | null;
  /** Placeholder text */
  placeholder?: string;
  /** Called when pressed (UI only) */
  onPress?: () => void;
  /** Disabled state */
  disabled?: boolean;
  className?: string;
};

function DatePicker({
  value,
  placeholder = 'Select date',
  onPress,
  disabled = false,
  className,
}: DatePickerProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={cn(
        'border-input bg-background dark:bg-input/30 flex h-10 w-full flex-row items-center rounded-md border px-3 py-1 shadow-sm shadow-black/5 sm:h-9',
        Platform.select({
          web: cn(
            'cursor-pointer outline-none transition-[color,box-shadow]',
            'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]'
          ),
        }),
        disabled && cn(
          'opacity-50',
          Platform.select({ web: 'pointer-events-none cursor-not-allowed' })
        ),
        className
      )}>
      <Text
        className={cn(
          'flex-1 text-base md:text-sm',
          value ? 'text-foreground' : 'text-muted-foreground'
        )}>
        {value || placeholder}
      </Text>
      <Icon as={Calendar} size={16} className="text-muted-foreground ml-2 shrink-0" />
    </Pressable>
  );
}

export { DatePicker };
export type { DatePickerProps };
