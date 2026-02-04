import { type AnchorHTMLAttributes, type ReactNode, forwardRef } from 'react'
import { cn } from '../../utils/cn'

export interface NavLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'default' | 'underline' | 'pill'
  isActive?: boolean
  children: ReactNode
}

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ variant = 'default', isActive = false, children, className, style, ...props }, ref) => {
    const baseStyles = [
      'inline-flex items-center',
      'text-sm font-normal',
      'transition-[color,background-color,border-color,transform] duration-200 ease-out',
      'focus-ring',
      'hover:text-[--color-white]',
    ]

    const variants = {
      default: [],
      underline: ['relative', 'link-hover'],
      pill: [
        'px-3 py-1.5',
        'rounded-full',
        'border',
        isActive
          ? 'bg-[--color-white] border-[--color-white]'
          : 'bg-transparent border-transparent hover:bg-[--glass-bg] hover:border-[--glass-border]',
      ],
    }

    const getColor = () => {
      if (variant === 'pill' && isActive) return 'var(--color-bg)'
      return 'var(--color-white)'
    }

    return (
      <a
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        style={{ color: getColor(), ...style }}
        {...props}
      >
        {children}
      </a>
    )
  }
)

NavLink.displayName = 'NavLink'
