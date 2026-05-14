import { AuthLayout } from '@/components/auth';
import { SignInForm } from '@/components/sign-in-form';
import React from 'react';

export default function LoginScreen() {
  return (
    <AuthLayout variant="candidate">
      <SignInForm />
    </AuthLayout>
  );
}
