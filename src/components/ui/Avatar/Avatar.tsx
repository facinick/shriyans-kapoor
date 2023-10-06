import { Avatar as RadixAvatar } from "@radix-ui/themes";
import clsx from "clsx";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import styles from './Avatar.module.css';

const Avatar = forwardRef<
  ElementRef<typeof RadixAvatar>,
  ComponentPropsWithoutRef<typeof RadixAvatar>
>(({ className, ...props }, ref) => (
  
  <RadixAvatar
    className={clsx(styles.avatar, className)}
    ref={ref}
    {...props}
  />
))

Avatar.displayName = "Avatar"

export {
  Avatar
};
