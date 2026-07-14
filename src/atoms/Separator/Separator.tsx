import { forwardRef, type HTMLAttributes } from 'react'
import { Divider } from '@astryxdesign/core/Divider'

export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

/**
 * Thin wrapper around Astryx's `Divider`, keeping the original `Separator`
 * prop surface (`orientation`, `className`, ref-to-div, arbitrary HTML
 * attributes) so existing call sites don't need to change. Visuals now
 * come from the n3wth Astryx theme (`--color-border`) instead of the
 * hand-rolled `--glass-border` utility class.
 */
export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  ({ orientation = 'horizontal', className, ...props }, ref) => {
    return <Divider ref={ref} orientation={orientation} className={className} {...props} />
  }
)

Separator.displayName = 'Separator'
