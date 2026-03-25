import express from "express";
import {
  recordSale,
  getTodaySales,
  getSalesReport,
} from "../controllers/salesController.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = express.Router();

// ======================
// SALES ROUTES
// ======================

// Record a sale (Staff + Shopkeeper)
router.post(
  "/",
  authMiddleware,
  roleMiddleware("STAFF", "SHOPKEEPER"),
  recordSale
);

// Get today's sales (Shopkeeper)
router.get(
  "/today",
  authMiddleware,
  roleMiddleware("SHOPKEEPER"),
  getTodaySales
);

// Sales report (Shopkeeper)
router.get(
  "/report",
  authMiddleware,
  roleMiddleware("SHOPKEEPER"),
  getSalesReport
);

export default router;
