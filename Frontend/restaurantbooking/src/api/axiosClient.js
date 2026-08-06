import axios from "axios";

// Point this at your Spring Boot backend
const BASE_URL = import.meta.env?.VITE_API_BASE_URL || "http://localhost:8080/api";

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach JWT (if your /api/auth/login returns one) to every request
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("tavola_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Central 401 handling -> bounce back to login
axiosClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      localStorage.removeItem("tavola_token");
      localStorage.removeItem("tavola_user");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default axiosClient;
