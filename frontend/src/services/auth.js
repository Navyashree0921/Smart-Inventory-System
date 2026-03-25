import api from "./api";

// ======================
// LOGIN
// ======================
export const loginUser = async (email, password, role) => {
  try {
    const response = await api.post("/auth/login", {
      email,
      password,
      role,
    });

    // Expected: { id, role, token }
    return response.data;
  } catch (error) {
    // Forward meaningful error to UI
    throw (
      error.response?.data?.message ||
      "Login failed. Please check your credentials."
    );
  }
};

// ======================
// SIGNUP
// ======================
export const signupUser = async (name, email, password, role) => {
  try {
    const response = await api.post("/auth/signup", {
      name,
      email,
      password,
      role,
    });

    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Signup failed. Please try again.";
  }
};
