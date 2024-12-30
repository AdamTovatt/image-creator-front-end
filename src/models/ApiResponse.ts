import { AxiosError } from "axios";
import { MessageResponse } from "./MessageResponse";

export interface ApiResponse<T, E> {
  statusCode: number;
  success: boolean;
  data?: T; // Data in case of a successful response
  error?: E; // Custom error data in case of a failed response (e.g., { message: string })
  axiosError?: AxiosError; // To store Axios exceptions, for network or internal errors
}

export function getMessageFromResponse<T, E>(
  apiResponse: ApiResponse<T, E>
): string {
  if (apiResponse.success && apiResponse.data)
    return (apiResponse.data as unknown as MessageResponse).message;
  else if (apiResponse.error)
    return (apiResponse.error as unknown as MessageResponse).message as string;
  else return apiResponse.axiosError?.message as string;
}
