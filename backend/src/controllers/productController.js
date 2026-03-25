import Product from "../models/Product.js";

// ======================
// ADD PRODUCT (Shopkeeper)
// ======================
export const addProduct = async (req, res) => {
  try {
    const { name, category, unit } = req.body;
    const shopkeeperId = req.user.id;

    if (!name) {
      return res.status(400).json({ message: "Product name is required" });
    }

    const productId = await Product.create(name, category, unit, shopkeeperId);

    res.status(201).json({
      message: "Product added successfully",
      productId,
    });
  } catch (error) {
    console.error("Add product error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ======================
// GET ALL PRODUCTS (Shopkeeper)
// ======================
export const getMyProducts = async (req, res) => {
  try {
    const shopkeeperId = req.user.id;
    const products = await Product.findByShopkeeper(shopkeeperId);

    res.json(products);
  } catch (error) {
    console.error("Get products error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ======================
// GET SINGLE PRODUCT
// ======================
export const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("Get product error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ======================
// DELETE PRODUCT
// ======================
export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    await Product.deleteById(productId);

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete product error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
