import type { TransactionType } from "@/shared/constants/property";

export interface User {
  id: string;
  email: string;
  is_active: boolean;
  is_superuser: boolean;
  is_verified: boolean;
  first_name: string;
  last_name: string;

  agency_name?: string;
  city?: string;
  created_at: string;
  name?: string;
  phone: string;
  rsac_number?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
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
  transaction_type: TransactionType;
  price: number | null;
  rent_price_monthly: number | null;
  is_active: boolean;
  thumbnail_url: string | null;
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
