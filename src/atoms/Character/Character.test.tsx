import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Character } from './Character'

describe('Character', () => {
  it('renders an SVG element', () => {
    const { container } = render(<Character />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('applies custom size', () => {
    const { container } = render(<Character size={64} />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('width', '64')
    expect(svg).toHaveAttribute('height', '64')
  })

  it('renders face circle with custom color', () => {
    const { container } = render(<Character color="#FF0000" />)
    const circle = container.querySelector('circle')
    expect(circle).toHaveAttribute('fill', '#FF0000')
  })

  it('renders different expressions', () => {
    const { container: c1 } = render(<Character expression="happy" />)
    const { container: c2 } = render(<Character expression="surprised" />)
    expect(c1.innerHTML).not.toBe(c2.innerHTML)
  })

  it('renders accessories', () => {
    const { container: noAccessory } = render(<Character accessory="none" />)
    const { container: withHat } = render(<Character accessory="hat" />)
    expect(noAccessory.innerHTML).not.toBe(withHat.innerHTML)
  })

})
