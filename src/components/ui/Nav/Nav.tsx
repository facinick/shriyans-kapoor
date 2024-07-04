import { Slot } from '@radix-ui/react-slot';
import React from 'react';

export type NavProps = React.HTMLAttributes<HTMLDivElement>;

const Nav = React.forwardRef<HTMLDivElement, NavProps>(
  ({ className, ...props }, ref) => {
    return <nav className={className} ref={ref} {...props} />;
  }
);
Nav.displayName = 'Nav';

export { Nav };
