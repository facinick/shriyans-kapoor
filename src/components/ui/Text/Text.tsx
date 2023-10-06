import { Text as RadixText } from "@radix-ui/themes";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

const Text = forwardRef<
  ElementRef<typeof RadixText>,
  ComponentPropsWithoutRef<typeof RadixText>
>(({ className, ...props }, ref) => (

  <RadixText
    className={className}
    ref={ref}
    {...props}
  />
))

Text.displayName = "Text"

export {
  Text
};
