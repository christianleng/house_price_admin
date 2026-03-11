export const TRANSACTION_TYPES = {
  SALE: "sale",
  RENT: "rent",
} as const;

export type TransactionType =
  (typeof TRANSACTION_TYPES)[keyof typeof TRANSACTION_TYPES];

export const STATUS_CLASSES = {
  ACTIVE: "active",
  INACTIVE: "inactive",
} as const;

export type StatusClassesType =
  (typeof STATUS_CLASSES)[keyof typeof STATUS_CLASSES];
