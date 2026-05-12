// src/pages/ProductList.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await API.delete(`/products/${id}`);
      // Optimistic UI update or re-fetch
      setProducts(products.filter(p => p._id !== id));
    } catch (error) {
      alert("Failed to delete product.");
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-10 px-4">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Product Inventory</h2>
          <p className="text-slate-500 text-sm">Manage your store listings and pricing</p>
        </div>
        <Link
          to="/products/add"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-semibold shadow-lg shadow-indigo-100 transition-all flex items-center"
        >
          <span className="mr-2">+</span> Add New Product
        </Link>
      </div>

      {/* Table Section */}
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-100">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-sm font-bold text-slate-600 uppercase tracking-wider">Product Name</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-600 uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-600 uppercase tracking-wider hidden md:table-cell">Description</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-600 uppercase tracking-wider text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-semibold text-slate-800">{product.name}</span>
                    </td>
                    <td className="px-6 py-4 text-slate-700 font-medium">
                      ₹ {product.price.toLocaleString('en-IN')}
                    </td>
                    <td className="px-6 py-4 text-slate-500 max-w-xs truncate hidden md:table-cell">
                      {product.description || <span className="italic text-slate-300">No description</span>}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center items-center gap-2">
                        <Link
                          to={`/products/view/${product._id}`}
                          className="p-2 text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors"
                          title="View"
                        >
                          View
                        </Link>
                        <Link
                          to={`/products/edit/${product._id}`}
                          className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => deleteProduct(product._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-slate-400">
                    No products found. Start by adding one!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    
  );
}

export default ProductList;