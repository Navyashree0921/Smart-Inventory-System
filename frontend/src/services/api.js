import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api", // backend base
  headers: {
    "Content-Type": "application/json",
  },
});

// ======================
// ATTACH JWT TOKEN
// ======================
api.interceptors.request.use(
  (config) => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      const { token } = JSON.parse(storedUser);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ======================
// GLOBAL ERROR HANDLER
// ======================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
