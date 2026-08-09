'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthService } from '@/lib/authService';
import { Logo } from '@/components/layout/Logo';

export default function RootPage() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    AuthService.checkAuth()
      .then(user => {
        if (user) {
          router.replace('/dashboard');
        } else {
          router.replace('/login');
        }
      })
      .catch(() => {
        router.replace('/login');
      })
      .finally(() => {
        setIsChecking(false);
      });
  }, [router]);

  return (
    <div className="auth-grid-bg min-h-screen flex items-center justify-center">
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-8 flex flex-col items-center gap-4">
        <Logo size={36} showWordmark={true} />
        <div className="w-8 h-8 border-3 border-gray-200 border-t-gray-900 rounded-full animate-spin"></div>
        <span className="text-xs font-semibold text-gray-500">Initializing Dream Deco Workspace...</span>
      </div>
    </div>
  );
}
