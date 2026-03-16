import { Link } from "react-router";
import { useNavigate } from "react-router";
import { IconBuilding, IconExternalLink } from "@tabler/icons-react";
import { Badge } from "@/shared/ui/badge";
import { formatPrice } from "@/shared/utils/format";
import { useRecentProperties } from "@/02-infrastructure/react-query/propertyHooks";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
} from "@tanstack/react-table";
import type { RecentProperty } from "@/00-domain/entities";
import { TRANSACTION_TYPES } from "@/00-domain/constants/property";
import { getTransactionTypeLabel } from "@/00-domain/use-cases/properties/getTransactionTypeLabel";
import { getPropertyStatus } from "@/00-domain/use-cases/properties/getPropertyStatus";
import { PROPERTY_STATUS_STYLES } from "@/shared/utils/propertyStatus";

const columns: ColumnDef<RecentProperty>[] = [
  {
    id: "bien",
    header: "Bien",
    cell: ({ row }) => {
      const property = row.original;
      return (
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
            <p className="font-medium text-foreground">
              {/* truncate max-w-45 */}
              {property.title}
            </p>
            <p className="text-xs text-muted-foreground">
              {property.reference}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "city",
    header: "Ville",
    cell: ({ getValue }) => (
      <span className="text-muted-foreground">{getValue<string>()}</span>
    ),
  },
  {
    id: "type",
    header: "Type",
    cell: ({ row }) => (
      <Badge variant="secondary" className="text-xs capitalize">
        {getTransactionTypeLabel(row.original.transactionType)}
      </Badge>
    ),
  },
  {
    id: "prix",
    header: () => <span className="flex justify-end">Prix</span>,
    cell: ({ row }) => {
      const property = row.original;
      const label =
        property.transactionType === TRANSACTION_TYPES.SALE
          ? formatPrice(property.price)
          : `${property.rentPriceMonthly} €/mois`;
      return (
        <span className="flex justify-end font-medium tabular-nums">
          {label}
        </span>
      );
    },
  },
  {
    id: "statut",
    header: () => <span className="flex justify-center">Statut</span>,
    cell: ({ row }) => {
      const isActive = row.original.isActive;
      const status = getPropertyStatus(isActive);
      const { className, label } = PROPERTY_STATUS_STYLES[status];

      return (
        <span className="flex justify-center">
          <span
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-bold text-status-success ${className}`}
          >
            {label}
          </span>
        </span>
      );
    },
  },
];

export function RecentSection() {
  const { data } = useRecentProperties(5);
  const navigate = useNavigate();

  const table = useReactTable({
    data: data.items,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

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
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-muted/40">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="hover:bg-muted/30 transition-colors cursor-pointer"
                onClick={() => navigate(`/properties/${row.original.id}`)}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
