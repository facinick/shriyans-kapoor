import { cn } from "@/lib/helpers/utils";
import { Slot } from "@radix-ui/react-slot";
import { VariantProps, cva } from "class-variance-authority";
import React from "react";

const headingVariants = cva("", {
  variants: {
    level: {
      1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      2: "scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0",
      3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      4: "scroll-m-20 text-xl font-semibold tracking-tight",
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
    const Comp = asChild ? Slot : "h3";
    return (
      <Comp
        className={cn(headingVariants({ level, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Heading.displayName = "Heading";

export { Heading, headingVariants };
