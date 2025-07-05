// Main layout file (App.jsx)
import React from 'react';
import TaskList from '../components/TaskList.jsx';
import TaskPreview from '../components/TaskPreview.jsx';
import { useTask } from '../store/taskStore.js';

export default function App() {
  const { selectedTask } = useTask();

  return (
    <div className="min-h-screen bg-base-200">
      <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1">
          <TaskList />
        </div>
        <div className="col-span-2">
          <TaskPreview task={selectedTask} />
        </div>
      </div>
    </div>
  );
}
