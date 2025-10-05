import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // adjust to your Express backend
});

// Log requests
api.interceptors.request.use((config) => {
  console.log(`[Request] ${config.method.toUpperCase()} ${config.url}`, config.data || {});
  return config;
});

// Log responses
api.interceptors.response.use(
  (response) => {
    console.log(`[Response]`, response.status, response.data);
    return response;
  },
  (error) => {
    console.error("[Error]", error.response?.status, error.message);
    return Promise.reject(error);
  }
);

export default api;
