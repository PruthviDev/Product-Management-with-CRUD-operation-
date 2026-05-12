// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await API.post("/auth/register", formData);
      alert("Registration Successful! Please login.");
      navigate("/login");
    } catch (error) {
      setError(
        error.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 mt-1 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-gray-700 bg-gray-50 focus:bg-white";

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="max-w-md w-full bg-white shadow-2xl rounded-3xl p-10 border border-slate-100">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-slate-900">Create Account</h2>
          <p className="text-slate-500 mt-2">Join us to start managing your products</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded-r-lg animate-pulse">
            <span className="font-bold">Error:</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-bold text-slate-700 ml-1">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              className={inputClass}
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-bold text-slate-700 ml-1">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="name@example.com"
              className={inputClass}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-bold text-slate-700 ml-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className={inputClass}
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-xl font-bold text-white transition-all shadow-lg active:scale-95 mt-4 ${
              loading 
              ? "bg-slate-400 cursor-not-allowed" 
              : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </span>
            ) : "Register Now"}
          </button>
        </form>

        {/* Footer Link */}
        <div className="text-center mt-8">
          <p className="text-sm text-slate-600">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 font-bold hover:underline">
              Sign In
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Register;