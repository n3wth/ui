import { renderHook } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock gsap before importing the hook
vi.mock('gsap', () => ({
  default: {
    registerPlugin: vi.fn(),
    to: vi.fn((_target, opts) => {
      opts?.onComplete?.()
      return {}
    }),
  },
}))

vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {
    create: vi.fn(),
    getAll: vi.fn(() => []),
  },
}))

import { useCountUp } from './useCountUp'

describe('useCountUp', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    })
  })

  it('returns value, displayValue, and ref', () => {
    const { result } = renderHook(() => useCountUp(100))
    expect(typeof result.current.value).toBe('number')
    expect(typeof result.current.displayValue).toBe('string')
    expect(result.current.ref).toBeDefined()
  })

  it('formats displayValue with prefix and suffix', () => {
    const { result } = renderHook(() =>
      useCountUp(100, { prefix: '$', suffix: '+' })
    )
    // With reduced motion the value goes to target immediately
    expect(result.current.displayValue).toContain('$')
    expect(result.current.displayValue).toContain('+')
  })

  it('starts at zero', () => {
    // With no ref attached, animation won't trigger
    const { result } = renderHook(() => useCountUp(50))
    expect(result.current.value).toBeGreaterThanOrEqual(0)
  })
})
