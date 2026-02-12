import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  (
    {
      orientation = 'horizontal',
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation={orientation}
        className={cn(
          'bg-[var(--glass-border)]',
          orientation === 'horizontal' ? 'h-px w-full' : 'w-px h-full',
          className
        )}
        {...props}
      />
    )
  }
)

Separator.displayName = 'Separator'
