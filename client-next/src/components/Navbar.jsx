'use client';
import React from 'react'
import { useAuth } from '../store/authStore';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const result = await logout();
      if (result?.success) {
        router.push('/login');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="w-full bg-base-100 shadow-md">
      <div className="max-w-10xl mx-auto flex items-center justify-between px-4 py-3">
        <a href="/home" className="text-xl font-semibold text-gray-300">TaskManager</a>
        <button onClick={handleLogout} className="btn btn-primary">Logout</button>
      </div>
    </div>
  );
}
  