import * as React from "react";
import { cn } from "@/src/lib/utils";

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, orientation = "horizontal", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex w-max items-stretch",
          orientation === "horizontal" 
            ? "flex-row [&>*]:rounded-none first:[&>*]:rounded-l-md last:[&>*]:rounded-r-md [&>*+*]:-ml-px" 
            : "flex-col [&>*]:rounded-none first:[&>*]:rounded-t-md last:[&>*]:rounded-b-md [&>*+*]:-mt-px",
          "[&>*]:relative [&>*]:z-0 hover:[&>*]:z-10 focus-within:[&>*]:z-20",
          className
        )}
        {...props}
      />
    );
  }
);
ButtonGroup.displayName = "ButtonGroup";

export { ButtonGroup };
