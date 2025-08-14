'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/store/authStore';

export default function RootPage() {
  const { authUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authUser) {
      router.push('/home');
    } else {
      router.push('/login');
    }
  }, [authUser, router]);

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center">
      <div className="loading loading-spinner loading-lg"></div>
    </div>
  );
}
