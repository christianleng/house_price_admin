export const TRANSACTION_TYPES = {
  SALE: "sale",
  RENT: "rent",
} as const;

export type TransactionType =
  (typeof TRANSACTION_TYPES)[keyof typeof TRANSACTION_TYPES];
