'use client'

import type { ComponentProps } from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'

import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import { cn } from '@/utils'

import styles from './Select.module.css'

const Select = (props: ComponentProps<typeof SelectPrimitive.Root>) => (
  <SelectPrimitive.Root data-slot="select" {...props} />
)

const SelectGroup = (props: ComponentProps<typeof SelectPrimitive.Group>) => (
  <SelectPrimitive.Group data-slot="select-group" {...props} />
)

const SelectValue = (props: ComponentProps<typeof SelectPrimitive.Value>) => (
  <SelectPrimitive.Value data-slot="select-value" {...props} />
)

const SelectTrigger = ({
  className,
  size = 'default',
  children,
  ...props
}: ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: 'sm' | 'default'
}) => (
  <SelectPrimitive.Trigger
    data-slot="select-trigger"
    data-size={size}
    className={cn(styles.trigger, className)}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDownIcon className={styles.icon} />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
)

const SelectContent = ({
  className,
  children,
  position = 'popper',
  ...props
}: ComponentProps<typeof SelectPrimitive.Content>) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      data-slot="select-content"
      className={cn(
        styles.content,
        position === 'popper' && styles.contentPopper,
        className,
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          styles.viewport,
          position === 'popper' && styles.viewportPopper,
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
)

const SelectLabel = ({
  className,
  ...props
}: ComponentProps<typeof SelectPrimitive.Label>) => (
  <SelectPrimitive.Label
    data-slot="select-label"
    className={cn(styles.label, className)}
    {...props}
  />
)

const SelectItem = ({
  className,
  children,
  ...props
}: ComponentProps<typeof SelectPrimitive.Item>) => (
  <SelectPrimitive.Item
    data-slot="select-item"
    className={cn(styles.item, className)}
    {...props}
  >
    <span className={styles.itemIndicator}>
      <SelectPrimitive.ItemIndicator>
        <CheckIcon />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
)

const SelectSeparator = ({
  className,
  ...props
}: ComponentProps<typeof SelectPrimitive.Separator>) => (
  <SelectPrimitive.Separator
    data-slot="select-separator"
    className={cn(styles.separator, className)}
    {...props}
  />
)

const SelectScrollUpButton = ({
  className,
  ...props
}: ComponentProps<typeof SelectPrimitive.ScrollUpButton>) => (
  <SelectPrimitive.ScrollUpButton
    data-slot="select-scroll-up-button"
    className={cn(styles.scrollButton, className)}
    {...props}
  >
    <ChevronUpIcon />
  </SelectPrimitive.ScrollUpButton>
)

const SelectScrollDownButton = ({
  className,
  ...props
}: ComponentProps<typeof SelectPrimitive.ScrollDownButton>) => (
  <SelectPrimitive.ScrollDownButton
    data-slot="select-scroll-down-button"
    className={cn(styles.scrollButton, className)}
    {...props}
  >
    <ChevronDownIcon />
  </SelectPrimitive.ScrollDownButton>
)

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
