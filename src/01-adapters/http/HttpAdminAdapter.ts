import type {
  PropertyGlobalStats,
  PropertyMonthlyStats,
  StagnantProperty,
  QualityScore,
  CitiesPerformanceStats,
} from "@/00-domain/entities";
import { API_ENDPOINTS } from "./EndPoints";
import { apiClient } from "./ApiClient";
import type { TransactionType } from "@/shared/constants/property";

interface StagnantPropertyDto {
  id: string;
  reference: string;
  title: string;
  city: string;
  transaction_type: TransactionType;
  price: number | null;
  rent_price_monthly: number | null;
  energy_rating: string | null;
  days_stagnant: number;
  thumbnail_url: string | null;
}

interface QualityScoreDto {
  photos: number;
  description: number;
  price: number;
  energy_rating: number;
  surface: number;
  global_score: number;
}

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
  avg_sale_delay_days: number | null;
  stagnant_properties: StagnantPropertyDto[];
  quality_score: QualityScoreDto;
  price_per_sqm_by_city: Record<string, number>;
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

interface CityPerformanceDto {
  city: string;
  nb_biens: number;
  avg_price_per_sqm: number | null;
  avg_sale_delay: number | null;
}

interface CitiesPerformanceDto {
  cities: CityPerformanceDto[];
}

function mapStagnantProperty(dto: StagnantPropertyDto): StagnantProperty {
  return {
    id: dto.id,
    reference: dto.reference,
    title: dto.title,
    city: dto.city,
    transactionType: dto.transaction_type,
    price: dto.price,
    rentPriceMonthly: dto.rent_price_monthly,
    energyRating: dto.energy_rating,
    daysStagnant: dto.days_stagnant,
    thumbnailUrl: dto.thumbnail_url,
  };
}

function mapQualityScore(dto: QualityScoreDto): QualityScore {
  return {
    photos: dto.photos,
    description: dto.description,
    price: dto.price,
    energyRating: dto.energy_rating,
    surface: dto.surface,
    globalScore: dto.global_score,
  };
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
    avgSaleDelayDays: dto.avg_sale_delay_days,
    stagnantProperties: dto.stagnant_properties.map(mapStagnantProperty),
    qualityScore: mapQualityScore(dto.quality_score),
    pricePerSqmByCity: dto.price_per_sqm_by_city,
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

function mapCitiesPerformance(
  dto: CitiesPerformanceDto,
): CitiesPerformanceStats {
  return {
    cities: dto.cities.map((c) => ({
      city: c.city,
      nbBiens: c.nb_biens,
      avgPricePerSqm: c.avg_price_per_sqm,
      avgSaleDelay: c.avg_sale_delay,
    })),
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

  async getCitiesPerformance(): Promise<CitiesPerformanceStats> {
    const dto = await apiClient.get<CitiesPerformanceDto>(
      API_ENDPOINTS.ADMIN.STATS_CITIES,
    );
    return mapCitiesPerformance(dto);
  },
};
