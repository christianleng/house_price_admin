import type {
  PropertyGlobalStats,
  PropertyMonthlyStats,
  StagnantProperty,
  QualityScore,
  CitiesPerformanceStats,
  AdminPropertiesResponse,
  AdminPropertiesFilters,
  AdminProperty,
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

interface AdminPropertyDto {
  id: string;
  reference: string | null;
  title: string;
  city: string;
  postal_code: string;
  transaction_type: TransactionType;
  property_type: string;
  price: number | null;
  rent_price_monthly: number | null;
  surface_area: number;
  rooms: number;
  energy_rating: string;
  is_active: boolean;
  photos_count: number;
  views_count: number;
  created_at: string;
  updated_at: string;
  thumbnail_url: string | null;
}

interface AdminPropertiesDto {
  items: AdminPropertyDto[];
  total: number;
  page: number;
  limit: number;
  pages: number;
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

function mapAdminProperty(dto: AdminPropertyDto): AdminProperty {
  return {
    id: dto.id,
    reference: dto.reference,
    title: dto.title,
    city: dto.city,
    postalCode: dto.postal_code,
    transactionType: dto.transaction_type,
    propertyType: dto.property_type,
    price: dto.price,
    rentPriceMonthly: dto.rent_price_monthly,
    surfaceArea: dto.surface_area,
    rooms: dto.rooms,
    energyRating: dto.energy_rating,
    isActive: dto.is_active,
    photosCount: dto.photos_count,
    viewsCount: dto.views_count,
    createdAt: dto.created_at,
    updatedAt: dto.updated_at,
    thumbnailUrl: dto.thumbnail_url,
  };
}

function mapAdminProperties(dto: AdminPropertiesDto): AdminPropertiesResponse {
  return {
    items: dto.items.map(mapAdminProperty),
    total: dto.total,
    page: dto.page,
    limit: dto.limit,
    pages: dto.pages,
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

  async getAdminProperties(
    filters: AdminPropertiesFilters,
  ): Promise<AdminPropertiesResponse> {
    const dto = await apiClient.get<AdminPropertiesDto>(
      API_ENDPOINTS.ADMIN.PROPERTIES,
      {
        params: {
          search: filters.search,
          transaction_type: filters.transactionType,
          status: filters.status,
          city: filters.city,
          energy_rating: filters.energyRating,
          price_min: filters.priceMin,
          price_max: filters.priceMax,
          page: filters.page ?? 1,
          limit: filters.limit ?? 20,
        },
      },
    );
    return mapAdminProperties(dto);
  },
};
