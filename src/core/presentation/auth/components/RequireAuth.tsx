import { Navigate, useLocation } from "react-router";
import { useAuth } from "../providers/authProviders";
import type { ReactElement } from "react";

export const RequireAuth = ({ children }: { children: ReactElement }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
};
