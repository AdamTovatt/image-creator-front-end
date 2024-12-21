export interface UserGenerateLinkRequestBody {
  email: string;
  productName: string;
  baseUrl: string;
  dateAndTime: string;
}

export interface ValidateMagicLinkResponse {
  token: string; // or { Token: string } if your API returns an object with a Token property
}
