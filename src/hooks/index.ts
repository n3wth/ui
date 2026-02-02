export { useTheme } from './useTheme'
export type { Theme, UseThemeOptions, UseThemeReturn } from './useTheme'

export {
  useKeyboardShortcuts,
  getModifierKey,
  formatShortcut,
} from './useKeyboardShortcuts'
export type { KeyboardShortcut, UseKeyboardShortcutsOptions } from './useKeyboardShortcuts'

export { useReducedMotion, useMotionConfig, usePrefersHighContrast } from './useReducedMotion'

export {
  useMediaQuery,
  useIsMobile,
  useIsTablet,
  useIsDesktop,
  useIsLargeDesktop,
  useBreakpoint,
  useIsTouchDevice,
  useIsPortrait,
  useIsLandscape,
  BREAKPOINTS,
} from './useMediaQuery'
export type { Breakpoint } from './useMediaQuery'

// Animation hooks (require gsap peer dependency)
export { useCountUp } from './useCountUp'
export type { UseCountUpOptions, UseCountUpReturn } from './useCountUp'

export { useScrollReveal } from './useScrollReveal'
export type { UseScrollRevealOptions } from './useScrollReveal'

export { useStaggerList } from './useStaggerList'
export type { UseStaggerListOptions } from './useStaggerList'

export { usePageTransition } from './usePageTransition'
export type { UsePageTransitionOptions } from './usePageTransition'

export { useTextReveal } from './useTextReveal'
export type { UseTextRevealOptions } from './useTextReveal'

export { useButtonPulse } from './useButtonPulse'
export type { UseButtonPulseOptions } from './useButtonPulse'
