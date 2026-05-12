// src/components/Navbar.jsx
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Helper for active link styles
  const linkStyles = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive ? "text-yellow-400" : "text-gray-300 hover:text-white hover:bg-gray-700"
    }`;

  return (
    <nav className="bg-slate-900 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <NavLink to="/" className="text-2xl font-extrabold text-white tracking-tight">
            MERN<span className="text-yellow-500">Stack</span>
          </NavLink>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white focus:outline-none"
            >
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-4">
            {token ? (
              <>
                <NavLink to="/" className={linkStyles}>Dashboard</NavLink>
                <NavLink to="/products" className={linkStyles}>Products</NavLink>
                <NavLink to="/products/add" className={linkStyles}>Add Product</NavLink>
                <button
                  onClick={logout}
                  className="ml-4 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full text-sm font-bold transition-all shadow-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={linkStyles}>Login</NavLink>
                <NavLink
                  to="/register"
                  className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 px-5 py-2 rounded-full text-sm font-bold transition-all shadow-md"
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu (Dropdown) */}
        <div className={`${isOpen ? "block" : "hidden"} lg:hidden pb-4 transition-all`}>
          <div className="flex flex-col space-y-2 mt-2">
            {token ? (
              <>
                <NavLink to="/" className={linkStyles} onClick={() => setIsOpen(false)}>Dashboard</NavLink>
                <NavLink to="/products" className={linkStyles} onClick={() => setIsOpen(false)}>Products</NavLink>
                <NavLink to="/products/add" className={linkStyles} onClick={() => setIsOpen(false)}>Add Product</NavLink>
                <button
                  onClick={logout}
                  className="w-full text-left bg-red-600 text-white px-3 py-2 rounded-md text-sm font-bold"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={linkStyles} onClick={() => setIsOpen(false)}>Login</NavLink>
                <NavLink
                  to="/register"
                  className="bg-yellow-500 text-slate-900 px-3 py-2 rounded-md text-sm font-bold"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;