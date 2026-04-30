import { ApplicationsPage } from '@/components/applications/ApplicationsPage';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopBar from '@/components/TopBar';
import { Platform } from 'react-native';

export default function ApplicationsScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      <TopBar title="Applications" showBack={Platform.OS !== 'web'} />
      <ApplicationsPage />
    </SafeAreaView>
  );
}
