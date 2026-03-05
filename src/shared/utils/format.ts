export function formatPrice(price: number | null | undefined): string {
  if (!price) return "—";
  if (price >= 1_000_000) return `${(price / 1_000_000).toFixed(1)}M €`;
  if (price >= 1_000) return `${(price / 1_000).toFixed(0)}k €`;
  return `${price} €`;
}

export function formatPercent(value: number | null | undefined): string {
  if (value == null) return "—";
  return `${value > 0 ? "+" : ""}${value}%`;
}
