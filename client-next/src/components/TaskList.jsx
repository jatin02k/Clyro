'use client';
import React, { useEffect, useState } from 'react';
import { useTask } from '../store/taskStore.js';
import { Loader2, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

export default function TaskList() {
  const { tasks, getTask, getTaskById, isLoading, createTask } = useTask();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '' });
  
  useEffect(() => {
    getTask();
  },[getTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.description.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    
    try {
      await createTask({
        title: formData.title.trim(),
        description: formData.description.trim(),
        completed: false
      });
      
      // Reset form and hide it
      setFormData({ title: '', description: '' });
      setShowForm(false);
      
      // Refresh the task list
      setTimeout(() => {
        getTask();
      }, 100);
      
      toast.success('Task created successfully!');
    } catch (error) {
      toast.error('Failed to create task');
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      {/* Header with New Task button - ALWAYS VISIBLE */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-black">Your Tasks</h2>
        <button 
          onClick={() => setShowForm(true)}
          className="btn btn-primary btn-sm"
        >
          <Plus className="h-4 w-4 mr-1" />
          New Task
        </button>
      </div>
      
      {/* Create Task Form */}
      {showForm && (
        <div className="mb-4 p-4 border rounded bg-gray-50">
          <h3 className="font-semibold mb-2 text-black">Create New Task</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Task title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="input input-bordered w-full mb-2"
              required
            />
            <textarea
              placeholder="Task description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="textarea textarea-bordered w-full mb-2"
              required
            />
            <div className="flex gap-2">
              <button type="submit" className="btn btn-primary btn-sm">
                Create Task
              </button>
              <button 
                type="button" 
                onClick={() => {
                  setShowForm(false);
                  setFormData({ title: '', description: '' });
                }}
                className="btn btn-ghost btn-sm text-black"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Loading State */}
      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
        </div>
      ) : (
        <>
          {/* Empty State */}
          {tasks.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No tasks yet. Create your first task!</p>
            </div>
          ) : (
            /* Task List */
            <ul className="space-y-2">
              {tasks.map(task => (
                <li
                  key={task._id}
                  className="p-3 border rounded hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => getTaskById(task._id)}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-blue-700">{task.title}</span>
                    <span className={`badge ${task.completed ? 'badge-success' : 'badge-warning'}`}>
                      {task.completed ? 'Done' : 'Pending'}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}