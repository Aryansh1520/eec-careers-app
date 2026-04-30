import React, { useState, useMemo, useCallback } from 'react';
import { View, Modal, Pressable } from 'react-native';
import { Text } from '@/components/ui/text';
import { applicationsList, applicationDetail } from '@/lib/data';
import { ApplicationList } from './ApplicationList';
import { ApplicationDetail, AppDetailType } from './ApplicationDetail';
import { useBreakpoint } from '@/lib/use-breakpoint';
import { Icon } from '@/components/ui/icon';
import { X, ArrowLeft } from 'lucide-react-native';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const STATUS_OPTIONS = ['All', 'Applied', 'Screening', 'Interview', 'Offer', 'Rejected'];

export function ApplicationsPage() {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === 'mobile';

  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);

  const applications = applicationsList.data;

  const filteredApps = useMemo(() => {
    if (statusFilter === 'All') return applications;
    return applications.filter(
      (app) => app.current_status.toUpperCase() === statusFilter.toUpperCase()
    );
  }, [statusFilter, applications]);

  const handleSelectApp = useCallback((id: string) => {
    setSelectedAppId(id);
  }, []);

  const selectedAppDetail = useMemo(() => {
    if (!selectedAppId) return null;
    return applicationDetail as AppDetailType;
  }, [selectedAppId]);

  if (isMobile) {
    return (
      <View className="flex-1 bg-background">
        <View className="flex-row items-center justify-between border-b border-border px-4 py-2 bg-card">
          <Text className="text-sm font-semibold text-foreground">Filter by Status</Text>
          <View className="w-36">
            <Select
              value={{ value: statusFilter, label: statusFilter === 'All' ? 'All ▼' : statusFilter }}
              onValueChange={(opt) => {
                if (opt) setStatusFilter(opt.value);
              }}
            >
              <SelectTrigger className="h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((opt) => (
                  <SelectItem key={opt} value={opt} label={opt} />
                ))}
              </SelectContent>
            </Select>
          </View>
        </View>
        <ApplicationList
          applications={filteredApps}
          onSelectApp={handleSelectApp}
        />
        <Modal
          visible={!!selectedAppId}
          animationType="slide"
          presentationStyle="pageSheet"
          onRequestClose={() => setSelectedAppId(null)}
        >
          <View className="flex-1 bg-background">
            <View className="flex-row items-center justify-between border-b border-border px-4 py-4 mt-8">
              <Text className="text-foreground text-base font-semibold" numberOfLines={1}>Application Details</Text>
              <Pressable onPress={() => setSelectedAppId(null)} hitSlop={12}>
                <Icon as={X} className="text-foreground size-5" />
              </Pressable>
            </View>
            {selectedAppDetail && <ApplicationDetail detail={selectedAppDetail} />}
          </View>
        </Modal>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <View className="flex-1 flex-row">
        <View style={{ flex: 35 }} className="border-r border-border bg-card/50">
          <View className="flex-row items-center justify-between border-b border-border px-4 py-2 bg-card w-full">
            <Text className="text-sm font-semibold text-foreground">Filter by Status</Text>
            <View className="w-36">
              <Select
                value={{ value: statusFilter, label: statusFilter === 'All' ? 'All ▼' : statusFilter }}
                onValueChange={(opt) => {
                  if (opt) setStatusFilter(opt.value);
                }}
              >
                <SelectTrigger className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((opt) => (
                    <SelectItem key={opt} value={opt} label={opt} />
                  ))}
                </SelectContent>
              </Select>
            </View>
          </View>

          <ApplicationList
            applications={filteredApps}
            onSelectApp={handleSelectApp}
            selectedAppId={selectedAppId}
          />
        </View>
        <View style={{ flex: 65, justifyContent: selectedAppId ? 'flex-start' : 'center', alignItems: selectedAppId ? 'stretch' : 'center' }} className="bg-background">
          {selectedAppId && selectedAppDetail ? (
            <ApplicationDetail detail={selectedAppDetail} />
          ) : (
            <Text className="text-muted-foreground text-center text-lg">
              Select an application to view details
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}
