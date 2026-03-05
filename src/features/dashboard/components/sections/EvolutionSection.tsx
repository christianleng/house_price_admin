import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Skeleton } from "@/shared/ui/skeleton";
import type { PropertyMonthlyStats } from "@/00-domain/entities";

interface EvolutionSectionProps {
  monthly: PropertyMonthlyStats | undefined;
  loadingMonthly: boolean;
}

export function EvolutionSection({
  monthly,
  loadingMonthly,
}: EvolutionSectionProps) {
  return (
    <section>
      <h2 className="text-sm font-semibold uppercase text-muted-foreground mb-4">
        Évolution — 6 derniers mois
      </h2>
      <div className="rounded-sm border bg-card p-5">
        {loadingMonthly ? (
          <div className="flex items-center justify-center h-64">
            <Skeleton className="h-48 w-full" />
          </div>
        ) : monthly?.periods.length === 0 ? (
          <div className="flex items-center justify-center h-64 text-muted-foreground text-sm">
            Pas de données sur cette période
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={monthly?.periods}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }} />
              <Bar
                dataKey="forSale"
                name="Vente"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="forRent"
                name="Location"
                fill="hsl(var(--muted-foreground))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  );
}
