import { createElement, type ReactNode } from 'react'

/**
 * design-sync preview surface.
 *
 * @n3wth/ui is a dark-first design system: its tokens (--color-bg #08090b,
 * --color-ink #f2f3f5) assume the consuming app paints a dark page background,
 * and the DS itself intentionally ships no `body` background. The preview-card
 * harness renders every story on a white body, so dark-first components
 * (a white primary Button, ink-on-dark text) render invisible.
 *
 * This wraps each story in the intended dark surface so the cards show the DS
 * the way it is actually consumed. Paired (via cfg.provider chain) with
 * N3wthProvider, which supplies the Astryx theme tokens for Astryx-backed
 * components (Separator, Skeleton, Card surface).
 */
export function PreviewSurface({ children }: { children: ReactNode }) {
  return createElement(
    'div',
    {
      style: {
        background: 'var(--color-bg)',
        color: 'var(--color-ink)',
        padding: 24,
        borderRadius: 12,
      },
    },
    children
  )
}

PreviewSurface.displayName = 'PreviewSurface'
