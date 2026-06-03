import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Logo } from './Logo'

describe('Logo', () => {
  it('renders an svg with default size', () => {
    const { container } = render(<Logo />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('width', '22')
  })
})
