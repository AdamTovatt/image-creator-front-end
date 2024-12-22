import axios, { AxiosRequestConfig } from "axios";
import { ApiResponse } from "../models/ApiResponse";
import TokenHelper from "../helpers/TokenHelper"; // Import TokenHelper

const apiClient = axios.create({
  baseURL: "https://localhost:5001",
  timeout: 10000,
});

apiClient.interceptors.request.use((config) => {
  const token = TokenHelper.getToken(); // Use TokenHelper to get the token
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function apiRequest<T>(config: AxiosRequestConfig): Promise<ApiResponse<T>> {
  const response: ApiResponse<T> = await apiClient.request(config);
  return response;
}
