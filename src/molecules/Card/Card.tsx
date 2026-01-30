import { type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../utils/cn'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'interactive'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  children: ReactNode
}

export function Card({
  variant = 'default',
  padding = 'md',
  children,
  className,
  ...props
}: CardProps) {
  const baseStyles = [
    'rounded-2xl',
    'border',
    'transition-[background-color,border-color] duration-300 ease-out',
  ]

  const variants = {
    default: [
      'bg-transparent',
      'border-[var(--glass-border)]',
    ],
    glass: [
      'bg-[var(--glass-bg)]',
      'backdrop-blur-lg',
      'border-[var(--glass-border)]',
    ],
    interactive: [
      'bg-transparent',
      'border-[var(--glass-border)]',
      'hover:border-[var(--glass-highlight)]',
      'hover:bg-[var(--glass-bg)]',
      'cursor-pointer',
      'gradient-border shine-sweep',
    ],
  }

  const paddings = {
    none: '',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-8',
  }

  return (
    <div
      className={cn(baseStyles, variants[variant], paddings[padding], className)}
      {...props}
    >
      {children}
    </div>
  )
}

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function CardHeader({ children, className, ...props }: CardHeaderProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)} {...props}>
      {children}
    </div>
  )
}

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode
  as?: 'h1' | 'h2' | 'h3' | 'h4'
}

export function CardTitle({ children, as: Tag = 'h3', className, ...props }: CardTitleProps) {
  return (
    <Tag
      className={cn(
        'font-display text-base font-semibold text-[var(--color-white)]',
        'tracking-tight',
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}

export interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode
}

export function CardDescription({ children, className, ...props }: CardDescriptionProps) {
  return (
    <p
      className={cn(
        'text-sm text-[var(--color-grey-400)]',
        'line-clamp-2',
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
}

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function CardContent({ children, className, ...props }: CardContentProps) {
  return (
    <div className={cn('mt-4', className)} {...props}>
      {children}
    </div>
  )
}

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function CardFooter({ children, className, ...props }: CardFooterProps) {
  return (
    <div
      className={cn(
        'mt-4 pt-4',
        'border-t border-[var(--glass-border)]',
        'flex items-center gap-3',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
