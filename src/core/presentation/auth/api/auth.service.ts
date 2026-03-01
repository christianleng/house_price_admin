import { apiClient } from "@/core/api/api-client";
import { tokenStorage } from "./token.storage";
import { API_ENDPOINTS } from "@/core/api/endpoints";
import type {
  AuthTokenResponse,
  LoginCredentials,
  User,
} from "../types/auth.types";

export const authService = {
  isAuthenticated: (): boolean => {
    return !!tokenStorage.getToken();
  },

  async login(credentials: LoginCredentials): Promise<AuthTokenResponse> {
    const response = await apiClient.postForm<AuthTokenResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      {
        username: credentials.email,
        password: credentials.password,
      },
    );

    if (response.access_token) {
      tokenStorage.setToken(response.access_token);
    }

    return response;
  },

  async getMe(): Promise<User> {
    return await apiClient.get<User>(API_ENDPOINTS.AUTH.ME);
  },

  async logout(): Promise<void> {
    tokenStorage.clearToken();
    await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
  },
};
