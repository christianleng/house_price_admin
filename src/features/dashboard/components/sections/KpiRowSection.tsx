import {
  IconBuilding,
  IconBuildingStore,
  IconClock,
  IconCalendar,
} from "@tabler/icons-react";
import { KpiCard } from "@/shared/ui/KpiCard";
import { formatPrice } from "@/shared/utils/format";
import {
  useGlobalStats,
  useMonthlyStats,
} from "@/02-infrastructure/react-query/adminHooks";

export function KpiRowSection() {
  const { data: stats } = useGlobalStats();
  const { data: monthly } = useMonthlyStats(6);

  return (
    <div className="kpi-group">
      <KpiCard
        title="Total propriétés"
        value={stats.total}
        subtitle={`${stats.active} actives · ${stats.inactive} inactives`}
        icon={IconBuilding}
        loading={false}
        trend={monthly.trendPercent}
        colorClass="text-primary"
      />
      <KpiCard
        title="À la vente"
        value={stats.forSale}
        subtitle={
          stats.avgSalePrice
            ? `Moy. ${formatPrice(stats.avgSalePrice)}`
            : undefined
        }
        icon={IconBuildingStore}
        loading={false}
        colorClass="text-series-blue"
      />
      <KpiCard
        title="À la location"
        value={stats.forRent}
        subtitle={
          stats.avgRentPrice ? `Moy. ${stats.avgRentPrice} €/mois` : undefined
        }
        icon={IconBuildingStore}
        loading={false}
        colorClass="text-status-location"
      />
      <KpiCard
        title="Délai moyen vente"
        value={
          stats.avgSaleDelayDays
            ? `${Math.round(stats.avgSaleDelayDays)}j`
            : "—"
        }
        subtitle="depuis mise en ligne"
        icon={IconClock}
        loading={false}
        colorClass="text-status-warning"
      />
      <KpiCard
        title="Disponibles sous 30j"
        value={stats.availableSoon}
        subtitle="biens à proposer"
        icon={IconCalendar}
        loading={false}
        colorClass="text-status-success"
      />
    </div>
  );
}
