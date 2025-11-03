import { Children, cloneElement, isValidElement } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { Loader2 } from 'lucide-react'

import styles from './Button.module.css'
import type { ReactElement, ReactNode } from 'react'
import { cn } from '@/utils'

type ButtonVariant =
  | 'default'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'link'
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon'

type ChildWithClassName = {
  className?: string
  children?: ReactNode
}

function Button({
  className,
  variant = 'default',
  size = 'default',
  children,
  loading = false,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> & {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : 'button'

  const sharedProps = {
    ...props,
    'data-slot': 'button',
    className: cn(
      styles.root,
      styles[`variant-${variant}` as const],
      styles[`size-${size}` as const],
      className,
    ),
    disabled: loading || props.disabled,
  }

  // Custom logic for loading state & working with asChild
  const isDefault = variant === 'default' || variant === undefined
  const isDefaultLoading = isDefault && loading
  if (asChild) {
    const onlyChild = Children.only(children)
    if (isValidElement(onlyChild)) {
      const onlyChildElement = onlyChild as ReactElement<ChildWithClassName>

      const newChildren = cloneElement(onlyChildElement, {
        disabled: loading,
        className: [className, onlyChildElement.props.className]
          .filter(Boolean)
          .join(' '),
        ...props,
        children: (
          <>
            {isDefaultLoading && <Loader2 className={styles.spin} />}
            {onlyChildElement.props.children}
          </>
        ),
      })

      return (
        <Comp
          {...sharedProps}
          className={cn(
            sharedProps.className,
            sharedProps.disabled && styles.disabled,
          )}
        >
          {newChildren}
        </Comp>
      )
    }

    throw new Error(
      'Button with asChild must have a single valid React element child.',
    )
  }

  return (
    <Comp {...sharedProps}>
      {isDefaultLoading && <Loader2 className={styles.spin} />}
      {children}
    </Comp>
  )
}

export { Button }
