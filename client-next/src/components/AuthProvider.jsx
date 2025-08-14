'use client';
import { useAuth } from '@/store/authStore';
import Navbar from './Navbar';

export default function AuthProvider({ children }) {
  const { authUser } = useAuth();

  return (
    <div className="min-h-screen bg-base-100">
      {authUser && <Navbar />}
      {children}
    </div>
  );
}
