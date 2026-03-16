/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { LoginCredentials, User } from "@/00-domain/entities";
import { tokenStorage } from "@/01-adapters/http/TokenStorageAdapter";
import {
  useCurrentUser,
  useLoginMutation,
  useLogoutMutation,
} from "../react-query/authHooks";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  error: Error | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | undefined>(
    tokenStorage.getToken(),
  );

  useEffect(() => {
    const handleUnauthorized = () => setToken(undefined);
    window.addEventListener("auth:unauthorized", handleUnauthorized);
    return () => window.removeEventListener("auth:unauthorized", handleUnauthorized);
  }, []);

  const {
    data: user,
    isFetched,
    isFetching,
    error: userError,
  } = useCurrentUser(!!token);

  const loginMutation = useLoginMutation();
  const logoutMutation = useLogoutMutation();

  const logout = useCallback(() => {
    logoutMutation.mutate();
    setToken(undefined);
  }, [logoutMutation]);

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      await loginMutation.mutateAsync(credentials);
      setToken(tokenStorage.getToken());
    },
    [loginMutation],
  );

  const isLoading =
    (!!token && !isFetched) || loginMutation.isPending || isFetching;

  const value = useMemo(
    () => ({
      user: user ?? null,
      isAuthenticated: !!token,
      isLoading,
      error: (userError as Error) || (loginMutation.error as Error),
      login,
      logout,
    }),
    [user, token, isLoading, userError, loginMutation.error, login, logout],
  );

  return (
    <AuthContext.Provider value={value}>
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
