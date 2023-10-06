import { Container as RadixContainer } from "@radix-ui/themes";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

const Container = forwardRef<
  ElementRef<typeof RadixContainer>,
  ComponentPropsWithoutRef<typeof RadixContainer>
>(({ className, ...props }, ref) => (

  <RadixContainer
    className={className}
    ref={ref}
    {...props}
  />
))

Container.displayName = "Container"

export {
  Container
};
