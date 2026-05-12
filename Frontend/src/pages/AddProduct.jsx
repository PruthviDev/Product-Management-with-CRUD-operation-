// src/pages/AddProduct.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function AddProduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/products", formData);
      alert("Product Added Successfully!");
      navigate("/products");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Reusable tailwind class for inputs
  const inputClass = "w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-700";

  return (
    <div className="container mx-auto mt-12 px-4 flex justify-center">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8 border border-slate-100">
        
        <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b pb-4">
          Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Product Name */}
          <div>
            <label className="block text-sm font-semibold text-slate-600">Product Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter product name"
              className={inputClass}
              onChange={handleChange}
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-semibold text-slate-600">Price ($)</label>
            <input
              type="number"
              name="price"
              placeholder="0.00"
              className={inputClass}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-slate-600">Description</label>
            <textarea
              name="description"
              placeholder="Describe your product..."
              className={inputClass}
              rows="4"
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-all shadow-lg ${
              loading 
              ? "bg-slate-400 cursor-not-allowed" 
              : "bg-emerald-600 hover:bg-emerald-700 active:scale-95"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              "Confirm & Add Product"
            )}
          </button>
        </form>

      </div>
    </div>
    
  );
}

export default AddProduct;