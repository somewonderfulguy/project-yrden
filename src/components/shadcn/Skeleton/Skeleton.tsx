import type { ComponentProps } from 'react'

import { cn } from '@/utils'

import styles from './Skeleton.module.css'

/** https://ui.shadcn.com/docs/components/skeleton */
export const Skeleton = ({ className, ...props }: ComponentProps<'div'>) => (
  <div data-slot="skeleton" className={cn(styles.root, className)} {...props} />
)
