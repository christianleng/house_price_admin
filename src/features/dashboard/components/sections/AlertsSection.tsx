import { useId } from "react";
import { Link } from "react-router";
import { useGlobalStats } from "@/02-infrastructure/react-query/adminHooks";
import { ALERT_VARIANTS, type AlertVariant } from "@/shared/constants/alerts";
import { pluralize } from "@/shared/utils/format";

const ALERT_STYLES: Record<AlertVariant, { container: string; cta: string }> = {
  [ALERT_VARIANTS.URGENT]: {
    container:
      "bg-alert-urgent-bg border-alert-urgent-border border-l-status-urgent",
    cta: "text-status-urgent",
  },
  [ALERT_VARIANTS.WARN]: {
    container:
      "bg-alert-warn-bg border-alert-warn-border border-l-status-warning",
    cta: "text-status-warning-dark",
  },
  [ALERT_VARIANTS.INFO]: {
    container:
      "bg-alert-success-bg border-alert-success-border border-l-status-success",
    cta: "text-status-success-dark",
  },
} as const;

interface AlertItem {
  id: string;
  icon: string;
  message: string;
  variant: AlertVariant;
  cta?: { label: string; href: string };
}

export function AlertsSection() {
  const { data: stats } = useGlobalStats();
  const uid = useId();

  const alerts: AlertItem[] = [
    stats.atRiskDpe > 0 && {
      id: `${uid}-dpe`,
      variant: ALERT_VARIANTS.URGENT,
      icon: "⚠️",
      message: `${pluralize(stats.atRiskDpe, "bien")} DPE F/G — interdit${stats.atRiskDpe > 1 ? "s" : ""} à la location depuis le 01/01/2025`,
      cta: {
        label: "Voir les biens",
        href: "/properties?transaction_type=rent&energy_rating=F",
      },
    },
    stats.availableSoon > 0 && {
      id: `${uid}-available`,
      variant: ALERT_VARIANTS.WARN,
      icon: "📋",
      message: `${pluralize(stats.availableSoon, "bien")} disponible${stats.availableSoon > 1 ? "s" : ""} sous 30j sans candidat locataire`,
      cta: { label: "Diffuser", href: "/properties?available_soon=true" },
    },
    {
      id: `${uid}-photos`,
      variant:
        stats.withoutPhotos > 0 ? ALERT_VARIANTS.WARN : ALERT_VARIANTS.INFO,
      icon: "📸",
      message:
        stats.withoutPhotos > 0
          ? `${pluralize(stats.withoutPhotos, "annonce")} sans photo — visibilité réduite`
          : "0 annonce sans photo — catalogue complet ✓",
      cta:
        stats.withoutPhotos > 0
          ? { label: "Compléter", href: "/properties?photos=0" }
          : undefined,
    },
  ].filter(Boolean) as AlertItem[];

  if (alerts.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      {alerts.map(({ id, icon, message, variant, cta }) => {
        const { container, cta: ctaClass } = ALERT_STYLES[variant];
        return (
          <div
            key={id}
            className={`flex items-center gap-3 border border-l-[3px] rounded-r-sm px-4 py-2.5 ${container}`}
          >
            <span className="text-base shrink-0">{icon}</span>
            <span className="flex-1 text-xs text-foreground">{message}</span>
            {cta && (
              <Link
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
