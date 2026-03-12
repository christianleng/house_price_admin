import {
  useSuspenseQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { adminService } from "@/01-adapters/http/HttpAdminAdapter";
import { enqueue } from "@/02-infrastructure/offline/mutationQueue";
import type {
  AdminPropertiesFilters,
  PropertyDetail,
  UpdatePropertyPayload,
} from "@/00-domain/entities";

export const ADMIN_KEYS = {
  all: () => ["admin"] as const,

  stats: () => [...ADMIN_KEYS.all(), "stats"] as const,
  globalStats: () => [...ADMIN_KEYS.stats(), "global"] as const,
  monthlyStats: (months: number) =>
    [...ADMIN_KEYS.stats(), "monthly", months] as const,
  citiesPerformance: () => [...ADMIN_KEYS.stats(), "cities"] as const,

  properties: () => [...ADMIN_KEYS.all(), "properties"] as const,
  propertiesList: (filters: AdminPropertiesFilters) =>
    [...ADMIN_KEYS.properties(), "list", filters] as const,
  propertyDetail: (id: string) =>
    [...ADMIN_KEYS.properties(), "detail", id] as const,
};

export const globalStatsQuery = {
  queryKey: ADMIN_KEYS.globalStats(),
  queryFn: () => adminService.getGlobalStats(),
  staleTime: 1000 * 60 * 5,
};

export const monthlyStatsQuery = (months = 6) => ({
  queryKey: ADMIN_KEYS.monthlyStats(months),
  queryFn: () => adminService.getMonthlyStats(months),
  staleTime: 1000 * 60 * 5,
});

export const citiesPerformanceQuery = {
  queryKey: ADMIN_KEYS.citiesPerformance(),
  queryFn: () => adminService.getCitiesPerformance(),
  staleTime: 1000 * 60 * 5,
};

export const adminPropertiesQuery = (filters: AdminPropertiesFilters) => ({
  queryKey: ADMIN_KEYS.propertiesList(filters),
  queryFn: () => adminService.getAdminProperties(filters),
  staleTime: 1000 * 60 * 2,
});

export const propertyDetailQuery = (id: string) => ({
  queryKey: ADMIN_KEYS.propertyDetail(id),
  queryFn: () => adminService.getPropertyById(id),
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

export function useAdminProperty(id: string) {
  return useSuspenseQuery(propertyDetailQuery(id));
}

export function useUpdateProperty(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    networkMode: "always",

    mutationFn: (payload: UpdatePropertyPayload) =>
      adminService.updateProperty(id, payload),

    onMutate: async (payload) => {
      console.log(
        "🟡 [useUpdateProperty] onMutate — online:",
        navigator.onLine,
      );
      // Annule les refetch en cours pour éviter un écrasement
      await queryClient.cancelQueries({
        queryKey: ADMIN_KEYS.propertyDetail(id),
      });

      // Snapshot de l'état précédent pour rollback éventuel
      const previousProperty = queryClient.getQueryData<PropertyDetail>(
        ADMIN_KEYS.propertyDetail(id),
      );

      // Met à jour le cache immédiatement (optimistic)
      queryClient.setQueryData<PropertyDetail>(
        ADMIN_KEYS.propertyDetail(id),
        (old) => (old ? ({ ...old, ...payload } as PropertyDetail) : old),
      );

      return { previousProperty };
    },

    onError: async (error, payload, context) => {
      console.group("🔴 [useUpdateProperty] onError");
      console.log("online:", navigator.onLine);
      console.log("error:", error);
      console.groupEnd();
      // Rollback du cache optimiste
      if (context?.previousProperty) {
        queryClient.setQueryData(
          ADMIN_KEYS.propertyDetail(id),
          context.previousProperty,
        );
      }

      // Si hors ligne → persiste en IndexedDB pour replay ultérieur
      if (!navigator.onLine) {
        await enqueue(id, payload);
      }
    },

    onSuccess: async (updated) => {
      console.log("✅ [useUpdateProperty] onSuccess — synced with server");
      // Met à jour le cache avec la réponse serveur (source of truth)
      queryClient.setQueryData(ADMIN_KEYS.propertyDetail(id), updated);
      queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.properties() });
    },
  });
}

export function useDeleteProperty() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminService.deleteProperty(id),
    onSuccess: (_data, id) => {
      queryClient.removeQueries({ queryKey: ADMIN_KEYS.propertyDetail(id) });
      queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.properties() });
    },
  });
}
