import { type AnchorHTMLAttributes, type ReactNode, forwardRef } from 'react'
import { cn } from '../../utils/cn'

export interface NavLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'default' | 'underline' | 'pill'
  isActive?: boolean
  children: ReactNode
}

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ variant = 'default', isActive = false, children, className, ...props }, ref) => {
    const baseStyles = [
      'inline-flex items-center',
      'text-sm font-normal',
      'transition-[color,background-color,border-color,transform] duration-200 ease-out',
      'focus-ring',
    ]

    const variants = {
      default: [
        isActive ? 'text-[var(--color-white)]' : 'text-[var(--color-grey-400)]',
        'hover:text-[var(--color-white)]',
      ],
      underline: [
        'relative',
        isActive ? 'text-[var(--color-white)]' : 'text-[var(--color-grey-400)]',
        'hover:text-[var(--color-white)]',
        'link-hover',
      ],
      pill: [
        'px-3 py-1.5',
        'rounded-full',
        'border',
        isActive
          ? 'bg-[var(--color-white)] border-[var(--color-white)] text-[var(--color-bg)]'
          : 'bg-transparent border-transparent text-[var(--color-grey-400)] hover:bg-[var(--glass-bg)] hover:border-[var(--glass-border)] hover:text-[var(--color-white)]',
      ],
    }

    return (
      <a ref={ref} className={cn(baseStyles, variants[variant], className)} {...props}>
        {children}
      </a>
    )
  }
)

NavLink.displayName = 'NavLink'
