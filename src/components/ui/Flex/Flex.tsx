import { Flex as RadixFlex } from "@radix-ui/themes";
import clsx from 'clsx';
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import styles from './Flex.module.css';

const Flex = forwardRef<
  ElementRef<typeof RadixFlex>,
  Pick<ComponentPropsWithoutRef<typeof RadixFlex>, 'justify' | 'align' | 'className' | 'children' | 'gap'>
>(({ className, ...props }, ref) => (

  <RadixFlex
    className={clsx(styles.flex, className)}
    ref={ref}
    {...props}
  />
))

Flex.displayName = "Flex"

export {
  Flex
};
