export type PropertyStatusLevel = "active" | "inactive";

export function getPropertyStatus(isActive: boolean): PropertyStatusLevel {
  return isActive ? "active" : "inactive";
}
