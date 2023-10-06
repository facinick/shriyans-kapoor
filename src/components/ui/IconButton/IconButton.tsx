import { IconButton as RadixIconButton } from "@radix-ui/themes";
import clsx from "clsx";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import styles from './IconButton.module.css';
const IconButton = forwardRef<
  ElementRef<typeof RadixIconButton>,
  ComponentPropsWithoutRef<typeof RadixIconButton>
>(({ className, ...props }, ref) => (

  <RadixIconButton
    className={clsx(styles.button, className)}
    ref={ref}
    {...props}
  />
))

IconButton.displayName = "IconButton"

export {
  IconButton
};
