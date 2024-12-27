import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { ApiResponse } from "../models/ApiResponse";
import TokenHelper from "../helpers/TokenHelper";

const apiClient = axios.create({
  baseURL: "https://localhost:5001",
  timeout: 60000,
});

// Axios request interceptor to add the auth token
apiClient.interceptors.request.use((config) => {
  const token = TokenHelper.getToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.validateStatus = () => true;
  return config;
});

export async function apiRequest<T, E>(
  config: AxiosRequestConfig
): Promise<ApiResponse<T, E>> {
  try {
    const response = await apiClient.request(config);
    const wasSuccessStatusCode =
      response.status >= 200 && response.status < 300;

    return {
      statusCode: response.status,
      success: wasSuccessStatusCode,
      data: wasSuccessStatusCode ? response.data : undefined,
      error: wasSuccessStatusCode ? undefined : response.data,
    };
  } catch (error) {
    const typedError = error as AxiosError;
    return {
      statusCode: typedError.response?.status || 500, // Default to 500 if no response
      success: false,
      axiosError: typedError, // Store the Axios error
    };
  }
}
