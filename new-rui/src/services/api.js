import axios from "axios";
const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

console.log("🚀 ~ file: api.js:10 ~ process.env.REACT_APP_BACKEND_URL:", process.env.REACT_APP_BACKEND_URL)
api.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    console.error("Error to call API", error);
  }
);
export default api;
