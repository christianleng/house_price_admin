import { useSearchParams, useNavigate } from "react-router";
import { IconBuilding, IconSearch, IconX } from "@tabler/icons-react";
import { Input } from "@/shared/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Button } from "@/shared/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { useAdminProperties } from "@/02-infrastructure/react-query/adminHooks";
import { filtersFromParams } from "@/shared/utils/propertyFilters";
import Pagination from "@/shared/ui/Pagination";
import { DPE_COLORS, ENERGY_RATINGS } from "@/shared/constants/dpe";
import { PropertyRow } from "./PropertyRow";
import type { AdminProperty } from "@/00-domain/entities";
import { Badge } from "@/shared/ui/badge";
import { TRANSACTION_TYPES } from "@/shared/constants/property";
import { formatPrice } from "@/shared/utils/format";

interface ColumnDef {
  id: string;
  header: string;
  className?: string;
  cell: (property: AdminProperty) => React.ReactNode;
}

const columns: ColumnDef[] = [
  {
    id: "bien",
    header: "Bien",
    cell: (property) => (
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
    ),
  },
  {
    id: "ville",
    header: "Ville",
    cell: (property) => (
      <span className="text-muted-foreground">{property.city}</span>
    ),
  },
  {
    id: "type",
    header: "Type",
    cell: (property) => (
      <Badge variant="secondary" className="text-xs capitalize">
        {property.transactionType === TRANSACTION_TYPES.SALE
          ? "Vente"
          : "Location"}
      </Badge>
    ),
  },
  {
    id: "prix",
    header: "Prix",
    className: "text-right",
    cell: (property) => {
      const label =
        property.transactionType === TRANSACTION_TYPES.SALE
          ? property.price != null
            ? formatPrice(property.price)
            : "—"
          : property.rentPriceMonthly != null
            ? `${property.rentPriceMonthly.toLocaleString("fr-FR")} €/mois`
            : "—";
      return (
        <span className="flex justify-end font-medium tabular-nums">
          {label}
        </span>
      );
    },
  },
  {
    id: "dpe",
    header: "DPE",
    cell: (property) => (
      <span
        className={`inline-flex items-center rounded-sm px-1.5 py-0.5 text-xs font-bold ${
          DPE_COLORS[property.energyRating as keyof typeof DPE_COLORS] ??
          "bg-muted text-muted-foreground"
        }`}
      >
        {property.energyRating}
      </span>
    ),
  },
  {
    id: "surface",
    header: "Surface",
    cell: (property) => (
      <span className="text-muted-foreground tabular-nums">
        {property.surfaceArea} m²
      </span>
    ),
  },
  {
    id: "statut",
    header: "Statut",
    cell: (property) => (
      <span
        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
          property.isActive ? "Actif" : "Inactif"
        }`}
      >
        {property.isActive ? "Actif" : "Inactif"}
      </span>
    ),
  },
];

export default function PropertyListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const filters = filtersFromParams(searchParams);
  const { data } = useAdminProperties(filters);

  function setFilter(key: string, value: string | undefined) {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value) {
        next.set(key, value);
      } else {
        next.delete(key);
      }
      next.set("page", "1");
      return next;
    });
  }

  function clearFilters() {
    setSearchParams({});
  }

  const hasActiveFilters =
    !!filters.search ||
    !!filters.transactionType ||
    !!filters.status ||
    !!filters.city ||
    !!filters.energyRating ||
    !!filters.priceMin ||
    !!filters.priceMax;

  return (
    <div className="px-6 py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Propriétés
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Gérez l'ensemble du catalogue
        </p>
      </div>

      <div className="rounded-sm bg-sidebar-accent shadow-sidebar-active p-4 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <IconSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <Input
            placeholder="Titre, référence..."
            className="pl-8 h-8 text-xs"
            defaultValue={filters.search ?? ""}
            onChange={(e) => {
              const value = e.target.value;
              const timer = setTimeout(
                () => setFilter("search", value || undefined),
                400,
              );
              return () => clearTimeout(timer);
            }}
          />
        </div>

        <Select
          value={filters.transactionType ?? "all"}
          onValueChange={(v) =>
            setFilter("transactionType", v === "all" ? undefined : v)
          }
        >
          <SelectTrigger className="h-8 text-xs w-36">
            <SelectValue placeholder="Transaction" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous types</SelectItem>
            <SelectItem value="sale">Vente</SelectItem>
            <SelectItem value="rent">Location</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.status ?? "all"}
          onValueChange={(v) =>
            setFilter("status", v === "all" ? undefined : v)
          }
        >
          <SelectTrigger className="h-8 text-xs w-32">
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous statuts</SelectItem>
            <SelectItem value="active">Actif</SelectItem>
            <SelectItem value="inactive">Inactif</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.energyRating ?? "all"}
          onValueChange={(v) =>
            setFilter("energyRating", v === "all" ? undefined : v)
          }
        >
          <SelectTrigger className="h-8 text-xs w-28">
            <SelectValue placeholder="DPE" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous DPE</SelectItem>
            {ENERGY_RATINGS.map((r) => (
              <SelectItem key={r} value={r}>
                DPE {r}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          placeholder="Ville"
          className="h-8 text-xs w-32"
          defaultValue={filters.city ?? ""}
          onChange={(e) => {
            const value = e.target.value;
            const timer = setTimeout(
              () => setFilter("city", value || undefined),
              400,
            );
            return () => clearTimeout(timer);
          }}
        />

        <Input
          type="number"
          placeholder="Prix min"
          className="h-8 text-xs w-28"
          defaultValue={filters.priceMin ?? ""}
          onChange={(e) => {
            const value = e.target.value;
            const timer = setTimeout(
              () => setFilter("priceMin", value || undefined),
              400,
            );
            return () => clearTimeout(timer);
          }}
        />

        <Input
          type="number"
          placeholder="Prix max"
          className="h-8 text-xs w-28"
          defaultValue={filters.priceMax ?? ""}
          onChange={(e) => {
            const value = e.target.value;
            const timer = setTimeout(
              () => setFilter("priceMax", value || undefined),
              400,
            );
            return () => clearTimeout(timer);
          }}
        />

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 text-xs text-muted-foreground"
            onClick={clearFilters}
          >
            <IconX className="size-3.5 mr-1" />
            Réinitialiser
          </Button>
        )}
      </div>

      <div className="rounded-sm shadow-sidebar-active bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40">
              {columns.map((col) => (
                <TableHead key={col.id}>{col.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.items.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="py-12 text-center text-muted-foreground text-sm"
                >
                  Aucune propriété trouvée
                </TableCell>
              </TableRow>
            ) : (
              data.items.map((property) => (
                <PropertyRow
                  key={property.id}
                  property={property}
                  onClick={() => navigate(`/properties/${property.id}`)}
                />
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Pagination
        page={data.page}
        pages={data.pages}
        total={data.total}
        onPageChange={(p) =>
          setSearchParams((prev) => {
            const next = new URLSearchParams(prev);
            next.set("page", String(p));
            return next;
          })
        }
      />
    </div>
  );
}
