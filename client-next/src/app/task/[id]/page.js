'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/store/authStore';
import { useTask } from '@/store/taskStore';
import TaskPreview from '@/components/TaskPreview';

export default function Task() {
  const { id } = useParams();
  const router = useRouter();
  const { authUser } = useAuth();
  const { getTask, selectedTask, isLoading } = useTask();

  useEffect(() => {
    if (!authUser) {
      router.push('/login');
      return;
    }

    if (id) {
      getTask(id);
    }
  }, [id, authUser, router, getTask]);

  if (!authUser) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <TaskPreview task={selectedTask} />
    </div>
  );
}