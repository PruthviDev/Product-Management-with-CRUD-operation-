// src/pages/EditProduct.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import API from "../api/axios";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: ""
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await API.get(`/products/${id}`);
      // FIX: Only take the fields the form needs to avoid sending read-only DB fields back
      setFormData({
        name: res.data.name || "",
        price: res.data.price || "",
        description: res.data.description || ""
      });
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await API.put(`/products/${id}`, formData);
      alert("Product Updated Successfully!");
      navigate("/products");
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const inputClass = "w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all";

  return (
    <div className="container mx-auto mt-12 px-4 max-w-2xl">
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-slate-100">
        
        {/* Header Color Strip */}
        <div className="h-2 bg-amber-500"></div>
        
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Edit Product</h2>
            <Link to="/products" className="text-sm text-slate-500 hover:text-indigo-600">
              &larr; Back to List
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700">Product Name</label>
              <input
                type="text"
                name="name"
                className={inputClass}
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700">Price</label>
              <input
                type="number"
                name="price"
                className={inputClass}
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700">Description</label>
              <textarea
                rows="4"
                name="description"
                className={inputClass}
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={updating}
                className={`flex-1 py-3 px-4 rounded-lg font-bold text-white transition-all shadow-lg ${
                  updating 
                  ? "bg-slate-400 cursor-not-allowed" 
                  : "bg-amber-500 hover:bg-amber-600 active:scale-95"
                }`}
              >
                {updating ? "Saving Changes..." : "Update Product"}
              </button>
              
              <button
                type="button"
                onClick={() => navigate("/products")}
                className="px-6 py-3 border border-gray-300 text-gray-600 font-semibold rounded-lg hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    
  );
}

export default EditProduct;