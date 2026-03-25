import api from "./api";

// ======================
// GET ALL PRODUCTS (SHOPKEEPER)
// ======================
export const getProducts = async () => {
  try {
    const response = await api.get("/products");
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch products";
  }
};

// ======================
// GET SINGLE PRODUCT DETAILS
// ======================
export const getProductById = async (productId) => {
  try {
    const response = await api.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch product details";
  }
};

// ======================
// DELETE PRODUCT
// ======================
export const deleteProduct = async (productId) => {
  try {
    const response = await api.delete(`/products/${productId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to delete product";
  }
};
