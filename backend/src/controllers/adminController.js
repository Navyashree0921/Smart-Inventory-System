import pool from "../config/db.js";

// ======================
// GET ALL USERS
// ======================
export const getAllUsers = async (req, res) => {
  try {
    const [users] = await pool.execute(
      `SELECT id, name, email, role, created_at FROM users`
    );
    res.json(users);
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ======================
// SYSTEM INVENTORY SUMMARY
// ======================
export const getInventorySummary = async (req, res) => {
  try {
    const [summary] = await pool.execute(`
      SELECT 
        p.id,
        p.name,
        SUM(b.quantity) AS total_stock
      FROM products p
      LEFT JOIN batches b ON p.id = b.product_id
      GROUP BY p.id
    `);
    res.json(summary);
  } catch (error) {
    console.error("Inventory summary error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ======================
// DONATION AUDIT LOG
// ======================
export const getDonationAudit = async (req, res) => {
  try {
    const [logs] = await pool.execute(`
      SELECT 
        d.id,
        p.name AS product_name,
        b.quantity,
        u1.name AS shopkeeper,
        u2.name AS ngo,
        d.status,
        d.created_at,
        d.accepted_at
      FROM donations d
      JOIN batches b ON d.batch_id = b.id
      JOIN products p ON b.product_id = p.id
      JOIN users u1 ON d.shopkeeper_id = u1.id
      LEFT JOIN users u2 ON d.ngo_id = u2.id
      ORDER BY d.created_at DESC
    `);
    res.json(logs);
  } catch (error) {
    console.error("Donation audit error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ======================
// ALERTS OVERVIEW
// ======================
export const getAllAlerts = async (req, res) => {
  try {
    const [alerts] = await pool.execute(`
      SELECT 
        a.id,
        p.name AS product_name,
        a.alert_type,
        a.message,
        a.created_at,
        a.resolved
      FROM alerts a
      LEFT JOIN products p ON a.product_id = p.id
      ORDER BY a.created_at DESC
    `);
    res.json(alerts);
  } catch (error) {
    console.error("Alerts error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ======================
// SYSTEM STATS (COUNTS)
// ======================
export const getSystemStats = async (req, res) => {
  try {
    const [[stats]] = await pool.execute(`
      SELECT
        (SELECT COUNT(*) FROM users) AS users,
        (SELECT COUNT(*) FROM products) AS products,
        (SELECT COUNT(*) FROM batches) AS batches,
        (SELECT COUNT(*) FROM sales) AS sales,
        (SELECT COUNT(*) FROM donations) AS donations
    `);
    res.json(stats);
  } catch (error) {
    console.error("System stats error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
