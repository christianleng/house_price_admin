export function getSaleDelayColor(days: number): string {
  if (days <= 30) return "text-status-success";
  if (days <= 60) return "text-status-warning";
  return "text-status-error";
}
