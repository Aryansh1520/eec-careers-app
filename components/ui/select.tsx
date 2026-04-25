import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Text } from '@/components/ui/text';
import { ChevronDown, Check } from 'lucide-react-native';
import * as React from 'react';
import { Modal, Platform, Pressable, ScrollView, View } from 'react-native';

/* ─── Types ─── */
type Option = { value: string; label: string };

type SelectProps = {
  value?: Option;
  onValueChange?: (option: Option | undefined) => void;
  children: React.ReactNode;
};

type SelectTriggerProps = {
  className?: string;
  children?: React.ReactNode;
};

type SelectValueProps = {
  className?: string;
  placeholder?: string;
};

type SelectContentProps = {
  className?: string;
  children?: React.ReactNode;
};

type SelectItemProps = {
  value: string;
  label: string;
  className?: string;
  children?: React.ReactNode;
};

/* ─── Context ─── */
const SelectContext = React.createContext<{
  value?: Option;
  onValueChange?: (option: Option | undefined) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}>({
  open: false,
  setOpen: () => {},
});

/* ─── Root ─── */
function Select({ value, onValueChange, children }: SelectProps) {
  const [open, setOpen] = React.useState(false);

  if (Platform.OS === 'web') {
    // Web: use Dropdown Menu for proper positioning
    return (
      <SelectContext.Provider value={{ value, onValueChange, open, setOpen }}>
        <DropdownMenu open={open} onOpenChange={setOpen}>
          {children}
        </DropdownMenu>
      </SelectContext.Provider>
    );
  }

  // Native (Android/iOS): use a simple context provider
  return (
    <SelectContext.Provider value={{ value, onValueChange, open, setOpen }}>
      {children}
    </SelectContext.Provider>
  );
}

/* ─── Trigger ─── */
function SelectTrigger({ className, children }: SelectTriggerProps) {
  const { setOpen } = React.useContext(SelectContext);

  const triggerContent = (
    <Pressable
      onPress={() => {
        if (Platform.OS !== 'web') {
          setOpen(true);
        }
      }}
      className={cn(
        'border-input bg-background dark:bg-input/30 flex h-10 w-full flex-row items-center justify-between rounded-md border px-3 py-2 shadow-sm shadow-black/5 sm:h-9',
        Platform.select({
          web: cn(
            'outline-none transition-[color,box-shadow] md:text-sm',
            'focus:border-ring focus:ring-ring/50 focus:ring-[3px]',
            'disabled:cursor-not-allowed disabled:opacity-50'
          ),
        }),
        className
      )}>
      <View className="flex-1 flex-row items-center">
        {children}
      </View>
      <Icon
        as={ChevronDown}
        size={16}
        className="text-muted-foreground ml-2 shrink-0"
      />
    </Pressable>
  );

  if (Platform.OS === 'web') {
    return (
      <DropdownMenuTrigger asChild>
        {triggerContent}
      </DropdownMenuTrigger>
    );
  }

  return triggerContent;
}

/* ─── Value ─── */
function SelectValue({ className, placeholder }: SelectValueProps) {
  const { value } = React.useContext(SelectContext);

  return (
    <Text
      className={cn(
        'text-base md:text-sm',
        value ? 'text-foreground' : 'text-muted-foreground',
        className
      )}
      numberOfLines={1}>
      {value?.label || placeholder || 'Select…'}
    </Text>
  );
}

/* ─── Content ─── */
function SelectContent({ className, children }: SelectContentProps) {
  const { open, setOpen } = React.useContext(SelectContext);

  if (Platform.OS === 'web') {
    return (
      <DropdownMenuContent
        className={cn('min-w-[200px] max-h-72', className)}>
        <ScrollView
          style={{ maxHeight: 280 }}
          showsVerticalScrollIndicator={true}
          bounces={false}
          nestedScrollEnabled>
          {children}
        </ScrollView>
      </DropdownMenuContent>
    );
  }

  // Native: Modal-based bottom sheet
  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={() => setOpen(false)}
      statusBarTranslucent
    >
      <Pressable
        onPress={() => setOpen(false)}
        className="flex-1 justify-end bg-black/40"
      >
        <Pressable
          onPress={(e) => e.stopPropagation?.()}
          className={cn(
            'bg-popover mx-4 mb-8 max-h-80 overflow-hidden rounded-xl border border-border shadow-lg shadow-black/10',
            className
          )}
        >
          <ScrollView
            style={{ maxHeight: 300 }}
            showsVerticalScrollIndicator
            bounces={false}
            nestedScrollEnabled
          >
            <View className="py-1">
              {children}
            </View>
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

/* ─── Item ─── */
function SelectItem({ value, label, className, children }: SelectItemProps) {
  const ctx = React.useContext(SelectContext);
  const isSelected = ctx.value?.value === value;

  const handlePress = () => {
    ctx.onValueChange?.({ value, label });
    ctx.setOpen(false);
  };

  if (Platform.OS === 'web') {
    return (
      <DropdownMenuItem
        className={cn(
          isSelected && 'bg-accent',
          className
        )}
        onPress={handlePress}>
        <Text
          className={cn(
            'text-popover-foreground text-sm',
            isSelected && 'font-semibold'
          )}>
          {children ?? label}
        </Text>
      </DropdownMenuItem>
    );
  }

  // Native: simple Pressable row
  return (
    <Pressable
      onPress={handlePress}
      className={cn(
        'flex-row items-center justify-between px-4 py-3 active:bg-accent',
        isSelected && 'bg-accent',
        className
      )}
    >
      <Text
        className={cn(
          'text-popover-foreground text-sm',
          isSelected && 'font-semibold'
        )}>
        {children ?? label}
      </Text>
      {isSelected && (
        <Icon as={Check} className="text-primary size-4" />
      )}
    </Pressable>
  );
}

/* ─── Group ─── */
function SelectGroup({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <View className={cn('', className)}>{children}</View>;
}

/* ─── Label ─── */
function SelectLabel({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <View className={cn('px-2 py-1.5', className)}>
      <Text className="text-muted-foreground text-xs font-semibold uppercase tracking-wide">
        {children}
      </Text>
    </View>
  );
}

/* ─── Separator ─── */
function SelectSeparator({ className }: { className?: string }) {
  return <View className={cn('bg-border my-1 h-px', className)} />;
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
