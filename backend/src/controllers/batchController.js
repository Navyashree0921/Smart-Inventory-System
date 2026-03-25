import Batch from "../models/Batch.js";
import Product from "../models/Product.js";

// ======================
// ADD BATCH (Shopkeeper)
// ======================
export const addBatch = async (req, res) => {
  try {
    const { productId, batchNumber, quantity, expiryDate, purchaseDate } =
      req.body;

    if (!productId || !quantity || !expiryDate) {
      return res.status(400).json({
        message: "productId, quantity and expiryDate are required",
      });
    }

    // Optional: check product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
const effectivePurchaseDate =
  purchaseDate ?? new Date().toISOString().slice(0, 10);

const batchId = await Batch.create(
  productId,
  batchNumber,
  quantity,
  expiryDate,
  effectivePurchaseDate
);


    res.status(201).json({
      message: "Batch added successfully",
      batchId,
    });
  } catch (error) {
    console.error("Add batch error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ======================
// GET BATCHES BY PRODUCT
// ======================
export const getBatchesByProduct = async (req, res) => {
  try {
    const productId = req.params.productId;

    const batches = await Batch.findByProduct(productId);

    res.json(batches);
  } catch (error) {
    console.error("Get batches error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ======================
// GET TOTAL STOCK
// ======================
export const getTotalStock = async (req, res) => {
  try {
    const productId = req.params.productId;

    const totalStock = await Batch.getTotalStock(productId);

    res.json({ productId, totalStock });
  } catch (error) {
    console.error("Get stock error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
