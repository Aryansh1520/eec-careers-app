import { AuthLayout } from '@/components/auth';
import { ResetPasswordForm } from '@/components/reset-password-form';
import React from 'react';

export default function ResetPasswordScreen() {
  return (
    <AuthLayout variant="candidate">
      <ResetPasswordForm />
    </AuthLayout>
  );
}
