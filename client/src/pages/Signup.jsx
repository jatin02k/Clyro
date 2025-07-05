import React, { useState } from "react";
import { useAuth } from "../store/authStore";
import { Link } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({fullName:"", email: "", password: "" });
  const { signup } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    signup(formData); // Pass the formData to the login action
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-500">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-300 p-12 rounded-lg shadow-md w-4/5 sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4"
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-600 text-center">
          Sign-Up
        </h2>
        {/* FullName */}
        <label className='block mb-4'>
        <span className="text-gray-700">What is Your Name?</span>
        <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="input input-bordered w-full mt-2"
            placeholder="FullName"
          />
        </label>

        {/* Email */}
        <label className="block mb-4">
          <span className="text-gray-700">Email</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="input input-bordered w-full mt-2"
            placeholder="mail@site.com"
          />
        </label>

        {/* Password */}
        <label className="block mb-6">
          <span className="text-gray-700">Password</span>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="8"
            className="input input-bordered w-full mt-2"
            placeholder="Password"
          />
        </label>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-full">
          Signup
        </button>
        <p className="mt-4 text-center text-gray-600">
          Already have an account?
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
