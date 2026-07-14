import type { ReactNode } from 'react'
import { Theme } from '@astryxdesign/core/theme'
import type { ThemeMode } from '@astryxdesign/core/theme'
import { n3wthTheme } from './n3wthTheme'

export interface N3wthProviderProps {
  children: ReactNode
  /**
   * Color mode for the Astryx theme layer. n3wth.com runs dark-only today,
   * so this defaults to 'dark'. Pass 'system' to follow the OS preference,
   * or wire it up to `useTheme()` from this package for a togglable app.
   */
  mode?: ThemeMode
}

/**
 * Mounts the n3wth Astryx theme once at the root of a consuming app.
 *
 * Any @n3wth/ui component built on top of Astryx (Separator, Skeleton,
 * Avatar, ...) needs an ancestor `<Theme>` from `@astryxdesign/core/theme`
 * to pick up n3wth's tokens (colors, type scale, motion). Mount this once
 * near the root instead of wrapping every component individually:
 *
 * ```tsx
 * import { N3wthProvider } from '@n3wth/ui'
 *
 * function Root() {
 *   return (
 *     <N3wthProvider>
 *       <App />
 *     </N3wthProvider>
 *   )
 * }
 * ```
 */
export function N3wthProvider({ children, mode = 'dark' }: N3wthProviderProps) {
  return (
    <Theme theme={n3wthTheme} mode={mode}>
      {children}
    </Theme>
  )
}

N3wthProvider.displayName = 'N3wthProvider'
