
'use client';
import React, { useState } from 'react';
import { useTask } from '../store/taskStore.js';
import { Edit, Trash2, Check, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function TaskPreview({ task }) {
  const { updateTask, deleteTask, isLoading, setSelectedTask } = useTask();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ title: '', description: '' });

  // Initialize edit data when task changes
  React.useEffect(() => {
    if (task) {
      setEditData({ title: task.title, description: task.description });
    }
  }, [task]);

  if (!task) {
    return (
      <div className="bg-white p-4 rounded shadow">
        <div className="text-center py-8 text-gray-500">
          <p>Select a Entry to view details</p>
        </div>
      </div>
    );
  }

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ title: task.title, description: task.description });
  };

  const handleSave = async () => {
    if (!editData.title.trim() || !editData.description.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await updateTask(task._id, {
        title: editData.title.trim(),
        description: editData.description.trim(),
        completed: task.completed
      });
      setIsEditing(false);
      toast.success('Task updated successfully!');
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({ title: task.title, description: task.description });
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(task._id);
        toast.success('Task deleted successfully!');
      } catch (error) {
        toast.error('Failed to delete task');
      }
    }
  };

  const toggleComplete = async () => {
    try {
      await updateTask(task._id, {
        title: task.title,
        description: task.description,
        completed: !task.completed
      });
      toast.success(task.completed ? 'Task marked as incomplete' : 'Task completed!');
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      {/* Header with actions */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          {isEditing ? (
            <input
              type="text"
              value={editData.title}
              onChange={(e) => setEditData({...editData, title: e.target.value})}
              className="input input-bordered w-full mb-2"
            />
          ) : (
            <h2 className="text-xl font-semibold mb-2 text-blue-700">{task.title}</h2>
          )}
        </div>
        <div className="flex gap-2 ml-4">
          {isEditing ? (
            <>
              <button 
                onClick={handleSave}
                className="btn btn-success btn-sm"
                disabled={isLoading}
              >
                <Check className="h-4 w-4" />
              </button>
              <button 
                onClick={handleCancel}
                className="btn btn-ghost btn-sm"
              >
                <X className="h-4 w-4" />
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={handleEdit}
                className="btn btn-primary btn-sm"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button 
                onClick={handleDelete}
                className="btn btn-error btn-sm"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Task content */}
      <div className="mb-4">
        {isEditing ? (
          <textarea
            value={editData.description}
            onChange={(e) => setEditData({...editData, description: e.target.value})}
            className="textarea textarea-bordered w-full"
            rows="4"
          />
        ) : (
          <p className="text-gray-700 mb-4">{task.description}</p>
        )}
      </div>

      {/* Task status and actions */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className={`badge ${task.completed ? 'badge-success' : 'badge-warning'}`}>
            {task.completed ? 'Completed' : 'Pending'}
          </span>
          <span className="text-sm text-gray-500">
            Created: {new Date(task.createdAt).toLocaleDateString()}
          </span>
        </div>
        
        {!isEditing && (
          <button 
            onClick={toggleComplete}
            className={`btn btn-sm ${task.completed ? 'btn-warning' : 'btn-success'}`}
            disabled={isLoading}
          >
            {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
          </button>
        )}
      </div>
    </div>
  );
}