import { ComponentProps, ElementRef, forwardRef } from 'react';
import { Button } from '../Button/Button';
import { Link as ViewTransitionLink } from 'next-view-transitions'

type LinkProps = ComponentProps<typeof Button> &
  Pick<ComponentProps<typeof ViewTransitionLink>, 'href' | 'target'>;

const Link = forwardRef<ElementRef<typeof Button>, LinkProps>(
  ({ href, target, children, ...props }, ref) => (
    <Button variant={'link'} ref={ref} {...props} asChild>
      <ViewTransitionLink scroll={true} prefetch={true} href={href}>{children}</ViewTransitionLink>
    </Button>
  )
);

Link.displayName = 'Link';

export { Link };
