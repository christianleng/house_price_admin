import { KpiSkeleton } from "@/shared/ui/KpiCard";
import { Skeleton } from "@/shared/ui/skeleton";

export function KpiGroupSkeleton() {
  return (
    <div className="kpi-group">
      {Array.from({ length: 8 }).map((_, i) => (
        <KpiSkeleton key={i} />
      ))}
    </div>
  );
}

export function SectionSkeleton({ contentHeight }: { contentHeight: string }) {
  return (
    <div className="rounded-xl bg-card border border-border shadow-sm p-6 space-y-5">
      <Skeleton className="h-3 w-32" />
      <Skeleton className={`w-full rounded-md ${contentHeight}`} />
    </div>
  );
}
