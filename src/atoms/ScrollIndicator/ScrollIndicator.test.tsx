import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ScrollIndicator } from './ScrollIndicator'

describe('ScrollIndicator', () => {
  it('renders a div with absolute positioning', () => {
    const { container } = render(<ScrollIndicator />)
    expect(container.firstChild).toHaveClass('absolute')
  })

  it('renders default label "Scroll"', () => {
    render(<ScrollIndicator />)
    expect(screen.getByText('Scroll')).toBeInTheDocument()
  })

  it('renders custom label', () => {
    render(<ScrollIndicator label="Explore" />)
    expect(screen.getByText('Explore')).toBeInTheDocument()
  })

  it('renders SVG arrow icon', () => {
    const { container } = render(<ScrollIndicator />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('SVG has bounce animation class', () => {
    const { container } = render(<ScrollIndicator />)
    expect(container.querySelector('svg')).toHaveClass('animate-bounce')
  })
})
