import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const chipVariants = cva(
  "inline-flex items-center justify-center rounded-sm border px-3 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/80 border-transparent",
        outline:
          "border-border text-foreground hover:bg-accent hover:text-accent-foreground",
        blue: "border-series-blue/50 bg-series-blue/10 text-series-blue",
        green: "border-series-green/50 bg-series-green/10 text-series-green",
        orange:
          "border-series-orange/50 bg-series-orange/10 text-series-orange",
        brandOrange:
          "border-brand-orange/50 bg-brand-orange/10 text-brand-orange",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface ChipProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chipVariants> {}

export function Chip({ className, variant, ...props }: ChipProps) {
  return (
    <div className={cn(chipVariants({ variant }), className)} {...props} />
  );
}
