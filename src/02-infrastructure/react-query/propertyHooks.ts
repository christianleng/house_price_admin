import { useSuspenseQuery } from "@tanstack/react-query";
import { propertyService } from "@/01-adapters/http/HttpPropertyAdapter";

export const DEFAULT_RECENT_PROPERTIES_LIMIT = 5;

export const PROPERTY_KEYS = {
  all: () => ["properties"] as const,
  count: (params?: object) =>
    [...PROPERTY_KEYS.all(), "count", params] as const,
  recent: (limit: number) => [...PROPERTY_KEYS.all(), "recent", limit] as const,
};

export const recentPropertiesQuery = (
  limit = DEFAULT_RECENT_PROPERTIES_LIMIT,
) => ({
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

export function useRecentProperties(limit = DEFAULT_RECENT_PROPERTIES_LIMIT) {
  return useSuspenseQuery(recentPropertiesQuery(limit));
}
