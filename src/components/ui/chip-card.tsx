import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const chipCardVariants = cva(
  "flex flex-col items-center justify-center rounded-2xl border px-6 py-3 text-sm transition-all hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      selected: {
        true: "border-primary bg-primary/10 text-primary",
        false:
          "border-border bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      selected: false,
    },
  },
);

export interface ChipCardProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof chipCardVariants> {}

export const ChipCard = React.forwardRef<HTMLButtonElement, ChipCardProps>(
  ({ className, selected, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(chipCardVariants({ selected, className }))}
        {...props}
      />
    );
  },
);
ChipCard.displayName = "ChipCard";
