import type { QualityScoreLevel } from "@/00-domain/use-cases/stats/getQualityScoreLevel";

interface QualityScoreStyle {
  bar: string;
  text: string;
}

export const QUALITY_SCORE_STYLES: Record<
  QualityScoreLevel,
  QualityScoreStyle
> = {
  good: {
    bar: "bg-status-success",
    text: "text-status-success",
  },
  warning: {
    bar: "bg-status-warning",
    text: "text-status-warning",
  },
  poor: {
    bar: "bg-status-error",
    text: "text-status-error",
  },
};

export const QUALITY_SCORE_GLOBAL_STYLES: Record<QualityScoreLevel, string> = {
  good: "text-status-success bg-alert-success-bg border-alert-success-border",
  warning: "text-status-warning bg-alert-warn-bg border-alert-warn-border",
  poor: "text-status-error bg-alert-urgent-bg border-alert-urgent-border",
};
