import { IconBuilding, IconBuildingStore } from "@tabler/icons-react";
import type {
  PropertyGlobalStats,
  PropertyMonthlyStats,
} from "@/00-domain/entities";
import { KpiCard, KpiSkeleton } from "@/shared/ui/KpiCard";
import { formatPrice } from "@/shared/utils/format";

interface PortfolioSectionProps {
  stats: PropertyGlobalStats | undefined;
  monthly: PropertyMonthlyStats | undefined;
  loadingStats: boolean;
}

export function PortfolioSection({
  stats,
  monthly,
  loadingStats,
}: PortfolioSectionProps) {
  return (
    <section>
      <h2 className="text-sm font-semibold uppercase text-muted-foreground mb-4">
        Portefeuille
      </h2>
      <div className="kpi-group">
        {loadingStats ? (
          Array.from({ length: 4 }).map((_, i) => <KpiSkeleton key={i} />)
        ) : (
          <>
            <KpiCard
              title="Total propriétés"
              value={stats?.total ?? 0}
              subtitle={`${stats?.active ?? 0} actives · ${stats?.inactive ?? 0} inactives`}
              icon={IconBuilding}
              loading={false}
              trend={monthly?.trendPercent}
            />
            <KpiCard
              title="À la vente"
              value={stats?.forSale ?? 0}
              subtitle={
                stats?.avgSalePrice
                  ? `Moy. ${formatPrice(stats.avgSalePrice)}`
                  : undefined
              }
              icon={IconBuildingStore}
              loading={false}
            />
            <KpiCard
              title="À la location"
              value={stats?.forRent ?? 0}
              subtitle={
                stats?.avgRentPrice
                  ? `Moy. ${stats.avgRentPrice} €/mois`
                  : undefined
              }
              icon={IconBuildingStore}
              loading={false}
            />
            <KpiCard
              title="Villes couvertes"
              value={Object.keys(stats?.byCity ?? {}).length}
              subtitle="dans le portefeuille"
              icon={IconBuilding}
              loading={false}
            />
          </>
        )}
      </div>
    </section>
  );
}
