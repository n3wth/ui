import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Hero } from './Hero'

describe('Hero', () => {
  it('renders a section element', () => {
    const { container } = render(<Hero title="Welcome" />)
    expect(container.querySelector('section')).toBeInTheDocument()
  })

  it('renders the title as h1', () => {
    render(<Hero title="Build faster" />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Build faster')
  })

  it('renders badge when provided', () => {
    render(<Hero title="Welcome" badge="New" />)
    expect(screen.getByText('New')).toBeInTheDocument()
  })

  it('does not render badge when not provided', () => {
    render(<Hero title="Welcome" />)
    expect(screen.queryByText('New')).toBeNull()
  })

  it('renders description', () => {
    render(<Hero title="Welcome" description="Build something great" />)
    expect(screen.getByText('Build something great')).toBeInTheDocument()
  })

  it('renders CTA buttons', () => {
    const ctas = [
      { label: 'Get Started', href: '/start' },
      { label: 'Learn More', href: '/docs' },
    ]
    render(<Hero title="Welcome" ctas={ctas} />)
    expect(screen.getByText('Get Started')).toBeInTheDocument()
    expect(screen.getByText('Learn More')).toBeInTheDocument()
  })

  it('CTA links have correct href', () => {
    const ctas = [{ label: 'Get Started', href: '/start' }]
    render(<Hero title="Welcome" ctas={ctas} />)
    expect(screen.getByText('Get Started').closest('a')).toHaveAttribute('href', '/start')
  })

  it('applies center alignment by default', () => {
    const { container } = render(<Hero title="Welcome" />)
    const inner = container.querySelector('.items-center')
    expect(inner).toBeInTheDocument()
  })

  it('applies left alignment', () => {
    const { container } = render(<Hero title="Welcome" align="left" />)
    const inner = container.querySelector('.items-start')
    expect(inner).toBeInTheDocument()
  })

  it('applies gradient text by default', () => {
    render(<Hero title="Welcome" />)
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1.className).toContain('hero-gradient-text')
  })

  it('disables gradient text when gradient=false', () => {
    render(<Hero title="Welcome" gradient={false} />)
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1.className).not.toContain('hero-gradient-text')
  })

  it('applies custom className', () => {
    const { container } = render(<Hero title="Welcome" className="custom-hero" />)
    expect(container.querySelector('section')).toHaveClass('custom-hero')
  })
})
