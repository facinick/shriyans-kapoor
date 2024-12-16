import { cn } from '@/lib/helpers/utils';
import { Slot } from '@radix-ui/react-slot';
import { VariantProps, cva } from 'class-variance-authority';
import React from 'react';

export interface OlProps extends React.HTMLAttributes<HTMLUListElement> {
  asChild?: boolean;
}

const Ol = React.forwardRef<HTMLOListElement, OlProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'ol';
    return (
      <Comp
        className={cn(' ml-6 list-decimal [&>li]:mt-2', className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Ol.displayName = 'Ol';

export { Ol };
