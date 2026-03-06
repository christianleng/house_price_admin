import { Link } from "react-router";
import { DPE_COLORS } from "@/shared/constants/dpe";
import { formatPrice } from "@/shared/utils/format";
import { useGlobalStats } from "@/02-infrastructure/react-query/adminHooks";
import { TRANSACTION_TYPES } from "@/shared/constants/property";

const STAGNANT_STYLES = {
  urgent: "bg-alert-urgent-bg border-alert-urgent-border text-status-error",
  default: "bg-muted border-border text-status-urgent",
} as const;

export function StagnantSection() {
  const { data: stats } = useGlobalStats();
  const items = stats.stagnantProperties;

  const header = (
    <div>
      <h3 className="text-sm font-semibold">Biens stagnants</h3>
      <p className="text-xs text-muted-foreground mt-0.5">
        Plus de 60j sans activité
      </p>
    </div>
  );

  if (items.length === 0)
    return (
      <section className="rounded-sm bg-card p-5 h-full shadow-sidebar-active">
        {header}
        <div className="flex flex-col gap-2 py-6 h-full text-center justify-center">
          <p className="text-sm font-medium text-foreground">
            Aucun bien stagnant
          </p>
          <p className="text-xs text-muted-foreground">
            Tous les biens ont eu une activité récente
          </p>
        </div>
      </section>
    );

  return (
    <section className="rounded-sm shadow-sidebar-active bg-card p-5 h-full">
      <div className="flex items-start justify-between mb-4">
        {header}
        <Link
          to="/properties?stagnant=true"
          className="text-xs text-primary hover:underline shrink-0"
        >
          Voir tout
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        {items.map((property) => {
          const s =
            property.daysStagnant > 100
              ? STAGNANT_STYLES.urgent
              : STAGNANT_STYLES.default;

          return (
            <Link
              key={property.id}
              to={`/properties/${property.id}`}
              className={`flex items-center justify-between rounded-sm border px-4 py-3 transition-all hover:brightness-95 ${s}`}
            >
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">
                  {property.title}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {property.transactionType === TRANSACTION_TYPES.SALE
                    ? "Vente"
                    : "Location"}
                  {" · "}
                  {property.transactionType === TRANSACTION_TYPES.SALE
                    ? formatPrice(property.price)
                    : `${property.rentPriceMonthly} €/m`}
                </p>
              </div>

              <div className="flex flex-col items-end gap-1.5 shrink-0 ml-4">
                <span className="text-sm font-bold tabular-nums">
                  {property.daysStagnant} j
                </span>
                {property.energyRating && (
                  <span
                    className={`rounded-sm px-2 py-0.5 text-xs font-bold ${
                      DPE_COLORS[property.energyRating] ??
                      "bg-muted text-foreground"
                    }`}
                  >
                    {property.energyRating}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
