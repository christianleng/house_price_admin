import type { PaginatedResult, RecentProperty } from "@/00-domain/entities";
import type { IPropertyService } from "@/00-domain/ports";
import { apiClient } from "./ApiClient";
import { API_ENDPOINTS } from "./EndPoints";
import type { TransactionType } from "@/00-domain/constants/property";

interface RecentPropertyDto {
  id: string;
  reference: string;
  title: string;
  city: string;
  transaction_type: TransactionType;
  price: number | null;
  rent_price_monthly: number | null;
  is_active: boolean;
  thumbnail_url: string | null;
}

interface RecentPropertiesResponseDto {
  items: RecentPropertyDto[];
  total: number;
}

function mapRecentProperty(dto: RecentPropertyDto): RecentProperty {
  return {
    id: dto.id,
    reference: dto.reference,
    title: dto.title,
    city: dto.city,
    transactionType: dto.transaction_type,
    price: dto.price,
    rentPriceMonthly: dto.rent_price_monthly,
    isActive: dto.is_active,
    thumbnailUrl: dto.thumbnail_url,
  };
}

export const propertyService: IPropertyService = {
  async getCount(params?: { status?: string }): Promise<number> {
    return apiClient.get<number>(API_ENDPOINTS.PROPERTIES.COUNT, { params });
  },

  async getRecent(limit = 5): Promise<PaginatedResult<RecentProperty>> {
    const dto = await apiClient.get<RecentPropertiesResponseDto>(
      API_ENDPOINTS.PROPERTIES.LIST,
      {
        params: {
          sort_by: "created_at",
          sort_order: "desc",
          page: 1,
          page_size: limit,
          is_active: true,
        },
      },
    );

    return {
      items: dto.items.map(mapRecentProperty),
      total: dto.total,
    };
  },
};
