import Sale from "../models/Sale.js";

// ======================
// RECORD SALE
// ======================
export const recordSale = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const staffId = req.user.id; // staff or shopkeeper

    if (!productId || !quantity) {
      return res
        .status(400)
        .json({ message: "productId and quantity are required" });
    }

    await Sale.recordSale(productId, quantity, staffId);

    res.status(201).json({
      message: "Sale recorded successfully",
    });
  } catch (error) {
    console.error("Record sale error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ======================
// GET TODAY'S SALES
// ======================
export const getTodaySales = async (req, res) => {
  try {
    const sales = await Sale.getTodaySales();
    res.json(sales);
  } catch (error) {
    console.error("Get today's sales error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ======================
// SALES REPORT (DATE RANGE)
// ======================
export const getSalesReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({ message: "startDate and endDate are required" });
    }

    const report = await Sale.getSalesReport(startDate, endDate);

    res.json(report);
  } catch (error) {
    console.error("Sales report error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
