import { forwardRef, type TextareaHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  resize?: 'none' | 'vertical' | 'both'
  error?: boolean
  className?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      resize = 'vertical',
      error = false,
      className,
      ...props
    },
    ref
  ) => {
    const resizeStyles = {
      none: 'resize-none',
      vertical: 'resize-y',
      both: 'resize',
    }

    return (
      <textarea
        ref={ref}
        className={cn(
          'min-h-[80px] w-full',
          'bg-transparent',
          'border rounded-lg px-3 py-2',
          'text-sm text-[var(--color-white)]',
          'placeholder:text-[var(--color-grey-400)]',
          'transition-[border-color] duration-200 ease-out',
          'focus:outline-none focus-visible:outline-none',
          'focus-ring',
          error
            ? 'border-[var(--color-coral)]'
            : 'border-[var(--glass-border)] hover:border-[var(--glass-highlight)] focus:border-[var(--glass-highlight)]',
          resizeStyles[resize],
          className
        )}
        aria-invalid={error || undefined}
        {...props}
      />
    )
  }
)

Textarea.displayName = 'Textarea'
