import type { ReactNode } from "react";
import { QueryProvider } from "./QueryProvider";
import { AuthProvider } from "@/02-infrastructure/auth/AuthProvider";
import { SyncOnlineProvider } from "@/02-infrastructure/offline/SyncOnlineProvider";

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryProvider>
      <AuthProvider>
        <SyncOnlineProvider>{children}</SyncOnlineProvider>
      </AuthProvider>
    </QueryProvider>
  );
}
