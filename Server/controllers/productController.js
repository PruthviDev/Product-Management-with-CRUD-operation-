const Product = require("../models/Product");

// CREATE PRODUCT
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({
      message: err.message, // ✅ fixed
    });
  }
};

// GET ALL PRODUCTS
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products); // ✅ fixed
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// GET SINGLE PRODUCT
exports.getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id); // ✅ fixed
    res.json(product);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({
      message: "Product Deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
// UPDATE PRODUCT
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(product);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};