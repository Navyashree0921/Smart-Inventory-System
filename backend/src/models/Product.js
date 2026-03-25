import pool from "../config/db.js";

const Product = {
  // Add new product
  create: async (name, category, unit, shopkeeperId) => {
    const query = `
      INSERT INTO products (name, category, unit, shopkeeper_id)
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await pool.execute(query, [
      name,
      category,
      unit,
      shopkeeperId,
    ]);
    return result.insertId;
  },

  // Get all products of a shopkeeper
  findByShopkeeper: async (shopkeeperId) => {
    const query = `
      SELECT *
      FROM products
      WHERE shopkeeper_id = ?
    `;
    const [rows] = await pool.execute(query, [shopkeeperId]);
    return rows;
  },

  // Get single product
  findById: async (productId) => {
    const query = `
      SELECT *
      FROM products
      WHERE id = ?
    `;
    const [rows] = await pool.execute(query, [productId]);
    return rows[0];
  },

  // Delete product
  deleteById: async (productId) => {
    const query = `
      DELETE FROM products WHERE id = ?
    `;
    await pool.execute(query, [productId]);
  },
};

export default Product;
