import {
  useSuspenseQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { adminQueryService, adminMutationService } from "@/01-adapters/http/HttpAdminAdapter";
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
  queryFn: () => adminQueryService.getGlobalStats(),
  staleTime: 1000 * 60 * 5,
};

export const monthlyStatsQuery = (months = 6) => ({
  queryKey: ADMIN_KEYS.monthlyStats(months),
  queryFn: () => adminQueryService.getMonthlyStats(months),
  staleTime: 1000 * 60 * 5,
});

export const citiesPerformanceQuery = {
  queryKey: ADMIN_KEYS.citiesPerformance(),
  queryFn: () => adminQueryService.getCitiesPerformance(),
  staleTime: 1000 * 60 * 5,
};

export const adminPropertiesQuery = (filters: AdminPropertiesFilters) => ({
  queryKey: ADMIN_KEYS.propertiesList(filters),
  queryFn: () => adminQueryService.getAdminProperties(filters),
  staleTime: 1000 * 60 * 2,
});

export const propertyDetailQuery = (id: string) => ({
  queryKey: ADMIN_KEYS.propertyDetail(id),
  queryFn: () => adminQueryService.getPropertyById(id),
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
      adminMutationService.updateProperty(id, payload),

    onMutate: async (payload) => {
      console.log(
        "🟡 [useUpdateProperty] onMutate — online:",
        navigator.onLine,
      );
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

    onError: async (error, payload, context) => {
      console.group("🔴 [useUpdateProperty] onError");
      console.log("online:", navigator.onLine);
      console.log("error:", error);
      console.groupEnd();

      if (context?.previousProperty) {
        queryClient.setQueryData(
          ADMIN_KEYS.propertyDetail(id),
          context.previousProperty,
        );
      }

      if (!navigator.onLine) {
        await enqueue({ type: "updateProperty", propertyId: id, payload });
      }
    },

    onSuccess: async (updated) => {
      console.log("✅ [useUpdateProperty] onSuccess — synced with server");
      queryClient.setQueryData(ADMIN_KEYS.propertyDetail(id), updated);
      queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.properties() });
    },
  });
}

export function useDeleteProperty() {
  const queryClient = useQueryClient();
  return useMutation({
    networkMode: "always",
    mutationFn: (id: string) => adminMutationService.deleteProperty(id),
    onError: async (_error, id) => {
      if (!navigator.onLine) {
        await enqueue({ type: "deleteProperty", propertyId: id });
      }
    },
    onSuccess: (_data, id) => {
      queryClient.removeQueries({ queryKey: ADMIN_KEYS.propertyDetail(id) });
      queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.properties() });
    },
  });
}
