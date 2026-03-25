import express from "express";
import {
  addBatch,
  getBatchesByProduct,
  getTotalStock,
} from "../controllers/batchController.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = express.Router();

// ======================
// BATCH ROUTES
// ======================

// Add batch to product (Shopkeeper only)
router.post("/", authMiddleware, roleMiddleware("SHOPKEEPER"), addBatch);

// Get batches of a product
router.get(
  "/product/:productId",
  authMiddleware,
  roleMiddleware("SHOPKEEPER"),
  getBatchesByProduct
);

// Get total stock of a product
router.get(
  "/stock/:productId",
  authMiddleware,
  roleMiddleware("SHOPKEEPER"),
  getTotalStock
);

export default router;
