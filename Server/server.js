const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();


// 1. GLOBAL MIDDLEWARE (Must come before routes)
app.use(cors({
    origin:'http://localhost:5173', 
    credentials: true // Recommended if you plan to use cookies/sessions later
}));

app.use(express.json()); // Parses incoming JSON requests

// 2. ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// 3. DATABASE CONNECTION
// Added some standard options for stability
mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// 4. SERVER START
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});