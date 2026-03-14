import type { SaleDelayLevel } from "@/00-domain/use-cases/stats/categorizeSaleDelay";

export const SALE_DELAY_CLASSES: Record<SaleDelayLevel, string> = {
  good: "text-status-success",
  warning: "text-status-warning",
  critical: "text-status-error",
};
