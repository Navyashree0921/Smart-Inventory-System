import pool from "../config/db.js";

const User = {
  // Create new user
  create: async (name, email, password, role) => {
    const query = `
      INSERT INTO users (name, email, password, role)
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await pool.execute(query, [name, email, password, role]);
    return result.insertId;
  },

  // Find user by email
  findByEmail: async (email) => {
    const query = `
      SELECT * FROM users WHERE email = ?
    `;
    const [rows] = await pool.execute(query, [email]);
    return rows[0];
  },

  // Find user by ID
  findById: async (id) => {
    const query = `
      SELECT id, name, email, role
      FROM users
      WHERE id = ?
    `;
    const [rows] = await pool.execute(query, [id]);
    return rows[0];
  },
};

export default User;
