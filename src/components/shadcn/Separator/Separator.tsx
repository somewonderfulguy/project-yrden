'use client'

import type { ComponentProps } from 'react'

import { cn } from '@/utils'

import styles from './Separator.module.css'

type Orientation = 'horizontal' | 'vertical'

interface SeparatorProps extends ComponentProps<'div'> {
  orientation?: Orientation
  decorative?: boolean
}

// React.forwardRef<HTMLDivElement, SeparatorProps>
/**
 * https://ui.shadcn.com/docs/components/separator <br />
 * https://www.radix-ui.com/primitives/docs/components/separator
 */
export const Separator = ({
  className,
  orientation = 'horizontal',
  decorative = true,
  ...props
}: SeparatorProps) => {
  const ariaOrientation = orientation === 'vertical' ? 'vertical' : undefined
  const semanticProps = decorative
    ? { role: 'none' as const }
    : ({ role: 'separator', 'aria-orientation': ariaOrientation } as const)

  return (
    <div
      data-slot="separator-root"
      data-orientation={orientation}
      className={cn(styles.root, className)}
      {...semanticProps}
      {...props}
    />
  )
}
