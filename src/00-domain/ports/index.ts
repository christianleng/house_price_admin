import type {
  LoginCredentials,
  RecentProperty,
  User,
  PropertyGlobalStats,
  PropertyMonthlyStats,
  CitiesPerformanceStats,
  AdminPropertiesFilters,
  AdminPropertiesResponse,
  PropertyDetail,
  UpdatePropertyPayload,
  PaginatedResult,
} from "../entities";

export interface IAuthService {
  isAuthenticated(): boolean;
  login(credentials: LoginCredentials): Promise<void>;
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
  getRecent(limit: number): Promise<PaginatedResult<RecentProperty>>;
}

export interface IAdminQueryService {
  getGlobalStats(): Promise<PropertyGlobalStats>;
  getMonthlyStats(months?: number): Promise<PropertyMonthlyStats>;
  getCitiesPerformance(): Promise<CitiesPerformanceStats>;
  getAdminProperties(
    filters: AdminPropertiesFilters,
  ): Promise<AdminPropertiesResponse>;
  getPropertyById(id: string): Promise<PropertyDetail>;
}

export interface IAdminMutationService {
  updateProperty(
    id: string,
    payload: UpdatePropertyPayload,
  ): Promise<PropertyDetail>;
  deleteProperty(id: string): Promise<void>;
}
