import type { RecentProperty } from "@/00-domain/entities";
import { apiClient } from "./ApiClient";
import { API_ENDPOINTS } from "./EndPoints";
import type { IPropertyService } from "@/00-domain/ports";

export const propertyService: IPropertyService = {
  async getCount(params?: { status?: string }): Promise<number> {
    return apiClient.get<number>(API_ENDPOINTS.PROPERTIES.COUNT, { params });
  },

  async getRecent(
    limit = 5,
  ): Promise<{ items: RecentProperty[]; total: number }> {
    return apiClient.get(API_ENDPOINTS.PROPERTIES.LIST, {
      params: {
        sort_by: "created_at",
        sort_order: "desc",
        page: 1,
        page_size: limit,
        is_active: true,
      },
    });
  },
};
