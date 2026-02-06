import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { NoiseOverlay } from './NoiseOverlay'

describe('NoiseOverlay', () => {
  it('renders a div', () => {
    const { container } = render(<NoiseOverlay />)
    expect(container.firstChild).toBeInstanceOf(HTMLDivElement)
  })

  it('has aria-hidden="true"', () => {
    const { container } = render(<NoiseOverlay />)
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true')
  })

  it('applies fixed positioning by default', () => {
    const { container } = render(<NoiseOverlay />)
    expect(container.firstChild).toHaveClass('fixed')
  })

  it('applies absolute positioning when fixed=false', () => {
    const { container } = render(<NoiseOverlay fixed={false} />)
    expect(container.firstChild).toHaveClass('absolute')
  })

  it('applies custom opacity', () => {
    const { container } = render(<NoiseOverlay opacity={0.1} />)
    expect((container.firstChild as HTMLElement).style.opacity).toBe('0.1')
  })

  it('has pointer-events-none', () => {
    const { container } = render(<NoiseOverlay />)
    expect(container.firstChild).toHaveClass('pointer-events-none')
  })

})
