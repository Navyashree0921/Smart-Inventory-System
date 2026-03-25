import express from "express";
import {
  addProduct,
  getMyProducts,
  getProductById,
  deleteProduct,
} from "../controllers/productController.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = express.Router();

// ======================
// PRODUCT ROUTES
// ======================

// Add product (Shopkeeper only)
router.post("/", authMiddleware, roleMiddleware("SHOPKEEPER"), addProduct);

// Get all products of logged-in shopkeeper
router.get(
  "/",
  authMiddleware,
  roleMiddleware("SHOPKEEPER", "STAFF"),
  getMyProducts
);


// Get single product details
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware("SHOPKEEPER"),
  getProductById
);

// Delete product
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("SHOPKEEPER"),
  deleteProduct
);

export default router;
