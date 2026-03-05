import { useQuery } from "@tanstack/react-query";
import { propertyService } from "@/01-adapters/http/HttpPropertyAdapter";

export const PROPERTY_KEYS = {
  count: (params?: object) => ["properties", "count", params] as const,
  byCities: () => ["properties", "by-cities"] as const,
  recent: (limit: number) => ["properties", "recent", limit] as const,
};

export function usePropertyCount(params?: { status?: string }) {
  return useQuery({
    queryKey: PROPERTY_KEYS.count(params),
    queryFn: () => propertyService.getCount(params),
    staleTime: 1000 * 60 * 5,
  });
}

export function usePropertiesByCities() {
  return useQuery({
    queryKey: PROPERTY_KEYS.byCities(),
    queryFn: propertyService.getByCities,
    staleTime: 1000 * 60 * 5,
  });
}

export function useRecentProperties(limit = 5) {
  return useQuery({
    queryKey: PROPERTY_KEYS.recent(limit),
    queryFn: () => propertyService.getRecent(limit),
    staleTime: 1000 * 60 * 2,
  });
}
