import {
  useSuspenseQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { adminQueryService } from "@/01-adapters/http/HttpAdminAdapter";
import { offlineAdminMutationService } from "@/02-infrastructure/offline/offlineAdminMutationService";
import type {
  AdminPropertiesFilters,
  PropertyDetail,
  UpdatePropertyPayload,
} from "@/00-domain/entities";

// Durées de cache par domaine métier
// Stats globales (agrégats backend, lentes à changer) : 5 min
const STATS_STALE_TIME = 1000 * 60 * 5;
// Propriétés (données métier, modifiables par l'admin) : 2 min
const PROPERTY_STALE_TIME = 1000 * 60 * 2;

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
  queryFn: () => adminQueryService.getGlobalStats(),
  staleTime: STATS_STALE_TIME,
};

export const monthlyStatsQuery = (months = 6) => ({
  queryKey: ADMIN_KEYS.monthlyStats(months),
  queryFn: () => adminQueryService.getMonthlyStats(months),
  staleTime: STATS_STALE_TIME,
});

export const citiesPerformanceQuery = {
  queryKey: ADMIN_KEYS.citiesPerformance(),
  queryFn: () => adminQueryService.getCitiesPerformance(),
  staleTime: STATS_STALE_TIME,
};

export const adminPropertiesQuery = (filters: AdminPropertiesFilters) => ({
  queryKey: ADMIN_KEYS.propertiesList(filters),
  queryFn: () => adminQueryService.getAdminProperties(filters),
  staleTime: PROPERTY_STALE_TIME,
});

export const propertyDetailQuery = (id: string) => ({
  queryKey: ADMIN_KEYS.propertyDetail(id),
  queryFn: () => adminQueryService.getPropertyById(id),
  staleTime: PROPERTY_STALE_TIME,
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
      offlineAdminMutationService.updateProperty(id, payload),

    onMutate: async (payload) => {
      await queryClient.cancelQueries({
        queryKey: ADMIN_KEYS.propertyDetail(id),
      });

      const previousProperty = queryClient.getQueryData<PropertyDetail>(
        ADMIN_KEYS.propertyDetail(id),
      );

      queryClient.setQueryData<PropertyDetail>(
        ADMIN_KEYS.propertyDetail(id),
        (old) => (old ? ({ ...old, ...payload } as PropertyDetail) : old),
      );

      return { previousProperty };
    },

    onError: async (_error, _payload, context) => {
      if (context?.previousProperty) {
        queryClient.setQueryData(
          ADMIN_KEYS.propertyDetail(id),
          context.previousProperty,
        );
      }
    },

    onSuccess: async (updated) => {
      queryClient.setQueryData(ADMIN_KEYS.propertyDetail(id), updated);
      queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.properties() });
    },
  });
}

export function useDeleteProperty() {
  const queryClient = useQueryClient();
  return useMutation({
    networkMode: "always",
    mutationFn: (id: string) =>
      offlineAdminMutationService.deleteProperty(id),
    onSuccess: (_data, id) => {
      queryClient.removeQueries({ queryKey: ADMIN_KEYS.propertyDetail(id) });
      queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.properties() });
    },
  });
}
