import { AuthLayout } from '@/components/auth';
import { VerifyEmailForm } from '@/components/verify-email-form';
import React from 'react';

export default function VerifyEmailScreen() {
  return (
    <AuthLayout variant="candidate">
      <VerifyEmailForm />
    </AuthLayout>
  );
}
