import { Box as RadixBox } from "@radix-ui/themes";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

const Box = forwardRef<
  ElementRef<typeof RadixBox>,
  ComponentPropsWithoutRef<typeof RadixBox>
>(({ className, ...props }, ref) => (

  <RadixBox
    className={className}
    ref={ref}
    {...props}
  />
))

Box.displayName = "Box"

export {
  Box
};
