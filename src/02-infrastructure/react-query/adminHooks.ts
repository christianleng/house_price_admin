import { useQuery } from "@tanstack/react-query";
import { adminService } from "@/01-adapters/http/HttpAdminAdapter";

export const ADMIN_KEYS = {
  stats: () => ["admin", "stats"] as const,
  statsMonthly: (months: number) =>
    ["admin", "stats", "monthly", months] as const,
};

export function useGlobalStats() {
  return useQuery({
    queryKey: ADMIN_KEYS.stats(),
    queryFn: adminService.getGlobalStats,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}

export function useMonthlyStats(months = 6) {
  return useQuery({
    queryKey: ADMIN_KEYS.statsMonthly(months),
    queryFn: () => adminService.getMonthlyStats(months),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}
