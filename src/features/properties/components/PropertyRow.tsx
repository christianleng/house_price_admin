import { TRANSACTION_TYPES } from "@/00-domain/constants/property";
import type { AdminProperty } from "@/00-domain/entities";
import { getPropertyStatus } from "@/00-domain/use-cases/properties/getPropertyStatus";
import { DPE_COLORS } from "@/shared/constants/dpe";
import { Badge } from "@/shared/ui/badge";
import { TableCell, TableRow } from "@/shared/ui/table";
import { formatPrice } from "@/shared/utils/format";
import { PROPERTY_STATUS_STYLES } from "@/shared/utils/propertyStatus";
import { IconBuilding } from "@tabler/icons-react";
import { getTransactionTypeLabel } from "@/00-domain/use-cases/properties/getTransactionTypeLabel";

interface PropertyRowProps {
  property: AdminProperty;
  onClick: () => void;
}

export function PropertyRow({ property, onClick }: PropertyRowProps) {
  const price =
    property.transactionType === TRANSACTION_TYPES.SALE
      ? property.price != null
        ? formatPrice(property.price)
        : "—"
      : property.rentPriceMonthly != null
        ? `${property.rentPriceMonthly.toLocaleString("fr-FR")} €/mois`
        : "—";

  const status = getPropertyStatus(property.isActive);
  const { className, label } = PROPERTY_STATUS_STYLES[status];

  return (
    <TableRow
      className="cursor-pointer hover:bg-muted/30 transition-colors"
      onClick={onClick}
    >
      <TableCell>
        <div className="flex items-center gap-3">
          {property.thumbnailUrl ? (
            <img
              src={property.thumbnailUrl}
              alt={property.title}
              className="size-10 rounded-sm object-cover shrink-0"
            />
          ) : (
            <div className="size-10 rounded-sm bg-muted flex items-center justify-center shrink-0">
              <IconBuilding className="size-4 text-muted-foreground" />
            </div>
          )}
          <div className="min-w-0">
            <p className="font-medium text-foreground truncate max-w-52">
              {property.title}
            </p>
            <p className="text-xs text-muted-foreground">
              {property.reference ?? "—"}
            </p>
          </div>
        </div>
      </TableCell>
      <TableCell className="text-muted-foreground">{property.city}</TableCell>
      <TableCell>
        <Badge variant="secondary" className="text-xs capitalize">
          {getTransactionTypeLabel(property.transactionType)}
        </Badge>
      </TableCell>
      <TableCell className="text-right font-medium tabular-nums">
        {price}
      </TableCell>
      <TableCell>
        <span
          className={`inline-flex items-center rounded-sm px-1.5 py-0.5 text-xs font-bold ${
            DPE_COLORS[property.energyRating] ??
            "bg-muted text-muted-foreground"
          }`}
        >
          {property.energyRating}
        </span>
      </TableCell>
      <TableCell className="text-muted-foreground tabular-nums">
        {property.surfaceArea} m²
      </TableCell>
      <TableCell>
        <span
          className={`items-center rounded-full px-2 py-0.5 text-xs font-medium ${className}`}
        >
          {label}
        </span>
      </TableCell>
    </TableRow>
  );
}
