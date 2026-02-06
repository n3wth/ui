import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { CompositeShape } from './CompositeShape'

describe('CompositeShape', () => {
  it('renders null when no layers or preset', () => {
    const { container } = render(<CompositeShape />)
    expect(container.firstChild).toBeNull()
  })

  it('renders layers when provided', () => {
    const layers = [
      { type: 'circle' as const, size: 48, color: '#FF0000' },
      { type: 'square' as const, size: 32, color: '#00FF00', offsetX: 20 },
    ]
    const { container } = render(<CompositeShape layers={layers} />)
    const svgs = container.querySelectorAll('svg')
    expect(svgs).toHaveLength(2)
  })

  it('applies scale', () => {
    const layers = [
      { type: 'circle' as const, size: 48, color: '#FF0000' },
    ]
    const { container } = render(<CompositeShape layers={layers} scale={2} />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('width', '96')
  })

})
