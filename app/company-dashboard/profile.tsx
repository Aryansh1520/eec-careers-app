import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CompanyProfileForm } from '@/components/company/CompanyProfileForm';

export default function CompanyProfileScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-background" edges={['left', 'right']}>
      <CompanyProfileForm />
    </SafeAreaView>
  );
}
