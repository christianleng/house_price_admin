import type { AuthTokenDto } from "@/01-adapters/http/HttpAuthAdapter";
import type { LoginCredentials, RecentProperty, User } from "../entities";

export interface IAuthService {
  isAuthenticated(): boolean;
  login(credentials: LoginCredentials): Promise<AuthTokenDto>;
  getMe(): Promise<User>;
  logout(): Promise<void>;
}

export interface ITokenStorage {
  getToken(): string | undefined;
  setToken(token: string): void;
  clearToken(): void;
  isAuthenticated(): boolean;
}

export interface IPropertyService {
  getCount(params?: { status?: string }): Promise<number>;
  getByCities(): void;
  getRecent(limit: number): Promise<{ items: RecentProperty[]; total: number }>;
}
