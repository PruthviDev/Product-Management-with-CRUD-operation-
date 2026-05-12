// src/pages/ViewProduct.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/axios";

function ViewProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await API.get(`/products/${id}`);
      setProduct(res.data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Safety Check: Handle case where product is not found
  if (!product) {
    return (
      <div className="container mx-auto mt-12 px-4 text-center">
        <div className="bg-white p-8 rounded-2xl shadow-md border border-slate-100 max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-red-500">Product Not Found</h2>
          <p className="text-slate-500 mt-2 text-sm">The product you're looking for doesn't exist or has been removed.</p>
          <Link to="/products" className="mt-6 inline-block text-indigo-600 font-semibold hover:underline">
            &larr; Back to Product List
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-12 px-4 flex justify-center">
      <div className="max-w-2xl w-full bg-white shadow-2xl rounded-3xl overflow-hidden border border-slate-100">
        
        {/* Top Decorative Banner */}
        <div className="h-3 bg-gradient-to-r from-indigo-500 to-blue-500"></div>

        <div className="p-8 md:p-12">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest">
              Product Details
            </h2>
            <Link 
              to={`/products/edit/${product._id}`} 
              className="text-sm font-semibold text-amber-600 hover:bg-amber-50 px-3 py-1 rounded-md transition-colors"
            >
              Edit Item
            </Link>
          </div>

          <h1 className="text-4xl font-extrabold text-slate-900 leading-tight">
            {product.name}
          </h1>

          <div className="mt-6 inline-block bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl">
            <span className="text-slate-500 text-sm block">Price</span>
            <span className="text-2xl font-bold text-emerald-600">
              ₹ {product.price?.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="mt-10">
            <h3 className="text-lg font-bold text-slate-800 border-b pb-2 mb-4">Description</h3>
            <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-line">
              {product.description || "No description provided for this product."}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-12 flex gap-4">
            <Link
              to="/products"
              className="px-8 py-3 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl shadow-lg transition-all active:scale-95 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default ViewProduct;