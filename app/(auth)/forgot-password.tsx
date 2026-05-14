import { AuthLayout } from '@/components/auth';
import { ForgotPasswordForm } from '@/components/forgot-password-form';
import React from 'react';

export default function ForgotPasswordScreen() {
  return (
    <AuthLayout variant="candidate">
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
