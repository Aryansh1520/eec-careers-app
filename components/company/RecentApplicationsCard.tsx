import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { User, Clock } from 'lucide-react-native';

interface RecentApplication {
  candidate_name: string;
  job_title: string;
  created_at: string;
  type: string;
  status?: string;
}

function timeAgo(dateStr: string): string {
  const diff = new Date().getTime() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  return `${minutes}m ago`;
}

interface RecentApplicationsCardProps {
  applications: RecentApplication[];
  className?: string;
}

export function RecentApplicationsCard({ applications, className }: RecentApplicationsCardProps) {
  return (
    <View className={cn('bg-card rounded-2xl border border-border shadow-sm p-4', className)}>
      <Text className="text-sm font-semibold text-foreground mb-3 uppercase tracking-widest">
        Recent Applications
      </Text>
      {applications.slice(0, 5).map((app, i) => (
        <View
          key={i}
          className={cn(
            'flex-row items-center justify-between py-3',
            i < applications.length - 1 && 'border-b border-border/50'
          )}
        >
          <View className="flex-row items-center flex-1 gap-3">
            <View className="size-8 rounded-full bg-primary-soft items-center justify-center">
              <Icon as={User} className="size-4 text-primary" />
            </View>
            <View className="flex-1">
              <Text className="text-sm font-semibold text-foreground" numberOfLines={1}>
                {app.candidate_name}
              </Text>
              <Text className="text-xs text-muted-foreground" numberOfLines={1}>
                Applied for {app.job_title}
              </Text>
            </View>
          </View>
          <View className="flex-row items-center gap-1">
            <Icon as={Clock} className="size-3 text-muted-foreground" />
            <Text className="text-[10px] text-muted-foreground">{timeAgo(app.created_at)}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}
