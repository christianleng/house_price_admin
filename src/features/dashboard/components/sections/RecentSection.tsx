import { Link } from "react-router";
import { IconBuilding, IconExternalLink } from "@tabler/icons-react";
import { Badge } from "@/shared/ui/badge";
import { formatPrice } from "@/shared/utils/format";
import { useRecentProperties } from "@/02-infrastructure/react-query/propertyHooks";
import { TRANSACTION_TYPES } from "@/shared/constants/property";

const STATUS_CLASSES = {
  active:
    "bg-alert-success-bg text-status-success border border-alert-success-border",
  inactive:
    "bg-alert-urgent-bg text-status-error border border-alert-urgent-border",
} as const;

export function RecentSection() {
  const { data } = useRecentProperties(5);

  return (
    <section className="rounded-sm shadow-sidebar-active bg-card p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Dernières propriétés ajoutées
        </h2>
        <Link
          to="/properties"
          className="text-xs text-primary hover:underline flex items-center gap-1"
        >
          Voir tout <IconExternalLink className="size-3" />
        </Link>
      </div>

      <div className="rounded-sm border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/40">
              <th className="text-left px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Bien
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground hidden md:table-cell">
                Ville
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Type
              </th>
              <th className="text-right px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Prix
              </th>
              <th className="text-center px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground hidden sm:table-cell">
                Statut
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data.items.map((property) => (
              <tr
                key={property.id}
                className="hover:bg-muted/30 transition-colors cursor-pointer"
                onClick={() =>
                  (window.location.href = `/properties/${property.id}`)
                }
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {property.thumbnail_url ? (
                      <img
                        src={property.thumbnail_url}
                        alt={property.title}
                        className="size-10 rounded-sm object-cover shrink-0"
                      />
                    ) : (
                      <div className="size-10 rounded-sm bg-muted flex items-center justify-center shrink-0">
                        <IconBuilding className="size-4 text-muted-foreground" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="font-medium text-foreground truncate max-w-45">
                        {property.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {property.reference}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                  {property.city}
                </td>
                <td className="px-4 py-3">
                  <Badge variant="secondary" className="text-xs capitalize">
                    {property.transaction_type === TRANSACTION_TYPES.SALE
                      ? "Vente"
                      : "Location"}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-right font-medium tabular-nums">
                  {property.transaction_type === TRANSACTION_TYPES.SALE
                    ? formatPrice(property.price)
                    : `${property.rent_price_monthly} €/mois`}
                </td>
                <td className="px-4 py-3 text-center hidden sm:table-cell">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                      property.is_active
                        ? STATUS_CLASSES.active
                        : STATUS_CLASSES.inactive
                    }`}
                  >
                    {property.is_active ? "Actif" : "Inactif"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
