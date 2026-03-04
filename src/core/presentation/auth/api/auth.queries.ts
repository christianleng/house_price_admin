import { queryOptions } from "@tanstack/react-query";
import { authService } from "./auth.service";

export const AUTH_CACHE = {
  USER: {
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
    retry: false,
  },
} as const;

export const authKeys = {
  all: ["auth"] as const,
  user: () => [...authKeys.all, "user"] as const,
};

export const authQueries = {
  user: () =>
    queryOptions({
      queryKey: authKeys.user(),
      queryFn: authService.getMe,
      ...AUTH_CACHE.USER,
    }),
};
