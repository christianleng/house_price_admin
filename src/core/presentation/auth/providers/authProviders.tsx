/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../api/auth.service";
import { tokenStorage } from "../api/token.storage";
import type { User, LoginCredentials } from "../types/auth.types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  error: Error | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AUTH_KEYS = { user: ["auth", "user"] as const };

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const [token, setToken] = useState<string | undefined>(
    tokenStorage.getToken(),
  );

  const {
    data: user,
    isFetched,
    isFetching,
    error: userError,
  } = useQuery({
    queryKey: AUTH_KEYS.user,
    queryFn: authService.getMe,
    enabled: !!token,
    retry: (failureCount, error) => {
      if ((error as { status?: number }).status === 401) return false;
      return failureCount < 2;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 30,
  });

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: async () => {
      setToken(tokenStorage.getToken());
      await queryClient.invalidateQueries({ queryKey: AUTH_KEYS.user });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSettled: () => {
      tokenStorage.clearToken();
      setToken(undefined);
      queryClient.setQueryData(AUTH_KEYS.user, null);
      queryClient.removeQueries({ queryKey: AUTH_KEYS.user });
      window.location.href = "/auth/login";
    },
  });

  const login = async (credentials: LoginCredentials) => {
    await loginMutation.mutateAsync(credentials);
  };

  const logout = () => {
    logoutMutation.mutate();
  };

  const isLoading =
    (!!token && !isFetched && isFetching) || loginMutation.isPending;

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        isAuthenticated: !!user,
        isLoading,
        error: (userError as Error) || (loginMutation.error as Error),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
