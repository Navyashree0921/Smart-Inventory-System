import express from "express";
import { signup, login } from "../controllers/authController.js";

const router = express.Router();

// ======================
// AUTH ROUTES
// ======================

// Signup
// POST /api/auth/signup
router.post("/signup", signup);

// Login
// POST /api/auth/login
router.post("/login", login);

export default router;
