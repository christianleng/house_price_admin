import { useSuspenseQuery } from "@tanstack/react-query";
import { adminService } from "@/01-adapters/http/HttpAdminAdapter";

export const ADMIN_KEYS = {
  stats: () => ["admin", "stats"] as const,
  statsMonthly: (months: number) =>
    ["admin", "stats", "monthly", months] as const,
};

export const globalStatsQuery = {
  queryKey: ADMIN_KEYS.stats(),
  queryFn: adminService.getGlobalStats,
  staleTime: 1000 * 60 * 5,
};

export const monthlyStatsQuery = (months = 6) => ({
  queryKey: ADMIN_KEYS.statsMonthly(months),
  queryFn: () => adminService.getMonthlyStats(months),
  staleTime: 1000 * 60 * 5,
});

export const citiesPerformanceQuery = {
  queryKey: ["admin", "stats", "cities"] as const,
  queryFn: adminService.getCitiesPerformance,
  staleTime: 1000 * 60 * 5,
};

export function useGlobalStats() {
  return useSuspenseQuery(globalStatsQuery);
}

export function useMonthlyStats(months = 6) {
  return useSuspenseQuery(monthlyStatsQuery(months));
}

export function useCitiesPerformance() {
  return useSuspenseQuery(citiesPerformanceQuery);
}
