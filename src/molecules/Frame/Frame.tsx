import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../utils/cn'

/**
 * CornerTicks — the 9px "tick" cross-marks pinned to each corner of a frame.
 * Hairline, monochrome, decorative. Inherit color via the rail token.
 */
export interface CornerTicksProps {
  /** Tick arm length in px. */
  size?: number
  className?: string
}

export function CornerTicks({ size = 9, className }: CornerTicksProps) {
  const arm = size
  const base: React.CSSProperties = {
    position: 'absolute',
    width: arm,
    height: arm,
    color: 'var(--rail-strong)',
    pointerEvents: 'none',
  }
  const h = (
    <span style={{ position: 'absolute', top: '50%', left: 0, width: arm, height: 1, background: 'currentColor' }} />
  )
  const v = (
    <span style={{ position: 'absolute', left: '50%', top: 0, width: 1, height: arm, background: 'currentColor' }} />
  )
  return (
    <span aria-hidden className={className}>
      <span style={{ ...base, top: -1, left: -1 }}>{h}{v}</span>
      <span style={{ ...base, top: -1, right: -1 }}>{h}{v}</span>
      <span style={{ ...base, bottom: -1, left: -1 }}>{h}{v}</span>
      <span style={{ ...base, bottom: -1, right: -1 }}>{h}{v}</span>
    </span>
  )
}

export interface FrameProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  /** Render the 9px corner tick cross-marks. Defaults to true. */
  ticks?: boolean
  /** Use the stronger hairline rail. Defaults to false (subtle rail). */
  strong?: boolean
}

/**
 * Frame — a hairline rail wrapper with optional corner tick cross-marks.
 * The structural primitive of the blueprint system. Flat, no shadow.
 */
export function Frame({ children, ticks = true, strong = false, className, style, ...props }: FrameProps) {
  return (
    <div
      className={cn('relative', className)}
      style={{
        border: '1px solid ' + (strong ? 'var(--rail-strong)' : 'var(--rail)'),
        ...style,
      }}
      {...props}
    >
      {ticks && <CornerTicks />}
      {children}
    </div>
  )
}

export interface SectionHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /** Uppercase tracked label (sans, tabular). */
  label: ReactNode
  /** Optional monospace index like "01" — the only mono usage here. */
  index?: string
  /** Optional supporting line under the label. */
  description?: ReactNode
}

/**
 * SectionHeader — an uppercase tracked label with an optional mono index and
 * a hairline rule. The standard section marker for the wireframe system.
 */
export function SectionHeader({ label, index, description, className, ...props }: SectionHeaderProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)} {...props}>
      <div className="flex items-center gap-3">
        {index && (
          <span
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink-faint)' }}
            className="text-[11px] tabular-nums"
          >
            {index}
          </span>
        )}
        <span
          style={{ color: 'var(--ink-dim)' }}
          className="text-[11px] font-medium uppercase tracking-[0.16em] tabular-nums"
        >
          {label}
        </span>
        <span className="flex-1 h-px" style={{ background: 'var(--rail)' }} />
      </div>
      {description && (
        <p className="text-[0.9375rem] leading-[1.65]" style={{ color: 'var(--ink-dim)' }}>
          {description}
        </p>
      )}
    </div>
  )
}
