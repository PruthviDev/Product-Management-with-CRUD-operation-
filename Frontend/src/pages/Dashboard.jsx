// src/pages/Dashboard.js
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="container mx-auto mt-10 px-4 text-slate-800">
      
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-blue-600">Dashboard</h1>
        <Link
          to="/products/add"
          className="inline-flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors shadow-sm"
        >
          <span className="mr-2">+</span> Add Product
        </Link>
      </div>
      
      

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Total Products */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100">
          <h5 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total Products</h5>
          <h2 className="text-4xl font-extrabold text-slate-900 mt-2">120</h2>
        </div>

        {/* Total Users */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100">
          <h5 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total Users</h5>
          <h2 className="text-4xl font-extrabold text-slate-900 mt-2">45</h2>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100">
          <h5 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total Orders</h5>
          <h2 className="text-4xl font-extrabold text-slate-900 mt-2">89</h2>
        </div>

      </div>

      {/* Quick Actions Section */}
      <div className="mt-10 bg-white p-8 rounded-xl shadow-md border border-slate-100">
        <h4 className="text-xl font-bold mb-6 text-slate-800">Quick Actions</h4>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/products"
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all shadow hover:shadow-lg"
          >
            View Products
          </Link>

          <Link
            to="/products/add"
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-all shadow hover:shadow-lg"
          >
            Add New Product
          </Link>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;