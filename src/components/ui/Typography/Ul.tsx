import { cn } from '@/lib/helpers/utils';
import { Slot } from '@radix-ui/react-slot';
import { VariantProps, cva } from 'class-variance-authority';
import React from 'react';

export interface UlProps extends React.HTMLAttributes<HTMLUListElement> {
  asChild?: boolean;
}

const Ul = React.forwardRef<HTMLUListElement, UlProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'ul';
    return (
      <Comp
        className={cn(' ml-6 list-disc [&>li]:mt-2', className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Ul.displayName = 'Ul';

export { Ul };
