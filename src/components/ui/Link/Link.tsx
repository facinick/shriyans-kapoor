import { ComponentProps, ElementRef, forwardRef } from 'react';
import { Button } from '../Button/Button';
import NextLink from 'next/link';

type LinkProps = ComponentProps<typeof Button> &
  Pick<ComponentProps<typeof NextLink>, 'href' | 'target'>;

const Link = forwardRef<ElementRef<typeof Button>, LinkProps>(
  ({ href, target, children, ...props }, ref) => (
    <Button variant={'link'} ref={ref} {...props} asChild>
      <NextLink href={href}>{children}</NextLink>
    </Button>
  )
);

Link.displayName = 'Link';

export { Link };
