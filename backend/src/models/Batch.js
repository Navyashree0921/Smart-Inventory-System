import pool from "../config/db.js";

const Batch = {
  // Add batch for a product
  create: async (
    productId,
    batchNumber,
    quantity,
    expiryDate,
    purchaseDate
  ) => {
    const query = `
      INSERT INTO batches
      (product_id, batch_number, quantity, expiry_date, purchase_date)
      VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await pool.execute(query, [
      productId,
      batchNumber,
      quantity,
      expiryDate,
      purchaseDate,
    ]);
    return result.insertId;
  },

  // Get batches of a product
  findByProduct: async (productId) => {
    const query = `
      SELECT *
      FROM batches
      WHERE product_id = ?
      ORDER BY expiry_date
    `;
    const [rows] = await pool.execute(query, [productId]);
    return rows;
  },

  // Get total active stock of a product
  getTotalStock: async (productId) => {
    const query = `
      SELECT SUM(quantity) AS total_stock
      FROM batches
      WHERE product_id = ?
        AND status = 'ACTIVE'
    `;
    const [rows] = await pool.execute(query, [productId]);
    return rows[0].total_stock || 0;
  },
};

export default Batch;
