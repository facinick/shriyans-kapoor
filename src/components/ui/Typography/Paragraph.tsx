import { cn } from '@/lib/helpers/utils';
import { Slot } from '@radix-ui/react-slot';
import { VariantProps, cva } from 'class-variance-authority';
import React from 'react';

const paragraphVariants = cva('', {
  variants: {
    variant: {
      medium: 'text-base font-medium',
      large: 'text-lg font-semibold',
      small: 'text-sm font-medium',
      muted: 'text-sm text-muted-foreground',
      lead: 'text-xl text-muted-foreground',
    },
  },
  defaultVariants: {
    variant: 'medium',
  },
});

export interface ParagraphProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof paragraphVariants> {
  asChild?: boolean;
}

const Paragraph = React.forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'p';
    return (
      <Comp
        className={cn(paragraphVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Paragraph.displayName = 'Paragraph';

export { Paragraph, paragraphVariants };
