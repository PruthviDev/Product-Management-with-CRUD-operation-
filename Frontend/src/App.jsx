// src/App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import ProductList from "./pages/ProductList";
// import AddProduct from "./pages/AddProduct";
// import EditProduct from "./pages/EditProduct";
// import ViewProduct from "./pages/ViewProduct";
import NotFound from "./pages/NotFound";
import Register from "./pages/Registration";
import Dashboard from "./pages/Dashboard";
import ProductList from "./pages/ProductList";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import ViewProduct from "./pages/ViewProduct";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes Group */}
        {/* Everything inside this Route tag requires a token */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/add" element={<AddProduct />} />
          <Route path="/products/edit/:id" element={<EditProduct />} />
          <Route path="/products/view/:id" element={<ViewProduct />} />
        </Route>

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;