import {
  type ComponentProps,
  type ReactElement,
  type ReactNode,
  Children,
  cloneElement,
  isValidElement,
} from 'react'
import { Slot } from '@radix-ui/react-slot'

import { LoaderCircleIcon } from '@/assets'
import { cn } from '@/utils'

import styles from './Button.module.css'

type ButtonVariant =
  | 'default'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'link'
type ButtonSize = 'md' | 'sm' | 'lg' | 'icon'

type ChildWithClassName = {
  className?: string
  children?: ReactNode
}

/** https://ui.shadcn.com/docs/components/button */
export const Button = ({
  className,
  variant = 'default',
  size = 'md',
  children,
  loading = false,
  asChild = false,
  ...props
}: ComponentProps<'button'> & {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  asChild?: boolean
}) => {
  const Comp = asChild ? Slot : 'button'

  const sharedProps = {
    ...props,
    'data-slot': 'button',
    className: cn(styles.root, styles[variant], styles[size], className),
    disabled: loading || props.disabled,
  }

  const isDefault = variant === 'default'
  const isDefaultLoading = isDefault && loading
  if (asChild) {
    const onlyChild = Children.only(children)
    if (isValidElement(onlyChild)) {
      const onlyChildElement = onlyChild as ReactElement<ChildWithClassName>

      const newChildren = cloneElement(onlyChildElement, {
        disabled: loading || props.disabled,
        className: [className, onlyChildElement.props.className]
          .filter(Boolean)
          .join(' '),
        ...props,
        children: (
          <>
            {isDefaultLoading && <LoaderCircleIcon className={styles.spin} />}
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
    <Comp
      {...sharedProps}
      className={cn(
        sharedProps.className,
        sharedProps.disabled && styles.disabled,
      )}
    >
      {isDefaultLoading && <LoaderCircleIcon className={styles.spin} />}
      {children}
    </Comp>
  )
}
