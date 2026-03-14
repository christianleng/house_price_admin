import type { LoginCredentials, User } from "@/00-domain/entities";
import { tokenStorage } from "./TokenStorageAdapter";
import { API_ENDPOINTS } from "./EndPoints";
import { apiClient } from "./ApiClient";
import type { IAuthService } from "@/00-domain/ports";

export interface AuthTokenDto {
  access_token: string;
  token_type: string;
}

interface ApiUserDto {
  id: string;
  email: string;
  is_active: boolean;
  is_verified: boolean;
  name: string;
  phone: string;
  agency_name?: string;
  city?: string;
  rsac_number?: string;
  created_at: string;
}

function mapUser(dto: ApiUserDto): User {
  return {
    id: dto.id,
    email: dto.email,
    isActive: dto.is_active,
    isVerified: dto.is_verified,
    name: dto.name,
    phone: dto.phone,
    agencyName: dto.agency_name,
    city: dto.city,
    rsacNumber: dto.rsac_number,
    createdAt: dto.created_at,
  };
}

export const authService: IAuthService = {
  isAuthenticated: (): boolean => {
    return !!tokenStorage.getToken();
  },

  async login(credentials: LoginCredentials): Promise<void> {
    const response = await apiClient.postForm<AuthTokenDto>(
      API_ENDPOINTS.AUTH.LOGIN,
      {
        username: credentials.email,
        password: credentials.password,
      },
    );

    if (response.access_token) {
      tokenStorage.setToken(response.access_token);
    }
  },

  async getMe(): Promise<User> {
    const dto = await apiClient.get<ApiUserDto>(API_ENDPOINTS.AUTH.ME);
    return mapUser(dto);
  },

  async logout(): Promise<void> {
    tokenStorage.clearToken();
    await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
  },
};
