import { apiRequest } from "./ApiClient";
import { ApiResponse } from "../models/ApiResponse";
import {
  UserGenerateLinkRequestBody,
  ValidateMagicLinkResponse,
} from "../models/AuthModels";
import { MessageResponse } from "../models/MessageResponse";

export async function generateMagicLink(
  body: UserGenerateLinkRequestBody
): Promise<ApiResponse<MessageResponse, MessageResponse>> {
  return await apiRequest({
    method: "POST",
    url: "/auth/generate-magic-link",
    data: body,
  });
}

export async function validateMagicLink(
  token: string
): Promise<ApiResponse<ValidateMagicLinkResponse, MessageResponse>> {
  const response = await apiRequest<ValidateMagicLinkResponse, MessageResponse>(
    {
      method: "GET",
      url: "/auth/validate-magic-link",
      params: { token },
    }
  );

  return response;
}
