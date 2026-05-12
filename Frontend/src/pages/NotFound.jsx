// src/pages/NotFound.jsx
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4 text-center">
      
      {/* Visual 404 Header */}
      <h1 className="text-9xl font-extrabold text-red-500 tracking-widest">
        404
      </h1>
      
      {/* Background overlay text for a modern look */}
      <div className="bg-red-500 px-2 text-sm text-white rounded rotate-12 absolute mb-24">
        Page Not Found
      </div>

      <div className="mt-8">
        <h2 className="text-3xl font-bold text-slate-800 md:text-4xl">
          Oops! You're lost.
        </h2>
        <p className="mt-4 text-slate-500 text-lg max-w-md">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
      </div>

      <button
        onClick={() => navigate("/")}
        className="mt-8 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-full shadow-lg shadow-indigo-200 transform transition-all active:scale-95 flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Return to Safety
      </button>

      {/* Optional decorative element */}
      <div className="mt-12 text-slate-300">
        <p className="text-sm font-mono tracking-tighter">ERROR_CODE: PAGE_MISSING_IN_ACTION</p>
      </div>
    </div>
  );
}

export default NotFound;