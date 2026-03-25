import pool from "../config/db.js";

const Donation = {
  // Create donation request (Shopkeeper)
  // Create donation request (Shopkeeper)
  create: async (batchId, shopkeeperId) => {
    const query = `
    INSERT INTO donations (batch_id, shopkeeper_id)
    VALUES (?, ?)
  `;
    const [result] = await pool.execute(query, [
      batchId,
      shopkeeperId,
    ]);
    return result.insertId;
  },
  // Get all pending donations (NGO)
  getPending: async () => {
    const query = `
      SELECT 
        d.id,
        p.name AS product_name,
        b.batch_number,
        b.expiry_date,
        b.quantity,
        u.name AS shopkeeper
      FROM donations d
      JOIN batches b ON d.batch_id = b.id
      JOIN products p ON b.product_id = p.id
      JOIN users u ON d.shopkeeper_id = u.id
      WHERE d.status = 'PENDING'
    `;
    const [rows] = await pool.execute(query);
    return rows;
  },

  // Accept donation (NGO)
  accept: async (donationId, ngoId) => {
    const query = `
      UPDATE donations
      SET status = 'ACCEPTED',
          ngo_id = ?,
          accepted_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    await pool.execute(query, [ngoId, donationId]);
  },

  // Donation history (Shopkeeper / NGO)
  getHistoryByUser: async (userId, role) => {
    let query = `
    SELECT 
      d.id,
      p.name AS product_name,
      b.batch_number,
      b.quantity,            
      d.status,
      d.shopkeeper_id,         -- ✅ FIX
      d.ngo_id,                -- ✅ FIX
      d.created_at,
      d.accepted_at
    FROM donations d
    JOIN batches b ON d.batch_id = b.id
    JOIN products p ON b.product_id = p.id
  `;

    if (role === "SHOPKEEPER") {
      query += " WHERE d.shopkeeper_id = ?";
    } else if (role === "NGO") {
      query += " WHERE d.ngo_id = ?";
    }

    query += " ORDER BY d.created_at DESC"; //  nice UX touch

    const [rows] = await pool.execute(query, [userId]);
    return rows;
  },
};

export default Donation;
