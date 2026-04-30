import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { Clock } from 'lucide-react-native';

const STATUS_MAP: Record<string, { bg: string, text: string }> = {
  'applied': { bg: 'bg-[var(--color-indigo-soft)]', text: 'text-[var(--color-primary)]' },
  'screening': { bg: 'bg-[var(--color-blue-soft)]', text: 'text-[var(--color-blue)]' },
  'interview': { bg: 'bg-[var(--color-amber-soft)]', text: 'text-[var(--color-amber)]' },
  'accepted': { bg: 'bg-[var(--color-green-soft)]', text: 'text-[var(--color-green)]' },
  'rejected': { bg: 'bg-[var(--color-destructive-soft)]', text: 'text-[var(--color-destructive)]' },
};

interface ActivityItemProps {
  type: string;
  status: string;
  jobTitle: string;
  company: string;
  createdAt: string;
}

export function ActivityItem({ type, status, jobTitle, company, createdAt }: ActivityItemProps) {
  const diff = new Date().getTime() - new Date(createdAt).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  let timeAgo = '';
  if (days > 0) timeAgo = `${days}d ago`;
  else if (hours > 0) timeAgo = `${hours}h ago`;
  else timeAgo = `${minutes}m ago`;

  const statusKey = status.toLowerCase();
  const color = STATUS_MAP[statusKey] || STATUS_MAP['applied'];

  return (
    <View className="flex-row items-center justify-between py-3 border-b border-border/50 last:border-b-0">
      <View className="flex-row items-center flex-1">
        <View className="w-[100px]">
          <View className={cn("px-2 py-1 rounded-full self-start", color.bg)}>
            <Text className={cn("text-[10px] font-bold tracking-wider capitalize", color.text)}>
              {statusKey}
            </Text>
          </View>
        </View>
        
        <View className="flex-1 px-3">
          <Text className="text-sm font-semibold text-foreground truncate" numberOfLines={1}>{jobTitle}</Text>
          <Text className="text-xs text-muted-foreground truncate" numberOfLines={1}>{company}</Text>
        </View>
      </View>
      
      <View className="flex-row items-center gap-1 w-16 justify-end">
        <Icon as={Clock} className="size-3 text-muted-foreground mr-0.5" />
        <Text className="text-[10px] text-muted-foreground">{timeAgo}</Text>
      </View>
    </View>
  );
}
