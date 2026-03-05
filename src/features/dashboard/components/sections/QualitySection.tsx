import {
  IconAlertTriangle,
  IconCalendar,
  IconClock,
  IconPhoto,
} from "@tabler/icons-react";
import { KpiCard, KpiSkeleton } from "@/shared/ui/KpiCard";
import type { PropertyGlobalStats } from "@/00-domain/entities";

interface QualitySectionProps {
  stats: PropertyGlobalStats | undefined;
  loadingStats: boolean;
}

export function QualitySection({ stats, loadingStats }: QualitySectionProps) {
  return (
    <section>
      <h2 className="text-sm font-semibold uppercase text-muted-foreground mb-4">
        Qualité du catalogue
      </h2>
      <div className="kpi-group">
        {loadingStats ? (
          Array.from({ length: 4 }).map((_, i) => <KpiSkeleton key={i} />)
        ) : (
          <>
            <KpiCard
              title="Risque légal DPE"
              value={stats?.atRiskDpe ?? 0}
              subtitle="locations DPE F ou G — interdites"
              icon={IconAlertTriangle}
              loading={false}
              href={stats?.atRiskDpe ? "/test" : undefined}
              variant={stats?.atRiskDpe ? "danger" : "default"}
            />
            <KpiCard
              title="Disponibles sous 30j"
              value={stats?.availableSoon ?? 0}
              subtitle="biens à proposer maintenant"
              icon={IconCalendar}
              loading={false}
            />
            <KpiCard
              title="Âge moyen catalogue"
              value={
                stats?.avgAgeDays ? `${Math.round(stats.avgAgeDays)}j` : "—"
              }
              subtitle="jours depuis création"
              icon={IconClock}
              loading={false}
              variant={(stats?.avgAgeDays ?? 0) > 90 ? "warning" : "default"}
            />
            <KpiCard
              title="Sans photo"
              value={stats?.withoutPhotos ?? 0}
              subtitle="annonces sans visuel"
              icon={IconPhoto}
              loading={false}
              href={stats?.withoutPhotos ? "/properties?photos=0" : undefined}
              variant={stats?.withoutPhotos ? "warning" : "default"}
            />
          </>
        )}
      </div>
    </section>
  );
}
