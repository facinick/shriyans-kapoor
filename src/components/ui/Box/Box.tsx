import { Slot } from "@radix-ui/react-slot";
import React from "react";

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return <Comp className={className} ref={ref} {...props} />;
  }
);
Box.displayName = "Box";

export { Box };
