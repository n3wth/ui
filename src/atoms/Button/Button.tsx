import {
  forwardRef,
  type ButtonHTMLAttributes,
  type ReactNode,
  cloneElement,
  isValidElement,
} from 'react'
import { cn } from '../../utils/cn'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'glass'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  isLoading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  asChild?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      children,
      isLoading = false,
      leftIcon,
      rightIcon,
      className,
      disabled,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const baseStyles = [
      'inline-flex items-center justify-center gap-2',
      'font-medium',
      'border',
      'rounded-full',
      'transition-[transform,background-color,border-color,color,opacity] duration-200 ease-out',
      'focus-ring',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
    ]

    const variants = {
      primary: [
        'bg-[var(--color-white)] text-[var(--color-bg)]',
        'border-[var(--color-white)]',
        'hover:scale-[1.02] active:scale-[0.96]',
        'glow-white',
      ],
      secondary: [
        'bg-transparent text-[var(--color-white)]',
        'border-[var(--glass-border)]',
        'hover:border-[var(--glass-highlight)] hover:bg-[var(--glass-bg)]',
        'active:scale-[0.96]',
      ],
      ghost: [
        'bg-transparent text-[var(--color-grey-400)]',
        'border-transparent',
        'hover:text-[var(--color-white)] hover:bg-[var(--glass-bg)]',
        'active:scale-[0.96]',
      ],
      glass: [
        'bg-[var(--glass-bg)] text-[var(--color-white)]',
        'border-[var(--glass-border)]',
        'backdrop-blur-lg',
        'hover:bg-[rgba(255,255,255,0.1)] hover:border-[var(--glass-highlight)]',
        'hover:scale-[1.02] active:scale-[0.96]',
      ],
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
    }

    const buttonClassName = cn(baseStyles, variants[variant], sizes[size], className)

    type ChildProps = { children?: ReactNode; className?: string }
    const childElement = isValidElement<ChildProps>(children) ? children : null

    const content = (
      <>
        {isLoading ? (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          leftIcon
        )}
        {asChild && childElement ? childElement.props.children : children}
        {!isLoading && rightIcon}
      </>
    )

    if (asChild && childElement) {
      return cloneElement(childElement, {
        className: cn(buttonClassName, childElement.props.className),
        ref,
        children: content,
      } as ChildProps)
    }

    return (
      <button
        ref={ref}
        className={buttonClassName}
        disabled={disabled || isLoading}
        {...props}
      >
        {content}
      </button>
    )
  }
)

Button.displayName = 'Button'
