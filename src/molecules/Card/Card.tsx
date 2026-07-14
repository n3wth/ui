import { type HTMLAttributes, type ReactNode } from 'react'
import { Card as AstryxCard } from '@astryxdesign/core/Card'
import { cn } from '../../utils/cn'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'interactive'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  children: ReactNode
}

// Astryx's numeric spacing scale lines up 1:1 with the previous Tailwind
// padding classes (step * 4px): none->0, sm->p-3 (12px), md->p-5 (20px),
// lg->p-8 (32px).
const paddingStep = {
  none: 0,
  sm: 3,
  md: 5,
  lg: 8,
} as const

/**
 * Bordered container, now rendered on Astryx's `Card` primitive for
 * background/border/radius/padding. The `glass` and `interactive` variants
 * layer the original glass-morphism flourishes (backdrop blur, hover
 * highlight, gradient border, shine sweep) on top via className, since
 * Astryx's variant palette doesn't include them.
 */
export function Card({
  variant = 'default',
  padding = 'md',
  children,
  className,
  ...props
}: CardProps) {
  const overlayClassName = {
    default: '',
    glass: 'bg-[var(--glass-bg)] backdrop-blur-lg',
    interactive: cn(
      'cursor-pointer',
      'hover:border-[var(--glass-highlight)] hover:bg-[var(--glass-bg)]',
      'gradient-border shine-sweep'
    ),
  }[variant]

  return (
    <AstryxCard
      variant="default"
      padding={paddingStep[padding]}
      className={cn(overlayClassName, className)}
      {...props}
    >
      {children}
    </AstryxCard>
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
