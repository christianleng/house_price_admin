import type { PropertyStatusLevel } from "@/00-domain/use-cases/properties/getPropertyStatus";

export interface PropertyStatusStyle {
  className: string;
  label: string;
}

export const PROPERTY_STATUS_STYLES: Record<
  PropertyStatusLevel,
  PropertyStatusStyle
> = {
  active: {
    className:
      "bg-alert-success-bg text-status-success border border-alert-success-border",
    label: "Actif",
  },
  inactive: {
    className:
      "bg-alert-urgent-bg text-status-error border border-alert-urgent-border",
    label: "Inactif",
  },
};
