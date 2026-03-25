import pool from "../config/db.js";

const Sale = {
  // Record sale using stored procedure
  recordSale: async (productId, quantity, staffId) => {
    const query = `
      CALL record_sale(?, ?, ?)
    `;
    await pool.execute(query, [productId, quantity, staffId]);
  },

  // Get today's sales
  getTodaySales: async () => {
    const query = `
      SELECT 
        p.name AS product_name,
        SUM(s.quantity_sold) AS total_sold
      FROM sales s
      JOIN products p ON s.product_id = p.id
      WHERE s.sale_date = CURDATE()
      GROUP BY p.name
    `;
    const [rows] = await pool.execute(query);
    return rows;
  },

  // Sales report (date range)
  getSalesReport: async (startDate, endDate) => {
    const query = `
      CALL sales_report(?, ?)
    `;
    const [rows] = await pool.execute(query, [startDate, endDate]);
    return rows[0];
  },
};

export default Sale;
