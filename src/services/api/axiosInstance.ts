import { appConfig } from "@/config/appConfig";
import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: appConfig.baseUrl,
});

axiosInstance.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  if (user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});

export default axiosInstance;
