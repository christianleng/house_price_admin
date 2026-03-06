import { useSuspenseQuery } from "@tanstack/react-query";
import { propertyService } from "@/01-adapters/http/HttpPropertyAdapter";

export const PROPERTY_KEYS = {
  count: (params?: object) => ["properties", "count", params] as const,
  recent: (limit: number) => ["properties", "recent", limit] as const,
};

export const recentPropertiesQuery = (limit = 5) => ({
  queryKey: PROPERTY_KEYS.recent(limit),
  queryFn: () => propertyService.getRecent(limit),
  staleTime: 1000 * 60 * 2,
});

export const propertyCountQuery = (params?: { status?: string }) => ({
  queryKey: PROPERTY_KEYS.count(params),
  queryFn: () => propertyService.getCount(params),
  staleTime: 1000 * 60 * 5,
});

export function usePropertyCount(params?: { status?: string }) {
  return useSuspenseQuery(propertyCountQuery(params));
}

export function useRecentProperties(limit = 5) {
  return useSuspenseQuery(recentPropertiesQuery(limit));
}
