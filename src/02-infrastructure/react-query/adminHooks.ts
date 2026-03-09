import { useSuspenseQuery } from "@tanstack/react-query";
import { adminService } from "@/01-adapters/http/HttpAdminAdapter";
import type { AdminPropertiesFilters } from "@/00-domain/entities";

export const ADMIN_KEYS = {
  globalStats: ["admin", "stats", "global"] as const,
  monthlyStats: (months: number) =>
    ["admin", "stats", "monthly", months] as const,
  citiesPerformance: ["admin", "stats", "cities"] as const,
  adminProperties: (filters: AdminPropertiesFilters) =>
    ["admin", "properties", filters] as const,
};

export const globalStatsQuery = {
  queryKey: ADMIN_KEYS.globalStats,
  queryFn: () => adminService.getGlobalStats(),
  staleTime: 1000 * 60 * 5,
};

export const monthlyStatsQuery = (months = 6) => ({
  queryKey: ADMIN_KEYS.monthlyStats(months),
  queryFn: () => adminService.getMonthlyStats(months),
  staleTime: 1000 * 60 * 5,
});

export const citiesPerformanceQuery = {
  queryKey: ADMIN_KEYS.citiesPerformance,
  queryFn: () => adminService.getCitiesPerformance(),
  staleTime: 1000 * 60 * 5,
};

export const adminPropertiesQuery = (filters: AdminPropertiesFilters) => ({
  queryKey: ADMIN_KEYS.adminProperties(filters),
  queryFn: () => adminService.getAdminProperties(filters),
  staleTime: 1000 * 60 * 2,
});

export function useGlobalStats() {
  return useSuspenseQuery(globalStatsQuery);
}

export function useMonthlyStats(months = 6) {
  return useSuspenseQuery(monthlyStatsQuery(months));
}

export function useCitiesPerformance() {
  return useSuspenseQuery(citiesPerformanceQuery);
}

export function useAdminProperties(filters: AdminPropertiesFilters) {
  return useSuspenseQuery(adminPropertiesQuery(filters));
}
