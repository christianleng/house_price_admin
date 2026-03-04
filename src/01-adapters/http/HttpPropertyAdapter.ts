import { apiClient } from "./ApiClient";
import { API_ENDPOINTS } from "./EndPoints";

export const propertyService = {
  async getCount(params?: { status?: string }): Promise<number> {
    return apiClient.get<number>(API_ENDPOINTS.PROPERTIES.COUNT, { params });
  },

  async getByCities(): Promise<Record<string, number>> {
    return apiClient.get(API_ENDPOINTS.PROPERTIES.BY_CITIES);
  },
};
