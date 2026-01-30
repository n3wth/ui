import { type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../utils/cn'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'sage' | 'coral' | 'mint' | 'gold' | 'outline'
  size?: 'sm' | 'md'
  children: ReactNode
}

export function Badge({
  variant = 'default',
  size = 'sm',
  children,
  className,
  ...props
}: BadgeProps) {
  const baseStyles = [
    'inline-flex items-center justify-center',
    'font-medium',
    'rounded-full',
    'whitespace-nowrap',
    'transition-colors duration-200',
    'backdrop-blur-sm',
  ]

  const variants = {
    default: [
      'bg-[var(--glass-bg)]',
      'text-[var(--color-grey-400)]',
      'border border-[var(--glass-border)]',
    ],
    sage: [
      'bg-[var(--color-sage)]/10',
      'text-[var(--color-sage)]',
      'border border-[var(--color-sage)]/20',
    ],
    coral: [
      'bg-[var(--color-coral)]/10',
      'text-[var(--color-coral)]',
      'border border-[var(--color-coral)]/20',
    ],
    mint: [
      'bg-[var(--color-mint)]/10',
      'text-[var(--color-mint)]',
      'border border-[var(--color-mint)]/20',
    ],
    gold: [
      'bg-[var(--color-gold)]/10',
      'text-[var(--color-gold)]',
      'border border-[var(--color-gold)]/20',
    ],
    outline: [
      'bg-transparent',
      'text-[var(--color-grey-400)]',
      'border border-[var(--glass-border)]',
    ],
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-[10px] tracking-wide uppercase',
    md: 'px-3 py-1 text-xs',
  }

  return (
    <span className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {children}
    </span>
  )
}
