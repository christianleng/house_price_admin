import type { ReactNode } from "react";
import { useSyncOnline } from "./useSyncOnline";

interface SyncOnlineProviderProps {
  children: ReactNode;
}

export function SyncOnlineProvider({ children }: SyncOnlineProviderProps) {
  useSyncOnline();
  return <>{children}</>;
}
