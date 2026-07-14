import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Skeleton, CardSkeleton } from './Skeleton'

describe('Skeleton', () => {
  it('renders a div element', () => {
    const { container } = render(<Skeleton />)
    expect(container.firstChild).toBeInstanceOf(HTMLDivElement)
  })

  it('applies text variant by default with a single-line height', () => {
    const { container } = render(<Skeleton />)
    const el = container.firstChild as HTMLElement
    expect(el).toHaveClass('astryx-skeleton')
    expect(el.style.getPropertyValue('--x-height')).toBe('16px')
  })

  it.each(['text', 'circular', 'rectangular'] as const)(
    'renders the %s variant on the Astryx Skeleton primitive',
    (variant) => {
      const { container } = render(<Skeleton variant={variant} width={40} height={40} />)
      const el = container.firstChild as HTMLElement
      expect(el).toHaveClass('astryx-skeleton')
      expect(el).toHaveAttribute('aria-hidden', 'true')
    }
  )

  it('applies custom width and height as numbers', () => {
    const { container } = render(<Skeleton width={100} height={20} />)
    const el = container.firstChild as HTMLElement
    expect(el.style.getPropertyValue('--x-width')).toBe('100px')
    expect(el.style.getPropertyValue('--x-height')).toBe('20px')
  })

  it('applies custom width and height as strings', () => {
    const { container } = render(<Skeleton width="50%" height="2rem" />)
    const el = container.firstChild as HTMLElement
    expect(el.style.getPropertyValue('--x-width')).toBe('50%')
    expect(el.style.getPropertyValue('--x-height')).toBe('2rem')
  })

  it('renders on the Astryx Skeleton primitive by default (animated)', () => {
    const { container } = render(<Skeleton />)
    expect(container.firstChild).toHaveClass('astryx-skeleton')
    expect(container.firstChild).not.toHaveAttribute('data-animate', 'false')
  })

  it('falls back to a static placeholder when animate is false', () => {
    const { container } = render(<Skeleton animate={false} />)
    expect(container.firstChild).not.toHaveClass('astryx-skeleton')
    expect(container.firstChild).toHaveAttribute('data-animate', 'false')
  })
})

describe('CardSkeleton', () => {
  it('renders with header by default', () => {
    const { container } = render(<CardSkeleton />)
    // The lines wrapper also carries `mb-3 md:mb-4`, so exclude it to find
    // the header wrapper specifically.
    const header = container.querySelector('.mb-3:not(.space-y-2)')
    expect(header?.querySelector('[aria-hidden="true"]')).toBeInTheDocument()
  })

  it('hides header when showHeader is false', () => {
    const { container } = render(<CardSkeleton showHeader={false} />)
    expect(container.querySelector('.mb-3:not(.space-y-2)')).not.toBeInTheDocument()
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
