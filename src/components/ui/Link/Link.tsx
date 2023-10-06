import { Link as RadixLink } from "@radix-ui/themes";
import NextLink from 'next/link';
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

const Link = forwardRef<
  ElementRef<typeof NextLink>,
  ComponentPropsWithoutRef<typeof NextLink>
>(({ className, ...props }, ref) => (

  <RadixLink asChild>
    <NextLink
      className={className}
      ref={ref}
      {...props} />
  </RadixLink>
))

Link.displayName = "Link"

export {
  Link
};
