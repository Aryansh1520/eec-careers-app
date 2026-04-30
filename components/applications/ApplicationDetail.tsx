import React, { memo, useMemo } from 'react';
import { View, ScrollView, Platform, StatusBar, Pressable } from 'react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { MapPin, DollarSign, Calendar, CheckCircle2, Link as LinkIcon, Edit2, History } from 'lucide-react-native';
import { STATUS_COLORS } from './ApplicationList';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

const topSpacing = Platform.OS === 'android' ? StatusBar.currentHeight ?? 24 : 44;

export interface AppHistoryEvent {
  id: string;
  type: string;
  status: string;
  created_at: string;
}

export interface AppDetailType {
  id: string;
  current_status: string;
  applied_at: string;
  job: {
    title: string;
    company: { name: string };
    location: { type: string; city: string | null; country: string };
    salary: { min: number; max: number; currency: string };
  };
  history: AppHistoryEvent[];
}

interface Props {
  detail: AppDetailType;
}

function StatChip({ icon: Ic, label, value }: { icon: any; label: string; value: string }) {
  return (
    <View className="flex-1 min-w-[40%] rounded-2xl p-3 bg-[var(--color-surface-2)] border border-[var(--color-border)]">
      <View className="flex-row items-center gap-1.5 mb-1.5">
        <Icon as={Ic} className="size-3 text-[var(--color-muted-foreground)]" />
        <Text className="text-[10px] uppercase tracking-widest font-semibold text-[var(--color-muted-foreground)]">
          {label}
        </Text>
      </View>
      <Text className="text-sm font-semibold text-[var(--color-foreground)] leading-snug capitalize">
        {value}
      </Text>
    </View>
  );
}

export const ApplicationDetail = memo(function ApplicationDetail({ detail }: Props) {
  const chronologicalHistory = useMemo(() => {
    return [...detail.history].sort((a, b) => 
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );
  }, [detail.history]);

  const locationText = detail.job.location.type === 'remote'
    ? `Remote · ${detail.job.location.country}`
    : `${detail.job.location.city}, ${detail.job.location.country}`;

  const currentStatusClr = STATUS_COLORS[detail.current_status.toLowerCase()] || STATUS_COLORS['applied'];

  return (
    <ScrollView
      className="flex-1 bg-[var(--color-surface-1)]"
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingBottom: 64 }}
      showsVerticalScrollIndicator={false}
    >
      {/* ════ HERO BAND ════ */}
      <View
        className="px-5 pb-5 gap-4 bg-[var(--color-surface-2)] border-b border-[var(--color-border)]"
        style={{ paddingTop: topSpacing }}
      >
        <View className="flex-row items-center gap-4">
          <View
            className="size-14 rounded-2xl items-center justify-center overflow-hidden"
            style={{ backgroundColor: 'transparent' }}
          >
            <View className={cn("absolute inset-0 opacity-20 border", currentStatusClr.bg, currentStatusClr.border)} />
            <Text className={cn("text-2xl font-bold", currentStatusClr.text)}>
              {detail.job.company.name.charAt(0).toUpperCase()}
            </Text>
          </View>

          <View className="flex-1 gap-0.5">
            <Text className="text-[11px] uppercase tracking-widest font-semibold text-[var(--color-muted-foreground)]">
              {detail.job.company.name}
            </Text>
            <Text
              className="text-xl font-bold text-[var(--color-foreground)] leading-snug"
              numberOfLines={2}
            >
              {detail.job.title}
            </Text>
          </View>
        </View>

        {/* Current status as a big Badge */}
        <View className="flex-row items-center gap-2">
          <View className={cn("flex-row items-center gap-1.5 px-3 py-1.5 rounded-full border", currentStatusClr.bg, currentStatusClr.border)}>
            <Icon as={CheckCircle2} className={cn("size-3.5", currentStatusClr.text)} />
            <Text className={cn("text-[11px] uppercase tracking-widest font-bold", currentStatusClr.text)}>
              Status: {detail.current_status}
            </Text>
          </View>
        </View>

        <View className="pt-2">
          <View className="flex-row items-center justify-center w-full h-12 rounded-2xl bg-[var(--color-green-soft)] border border-[var(--color-green-border)]">
             <Icon as={CheckCircle2} className="size-5 text-[var(--color-green)] mr-2" />
             <Text className="text-base font-bold text-[var(--color-green)] tracking-wide">Applied</Text>
          </View>
        </View>
      </View>

      {/* ════ QUICK STATS GRID ════ */}
      <View className="px-5 pt-5">
        <Text className="text-[10px] uppercase tracking-widest font-semibold text-[var(--color-muted-foreground)] mb-3">
          Application Overview
        </Text>
        <View className="flex-row flex-wrap gap-2">
          <StatChip icon={MapPin} label="Location" value={locationText} />
          <StatChip icon={Calendar} label="Applied" value={new Date(detail.applied_at).toLocaleDateString()} />
          <View className="w-full rounded-2xl p-3 bg-[var(--color-green-soft)] border border-[var(--color-green-border)] flex-row items-center justify-between mt-1">
            <View className="flex-row items-center gap-1.5">
              <Icon as={DollarSign} className="size-3.5 text-[var(--color-green)]" />
              <Text className="text-[10px] uppercase tracking-widest font-semibold text-[var(--color-green)]">
                Salary
              </Text>
            </View>
            <Text className="text-sm font-bold text-[var(--color-green)]">
              {detail.job.salary.min.toLocaleString()} - {detail.job.salary.max.toLocaleString()} {detail.job.salary.currency}
            </Text>
          </View>
        </View>
      </View>

      {/* ════ ACCORDION HISTORY TIMELINE ════ */}
      <View className="px-5 pt-8">
        <Text className="text-[10px] uppercase tracking-widest font-semibold text-[var(--color-muted-foreground)] mb-3">
          History Timeline
        </Text>
        
        <Accordion type="single" collapsible defaultValue={chronologicalHistory[chronologicalHistory.length - 1]?.id} className="gap-0 relative">
          {chronologicalHistory.map((evt, index) => {
            const isLast = index === chronologicalHistory.length - 1;
            const statusKey = evt.status.toLowerCase();
            const color = STATUS_COLORS[statusKey] || STATUS_COLORS['applied'];
            return (
              <View key={evt.id} className="relative z-0">
                {!isLast && (
                  <View className="absolute left-[31px] top-[40px] bottom-[-14px] w-[2px] bg-border z-0" />
                )}
                <AccordionItem value={evt.id} className="border-0 bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-2xl px-4 overflow-hidden mb-3 z-10 relative">
                  <AccordionTrigger className="py-4 hover:no-underline">
                    <View className="flex-row items-center gap-3">
                    <View className={cn("size-8 rounded-full items-center justify-center border", color.bg, color.border)}>
                       <Icon as={History} className={cn("size-4", color.text)} />
                    </View>
                    <View className="flex-1 items-start">
                       <Text className={cn("font-bold text-sm tracking-wide capitalize", color.text)}>
                         {statusKey}
                       </Text>
                       <Text className="text-xs text-[var(--color-muted-foreground)] mt-0.5">
                         {new Date(evt.created_at).toLocaleString()}
                       </Text>
                    </View>
                  </View>
                </AccordionTrigger>
                <AccordionContent className="pt-0 pb-4 ml-11">
                  <Text className="text-[13px] text-[var(--color-muted-foreground)] leading-relaxed">
                    Application status was updated to {statusKey} on {new Date(evt.created_at).toLocaleDateString()}.
                  </Text>
                  {statusKey === 'interview' && (
                    <View className="mt-3 p-3 rounded-xl bg-[var(--color-amber-soft)] border border-[var(--color-amber-border)]">
                       <Text className="text-[12px] font-semibold text-[var(--color-amber)]">
                         Interview scheduled. Please check your email for the meeting link.
                       </Text>
                    </View>
                  )}
                  {statusKey === 'offer' && (
                     <View className="mt-3 p-3 rounded-xl bg-[var(--color-green-soft)] border border-[var(--color-green-border)]">
                        <Text className="text-[12px] font-semibold text-[var(--color-green)]">
                          Offer received! Awaiting candidate response.
                        </Text>
                     </View>
                   )}
                </AccordionContent>
              </AccordionItem>
            </View>
            );
          })}
        </Accordion>
      </View>
    </ScrollView>
  );
});
