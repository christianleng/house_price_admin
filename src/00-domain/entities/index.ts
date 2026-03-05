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
  transaction_type: "sale" | "rent";
  price: number | null;
  rent_price_monthly: number | null;
  is_active: boolean;
  thumbnail_url: string | null;
}
