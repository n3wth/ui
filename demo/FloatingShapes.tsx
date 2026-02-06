import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { Shape, type ShapeType, type PatternType } from '../src/atoms/Shape'

interface FloatingElement {
  shapeType: ShapeType
  color: string
  pattern?: PatternType
  patternColors?: string[]
  size: number
  top: string
  left?: string
  right?: string
  rotation?: number
}

const floatingElements: FloatingElement[] = [
  // Sage accents
  { shapeType: 'circle', color: 'var(--color-sage)', size: 80, top: '12%', right: '10%' },
  { shapeType: 'arc', color: 'var(--color-sage)', size: 60, top: '65%', left: '8%', rotation: -30 },

  // Coral accents
  { shapeType: 'diamond', color: 'var(--color-coral)', size: 40, top: '35%', right: '6%' },
  { shapeType: 'semicircle', color: 'var(--color-coral)', size: 50, top: '75%', right: '18%', rotation: 20 },

  // Mint accents
  { shapeType: 'triangle', color: 'var(--color-mint)', size: 45, top: '20%', left: '5%', rotation: 15 },
  { shapeType: 'hexagon', color: 'var(--color-mint)', size: 35, top: '55%', right: '30%' },

  // Gold accents
  { shapeType: 'star', color: 'var(--color-gold)', size: 30, top: '45%', left: '12%' },
  { shapeType: 'square', color: 'var(--color-gold)', size: 36, top: '80%', left: '25%', rotation: 45 },
]

export function FloatingShapes() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const shapes = containerRef.current.querySelectorAll('.floating-shape')

    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.fromTo(
        shapes,
        { opacity: 0, scale: 0.7 },
        {
          opacity: 0.5,
          scale: 1,
          duration: prefersReducedMotion ? 0 : 1,
          delay: prefersReducedMotion ? 0 : (_i: number) => _i * 0.1,
          ease: 'power2.out',
          stagger: prefersReducedMotion ? 0 : 0.06,
        }
      )

      if (prefersReducedMotion) return

      // Floating drift animations
      shapes.forEach((shape, i) => {
        const tl = gsap.timeline({ repeat: -1, yoyo: true })

        tl.to(shape, {
          x: `random(-30, 30)`,
          duration: 16 + i * 1.5,
          ease: 'sine.inOut',
        }, 0)

        tl.to(shape, {
          y: `random(-20, 20)`,
          duration: 18 + i * 1.8,
          ease: 'sine.inOut',
        }, 0)

        tl.to(shape, {
          rotation: `random(-10, 10)`,
          duration: 20 + i * 2,
          ease: 'sine.inOut',
        }, 0)
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {floatingElements.map((el, i) => (
        <div
          key={i}
          className="floating-shape absolute hidden lg:block"
          style={{
            top: el.top,
            left: el.left,
            right: el.right,
            transform: el.rotation ? `rotate(${el.rotation}deg)` : undefined,
          }}
        >
          <Shape
            type={el.shapeType}
            size={el.size}
            color={el.color}
            pattern={el.pattern}
            patternColors={el.patternColors}
          />
        </div>
      ))}
    </div>
  )
}
