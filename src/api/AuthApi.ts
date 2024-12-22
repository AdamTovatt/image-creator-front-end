import { apiRequest } from "./ApiClient";
import { ApiResponse } from "../models/ApiResponse";
import { UserGenerateLinkRequestBody, ValidateMagicLinkResponse } from "../models/AuthModels";

export async function generateMagicLink(
    body: UserGenerateLinkRequestBody
): Promise<ApiResponse> {
    return await apiRequest({
        method: "POST",
        url: "/auth/generate-magic-link",
        data: body
    });
}

export async function validateMagicLink(
    token: string
  ): Promise<ApiResponse<ValidateMagicLinkResponse>> {
    const response = await apiRequest<ValidateMagicLinkResponse>({
      method: "GET",
      url: "/auth/validate-magic-link",
      params: { token },
    });
  
    return response;
  }