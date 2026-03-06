import { Link } from "react-router";
import {
  IconArrowUpRight,
  IconArrowDownRight,
  IconMinus,
  IconExternalLink,
} from "@tabler/icons-react";
import { Skeleton } from "@/shared/ui/skeleton";
import { formatPercent } from "@/shared/utils/format";

function TrendIcon({ value }: { value: number | null }) {
  if (value == null) return <IconMinus className="size-3" />;
  if (value > 0)
    return <IconArrowUpRight className="size-3 text-status-success" />;
  return <IconArrowDownRight className="size-3 text-status-error" />;
}

export interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: number | null;
  icon: React.ElementType;
  loading: boolean;
  href?: string;
  colorClass?: string;
}

export function KpiCard({
  title,
  value,
  subtitle,
  trend,
  icon: Icon,
  loading,
  href,
  colorClass = "text-foreground",
}: KpiCardProps) {
  const card = (
    <div className="kpi-card-grid rounded-sm shadow-sidebar-active bg-card px-5 pt-5 pb-4">
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-bold uppercase">{title}</p>
        <div className="rounded-sm p-2 shrink-0 bg-muted">
          <Icon className="size-4 text-muted-foreground" />
        </div>
      </div>

      <div className="py-1">
        {loading ? (
          <Skeleton className="h-9 w-20" />
        ) : (
          <p className={`text-3xl font-bold ${colorClass}`}>{value}</p>
        )}
      </div>

      <div className="space-y-1.5">
        {subtitle && !loading && (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        )}
        {trend != null && !loading && (
          <div className="flex items-center gap-1 text-xs">
            <TrendIcon value={trend} />
            <span
              className={
                trend > 0 ? "text-status-success" : "text-status-error"
              }
            >
              {formatPercent(trend)}
            </span>
            <span className="text-muted-foreground">vs mois précédent</span>
          </div>
        )}
        {href && (
          <div className="flex items-center gap-1 text-xs text-primary hover:underline">
            <IconExternalLink className="size-3" />
            <span>Voir la liste</span>
          </div>
        )}
      </div>
    </div>
  );

  if (href)
    return (
      <Link to={href} className="kpi-card-grid">
        {card}
      </Link>
    );
  return card;
}

export function KpiSkeleton() {
  return (
    <div className="kpi-card-grid rounded-sm border bg-card px-5 pt-5 pb-4">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-8 w-16" />
      <Skeleton className="h-3 w-32" />
    </div>
  );
}
