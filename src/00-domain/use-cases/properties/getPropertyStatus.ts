const STATUS_CLASSES = {
  active:
    "bg-alert-success-bg text-status-success border border-alert-success-border",
  inactive:
    "bg-alert-urgent-bg text-status-error border border-alert-urgent-border",
} as const;

export interface PropertyStatus {
  className: string;
  label: string;
}

export function getPropertyStatus(isActive: boolean): PropertyStatus {
  return {
    className: isActive ? STATUS_CLASSES.active : STATUS_CLASSES.inactive,
    label: isActive ? "Actif" : "Inactif",
  };
}
