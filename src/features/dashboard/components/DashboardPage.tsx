import { IconBuilding, IconChartBar, IconMap } from "@tabler/icons-react";
import {
  usePropertyCount,
  usePropertiesByCities,
} from "@/02-infrastructure/react-query/propertyHooks";

export default function DashboardPage() {
  const totalCount = usePropertyCount();
  const activeCount = usePropertyCount({ status: "active" });
  const byCities = usePropertiesByCities();

  const citiesCount = byCities.data ? Object.keys(byCities.data).length : 0;

  const kpiCards = [
    {
      title: "Propriétés totales",
      value: totalCount.data,
      loading: totalCount.isLoading,
      icon: IconBuilding,
    },
    {
      title: "Propriétés actives",
      value: activeCount.data,
      loading: activeCount.isLoading,
      icon: IconChartBar,
    },
    {
      title: "Villes couvertes",
      value: citiesCount,
      loading: byCities.isLoading,
      icon: IconMap,
    },
  ];

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpiCards.map((kpi) => (
          <div key={kpi.title} className="rounded-xl border bg-card p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{kpi.title}</span>
              <kpi.icon className="size-4 text-muted-foreground" />
            </div>
            <p className="mt-2 text-3xl font-bold">
              {kpi.loading ? (
                <span className="inline-block h-8 w-16 animate-pulse rounded bg-muted" />
              ) : (
                (kpi.value ?? "—")
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
