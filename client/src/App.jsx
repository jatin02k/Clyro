import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Home from "./pages/Home.jsx";
import Task from "./pages/Task.jsx";
import Navbar from "./components/Navbar.jsx";
import { useAuth } from "./store/authStore.js";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

function App() {
  const { authUser, checkAuth, isLoading } = useAuth();
  
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  
  // Add loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to={authUser ? "/home" : "/login"} />} />
        <Route path="/login" element={!authUser? <Login /> : <Navigate to="/home" />} />
        <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to="/home" />} />
        <Route path="/home" element={authUser ? <Home /> : <Navigate to="/login" /> } />
        <Route path="/task/:id" element={authUser? <Task /> : <Navigate to="/login" />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
