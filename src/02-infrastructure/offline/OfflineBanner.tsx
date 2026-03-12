import { IconWifiOff } from "@tabler/icons-react";
import { useOnlineStatus } from "@/shared/hooks/use-OnlineStatus";

export function OfflineBanner() {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="flex items-center gap-1.5 rounded-sm bg-alert-urgent-bg border border-alert-urgent-border px-3 py-1.5 text-xs font-medium text-status-error">
      <IconWifiOff className="size-3.5 shrink-0" />
      Hors ligne
    </div>
  );
}
