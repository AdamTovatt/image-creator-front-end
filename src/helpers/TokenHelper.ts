class TokenHelper {
    private static readonly tokenKey = "jwt"; // Key used to store the token in localStorage
  
    // Get the token from localStorage
    public static getToken(): string | null {
      return localStorage.getItem(this.tokenKey);
    }
  
    // Set the token to localStorage
    public static setToken(token: string): void {
      localStorage.setItem(this.tokenKey, token);
    }
  
    // Remove the token from localStorage
    public static removeToken(): void {
      localStorage.removeItem(this.tokenKey);
    }
  
    // Check if a token exists
    public static hasToken(): boolean {
      return this.getToken() !== null;
    }
  }
  
  export default TokenHelper;
  