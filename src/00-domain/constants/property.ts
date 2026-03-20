export const TRANSACTION_TYPES = {
  SALE: "sale",
  RENT: "rent",
} as const;

export type TransactionType =
  (typeof TRANSACTION_TYPES)[keyof typeof TRANSACTION_TYPES];

export const ENERGY_RATINGS = ["A", "B", "C", "D", "E", "F", "G"] as const;
export type EnergyRating = (typeof ENERGY_RATINGS)[number];
