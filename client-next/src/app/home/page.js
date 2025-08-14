'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TaskList from '@/components/TaskList';
import TaskPreview from '@/components/TaskPreview';
import { useTask } from '@/store/taskStore';
import { useAuth } from '@/store/authStore';

export default function Home() {
  const { selectedTask } = useTask();
  const { authUser, checkAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Check auth status when component mounts
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (authUser === null) {
      router.push('/login');
    }
  }, [authUser, router]);

  if (!authUser) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Task List Area */}
        <div className="col-span-1">
          <TaskList />
        </div>
        {/* Task Preview/Details Area */}
        <div className="col-span-2">
          <TaskPreview task={selectedTask} />
        </div>
      </div>
    </div>
  );
}
