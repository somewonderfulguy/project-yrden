import type { ComponentProps } from 'react'

import { cn } from '@/utils'

import styles from './Input.module.css'

/** https://ui.shadcn.com/docs/components/input */
export const Input = ({
  className,
  type,
  ...props
}: ComponentProps<'input'>) => (
  <input
    type={type}
    data-slot="input"
    className={cn(styles.root, className)}
    {...props}
  />
)
