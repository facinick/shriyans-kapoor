import { Link as TransitionLink } from 'next-view-transitions'
import { ComponentProps, ElementRef, forwardRef } from "react";
import { Button } from "../Button/Button";

type LinkProps = ComponentProps<typeof Button> &
  Pick<ComponentProps<typeof TransitionLink>, "href" | "target">;
  
const Link = forwardRef<ElementRef<typeof Button>, LinkProps>(
  ({ href, target, children, ...props }, ref) => (
    <Button variant={"link"} ref={ref} {...props} asChild>
      <TransitionLink href={href}>{children}</TransitionLink>
    </Button>
  )
);

Link.displayName = "Link";

export { Link };
