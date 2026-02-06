import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { HamburgerIcon } from './HamburgerIcon'

describe('HamburgerIcon', () => {
  it('renders an SVG element', () => {
    const { container } = render(<HamburgerIcon isOpen={false} />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('has aria-hidden="true"', () => {
    const { container } = render(<HamburgerIcon isOpen={false} />)
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
  })

  it('renders 3 paths when closed', () => {
    const { container } = render(<HamburgerIcon isOpen={false} />)
    const paths = container.querySelectorAll('path')
    expect(paths.length).toBeGreaterThanOrEqual(2)
  })

  it('renders different paths when open', () => {
    const { container: closed } = render(<HamburgerIcon isOpen={false} />)
    const { container: open } = render(<HamburgerIcon isOpen={true} />)
    expect(closed.innerHTML).not.toBe(open.innerHTML)
  })

  it('applies custom size', () => {
    const { container } = render(<HamburgerIcon isOpen={false} size={32} />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('width', '32')
    expect(svg).toHaveAttribute('height', '32')
  })

})
