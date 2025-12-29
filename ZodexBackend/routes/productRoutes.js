const express = require("express");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

// CRUD Routes
router.post("/", createProduct); // Create
router.get("/", getProducts); // Read all
router.get("/:id", getProductById); // Read one
router.put("/:id", updateProduct); // Update
router.delete("/:id", deleteProduct); // Delete

module.exports = router;
