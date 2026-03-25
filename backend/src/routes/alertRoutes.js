import express from "express";
import {
  getLowStockAlerts,
  getExpiryAlerts,
} from "../controllers/alertController.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get(
  "/low-stock",
  authMiddleware,
  roleMiddleware("SHOPKEEPER"),
  getLowStockAlerts
);

router.get(
  "/expiry",
  authMiddleware,
  roleMiddleware("SHOPKEEPER"),
  getExpiryAlerts
);

export default router;
