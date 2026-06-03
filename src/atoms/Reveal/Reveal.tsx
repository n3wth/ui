import { useEffect, useRef, useState, type HTMLAttributes, type ReactNode } from 'react'

export interface RevealProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  /** Distance in px the element travels up while fading in. */
  distance?: number
  /** Transition duration in ms. */
  duration?: number
  /** Delay before the transition starts, in ms. */
  delay?: number
  /** IntersectionObserver rootMargin. */
  rootMargin?: string
  /** Reveal only once (default) or re-trigger on every entry. */
  once?: boolean
}

/**
 * Reveal — IntersectionObserver scroll-reveal wrapper.
 *
 * Dependency-light (no GSAP), portable across Next and Vite, and
 * reduced-motion safe: when the user prefers reduced motion the content
 * is shown immediately with no transform. Uses the wireframe easing token.
 */
export function Reveal({
  children,
  distance = 16,
  duration = 700,
  delay = 0,
  rootMargin = '0px 0px -10% 0px',
  once = true,
  style,
  ...props
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true)
            if (once) io.disconnect()
          } else if (!once) {
            setShown(false)
          }
        }
      },
      { rootMargin, threshold: 0.05 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [rootMargin, once])

  const active = shown || reduced

  return (
    <div
      ref={ref}
      style={{
        opacity: active ? 1 : 0,
        transform: active || reduced ? 'none' : 'translateY(' + distance + 'px)',
        transition: reduced
          ? 'none'
          : 'opacity ' + duration + 'ms var(--ease), transform ' + duration + 'ms var(--ease)',
        transitionDelay: delay + 'ms',
        willChange: 'opacity, transform',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  )
}
