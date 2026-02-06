import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Skeleton, CardSkeleton } from './Skeleton'

describe('Skeleton', () => {
  it('renders a div element', () => {
    const { container } = render(<Skeleton />)
    expect(container.firstChild).toBeInstanceOf(HTMLDivElement)
  })

  it('applies text variant by default', () => {
    const { container } = render(<Skeleton />)
    expect(container.firstChild).toHaveClass('rounded', 'h-4')
  })

  it('applies circular variant', () => {
    const { container } = render(<Skeleton variant="circular" />)
    expect(container.firstChild).toHaveClass('rounded-full')
  })

  it('applies rectangular variant', () => {
    const { container } = render(<Skeleton variant="rectangular" />)
    expect(container.firstChild).toHaveClass('rounded-lg')
  })

  it('applies custom width and height as numbers', () => {
    const { container } = render(<Skeleton width={100} height={20} />)
    expect(container.firstChild).toHaveStyle({ width: '100px', height: '20px' })
  })

  it('applies custom width and height as strings', () => {
    const { container } = render(<Skeleton width="50%" height="2rem" />)
    expect(container.firstChild).toHaveStyle({ width: '50%', height: '2rem' })
  })

  it('applies pulse animation by default', () => {
    const { container } = render(<Skeleton />)
    expect(container.firstChild).toHaveClass('animate-pulse')
  })

  it('disables animation when animate is false', () => {
    const { container } = render(<Skeleton animate={false} />)
    expect(container.firstChild).not.toHaveClass('animate-pulse')
  })
})

describe('CardSkeleton', () => {
  it('renders with header by default', () => {
    const { container } = render(<CardSkeleton />)
    // Has the circular header skeleton
    expect(container.querySelector('.rounded-full')).toBeInTheDocument()
  })

  it('hides header when showHeader is false', () => {
    const { container } = render(<CardSkeleton showHeader={false} />)
    expect(container.querySelector('.rounded-full')).not.toBeInTheDocument()
  })

  it('renders correct number of text lines', () => {
    const { container } = render(<CardSkeleton lines={3} />)
    const lines = container.querySelectorAll('.space-y-2 > div')
    expect(lines.length).toBe(3)
  })

  it('hides tags when showTags is false', () => {
    const { container } = render(<CardSkeleton showTags={false} />)
    expect(container.querySelector('.flex-wrap')).not.toBeInTheDocument()
  })
})
