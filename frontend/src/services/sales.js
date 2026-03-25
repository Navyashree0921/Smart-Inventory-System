import api from "./api";

// ======================
// RECORD SALE
// ======================
export const recordSale = async (productId, quantity) => {
  const res = await api.post("/sales", {
    productId,
    quantity,
  });
  return res.data;
};

// ======================
// GET TODAY'S SALES
// ======================
export const getTodaySales = async () => {
  const res = await api.get("/sales/today");
  return res.data;
};

// ======================
// SALES REPORT
// ======================
export const getSalesReport = async (startDate, endDate) => {
  const res = await api.get("/sales/report", {
    params: { startDate, endDate },
  });
  return res.data;
};
