import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/src/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline: "text-foreground",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        verified:
          "border-transparent bg-blue-500 text-white hover:bg-blue-600",
        info:
          "border-transparent bg-brand-info text-white hover:bg-brand-info/80",
        warning:
          "border-transparent bg-brand-warning text-black hover:bg-brand-warning/80",
        success:
          "border-transparent bg-brand-success text-white hover:bg-brand-success/80",
        infoLight:
          "border-transparent bg-blue-100 text-blue-700 hover:bg-blue-200",
        warningLight:
          "border-transparent bg-amber-100 text-amber-700 hover:bg-amber-200",
        successLight:
          "border-transparent bg-emerald-100 text-emerald-700 hover:bg-emerald-200",
      },
      shape: {
        default: "rounded-full",
        square: "rounded-md",
        pill: "rounded-full px-3",
        circle: "rounded-full w-5 h-5 p-0 flex items-center justify-center aspect-square",
      }
    },
    defaultVariants: {
      variant: "default",
      shape: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge: React.FC<BadgeProps> = ({ className, variant, shape, ...props }) => {
  return (
    <div className={cn(badgeVariants({ variant, shape }), className)} {...props} />
  );
};

export { Badge, badgeVariants };
