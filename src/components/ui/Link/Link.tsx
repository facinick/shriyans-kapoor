import { USE_VIEW_TRANSITIONS } from '@/lib/constants';
import { Link as ViewTransitionLink } from 'next-view-transitions';
import NextLink from 'next/link';
import { ComponentProps, ElementRef, forwardRef } from 'react';
import { Button } from '../Button/Button';

type LinkProps = ComponentProps<typeof Button> &
  Pick<ComponentProps<typeof NextLink>, 'href' | 'target'>;

export const DEFAULT_LINK_SETTINGS = {
  scroll: true,
  prefetch: true,
  replace: false,
}

const Link = forwardRef<ElementRef<typeof Button>, LinkProps>(
  ({ href, target, children, ...props }, ref) => (
    <Button variant={'link'} ref={ref} {...props} asChild>
      {USE_VIEW_TRANSITIONS ? (
        <ViewTransitionLink {...DEFAULT_LINK_SETTINGS} href={href}>{children}</ViewTransitionLink>
      ) : (
        <NextLink {...DEFAULT_LINK_SETTINGS} href={href}>{children}</NextLink>
      )}
    </Button>
  )
);

Link.displayName = 'Link';

export { Link };
