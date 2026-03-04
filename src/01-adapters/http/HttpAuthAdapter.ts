import type { LoginCredentials, User } from "@/00-domain/entities";
import { tokenStorage } from "./TokenStorageAdapter";
import { API_ENDPOINTS } from "./EndPoints";
import { apiClient } from "./ApiClient";
import type { IAuthService } from "@/00-domain/ports";

export interface AuthTokenDto {
  access_token: string;
  token_type: string;
}

function mapUser(dto: ApiUserDto): User {
  return {
    id: dto.id,
    email: dto.email,
    first_name: dto.first_name,
    last_name: dto.last_name,
    phone: dto.phone,
    is_active: dto.is_active,
    is_superuser: dto.is_superuser,
    is_verified: dto.is_verified,
    agency_name: dto.agency_name,
    city: dto.city,
    rsac_number: dto.rsac_number,
    created_at: dto.created_at,
  };
}

interface ApiUserDto {
  id: string;
  email: string;
  is_active: boolean;
  is_superuser: boolean;
  is_verified: boolean;
  first_name: string;
  last_name: string;
  phone: string;
  agency_name?: string;
  city?: string;
  rsac_number?: string;
  created_at: string;
}

export const authService: IAuthService = {
  isAuthenticated: (): boolean => {
    return !!tokenStorage.getToken();
  },

  async login(credentials: LoginCredentials): Promise<AuthTokenDto> {
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

    return response;
  },

  async getMe(): Promise<User> {
    const dto = await apiClient.get<User>(API_ENDPOINTS.AUTH.ME);
    return mapUser(dto);
  },

  async logout(): Promise<void> {
    tokenStorage.clearToken();
    await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
  },
};
