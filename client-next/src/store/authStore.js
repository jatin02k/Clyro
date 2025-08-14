import { create } from "zustand";
import { api } from "@/lib/axios";
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
          console.log("Auth check successful:", res.data);
          set({ authUser: res.data, isLoading: false });
        } catch (error) {
          // Handle 401 (Unauthorized) gracefully - this is normal when not logged in
          if (error.response?.status === 401) {
            console.log("User not authenticated (401)");
            set({ 
              authUser: null, 
              isLoading: false, 
              error: null // Don't set error for normal unauthorized state
            });
          } else {
            // For network errors or server down, just set user as null
            console.error("error in checkAuth:", error);
            set({ 
              authUser: null, 
              isLoading: false, 
              error: null 
            });
          }
        }
      },

      signup: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const res = await api.post("/auth/signup", data);
          set({ authUser: res.data, isLoading: false });
          toast.success("Successfully Signed Up");
          // Let the component handle navigation
          return { success: true };
        } catch (error) {
          const errorMessage = error.response?.data?.message || "Signup failed";
          set({ 
            isLoading: false, 
            error: errorMessage 
          });
          toast.error(errorMessage);
          console.error("Signup error:", error);
          return { success: false, error: errorMessage };
        }
      },

      login: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const res = await api.post("/auth/login", data);
          console.log("Login successful:", res.data);
          set({ authUser: res.data, isLoading: false });
          toast.success("Successfully Logged In");
          // Let the component handle navigation
          return { success: true };
        } catch (error) {
          const errorMessage = error.response?.data?.message || "Login failed";
          set({ 
            isLoading: false, 
            error: errorMessage 
          });
          toast.error(errorMessage);
          console.error("Login error:", error);
          return { success: false, error: errorMessage };
        }
      },

      logout: async () => {
        set({ isLoading: true, error: null });
        try {
          await api.post("/auth/logout");
          set({ authUser: null, isLoading: false });
          toast.success("Logged Out Successfully");
          // Let the component handle navigation
          return { success: true };
        } catch (error) {
          const errorMessage = error.response?.data?.message || "Logout failed";
          set({ 
            isLoading: false, 
            error: errorMessage 
          });
          toast.error(errorMessage);
          console.error("Logout error:", error);
          return { success: false, error: errorMessage };
        }
      },
    }),
    {
      name: "auth-storage", // unique name for localStorage
      partialize: (state) => ({ authUser: state.authUser }), // only persist authUser
      onRehydrateStorage: () => (state) => {
        console.log("Auth state rehydrated:", state);
      },
    }
  )
);
