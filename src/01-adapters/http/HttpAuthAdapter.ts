import type { LoginCredentials, User } from "@/00-domain/entities";
import { tokenStorage } from "@/01-adapters/storage/TokenStorageAdapter";
import { API_ENDPOINTS } from "./endpoints";
import { apiClient } from "./ApiClient";
import type { IAuthService } from "@/00-domain/ports";
import { AuthTokenDtoSchema, ApiUserDtoSchema } from "./dtoSchemas";
import type { ApiUserDto } from "./dtoSchemas";

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
    const raw = await apiClient.postForm<unknown>(API_ENDPOINTS.AUTH.LOGIN, {
      username: credentials.email,
      password: credentials.password,
    });

    const dto = AuthTokenDtoSchema.parse(raw);

    if (dto.access_token) {
      tokenStorage.setToken(dto.access_token);
    }
  },

  async getMe(): Promise<User> {
    const raw = await apiClient.get<unknown>(API_ENDPOINTS.AUTH.ME);
    const dto = ApiUserDtoSchema.parse(raw);
    return mapUser(dto);
  },

  async logout(): Promise<void> {
    tokenStorage.clearToken();
    await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
  },
};
