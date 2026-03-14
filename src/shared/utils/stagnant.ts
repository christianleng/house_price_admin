import type { StagnantSeverity } from "@/00-domain/use-cases/properties/getStagnantSeverity";

export const STAGNANT_STYLES: Record<StagnantSeverity, string> = {
  urgent: "bg-alert-urgent-bg border-alert-urgent-border text-status-error",
  warning: "bg-muted border-border text-status-urgent",
};
