import { cn } from "@/lib/utils"
import { VariantProps, cva } from "class-variance-authority"
import React from "react"

const paragraphVariants = cva(
  "",
  {
    variants: {
      variant: {
        medium: "leading-7 [&:not(:first-child)]:mt-6",
        large: "text-lg font-semibold",
        small: "text-sm font-medium leading-none",
        muted: "text-sm text-muted-foreground",
        lead: "text-xl text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "medium",
    },
  }
)

export interface ParagraphProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof paragraphVariants> {
  asChild?: boolean
}


const Paragraph = React.forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    return (
      <p
        className={cn(paragraphVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Paragraph.displayName = "Paragraph"

export {
  Paragraph,
  paragraphVariants
}

