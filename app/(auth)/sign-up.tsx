import { AuthLayout } from '@/components/auth';
import { SignUpForm } from '@/components/sign-up-form';
import React from 'react';

export default function SignUpScreen() {
  return (
    <AuthLayout variant="candidate">
      <SignUpForm />
    </AuthLayout>
  );
}
