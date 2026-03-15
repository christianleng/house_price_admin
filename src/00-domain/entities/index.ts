import type { TransactionType } from "../constants/property";

export interface User {
  id: string;
  email: string;
  isActive: boolean;
  isVerified: boolean;
  name: string;
  agencyName?: string;
  city?: string;
  createdAt: string;
  phone: string;
  rsacNumber?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
}

export interface MonthlyStatsPeriod {
  month: string;
  added: number;
  forSale: number;
  forRent: number;
}

export interface PropertyMonthlyStats {
  periods: MonthlyStatsPeriod[];
  trendPercent: number | null;
}

export interface RecentProperty {
  id: string;
  reference: string;
  title: string;
  city: string;
  transactionType: TransactionType;
  price: number | null;
  rentPriceMonthly: number | null;
  isActive: boolean;
  thumbnailUrl: string | null;
}

export interface StagnantProperty {
  id: string;
  reference: string;
  title: string;
  city: string;
  transactionType: TransactionType;
  price: number | null;
  rentPriceMonthly: number | null;
  energyRating: string | null;
  daysStagnant: number;
  thumbnailUrl: string | null;
}

export interface QualityScore {
  photos: number;
  description: number;
  price: number;
  energyRating: number;
  surface: number;
  globalScore: number;
}

export interface PropertyGlobalStats {
  total: number;
  active: number;
  inactive: number;
  forSale: number;
  forRent: number;
  avgSalePrice: number | null;
  avgRentPrice: number | null;
  withoutPhotos: number;
  withoutPrice: number;
  byEnergyRating: Record<string, number>;
  byPropertyType: Record<string, number>;
  byCity: Record<string, number>;
  atRiskDpe: number;
  availableSoon: number;
  avgAgeDays: number | null;
  avgSaleDelayDays: number | null;
  stagnantProperties: StagnantProperty[];
  qualityScore: QualityScore;
  pricePerSqmByCity: Record<string, number>;
}

export interface CityPerformance {
  city: string;
  nbBiens: number;
  avgPricePerSqm: number | null;
  avgSaleDelay: number | null;
}

export interface CitiesPerformanceStats {
  cities: CityPerformance[];
}

export interface AdminProperty {
  id: string;
  reference: string | null;
  title: string;
  city: string;
  postalCode: string;
  transactionType: TransactionType;
  propertyType: string;
  price: number | null;
  rentPriceMonthly: number | null;
  surfaceArea: number;
  rooms: number;
  energyRating: string;
  isActive: boolean;
  photosCount: number;
  viewsCount: number;
  createdAt: string;
  updatedAt: string;
  thumbnailUrl: string | null;
}

export interface AdminPropertiesResponse {
  items: AdminProperty[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface AdminPropertiesFilters {
  search?: string;
  transactionType?: string;
  status?: string;
  city?: string;
  energyRating?: string;
  priceMin?: number;
  priceMax?: number;
  page?: number;
  limit?: number;
}

export interface PhotoDetail {
  id: string;
  url: string | null;
  isPrimary: boolean;
  order: number;
}

export interface PropertyDetail {
  id: string;
  agentId: string;
  reference: string;
  title: string;
  description: string | null;
  address: string | null;
  neighborhood: string;
  city: string;
  district: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  price: number | null;
  pricePerSqm: number | null;
  rentPriceMonthly: number | null;
  deposit: number | null;
  chargesIncluded: boolean | null;
  transactionType: TransactionType;
  propertyType: string;
  surfaceArea: number;
  rooms: number;
  bedrooms: number;
  bathrooms: number | null;
  toilets: number | null;
  floors: number | null;
  floorNumber: number | null;
  hasCave: boolean | null;
  hasElevator: boolean;
  hasBalcony: boolean;
  hasTerrace: boolean;
  hasGarden: boolean;
  hasParking: boolean;
  parkingSpaces: number | null;
  energyRating: string | null;
  heatingType: string | null;
  constructionYear: number | null;
  availableFrom: string | null;
  isFurnished: boolean | null;
  photos: PhotoDetail[];
  thumbnailUrl: string | null;
  createdAt: string;
  updatedAt: string | null;
  isActive: boolean;
}

export interface UpdatePropertyPayload {
  title?: string;
  description?: string | null;
  address?: string | null;
  neighborhood?: string;
  city?: string;
  district?: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
  price?: number | null;
  rentPriceMonthly?: number | null;
  deposit?: number | null;
  chargesIncluded?: boolean | null;
  transactionType?: string;
  propertyType?: string;
  surfaceArea?: number;
  rooms?: number;
  bedrooms?: number;
  bathrooms?: number | null;
  toilets?: number | null;
  floors?: number | null;
  floorNumber?: number | null;
  hasCave?: boolean | null;
  hasElevator?: boolean;
  hasBalcony?: boolean;
  hasTerrace?: boolean;
  hasGarden?: boolean;
  hasParking?: boolean;
  parkingSpaces?: number | null;
  energyRating?: string | null;
  heatingType?: string | null;
  constructionYear?: number | null;
  availableFrom?: string | null;
  isFurnished?: boolean | null;
  isActive?: boolean;
}
