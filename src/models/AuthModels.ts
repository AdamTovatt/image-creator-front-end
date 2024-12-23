export interface UserGenerateLinkRequestBody {
  email: string;
  productName: string;
  baseUrl: string;
  dateAndTime: string;
}

export interface ValidateMagicLinkResponse {
  token: string;
}
