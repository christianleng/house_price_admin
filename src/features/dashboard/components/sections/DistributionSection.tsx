import { Skeleton } from "@/shared/ui/skeleton";
import { DPE_COLORS } from "@/shared/constants/dpe";
import type { PropertyGlobalStats } from "@/00-domain/entities";

interface DistributionSectionProps {
  stats: PropertyGlobalStats | undefined;
  loadingStats: boolean;
}

export function DistributionSection({
  stats,
  loadingStats,
}: DistributionSectionProps) {
  const topCities = stats?.byCity
    ? Object.entries(stats.byCity)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
    : [];

  const propertyTypes = stats?.byPropertyType
    ? Object.entries(stats.byPropertyType).sort(([, a], [, b]) => b - a)
    : [];

  const maxCityCount = topCities[0]?.[1] ?? 1;

  return (
    <div className="distrib-grid">
      <div className="rounded-sm border bg-card p-5">
        <h3 className="text-sm font-semibold mb-4">Répartition DPE</h3>
        {loadingStats ? (
          <div className="flex gap-2 flex-wrap">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-10" />
            ))}
          </div>
        ) : (
          <div className="flex gap-3 flex-wrap">
            {Object.entries(stats?.byEnergyRating ?? {})
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([rating, count]) => (
                <div
                  key={rating}
                  className="flex flex-col items-center gap-1.5"
                >
                  <span
                    className={`rounded-md px-2.5 py-1.5 text-sm font-bold min-w-9 text-center ${DPE_COLORS[rating] ?? "bg-muted text-foreground"}`}
                  >
                    {rating}
                  </span>
                  <span className="text-xs font-medium tabular-nums text-muted-foreground">
                    {count}
                  </span>
                </div>
              ))}
          </div>
        )}
      </div>

      <div className="rounded-sm border bg-card p-5">
        <h3 className="text-sm font-semibold mb-4">Types de bien</h3>
        {loadingStats ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-5 w-full" />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {propertyTypes.map(([type, count]) => {
              const total = stats?.total ?? 1;
              const pct = Math.round((count / total) * 100);
              return (
                <div key={type} className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-20 capitalize shrink-0">
                    {type}
                  </span>
                  <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium tabular-nums w-6 text-right shrink-0">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="rounded-sm border bg-card p-5">
        <h3 className="text-sm font-semibold mb-4">Top villes</h3>
        {loadingStats ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-5 w-full" />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {topCities.map(([city, count], index) => (
              <div key={city} className="flex items-center gap-3">
                <span className="text-xs font-bold text-muted-foreground w-4 tabular-nums shrink-0">
                  {index + 1}
                </span>
                <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.round((count / maxCityCount) * 100)}%`,
                    }}
                  />
                </div>
                <span className="text-xs text-muted-foreground w-16 truncate shrink-0">
                  {city}
                </span>
                <span className="text-xs font-medium tabular-nums w-4 text-right shrink-0">
                  {count}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
