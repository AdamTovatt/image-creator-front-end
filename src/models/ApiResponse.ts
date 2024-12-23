import { AxiosError } from "axios";

export interface ApiResponse<T, E> {
  statusCode: number;
  success: boolean;
  data?: T; // Data in case of a successful response
  error?: E; // Custom error data in case of a failed response (e.g., { message: string })
  axiosError?: AxiosError; // To store Axios exceptions, for network or internal errors
}
