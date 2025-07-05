import { create } from "zustand";
import { api } from "../api/axios";
import toast from "react-hot-toast";


export const useTask = create((set, get) => ({
  tasks: [],
  selectedTask: null,
  isLoading: false,
  error: null,
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),

  getTask: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.get("/task");
      set({ tasks: res.data, isLoading: false });
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to fetch tasks";
      set({ 
        isLoading: false, 
        error: errorMessage 
      });
      toast.error(errorMessage);
      console.error("Error fetching tasks:", error);
    }
  },

  createTask: async (data) => {
    set({ isLoading: true, error: null });
    // Optimistic update
    const optimisticTask = {
      ...data,
      _id: Date.now().toString(), // temporary ID
      createdAt: new Date().toISOString(),
    };
    
    set((state) => ({ 
      tasks: [...state.tasks, optimisticTask],
      isLoading: true 
    }));

    try {
      const res = await api.post("/task", data);
      set((state) => ({
        tasks: state.tasks.map(task => 
          task._id === optimisticTask._id ? res.data : task
        ),
        isLoading: false
      }));
      toast.success("Task created");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to create task";
      // Revert optimistic update
      set((state) => ({
        tasks: state.tasks.filter(task => task._id !== optimisticTask._id),
        isLoading: false,
        error: errorMessage
      }));
      toast.error(errorMessage);
      console.error("Error creating task:", error);
    }
  },

  getTaskById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.get(`/task/${id}`);
      set({ selectedTask: res.data, isLoading: false });
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to load task";
      set({ 
        isLoading: false, 
        error: errorMessage 
      });
      toast.error(errorMessage);
      console.error("Error fetching task:", error);
    }
  },

  updateTask: async (id, data) => {
    set({ isLoading: true, error: null });
    // Optimistic update
    const currentTask = get().tasks.find(task => task._id === id);
    if (currentTask) {
      set((state) => ({
        tasks: state.tasks.map(task => 
          task._id === id ? { ...task, ...data } : task
        ),
        selectedTask: { ...currentTask, ...data }
      }));
    }

    try {
      const res = await api.put(`/task/${id}`, data);
      set((state) => ({
        tasks: state.tasks.map((task) => (task._id === id ? res.data : task)),
        selectedTask: res.data,
        isLoading: false
      }));
      toast.success("Task updated");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to update task";
      // Revert optimistic update
      if (currentTask) {
        set((state) => ({
          tasks: state.tasks.map(task => 
            task._id === id ? currentTask : task
          ),
          selectedTask: currentTask,
          isLoading: false,
          error: errorMessage
        }));
      }
      toast.error(errorMessage);
      console.error("Error updating task:", error);
    }
  },

  deleteTask: async (id) => {
    set({ isLoading: true, error: null });
    // Optimistic update
    const taskToDelete = get().tasks.find(task => task._id === id);
    set((state) => ({
      tasks: state.tasks.filter((task) => task._id !== id),
      selectedTask: state.selectedTask?._id === id ? null : state.selectedTask,
      isLoading: true
    }));

    try {
      await api.delete(`/task/${id}`);
      set({ isLoading: false });
      toast.success("Task deleted");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to delete task";
      // Revert optimistic update
      if (taskToDelete) {
        set((state) => ({
          tasks: [...state.tasks, taskToDelete],
          selectedTask: state.selectedTask?._id === id ? taskToDelete : state.selectedTask,
          isLoading: false,
          error: errorMessage
        }));
      }
      toast.error(errorMessage);
      console.error("Error deleting task:", error);
    }
  },

  setSelectedTask: (task) => set({ selectedTask: task }),
}));
