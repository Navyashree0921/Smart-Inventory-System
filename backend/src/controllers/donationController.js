import Donation from "../models/Donation.js";
import pool from "../config/db.js"; // ✅ FIX: use pool directly

// ======================
// SHOPKEEPER: CREATE DONATION
// ======================
export const createDonation = async (req, res) => {
  try {
    const { batchId, quantity } = req.body;
    const shopkeeperId = req.user.id;

    if (!batchId || !quantity) {
      return res
        .status(400)
        .json({ message: "batchId and quantity are required" });
    }

    // 1️ Fetch batch
    const [rows] = await pool.execute(
      `SELECT quantity FROM batches WHERE id = ? AND status = 'ACTIVE'`,
      [batchId]
    );

    if (!rows.length) {
      return res.status(404).json({ message: "Batch not found or inactive" });
    }

    if (rows[0].quantity < quantity) {
      return res.status(400).json({ message: "Insufficient batch quantity" });
    }

    // 2️ Reduce batch quantity
    await pool.execute(
      `UPDATE batches SET quantity = quantity - ? WHERE id = ?`,
      [quantity, batchId]
    );

    // 3️ Mark batch as DONATED if quantity becomes 0
    await pool.execute(
      `UPDATE batches SET status = 'DONATED' WHERE id = ? AND quantity = 0`,
      [batchId]
    );

    // 4️ Create donation record
    const donationId = await Donation.create(batchId, shopkeeperId);

    res.status(201).json({
      message: "Donation created successfully",
      donationId,
    });
  } catch (error) {
    console.error("Create donation error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ======================
// NGO: VIEW PENDING DONATIONS
// ======================
export const getPendingDonations = async (req, res) => {
  try {
    const donations = await Donation.getPending();
    res.json(donations);
  } catch (error) {
    console.error("Get pending donations error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ======================
// NGO: ACCEPT DONATION
// ======================
export const acceptDonation = async (req, res) => {
  try {
    const donationId = req.params.id;
    const ngoId = req.user.id;

    await Donation.accept(donationId, ngoId);

    res.json({ message: "Donation accepted successfully" });
  } catch (error) {
    console.error("Accept donation error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ======================
// DONATION HISTORY (SHOPKEEPER / NGO)
// ======================
export const getDonationHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;

    const history = await Donation.getHistoryByUser(userId, role);

    res.json(history);
  } catch (error) {
    console.error("Donation history error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
