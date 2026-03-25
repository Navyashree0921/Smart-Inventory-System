import api from "./api";

// ======================
// CREATE DONATION (SHOPKEEPER)
// ======================
export const createDonation = async (batchId, quantity) => {
  try {
    const response = await api.post("/donations", {
      batchId,
      quantity,
    });

    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to create donation";
  }
};

// ======================
// NGO: ACCEPT DONATION
// ======================
export const acceptDonation = async (donationId) => {
  try {
    const response = await api.put(`/donations/accept/${donationId}`);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      "Failed to accept donation"
    );
  }
};
// ======================
// DONATION HISTORY (SHOPKEEPER / NGO)
// ======================
export const getDonationHistory = async () => {
  try {
    const response = await api.get("/donations/history");
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      "Failed to fetch donation history"
    );
  }
};

