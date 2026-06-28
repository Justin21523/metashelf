import axios from "axios";

// Create an axios instance with default config
const api = axios.create({
  // Since we set up the proxy, we can just point to /api
  baseURL: "/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
