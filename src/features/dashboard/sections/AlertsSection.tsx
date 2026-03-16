import { Link } from "react-router";
import { useGlobalStats } from "@/02-infrastructure/react-query/adminHooks";
import {
  buildDashboardAlerts,
  type AlertSeverity,
} from "@/00-domain/use-cases/dashboard/buildDashboardAlerts";

const ALERT_STYLES: Record<AlertSeverity, { container: string; cta: string }> =
  {
    urgent: {
      container:
        "bg-alert-urgent-bg border-alert-urgent-border border-l-status-urgent",
      cta: "text-status-urgent",
    },
    warn: {
      container:
        "bg-alert-warn-bg border-alert-warn-border border-l-status-warning",
      cta: "text-status-warning-dark",
    },
    info: {
      container:
        "bg-alert-success-bg border-alert-success-border border-l-status-success",
      cta: "text-status-success-dark",
    },
  };

export function AlertsSection() {
  const { data: stats } = useGlobalStats();
  const alerts = buildDashboardAlerts(stats);

  if (alerts.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      {alerts.map(({ id, icon, message, severity, cta }) => {
        const { container, cta: ctaClass } = ALERT_STYLES[severity];
        return (
          <div
            key={id}
            data-testid="alert-item"
            className={`flex items-center gap-3 border border-l-[3px] rounded-r-sm px-4 py-2.5 ${container}`}
          >
            <span className="text-base shrink-0">{icon}</span>
            <span className="flex-1 text-xs text-foreground">{message}</span>
            {cta && (
              <Link
                data-testid="alert-cta"
                to={cta.href}
                className={`text-xs font-semibold shrink-0 underline underline-offset-2 ${ctaClass}`}
              >
                {cta.label} →
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}
