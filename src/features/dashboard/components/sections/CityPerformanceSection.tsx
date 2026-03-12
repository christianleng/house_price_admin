import { getSaleDelayColor } from "@/00-domain/use-cases/stats/categorizeSaleDelay";
import { useCitiesPerformance } from "@/02-infrastructure/react-query/adminHooks";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";

const HEADERS = ["Ville", "Biens", "€/m²", "Délai vente"] as const;

function DelayBadge({ days }: { days: number | null }) {
  if (days == null) return <span className="text-muted-foreground">—</span>;
  return (
    <span className={`font-bold tabular-nums ${getSaleDelayColor(days)}`}>
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

      <Table>
        <TableHeader>
          <TableRow className="border-b border-border">
            {HEADERS.map((h) => (
              <TableHead
                key={h}
                className={`text-xs font-semibold uppercase tracking-wider text-muted-foreground ${
                  h === "Ville" ? "text-left" : "text-right"
                }`}
              >
                {h}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.cities.map((city, index) => (
            <TableRow
              key={city.city}
              className="hover:bg-muted/30 transition-colors"
            >
              <TableCell className="py-2.5">
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
                    className={
                      index === 0
                        ? "font-semibold text-foreground"
                        : "text-foreground/80"
                    }
                  >
                    {city.city}
                  </span>
                </div>
              </TableCell>
              <TableCell className="py-2.5 text-right font-semibold tabular-nums">
                {city.nbBiens}
              </TableCell>
              <TableCell className="py-2.5 text-right font-semibold tabular-nums text-primary">
                {city.avgPricePerSqm
                  ? `${city.avgPricePerSqm.toLocaleString("fr-FR")} €`
                  : "—"}
              </TableCell>
              <TableCell className="py-2.5 text-right">
                <DelayBadge days={city.avgSaleDelay} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
