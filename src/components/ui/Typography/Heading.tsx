import { cn } from '@/lib/helpers/utils';
import { Slot } from '@radix-ui/react-slot';
import { VariantProps, cva } from 'class-variance-authority';
import React from 'react';

const headingVariants = cva('', {
  variants: {
    level: {
      1: 'scroll-m-20 text-4xl lg:text-5xl',
      2: 'scroll-m-20 text-3xl',
      3: 'scroll-m-20 text-2xl',
      4: 'scroll-m-20 text-xl',
      5: 'scroll-m-20 text-lg',
      6: 'scroll-m-20 text-base',
      7: 'scroll-m-20 text-sm',
      8: 'scroll-m-20 text-xs',
    },
  },
  defaultVariants: {
    level: 3,
  },
});

export interface HeadingProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof headingVariants> {
  asChild?: boolean;
}

const Heading = React.forwardRef<HTMLDivElement, HeadingProps>(
  ({ className, level, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'h3';
    return (
      <Comp
        className={cn(headingVariants({ level, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Heading.displayName = 'Heading';

export { Heading, headingVariants };
