import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CreateJobForm } from '@/components/company/CreateJobForm';

export default function CreateJobScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-background" edges={['left', 'right']}>
      <CreateJobForm />
    </SafeAreaView>
  );
}
