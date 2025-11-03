import styles from './Input.module.css'
import { cn } from '@/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(styles.root, className)}
      {...props}
    />
  )
}

export { Input }
