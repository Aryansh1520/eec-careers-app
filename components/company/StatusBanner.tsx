import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { CheckCircle, Clock, XCircle, ShieldAlert } from 'lucide-react-native';
import type { CompanyStatus } from '@/lib/company-data';

const STATUS_CONFIG: Record<
  CompanyStatus,
  { bg: string; border: string; icon: any; iconColor: string; textColor: string; title: string; message: string }
> = {
  approved: {
    bg: 'bg-[var(--color-green-soft)]',
    border: 'border-[var(--color-green-border)]',
    icon: CheckCircle,
    iconColor: 'text-[var(--color-green)]',
    textColor: 'text-[var(--color-green)]',
    title: 'Verified',
    message: 'Your company is verified and visible to candidates.',
  },
  pending: {
    bg: 'bg-[var(--color-amber-soft)]',
    border: 'border-[var(--color-amber-border)]',
    icon: Clock,
    iconColor: 'text-[var(--color-amber)]',
    textColor: 'text-[var(--color-amber)]',
    title: 'Under Review',
    message: 'Your account is under review. Some features are restricted.',
  },
  rejected: {
    bg: 'bg-destructive/10',
    border: 'border-destructive/30',
    icon: XCircle,
    iconColor: 'text-destructive',
    textColor: 'text-destructive',
    title: 'Rejected',
    message: 'Your account has been rejected. Please contact support for assistance.',
  },
  suspended: {
    bg: 'bg-destructive/10',
    border: 'border-destructive/30',
    icon: ShieldAlert,
    iconColor: 'text-destructive',
    textColor: 'text-destructive',
    title: 'Suspended',
    message: 'Your account is suspended. All job postings are hidden from candidates.',
  },
};

interface StatusBannerProps {
  status: CompanyStatus;
  className?: string;
}

export function StatusBanner({ status, className }: StatusBannerProps) {
  const config = STATUS_CONFIG[status];

  return (
    <View className={cn('rounded-2xl border p-4 flex-row items-center gap-3', config.bg, config.border, className)}>
      <View className="size-9 rounded-full bg-background/60 items-center justify-center">
        <Icon as={config.icon} className={cn('size-5', config.iconColor)} />
      </View>
      <View className="flex-1">
        <Text className={cn('text-sm font-bold', config.textColor)}>{config.title}</Text>
        <Text className="text-xs text-muted-foreground mt-0.5">{config.message}</Text>
      </View>
    </View>
  );
}
