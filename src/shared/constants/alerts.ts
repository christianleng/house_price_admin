export const ALERT_VARIANTS = {
  URGENT: "urgent",
  WARN: "warn",
  INFO: "info",
} as const;

export type AlertVariant = (typeof ALERT_VARIANTS)[keyof typeof ALERT_VARIANTS];
