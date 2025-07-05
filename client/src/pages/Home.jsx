// Main layout file (App.jsx)
import React from 'react';
import TaskList from '../components/TaskList.jsx';
import TaskPreview from '../components/TaskPreview.jsx';
import { useTask } from '../store/taskStore.js';

export default function Home() {
  const { selectedTask } = useTask();

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
