import type {
  PropertyGlobalStats,
  PropertyMonthlyStats,
} from "@/00-domain/entities";
import { apiClient } from "./ApiClient";
import { API_ENDPOINTS } from "./EndPoints";

interface GlobalStatsDto {
  total: number;
  active: number;
  inactive: number;
  for_sale: number;
  for_rent: number;
  avg_sale_price: number | null;
  avg_rent_price: number | null;
  without_photos: number;
  without_price: number;
  by_energy_rating: Record<string, number>;
  by_property_type: Record<string, number>;
  by_city: Record<string, number>;
  at_risk_dpe: number;
  available_soon: number;
  avg_age_days: number | null;
}

interface MonthlyPeriodDto {
  month: string;
  added: number;
  for_sale: number;
  for_rent: number;
}

interface MonthlyStatsDto {
  periods: MonthlyPeriodDto[];
  trend_percent: number | null;
}

function mapGlobalStats(dto: GlobalStatsDto): PropertyGlobalStats {
  return {
    total: dto.total,
    active: dto.active,
    inactive: dto.inactive,
    forSale: dto.for_sale,
    forRent: dto.for_rent,
    avgSalePrice: dto.avg_sale_price,
    avgRentPrice: dto.avg_rent_price,
    withoutPhotos: dto.without_photos,
    withoutPrice: dto.without_price,
    byEnergyRating: dto.by_energy_rating,
    byPropertyType: dto.by_property_type,
    byCity: dto.by_city,
    atRiskDpe: dto.at_risk_dpe,
    availableSoon: dto.available_soon,
    avgAgeDays: dto.avg_age_days,
  };
}

function mapMonthlyStats(dto: MonthlyStatsDto): PropertyMonthlyStats {
  return {
    periods: dto.periods.map((p) => ({
      month: p.month,
      added: p.added,
      forSale: p.for_sale,
      forRent: p.for_rent,
    })),
    trendPercent: dto.trend_percent,
  };
}

export const adminService = {
  async getGlobalStats(): Promise<PropertyGlobalStats> {
    const dto = await apiClient.get<GlobalStatsDto>(API_ENDPOINTS.ADMIN.STATS);
    return mapGlobalStats(dto);
  },

  async getMonthlyStats(months = 6): Promise<PropertyMonthlyStats> {
    const dto = await apiClient.get<MonthlyStatsDto>(
      API_ENDPOINTS.ADMIN.STATS_MONTHLY,
      { params: { months } },
    );
    return mapMonthlyStats(dto);
  },
};
