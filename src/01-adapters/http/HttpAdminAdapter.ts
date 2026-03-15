import type {
  PropertyGlobalStats,
  PropertyMonthlyStats,
  StagnantProperty,
  QualityScore,
  CitiesPerformanceStats,
  AdminPropertiesResponse,
  AdminPropertiesFilters,
  AdminProperty,
  PropertyDetail,
  UpdatePropertyPayload,
} from "@/00-domain/entities";
import type { IAdminQueryService, IAdminMutationService } from "@/00-domain/ports";
import { API_ENDPOINTS } from "./EndPoints";
import { apiClient } from "./ApiClient";
import {
  GlobalStatsDtoSchema,
  MonthlyStatsDtoSchema,
  CitiesPerformanceDtoSchema,
  AdminPropertiesDtoSchema,
  PropertyDetailDtoSchema,
} from "./schemas";
import type {
  StagnantPropertyDto,
  QualityScoreDto,
  GlobalStatsDto,
  MonthlyStatsDto,
  CityPerformanceDto,
  CitiesPerformanceDto,
  AdminPropertyDto,
  AdminPropertiesDto,
  PhotoDetailDto,
  PropertyDetailDto,
} from "./schemas";

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
    cities: dto.cities.map((c: CityPerformanceDto) => ({
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

function mapPropertyDetail(dto: PropertyDetailDto): PropertyDetail {
  return {
    id: dto.id,
    agentId: dto.agent_id,
    reference: dto.reference,
    title: dto.title,
    description: dto.description,
    address: dto.address,
    neighborhood: dto.neighborhood,
    city: dto.city,
    district: dto.district,
    postalCode: dto.postal_code,
    latitude: dto.latitude,
    longitude: dto.longitude,
    price: dto.price,
    pricePerSqm: dto.price_per_sqm,
    rentPriceMonthly: dto.rent_price_monthly,
    deposit: dto.deposit,
    chargesIncluded: dto.charges_included,
    transactionType: dto.transaction_type,
    propertyType: dto.property_type,
    surfaceArea: dto.surface_area,
    rooms: dto.rooms,
    bedrooms: dto.bedrooms,
    bathrooms: dto.bathrooms,
    toilets: dto.toilets,
    floors: dto.floors,
    floorNumber: dto.floor_number,
    hasCave: dto.has_cave,
    hasElevator: dto.has_elevator,
    hasBalcony: dto.has_balcony,
    hasTerrace: dto.has_terrace,
    hasGarden: dto.has_garden,
    hasParking: dto.has_parking,
    parkingSpaces: dto.parking_spaces,
    energyRating: dto.energy_rating,
    heatingType: dto.heating_type,
    constructionYear: dto.construction_year,
    availableFrom: dto.available_from,
    isFurnished: dto.is_furnished,
    photos: dto.photos.map((p: PhotoDetailDto) => ({
      id: p.id,
      url: p.url,
      isPrimary: p.is_primary,
      order: p.order,
    })),
    thumbnailUrl: dto.thumbnail_url,
    createdAt: dto.created_at,
    updatedAt: dto.updated_at,
    isActive: dto.is_active,
  };
}

function toSnakeCase(payload: UpdatePropertyPayload): Record<string, unknown> {
  return {
    title: payload.title,
    description: payload.description,
    address: payload.address,
    neighborhood: payload.neighborhood,
    city: payload.city,
    district: payload.district,
    postal_code: payload.postalCode,
    latitude: payload.latitude,
    longitude: payload.longitude,
    price: payload.price,
    rent_price_monthly: payload.rentPriceMonthly,
    deposit: payload.deposit,
    charges_included: payload.chargesIncluded,
    transaction_type: payload.transactionType,
    property_type: payload.propertyType,
    surface_area: payload.surfaceArea,
    rooms: payload.rooms,
    bedrooms: payload.bedrooms,
    bathrooms: payload.bathrooms,
    toilets: payload.toilets,
    floors: payload.floors,
    floor_number: payload.floorNumber,
    has_cave: payload.hasCave,
    has_elevator: payload.hasElevator,
    has_balcony: payload.hasBalcony,
    has_terrace: payload.hasTerrace,
    has_garden: payload.hasGarden,
    has_parking: payload.hasParking,
    parking_spaces: payload.parkingSpaces,
    energy_rating: payload.energyRating,
    heating_type: payload.heatingType,
    construction_year: payload.constructionYear,
    available_from: payload.availableFrom,
    is_furnished: payload.isFurnished,
    is_active: payload.isActive,
  };
}

export const adminQueryService: IAdminQueryService = {
  async getGlobalStats(): Promise<PropertyGlobalStats> {
    const raw = await apiClient.get<unknown>(API_ENDPOINTS.ADMIN.STATS);
    const dto = GlobalStatsDtoSchema.parse(raw);
    return mapGlobalStats(dto);
  },

  async getMonthlyStats(months = 6): Promise<PropertyMonthlyStats> {
    const raw = await apiClient.get<unknown>(
      API_ENDPOINTS.ADMIN.STATS_MONTHLY,
      { params: { months } },
    );
    const dto = MonthlyStatsDtoSchema.parse(raw);
    return mapMonthlyStats(dto);
  },

  async getCitiesPerformance(): Promise<CitiesPerformanceStats> {
    const raw = await apiClient.get<unknown>(API_ENDPOINTS.ADMIN.STATS_CITIES);
    const dto = CitiesPerformanceDtoSchema.parse(raw);
    return mapCitiesPerformance(dto);
  },

  async getAdminProperties(
    filters: AdminPropertiesFilters,
  ): Promise<AdminPropertiesResponse> {
    const raw = await apiClient.get<unknown>(API_ENDPOINTS.ADMIN.PROPERTIES, {
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
    });
    const dto = AdminPropertiesDtoSchema.parse(raw);
    return mapAdminProperties(dto);
  },

  async getPropertyById(id: string): Promise<PropertyDetail> {
    const raw = await apiClient.get<unknown>(
      API_ENDPOINTS.ADMIN.PROPERTY_DETAIL(id),
    );
    const dto = PropertyDetailDtoSchema.parse(raw);
    return mapPropertyDetail(dto);
  },
};

export const adminMutationService: IAdminMutationService = {
  async updateProperty(
    id: string,
    payload: UpdatePropertyPayload,
  ): Promise<PropertyDetail> {
    const raw = await apiClient.patch<unknown>(
      API_ENDPOINTS.ADMIN.PROPERTY_UPDATE(id),
      toSnakeCase(payload),
    );
    const dto = PropertyDetailDtoSchema.parse(raw);
    return mapPropertyDetail(dto);
  },

  async deleteProperty(id: string): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.ADMIN.PROPERTY_DELETE(id));
  },
};
