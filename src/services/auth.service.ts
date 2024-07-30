const TOKEN_ITEM = 'authToken';
const COMPANY_NAME = 'companyName';
const USER_NAME = 'userName';


export const AuthService = {
  getAuthToken(): string | null {
    const token = typeof window !== 'undefined' ? localStorage.getItem(TOKEN_ITEM) : ''
    return token;
  },
  removeAuthToken(): void {
    localStorage.removeItem(TOKEN_ITEM);
  },
  setAuthToken(token: string): void {
    localStorage.setItem(TOKEN_ITEM, token);
  },
  getDefaultHeaders(): { Authorization: string } | Record<string, never> {
    const token = this.getAuthToken();
    if (!token) {
        return {};
    }
    return { Authorization: `Token ${token}` };
  },
  getCompanyName(): string | null {
    return localStorage.getItem(COMPANY_NAME);
  },
  setCompanyName(name: string): void {
    localStorage.setItem(COMPANY_NAME, name);
  },
  removeCompanyName(): void {
    localStorage.removeItem(COMPANY_NAME);
  },
  getUserName(): string | null {
    return localStorage.getItem(USER_NAME);
  },
  setUserName(name: string): void {
    localStorage.setItem(USER_NAME, name);
  },
  removeUserName(): void {
    localStorage.removeItem(USER_NAME);
  },
};
