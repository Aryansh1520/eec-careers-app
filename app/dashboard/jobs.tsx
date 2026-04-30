import { JobsPage } from '@/components/jobs/JobsPage';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, Text, Platform } from 'react-native';
import TopBar from '@/components/TopBar';

export default function JobsScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      <TopBar title="Jobs" showBack={Platform.OS !== 'web'} />
      <JobsPage />
    </SafeAreaView>
  );
}
