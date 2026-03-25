import pool from "../config/db.js";

// ======================
// LOW STOCK ALERTS
// ======================
export const getLowStockAlerts = async (req, res) => {
  try {
    const shopkeeperId = req.user.id;

    const query = `
      SELECT 
        p.id AS product_id,
        p.name AS product_name,
        SUM(b.quantity) AS total_stock
      FROM products p
      JOIN batches b ON p.id = b.product_id
      WHERE p.shopkeeper_id = ?
        AND b.status = 'ACTIVE'
      GROUP BY p.id
      HAVING total_stock <= 5
    `;

    const [rows] = await pool.execute(query, [shopkeeperId]);
    res.json(rows);
  } catch (error) {
    console.error("Low stock alert error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
// ======================
// EXPIRY ALERTS
// ======================
export const getExpiryAlerts = async (req, res) => {
  try {
    const shopkeeperId = req.user.id;

    const query = `
      SELECT *
      FROM expiring_soon_products
      WHERE shopkeeper_id = ?
      ORDER BY days_remaining ASC
    `;

    const [rows] = await pool.execute(query, [shopkeeperId]);
    res.json(rows);
  } catch (error) {
    console.error("Expiry alert error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
