import {
  TRANSACTION_TYPES,
  type TransactionType,
} from "@/00-domain/constants/property/property";

export function getTransactionTypeLabel(type: TransactionType): string {
  return type === TRANSACTION_TYPES.SALE ? "Vente" : "Location";
}
