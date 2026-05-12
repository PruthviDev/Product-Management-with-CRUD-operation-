const router = require("express").Router();
// const auth = require("../middlewares/authMiddleware");
const { authorization } = require("../middlewares/authMiddleware");

const {
  createProduct,
  getProducts,        // ✅ correct name
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// CREATE
router.post("/", authorization, createProduct);

// GET ALL
router.get("/", getProducts);

// GET SINGLE
router.get("/:id", getSingleProduct);


// UPDATE
router.put("/:id", authorization, updateProduct);

// DELETE
router.delete("/:id", authorization, deleteProduct);

module.exports = router;