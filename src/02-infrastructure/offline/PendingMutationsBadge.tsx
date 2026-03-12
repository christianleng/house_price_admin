import { usePendingMutationsCount } from "@/shared/hooks/use-PendingMutationsCount";
import { IconCloudOff } from "@tabler/icons-react";

export function PendingMutationsBadge() {
  const count = usePendingMutationsCount();

  if (count === 0) return null;

  return (
    <div className="flex items-center gap-1.5 rounded-sm bg-alert-warning-bg border border-alert-warning-border px-3 py-1.5 text-xs font-medium text-status-warning">
      <IconCloudOff className="size-3.5 shrink-0" />
      {count} modification{count > 1 ? "s" : ""} en attente
    </div>
  );
}
