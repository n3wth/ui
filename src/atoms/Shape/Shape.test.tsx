import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Shape } from './Shape'

describe('Shape', () => {
  it('renders an SVG element', () => {
    const { container } = render(<Shape type="circle" />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('has aria-hidden="true" by default', () => {
    const { container } = render(<Shape type="circle" />)
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
  })

  it('has focusable="false"', () => {
    const { container } = render(<Shape type="circle" />)
    expect(container.querySelector('svg')).toHaveAttribute('focusable', 'false')
  })

  it('renders circle shape', () => {
    const { container } = render(<Shape type="circle" />)
    expect(container.querySelector('circle')).toBeInTheDocument()
  })

  it('renders square shape', () => {
    const { container } = render(<Shape type="square" />)
    expect(container.querySelector('rect')).toBeInTheDocument()
  })

  it('renders triangle shape', () => {
    const { container } = render(<Shape type="triangle" />)
    expect(container.querySelector('path')).toBeInTheDocument()
  })

  it('applies custom size', () => {
    const { container } = render(<Shape type="circle" size={100} />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('width', '100')
    expect(svg).toHaveAttribute('height', '100')
  })

  it('applies width/height object size', () => {
    const { container } = render(<Shape type="pill" size={{ width: 120, height: 60 }} />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('width', '120')
    expect(svg).toHaveAttribute('height', '60')
  })

  it('applies rotation', () => {
    const { container } = render(<Shape type="circle" rotation={45} />)
    const svg = container.querySelector('svg')
    expect(svg?.style.transform).toBe('rotate(45deg)')
  })

  it('applies opacity', () => {
    const { container } = render(<Shape type="circle" opacity={0.5} />)
    const svg = container.querySelector('svg')
    expect(svg?.style.opacity).toBe('0.5')
  })

})
