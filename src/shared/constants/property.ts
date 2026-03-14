export const STATUS_CLASSES = {
  ACTIVE: "active",
  INACTIVE: "inactive",
} as const;

export type StatusClassesType =
  (typeof STATUS_CLASSES)[keyof typeof STATUS_CLASSES];
