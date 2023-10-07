import NextLink from 'next/link';
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { Button } from "../Button/Button";

const Link = forwardRef<
  ElementRef<typeof NextLink>,
  ComponentPropsWithoutRef<typeof NextLink>
>(({ className, ...props }, ref) => (

  <Button variant={"link"} asChild>
    <NextLink
      className={className}
      ref={ref}
      {...props} />
  </Button>
))

Link.displayName = "Link"

export {
  Link
};
