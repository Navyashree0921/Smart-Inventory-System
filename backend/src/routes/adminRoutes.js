import express from "express";
import {
  getAllUsers,
  getInventorySummary,
  getDonationAudit,
  getAllAlerts,
  getSystemStats,
} from "../controllers/adminController.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = express.Router();

// ======================
// ADMIN ROUTES
// ======================

router.get("/users", authMiddleware, roleMiddleware("ADMIN"), getAllUsers);

router.get(
  "/inventory",
  authMiddleware,
  roleMiddleware("ADMIN"),
  getInventorySummary
);

router.get(
  "/donations",
  authMiddleware,
  roleMiddleware("ADMIN"),
  getDonationAudit
);

router.get("/alerts", authMiddleware, roleMiddleware("ADMIN"), getAllAlerts);

router.get("/stats", authMiddleware, roleMiddleware("ADMIN"), getSystemStats);

export default router;
