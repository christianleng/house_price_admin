import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "@/02-infrastructure/auth/AuthProvider";

function LoginRedirect() {
  const location = useLocation();
  return <Navigate to="/auth/login" state={{ from: location }} replace />;
}

export const ProtectedLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <span className="text-muted-foreground">
          Vérification de la session...
        </span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginRedirect />;
  }

  return <Outlet />;
};
