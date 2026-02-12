import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'success' | 'warning' | 'error'
  label?: string
  showValue?: boolean
  className?: string
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value,
      max = 100,
      size = 'md',
      variant = 'default',
      label,
      showValue = false,
      className,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

    const sizes = {
      sm: 'h-1.5',
      md: 'h-2',
      lg: 'h-3',
    }

    const fillVariants = {
      default: 'bg-[var(--color-white)]',
      success: 'bg-[var(--color-sage)]',
      warning: 'bg-[var(--color-gold)]',
      error: 'bg-[var(--color-coral)]',
    }

    return (
      <div ref={ref} className={cn('flex flex-col gap-1', className)} {...props}>
        {showValue && (
          <span className="text-xs text-[var(--color-grey-400)] tabular-nums">
            {Math.round(percentage)}%
          </span>
        )}
        <div
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={label}
          className={cn(
            'w-full overflow-hidden rounded-full',
            'bg-[var(--glass-bg)] border border-[var(--glass-border)]',
            sizes[size]
          )}
        >
          <div
            className={cn(
              'h-full rounded-full',
              'transition-[width] duration-300 ease-out',
              fillVariants[variant]
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    )
  }
)

Progress.displayName = 'Progress'
