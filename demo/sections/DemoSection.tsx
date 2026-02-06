import { type ReactNode } from 'react'
import { cn } from '../../src/utils/cn'

interface DemoSectionProps {
  id: string
  title: string
  description?: string
  children: ReactNode
  className?: string
}

export function DemoSection({ id, title, description, children, className }: DemoSectionProps) {
  return (
    <section id={id} className={cn('scroll-mt-20', className)}>
      <div className="mb-8">
        <h2 className="font-display text-2xl font-semibold text-[var(--color-white)] tracking-tight">
          {title}
        </h2>
        {description && (
          <p className="mt-2 text-sm text-[var(--color-grey-400)]">{description}</p>
        )}
      </div>
      {children}
    </section>
  )
}

interface DemoBlockProps {
  title: string
  children: ReactNode
  className?: string
}

export function DemoBlock({ title, children, className }: DemoBlockProps) {
  return (
    <div className={cn('mb-10', className)}>
      <h3 className="text-sm font-medium text-[var(--color-grey-400)] uppercase tracking-wider mb-4">
        {title}
      </h3>
      {children}
    </div>
  )
}
