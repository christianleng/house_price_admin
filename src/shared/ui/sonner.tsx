import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";
import {
  IconCircleCheck,
  IconInfoCircle,
  IconAlertTriangle,
  IconCircleX,
  IconLoader2,
} from "@tabler/icons-react";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <IconCircleCheck className="size-4" />,
        info: <IconInfoCircle className="size-4" />,
        warning: <IconAlertTriangle className="size-4" />,
        error: <IconCircleX className="size-4" />,
        loading: <IconLoader2 className="size-4 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "bg-popover text-popover-foreground border border-border rounded-lg shadow-md text-sm font-medium",
          title: "text-popover-foreground font-semibold text-sm",
          description: "text-muted-foreground text-xs mt-0.5",
          success:
            "bg-alert-success-bg border-alert-success-border text-status-success",
          error:
            "bg-alert-urgent-bg border-alert-urgent-border text-status-error",
          warning:
            "bg-alert-warn-bg border-alert-warn-border text-status-warning",
          info: "bg-popover border-border text-popover-foreground",
          icon: "text-current",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
