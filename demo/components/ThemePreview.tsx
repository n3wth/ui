import { type ReactNode } from 'react'
import { cn } from '../../src/utils/cn'

interface ThemePreviewProps {
  children: ReactNode
  splitView?: boolean
  className?: string
}

export function ThemePreview({ children, splitView = false, className }: ThemePreviewProps) {
  if (!splitView) {
    return (
      <div className={cn('p-8 rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] flex items-center justify-center gap-4', className)}>
        {children}
      </div>
    )
  }

  return (
    <div className={cn('grid md:grid-cols-2 gap-4', className)}>
      {/* Dark theme */}
      <div className="space-y-2">
        <div className="text-xs font-medium text-[var(--color-grey-400)] mb-2">
          Dark Theme
        </div>
        <div
          className="p-8 rounded-2xl border border-[var(--glass-border)] flex items-center justify-center gap-4 min-h-[120px]"
          style={{
            '--color-bg': '#000000',
            '--color-white': '#ffffff',
            '--color-grey-400': '#86868b',
            '--color-accent': '#ffffff',
            '--glass-bg': 'rgba(255, 255, 255, 0.05)',
            '--glass-border': 'rgba(255, 255, 255, 0.1)',
          } as React.CSSProperties}
        >
          {children}
        </div>
      </div>

      {/* Light theme */}
      <div className="space-y-2">
        <div className="text-xs font-medium text-[var(--color-grey-400)] mb-2">
          Light Theme
        </div>
        <div
          className="p-8 rounded-2xl border border-[var(--glass-border)] flex items-center justify-center gap-4 min-h-[120px]"
          style={{
            '--color-bg': '#ffffff',
            '--color-white': '#000000',
            '--color-grey-400': '#86868b',
            '--color-accent': '#000000',
            '--glass-bg': 'rgba(0, 0, 0, 0.05)',
            '--glass-border': 'rgba(0, 0, 0, 0.1)',
          } as React.CSSProperties}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
