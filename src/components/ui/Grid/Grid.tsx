import { Grid as RadixGrid } from "@radix-ui/themes";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

const Grid = forwardRef<
  ElementRef<typeof RadixGrid>,
  ComponentPropsWithoutRef<typeof RadixGrid>
>(({ className, ...props }, ref) => (

  <RadixGrid
    className={className}
    ref={ref}
    {...props}
  />
))

Grid.displayName = "Grid"

export {
  Grid
};
