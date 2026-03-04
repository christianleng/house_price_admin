import * as React from "react";
import { RiCloseLine } from "@remixicon/react";
import { Chip } from "@/shared/ui/chip";
import { cn } from "../utils";

export interface FilterTagProps extends React.ComponentProps<typeof Chip> {
  label: string;
  subLabel?: string;
  onRemove?: () => void;
}

export function FilterTag({
  className,
  variant,
  label,
  subLabel,
  onRemove,
  ...props
}: FilterTagProps) {
  return (
    <Chip
      variant={variant}
      className={cn("gap-1.5 pl-2.5 pr-1 py-1 h-7", className)}
      {...props}
    >
      <div className="flex items-baseline gap-1.5">
        <span className="font-bold tracking-tight">{label}</span>
        {subLabel && (
          <span className="text-[10px] opacity-70 font-medium">
            · {subLabel}
          </span>
        )}
      </div>

      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-1 rounded-full p-0.5 opacity-70 hover:opacity-100 hover:bg-black/10 dark:hover:bg-white/10 transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <RiCloseLine className="size-3.5" />
          <span className="sr-only">Remove</span>
        </button>
      )}
    </Chip>
  );
}
