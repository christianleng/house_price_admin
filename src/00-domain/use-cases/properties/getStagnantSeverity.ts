export type StagnantSeverity = "warning" | "urgent";

export function getStagnantSeverity(days: number): StagnantSeverity {
  return days > 100 ? "urgent" : "warning";
}
