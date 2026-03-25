import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";
import batchRoutes from "./src/routes/batchRoutes.js";
import salesRoutes from "./src/routes/salesRoutes.js";
import donationRoutes from "./src/routes/donationRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";
import alertRoutes from "./src/routes/alertRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/batches", batchRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/alerts", alertRoutes);

app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "USIERS Backend is running",
  });
});

export default app;
