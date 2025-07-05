import { create } from "zustand";
import { api } from "../api/axios";
import toast from "react-hot-toast";
import { persist } from "zustand/middleware";

export const useAuth = create(
  persist(
    (set) => ({
      authUser: null,
      isLoading: false,
      error: null,

      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),

      checkAuth: async () => {
        set({ isLoading: true, error: null });
        try {
          const res = await api.get("/auth/check");
          set({ authUser: res.data, isLoading: false });
        } catch (error) {
          // Handle 401 (Unauthorized) gracefully - this is normal when not logged in
          if (error.response?.status === 401) {
            set({ 
              authUser: null, 
              isLoading: false, 
              error: null // Don't set error for normal unauthorized state
            });
          } else {
            // Only set error for actual errors (network issues, server errors, etc.)
            const errorMessage = error.response?.data?.message || "Authentication check failed";
            set({ 
              authUser: null, 
              isLoading: false, 
              error: errorMessage 
            });
            console.error("error in checkAuth:", error);
          }
        }
      },

      signup: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const res = await api.post("auth/signup", data);
          set({ authUser: res.data, isLoading: false });
          toast.success("Successfully Signed Up");
        } catch (error) {
          const errorMessage = error.response?.data?.message || "Signup failed";
          set({ 
            isLoading: false, 
            error: errorMessage 
          });
          toast.error(errorMessage);
          console.error("Signup error:", error);
        }
      },

      login: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const res = await api.post("auth/login", data);
          set({ authUser: res.data, isLoading: false });
          toast.success("Successfully Logged In");
        } catch (error) {
          const errorMessage = error.response?.data?.message || "Login failed";
          set({ 
            isLoading: false, 
            error: errorMessage 
          });
          toast.error(errorMessage);
          console.error("Login error:", error);
        }
      },

      logout: async () => {
        set({ isLoading: true, error: null });
        try {
          await api.post("/auth/logout");
          set({ authUser: null, isLoading: false });
          toast.success("Logged Out Successfully");
        } catch (error) {
          const errorMessage = error.response?.data?.message || "Logout failed";
          set({ 
            isLoading: false, 
            error: errorMessage 
          });
          toast.error(errorMessage);
          console.error("Logout error:", error);
        }
      },
    }),
    {
      name: "auth-storage", // unique name for localStorage
      partialize: (state) => ({ authUser: state.authUser }), // only persist authUser
    }
  )
);
