import { Section as RadixSection } from "@radix-ui/themes";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

const Section = forwardRef<
  ElementRef<typeof RadixSection>,
  ComponentPropsWithoutRef<typeof RadixSection>
>(({ className, ...props }, ref) => (

  <RadixSection
    className={className}
    ref={ref}
    {...props}
  />
))

Section.displayName = "Section"

export {
  Section
};
