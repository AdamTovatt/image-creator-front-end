import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ApiResponse } from "../models/ApiResponse";

const apiClient = axios.create({
  baseURL: "https://localhost:5001",
  timeout: 10000,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function apiRequest<T>(config: AxiosRequestConfig): Promise<ApiResponse<T>> {
  const response: AxiosResponse<ApiResponse<T>> = await apiClient.request(config);
  return response.data;
}