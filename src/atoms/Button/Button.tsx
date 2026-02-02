import {
  forwardRef,
  type ButtonHTMLAttributes,
  type ReactNode,
  cloneElement,
  isValidElement,
} from 'react'
import { cn } from '../../utils/cn'

export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'glass'
  /** Size of the button. Can be a single value or responsive object */
  size?: ButtonSize | { base?: ButtonSize; md?: ButtonSize; lg?: ButtonSize }
  children: ReactNode
  isLoading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  asChild?: boolean
  /** Ensures minimum 44px touch target for accessibility (WCAG 2.5.5) */
  touchTarget?: boolean
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
      touchTarget = false,
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
      // Active state for touch feedback
      'active:scale-[0.96]',
    ]

    const variants = {
      primary: [
        'bg-[var(--color-white)] text-[var(--color-bg)]',
        'border-[var(--color-white)]',
        'hover:scale-[1.02]',
        'glow-white',
      ],
      secondary: [
        'bg-transparent text-[var(--color-white)]',
        'border-[var(--glass-border)]',
        'hover:border-[var(--glass-highlight)] hover:bg-[var(--glass-bg)]',
      ],
      ghost: [
        'bg-transparent text-[var(--color-grey-400)]',
        'border-transparent',
        'hover:text-[var(--color-white)] hover:bg-[var(--glass-bg)]',
      ],
      glass: [
        'bg-[var(--glass-bg)] text-[var(--color-white)]',
        'border-[var(--glass-border)]',
        'backdrop-blur-lg',
        'hover:bg-[rgba(255,255,255,0.1)] hover:border-[var(--glass-highlight)]',
        'hover:scale-[1.02]',
      ],
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
    }

    // Handle responsive size prop
    const getSizeClasses = () => {
      if (typeof size === 'string') {
        return sizes[size]
      }

      // Responsive size object
      const classes: string[] = []
      if (size.base) classes.push(sizes[size.base])
      if (size.md) classes.push(`md:${sizes[size.md].split(' ').join(' md:')}`)
      if (size.lg) classes.push(`lg:${sizes[size.lg].split(' ').join(' lg:')}`)

      // If no base specified, default to sm for mobile-first
      if (!size.base && (size.md || size.lg)) {
        classes.unshift(sizes.sm)
      }

      return classes.join(' ')
    }

    const touchTargetStyles = touchTarget ? 'min-w-[44px] min-h-[44px]' : ''

    const buttonClassName = cn(
      baseStyles,
      variants[variant],
      getSizeClasses(),
      touchTargetStyles,
      className
    )

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
