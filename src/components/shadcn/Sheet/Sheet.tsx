'use client'

import type { ComponentProps } from 'react'
import * as SheetPrimitive from '@radix-ui/react-dialog'

import { XIcon } from '@/assets'
import { cn } from '@/utils'

import styles from './Sheet.module.css'

/** https://ui.shadcn.com/docs/components/sheet */
const Sheet = (props: ComponentProps<typeof SheetPrimitive.Root>) => (
  <SheetPrimitive.Root data-slot="sheet" {...props} />
)

const SheetTrigger = (props: ComponentProps<typeof SheetPrimitive.Trigger>) => (
  <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
)

const SheetClose = (props: ComponentProps<typeof SheetPrimitive.Close>) => (
  <SheetPrimitive.Close data-slot="sheet-close" {...props} />
)

const SheetPortal = (props: ComponentProps<typeof SheetPrimitive.Portal>) => (
  <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
)

const SheetOverlay = ({
  className,
  ...props
}: ComponentProps<typeof SheetPrimitive.Overlay>) => (
  <SheetPrimitive.Overlay
    data-slot="sheet-overlay"
    className={cn(styles.overlay, className)}
    {...props}
  />
)

const SheetContent = ({
  className,
  children,
  side = 'right',
  ...props
}: ComponentProps<typeof SheetPrimitive.Content> & {
  side?: 'top' | 'right' | 'bottom' | 'left'
}) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      data-slot="sheet-content"
      className={cn(
        styles.content,
        side === 'right' && styles.contentRight,
        side === 'left' && styles.contentLeft,
        side === 'top' && styles.contentTop,
        side === 'bottom' && styles.contentBottom,
        className,
      )}
      {...props}
    >
      {children}
      <SheetPrimitive.Close className={styles.closeButton}>
        <XIcon className={styles.closeIcon} />
        <span className={styles.srOnly}>Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
)

const SheetHeader = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    data-slot="sheet-header"
    className={cn(styles.header, className)}
    {...props}
  />
)

const SheetFooter = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    data-slot="sheet-footer"
    className={cn(styles.footer, className)}
    {...props}
  />
)

const SheetTitle = ({
  className,
  ...props
}: ComponentProps<typeof SheetPrimitive.Title>) => (
  <SheetPrimitive.Title
    data-slot="sheet-title"
    className={cn(styles.title, className)}
    {...props}
  />
)

const SheetDescription = ({
  className,
  ...props
}: ComponentProps<typeof SheetPrimitive.Description>) => (
  <SheetPrimitive.Description
    data-slot="sheet-description"
    className={cn(styles.description, className)}
    {...props}
  />
)

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
