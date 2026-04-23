import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Text } from '@/components/ui/text';
import { ChevronDown } from 'lucide-react-native';
import * as React from 'react';
import { Platform, Pressable, ScrollView, View } from 'react-native';

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

  return (
    <SelectContext.Provider value={{ value, onValueChange, open, setOpen }}>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        {children}
      </DropdownMenu>
    </SelectContext.Provider>
  );
}

/* ─── Trigger ─── */
function SelectTrigger({ className, children }: SelectTriggerProps) {
  return (
    <DropdownMenuTrigger asChild>
      <Pressable
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
    </DropdownMenuTrigger>
  );
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

/* ─── Item ─── */
function SelectItem({ value, label, className, children }: SelectItemProps) {
  const ctx = React.useContext(SelectContext);
  const isSelected = ctx.value?.value === value;

  return (
    <DropdownMenuItem
      className={cn(
        isSelected && 'bg-accent',
        className
      )}
      onPress={() => {
        ctx.onValueChange?.({ value, label });
        ctx.setOpen(false);
      }}>
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
