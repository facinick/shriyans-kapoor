import { DropdownMenu as RadixDropdownMenu } from "@radix-ui/themes";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

const Trigger = forwardRef<
  ElementRef<typeof RadixDropdownMenu.Trigger>,
  ComponentPropsWithoutRef<typeof RadixDropdownMenu.Trigger>
>(({ className, ...props }, ref) => (

  <RadixDropdownMenu.Trigger
    className={className}
    ref={ref}
    {...props}
  />
))

Trigger.displayName = "Trigger"

const Content = forwardRef<
  ElementRef<typeof RadixDropdownMenu.Content>,
  ComponentPropsWithoutRef<typeof RadixDropdownMenu.Content>
>(({ className, ...props }, ref) => (

  <RadixDropdownMenu.Content
    className={className}
    ref={ref}
    {...props}
  />
))

Content.displayName = "Content"

const Item = forwardRef<
  ElementRef<typeof RadixDropdownMenu.Item>,
  ComponentPropsWithoutRef<typeof RadixDropdownMenu.Item>
>(({ className, ...props }, ref) => (

  <RadixDropdownMenu.Item
    className={className}
    ref={ref}
    {...props}
  />
))

Item.displayName = "Item"

const Root = forwardRef<
  ElementRef<typeof RadixDropdownMenu.Root>,
  ComponentPropsWithoutRef<typeof RadixDropdownMenu.Root>
>(({ ...props }, ref) => (

  <RadixDropdownMenu.Root
    {...props}
  />
))

Root.displayName = "Root"

const Sub = forwardRef<
  ElementRef<typeof RadixDropdownMenu.Sub>,
  ComponentPropsWithoutRef<typeof RadixDropdownMenu.Sub>
>(({ ...props }, ref) => (

  <RadixDropdownMenu.Sub
    {...props}
  />
))

Sub.displayName = "Sub"

const Separator = forwardRef<
  ElementRef<typeof RadixDropdownMenu.Separator>,
  ComponentPropsWithoutRef<typeof RadixDropdownMenu.Separator>
>(({ className, ...props }, ref) => (

  <RadixDropdownMenu.Separator
    className={className}
    ref={ref}
    {...props}
  />
))

Separator.displayName = "Separator"

export const DropdownMenu = {
  Trigger,
  Content,
  Item,
  Root,
  Sub,
  Separator,
}