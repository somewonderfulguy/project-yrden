'use client'

import type { ComponentProps } from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'

import { cn } from '@/utils'

import styles from './Tooltip.module.css'

/** https://ui.shadcn.com/docs/components/tooltip */
const TooltipProvider = ({
  delayDuration = 0,
  ...props
}: ComponentProps<typeof TooltipPrimitive.Provider>) => (
  <TooltipPrimitive.Provider
    data-slot="tooltip-provider"
    delayDuration={delayDuration}
    {...props}
  />
)

const Tooltip = (props: ComponentProps<typeof TooltipPrimitive.Root>) => (
  <TooltipProvider>
    <TooltipPrimitive.Root data-slot="tooltip" {...props} />
  </TooltipProvider>
)

const TooltipTrigger = (
  props: ComponentProps<typeof TooltipPrimitive.Trigger>,
) => <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />

const TooltipContent = ({
  className,
  sideOffset = 0,
  children,
  ...props
}: ComponentProps<typeof TooltipPrimitive.Content>) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      data-slot="tooltip-content"
      sideOffset={sideOffset}
      className={cn(styles.content, className)}
      {...props}
    >
      {children}
      <TooltipPrimitive.Arrow className={styles.arrow} />
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
)

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
