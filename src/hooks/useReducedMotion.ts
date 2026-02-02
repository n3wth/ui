import { useState, useEffect, useCallback, useMemo } from 'react'

/**
 * Hook to detect user's motion preference with SSR safety
 * Returns true if user prefers reduced motion
 *
 * Note: For animations, consider using this to:
 * - Disable or reduce animation duration
 * - Use fade instead of transform animations
 * - Skip parallax and auto-playing animations
 */
export function useReducedMotion(): boolean {
  const getInitialState = useCallback(() => {
    if (typeof window === 'undefined') {
      // Default to reduced motion for SSR (safer, more accessible)
      return true
    }
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(getInitialState)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    // Update on mount for SSR hydration
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersReducedMotion
}

/**
 * Returns animation configuration based on reduced motion preference
 * Provides sensible defaults that can be spread into animation props
 */
export function useMotionConfig() {
  const prefersReducedMotion = useReducedMotion()

  return useMemo(
    () => ({
      /** Whether reduced motion is preferred */
      isReduced: prefersReducedMotion,

      /** Suggested animation duration in ms */
      duration: prefersReducedMotion ? 0 : 300,

      /** Suggested animation duration as CSS value */
      durationCss: prefersReducedMotion ? '0ms' : '300ms',

      /** Suggested easing function */
      easing: prefersReducedMotion ? 'linear' : 'cubic-bezier(0.4, 0, 0.2, 1)',

      /** Whether to disable transform animations */
      disableTransform: prefersReducedMotion,

      /** Whether to disable parallax effects */
      disableParallax: prefersReducedMotion,

      /** Whether to disable auto-playing animations */
      disableAutoPlay: prefersReducedMotion,

      /** Suggested transition config for Framer Motion / GSAP */
      transition: prefersReducedMotion
        ? { duration: 0 }
        : { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
    }),
    [prefersReducedMotion]
  )
}

/**
 * Returns true if user prefers high contrast
 */
export function usePrefersHighContrast(): boolean {
  const getInitialState = useCallback(() => {
    if (typeof window === 'undefined') {
      return false
    }
    return window.matchMedia('(prefers-contrast: high)').matches
  }, [])

  const [prefersHighContrast, setPrefersHighContrast] = useState(getInitialState)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const mediaQuery = window.matchMedia('(prefers-contrast: high)')
    setPrefersHighContrast(mediaQuery.matches)

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersHighContrast(event.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersHighContrast
}
