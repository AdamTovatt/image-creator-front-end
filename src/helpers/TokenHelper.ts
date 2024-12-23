class TokenHelper {
  private static readonly tokenKey = "jwt"; // Key used to store the token in localStorage
  private static readonly expiryKey = "jwtExpiry"; // Key used to store the token expiry time

  // Get the token from localStorage
  public static getToken(): string | null {
    const token = localStorage.getItem(this.tokenKey);
    const expiry = localStorage.getItem(this.expiryKey);

    if (token && expiry) {
      const expiryTime = new Date(expiry).getTime();
      const currentTime = new Date().getTime();

      if (currentTime > expiryTime) {
        // Token is expired, remove it
        this.removeToken();
        return null;
      }

      return token;
    }

    return null; // No token or expired token
  }

  // Set the token and its expiry time to localStorage
  public static setToken(token: string, expiryInSeconds: number): void {
    const expiryTime = new Date().getTime() + expiryInSeconds * 1000; // Calculate the expiry time
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.expiryKey, new Date(expiryTime).toISOString()); // Store the expiry time as an ISO string
  }

  // Remove the token and expiry time from localStorage
  public static removeToken(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.expiryKey);
  }

  // Check if a token exists and is not expired
  public static hasToken(): boolean {
    const token = this.getToken();
    return token !== null;
  }
}

export default TokenHelper;
