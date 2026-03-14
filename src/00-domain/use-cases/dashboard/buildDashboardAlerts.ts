import type { PropertyGlobalStats } from "@/00-domain/entities";

export type AlertSeverity = "urgent" | "warn" | "info";

export interface DashboardAlert {
  id: string;
  severity: AlertSeverity;
  icon: string;
  message: string;
  cta?: { label: string; href: string };
}

function pluralize(count: number, word: string): string {
  return `${count} ${word}${count > 1 ? "s" : ""}`;
}

export function buildDashboardAlerts(
  stats: PropertyGlobalStats,
): DashboardAlert[] {
  const alerts: DashboardAlert[] = [];

  if (stats.atRiskDpe > 0) {
    alerts.push({
      id: "dpe",
      severity: "urgent",
      icon: "⚠️",
      message: `${pluralize(stats.atRiskDpe, "bien")} DPE F/G — interdit${
        stats.atRiskDpe > 1 ? "s" : ""
      } à la location depuis le 01/01/2025`,
      cta: {
        label: "Voir les biens",
        href: "/properties?transaction_type=rent&energy_rating=F",
      },
    });
  }

  if (stats.availableSoon > 0) {
    alerts.push({
      id: "available",
      severity: "warn",
      icon: "📋",
      message: `${pluralize(stats.availableSoon, "bien")} disponible${
        stats.availableSoon > 1 ? "s" : ""
      } sous 30j sans candidat locataire`,
      cta: {
        label: "Diffuser",
        href: "/properties?available_soon=true",
      },
    });
  }

  alerts.push({
    id: "photos",
    severity: stats.withoutPhotos > 0 ? "warn" : "info",
    icon: "📸",
    message:
      stats.withoutPhotos > 0
        ? `${pluralize(stats.withoutPhotos, "annonce")} sans photo — visibilité réduite`
        : "0 annonce sans photo — catalogue complet ✓",
    cta:
      stats.withoutPhotos > 0
        ? { label: "Compléter", href: "/properties?photos=0" }
        : undefined,
  });

  return alerts;
}
