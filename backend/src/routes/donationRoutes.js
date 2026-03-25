import express from "express";
import {
  createDonation,
  getPendingDonations,
  acceptDonation,
  getDonationHistory,
} from "../controllers/donationController.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = express.Router();

// ======================
// DONATION ROUTES
// ======================

// Shopkeeper: Create donation request
router.post("/", authMiddleware, roleMiddleware("SHOPKEEPER"), createDonation);

// NGO: View pending donations
router.get(
  "/pending",
  authMiddleware,
  roleMiddleware("NGO"),
  getPendingDonations
);

// NGO: Accept donation
router.put(
  "/accept/:id",
  authMiddleware,
  roleMiddleware("NGO"),
  acceptDonation
);

// Shopkeeper / NGO: Donation history
router.get(
  "/history",
  authMiddleware,
  roleMiddleware("SHOPKEEPER", "NGO"),
  getDonationHistory
);

export default router;
