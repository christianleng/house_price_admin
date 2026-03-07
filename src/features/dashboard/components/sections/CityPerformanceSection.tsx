import { useCitiesPerformance } from "@/02-infrastructure/react-query/adminHooks";

function DelayBadge({ days }: { days: number | null }) {
  if (days == null) return <span className="text-muted-foreground">—</span>;

  const color =
    days <= 30
      ? "text-emerald-600"
      : days <= 60
        ? "text-orange-500"
        : "text-red-600";

  return (
    <span className={`font-bold tabular-nums ${color}`}>
      {Math.round(days)}j
    </span>
  );
}

export function CityPerformanceSection() {
  const { data } = useCitiesPerformance();

  return (
    <section className="rounded-sm shadow-sidebar-active bg-card p-5">
      <div className="mb-4">
        <h3 className="text-sm font-semibold">Performance par ville</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Indicateurs clés</p>
      </div>

      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-border">
            {["Ville", "Biens", "€/m²", "Délai vente"].map((h) => (
              <th
                key={h}
                className={`pb-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground ${
                  h === "Ville" ? "text-left" : "text-right"
                }`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border/50">
          {data.cities.map((city, index) => (
            <tr key={city.city} className="hover:bg-muted/30 transition-colors">
              <td className="py-2.5">
                <div className="flex items-center gap-2">
                  <div
                    className={`size-5 rounded-sm flex items-center justify-center text-xs font-bold shrink-0 ${
                      index === 0
                        ? "bg-foreground text-background"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span
                    className={`${index === 0 ? "font-semibold text-foreground" : "text-foreground/80"}`}
                  >
                    {city.city}
                  </span>
                </div>
              </td>
              <td className="py-2.5 text-right font-semibold tabular-nums">
                {city.nbBiens}
              </td>
              <td className="py-2.5 text-right font-semibold tabular-nums text-primary">
                {city.avgPricePerSqm
                  ? `${city.avgPricePerSqm.toLocaleString("fr-FR")} €`
                  : "—"}
              </td>
              <td className="py-2.5 text-right">
                <DelayBadge days={city.avgSaleDelay} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
