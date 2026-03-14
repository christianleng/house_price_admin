export type SaleDelayLevel = "good" | "warning" | "critical";

export function getSaleDelayLevel(days: number): SaleDelayLevel {
  if (days <= 30) return "good";
  if (days <= 60) return "warning";
  return "critical";
}
