import { Select as RadixSelect } from "@radix-ui/themes";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

const Trigger = forwardRef<
  ElementRef<typeof RadixSelect.Trigger>,
  ComponentPropsWithoutRef<typeof RadixSelect.Trigger>
>(({ className, ...props }, ref) => (

  <RadixSelect.Trigger
    className={className}
    ref={ref}
    {...props}
  />
))

Trigger.displayName = "Separator"

const Content = forwardRef<
  ElementRef<typeof RadixSelect.Content>,
  ComponentPropsWithoutRef<typeof RadixSelect.Content>
>(({ className, ...props }, ref) => (

  <RadixSelect.Content
    className={className}
    ref={ref}
    {...props}
  />
))

Content.displayName = "Separator"

const Item = forwardRef<
  ElementRef<typeof RadixSelect.Item>,
  ComponentPropsWithoutRef<typeof RadixSelect.Item>
>(({ className, ...props }, ref) => (

  <RadixSelect.Item
    className={className}
    ref={ref}
    {...props}
  />
))

Item.displayName = "Separator"

const Group = forwardRef<
  ElementRef<typeof RadixSelect.Group>,
  ComponentPropsWithoutRef<typeof RadixSelect.Group>
>(({ className, ...props }, ref) => (

  <RadixSelect.Group
    className={className}
    ref={ref}
    {...props}
  />
))

Group.displayName = "Separator"

const Root = forwardRef<
  ElementRef<typeof RadixSelect.Root>,
  ComponentPropsWithoutRef<typeof RadixSelect.Root>
>(({ ...props }, ref) => (

  <RadixSelect.Root
    {...props}
  />
))

Root.displayName = "Separator"

const Label = forwardRef<
  ElementRef<typeof RadixSelect.Label>,
  ComponentPropsWithoutRef<typeof RadixSelect.Label>
>(({ className, ...props }, ref) => (

  <RadixSelect.Label
    className={className}
    ref={ref}
    {...props}
  />
))

Label.displayName = "Separator"

export const Select = {
  Trigger,
  Content,
  Item,
  Group,
  Root,
  Label,
}