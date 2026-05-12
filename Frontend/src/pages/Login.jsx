// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      
      // Navigate immediately for a snappier feel
      navigate("/"); 
    } catch (err) {
      // Better error handling than simple alert
      alert(err.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 mt-1 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-gray-700 bg-gray-50 focus:bg-white";

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white shadow-2xl rounded-3xl p-10 border border-slate-100">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-slate-900">Welcome Back</h2>
          <p className="text-slate-500 mt-2">Please enter your details to sign in</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email field */}
          <div>
            <label className="block text-sm font-bold text-slate-700 ml-1">Email Address</label>
            <input
              type="email"
              className={inputClass}
              placeholder="name@example.com"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          {/* Password field */}
          <div>
            <div className="flex justify-between items-center ml-1">
              <label className="block text-sm font-bold text-slate-700">Password</label>
              {/* Optional: Add a 'Forgot Password' link here later */}
            </div>
            <input
              type="password"
              className={inputClass}
              placeholder="••••••••"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className={`w-full py-3 px-4 rounded-xl font-bold text-white transition-all shadow-lg active:scale-95 ${
              loading 
              ? "bg-slate-400 cursor-not-allowed" 
              : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200"
            }`}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </span>
            ) : "Sign In"}
          </button>
        </form>

        {/* Footer Link */}
        <div className="text-center mt-8">
          <p className="text-sm text-slate-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-indigo-600 font-bold hover:underline">
              Create one for free
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;