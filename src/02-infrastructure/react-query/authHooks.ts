import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/01-adapters/http/HttpAuthAdapter";
import { tokenStorage } from "@/01-adapters/http/TokenStorageAdapter";
import type { LoginCredentials } from "@/00-domain/entities";

export const AUTH_KEYS = {
  user: ["auth", "user"] as const,
};

export function useCurrentUser(enabled: boolean) {
  return useQuery({
    queryKey: AUTH_KEYS.user,
    queryFn: authService.getMe,
    enabled,
    retry: (failureCount, error) => {
      if ((error as { status?: number }).status === 401) return false;
      return failureCount < 2;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 30,
  });
}

export function useLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) =>
      authService.login(credentials),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: AUTH_KEYS.user });
    },
  });
}

export function useLogoutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.logout,
    onSettled: () => {
      tokenStorage.clearToken();
      queryClient.setQueryData(AUTH_KEYS.user, null);
      queryClient.removeQueries({ queryKey: AUTH_KEYS.user });
      window.location.href = "/auth/login";
    },
  });
}
