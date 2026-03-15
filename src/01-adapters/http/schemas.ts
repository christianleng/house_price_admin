import { z } from "zod";
import { TRANSACTION_TYPES } from "@/00-domain/constants/property";

// ─── Shared ───────────────────────────────────────────────────────────────────

const TransactionTypeSchema = z.enum([
  TRANSACTION_TYPES.SALE,
  TRANSACTION_TYPES.RENT,
]);

// ─── Auth ─────────────────────────────────────────────────────────────────────

export const AuthTokenDtoSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
});

export const ApiUserDtoSchema = z.object({
  id: z.string(),
  email: z.string(),
  is_active: z.boolean(),
  is_verified: z.boolean(),
  name: z.string(),
  phone: z.string(),
  agency_name: z.string().optional(),
  city: z.string().optional(),
  rsac_number: z.string().optional(),
  created_at: z.string(),
});

// ─── Property ─────────────────────────────────────────────────────────────────

export const RecentPropertyDtoSchema = z.object({
  id: z.string(),
  reference: z.string(),
  title: z.string(),
  city: z.string(),
  transaction_type: TransactionTypeSchema,
  price: z.number().nullable(),
  rent_price_monthly: z.number().nullable(),
  is_active: z.boolean(),
  thumbnail_url: z.string().nullable(),
});

export const RecentPropertiesResponseDtoSchema = z.object({
  items: z.array(RecentPropertyDtoSchema),
  total: z.number(),
});

// ─── Admin ────────────────────────────────────────────────────────────────────

export const StagnantPropertyDtoSchema = z.object({
  id: z.string(),
  reference: z.string(),
  title: z.string(),
  city: z.string(),
  transaction_type: TransactionTypeSchema,
  price: z.number().nullable(),
  rent_price_monthly: z.number().nullable(),
  energy_rating: z.string().nullable(),
  days_stagnant: z.number(),
  thumbnail_url: z.string().nullable(),
});

export const QualityScoreDtoSchema = z.object({
  photos: z.number(),
  description: z.number(),
  price: z.number(),
  energy_rating: z.number(),
  surface: z.number(),
  global_score: z.number(),
});

export const GlobalStatsDtoSchema = z.object({
  total: z.number(),
  active: z.number(),
  inactive: z.number(),
  for_sale: z.number(),
  for_rent: z.number(),
  avg_sale_price: z.number().nullable(),
  avg_rent_price: z.number().nullable(),
  without_photos: z.number(),
  without_price: z.number(),
  by_energy_rating: z.record(z.string(), z.number()),
  by_property_type: z.record(z.string(), z.number()),
  by_city: z.record(z.string(), z.number()),
  at_risk_dpe: z.number(),
  available_soon: z.number(),
  avg_age_days: z.number().nullable(),
  avg_sale_delay_days: z.number().nullable(),
  stagnant_properties: z.array(StagnantPropertyDtoSchema),
  quality_score: QualityScoreDtoSchema,
  price_per_sqm_by_city: z.record(z.string(), z.number()),
});

export const MonthlyPeriodDtoSchema = z.object({
  month: z.string(),
  added: z.number(),
  for_sale: z.number(),
  for_rent: z.number(),
});

export const MonthlyStatsDtoSchema = z.object({
  periods: z.array(MonthlyPeriodDtoSchema),
  trend_percent: z.number().nullable(),
});

export const CityPerformanceDtoSchema = z.object({
  city: z.string(),
  nb_biens: z.number(),
  avg_price_per_sqm: z.number().nullable(),
  avg_sale_delay: z.number().nullable(),
});

export const CitiesPerformanceDtoSchema = z.object({
  cities: z.array(CityPerformanceDtoSchema),
});

export const AdminPropertyDtoSchema = z.object({
  id: z.string(),
  reference: z.string().nullable(),
  title: z.string(),
  city: z.string(),
  postal_code: z.string(),
  transaction_type: TransactionTypeSchema,
  property_type: z.string(),
  price: z.number().nullable(),
  rent_price_monthly: z.number().nullable(),
  surface_area: z.number(),
  rooms: z.number(),
  energy_rating: z.string(),
  is_active: z.boolean(),
  photos_count: z.number(),
  views_count: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  thumbnail_url: z.string().nullable(),
});

export const AdminPropertiesDtoSchema = z.object({
  items: z.array(AdminPropertyDtoSchema),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  pages: z.number(),
});

export const PhotoDetailDtoSchema = z.object({
  id: z.string(),
  url: z.string(),
  is_primary: z.boolean(),
  order: z.number(),
});

export const PropertyDetailDtoSchema = z.object({
  id: z.string(),
  agent_id: z.string(),
  reference: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  address: z.string().nullable(),
  neighborhood: z.string(),
  city: z.string(),
  district: z.string(),
  postal_code: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  price: z.number().nullable(),
  price_per_sqm: z.number().nullable(),
  rent_price_monthly: z.number().nullable(),
  deposit: z.number().nullable(),
  charges_included: z.boolean().nullable(),
  transaction_type: TransactionTypeSchema,
  property_type: z.string(),
  surface_area: z.number(),
  rooms: z.number(),
  bedrooms: z.number(),
  bathrooms: z.number().nullable(),
  toilets: z.number().nullable(),
  floors: z.number().nullable(),
  floor_number: z.number().nullable(),
  has_cave: z.boolean().nullable(),
  has_elevator: z.boolean(),
  has_balcony: z.boolean(),
  has_terrace: z.boolean(),
  has_garden: z.boolean(),
  has_parking: z.boolean(),
  parking_spaces: z.number().nullable(),
  energy_rating: z.string().nullable(),
  heating_type: z.string().nullable(),
  construction_year: z.number().nullable(),
  available_from: z.string().nullable(),
  is_furnished: z.boolean().nullable(),
  photos: z.array(PhotoDetailDtoSchema),
  thumbnail_url: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string().nullable(),
  is_active: z.boolean(),
});

// ─── Inferred types ───────────────────────────────────────────────────────────

export type AuthTokenDto = z.infer<typeof AuthTokenDtoSchema>;
export type ApiUserDto = z.infer<typeof ApiUserDtoSchema>;
export type RecentPropertyDto = z.infer<typeof RecentPropertyDtoSchema>;
export type RecentPropertiesResponseDto = z.infer<
  typeof RecentPropertiesResponseDtoSchema
>;
export type StagnantPropertyDto = z.infer<typeof StagnantPropertyDtoSchema>;
export type QualityScoreDto = z.infer<typeof QualityScoreDtoSchema>;
export type GlobalStatsDto = z.infer<typeof GlobalStatsDtoSchema>;
export type MonthlyPeriodDto = z.infer<typeof MonthlyPeriodDtoSchema>;
export type MonthlyStatsDto = z.infer<typeof MonthlyStatsDtoSchema>;
export type CityPerformanceDto = z.infer<typeof CityPerformanceDtoSchema>;
export type CitiesPerformanceDto = z.infer<typeof CitiesPerformanceDtoSchema>;
export type AdminPropertyDto = z.infer<typeof AdminPropertyDtoSchema>;
export type AdminPropertiesDto = z.infer<typeof AdminPropertiesDtoSchema>;
export type PhotoDetailDto = z.infer<typeof PhotoDetailDtoSchema>;
export type PropertyDetailDto = z.infer<typeof PropertyDetailDtoSchema>;
