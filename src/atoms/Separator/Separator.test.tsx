import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { axe } from 'vitest-axe'
import * as matchers from 'vitest-axe/matchers'
import { Separator } from './Separator'

expect.extend(matchers)

describe('Separator', () => {
  it('renders with role="separator"', () => {
    render(<Separator />)
    expect(screen.getByRole('separator')).toBeInTheDocument()
  })

  it('defaults to horizontal orientation', () => {
    render(<Separator />)
    const sep = screen.getByRole('separator')
    expect(sep).toHaveAttribute('aria-orientation', 'horizontal')
  })

  it('applies horizontal styles by default', () => {
    render(<Separator />)
    const sep = screen.getByRole('separator')
    expect(sep).toHaveAttribute('data-orientation', 'horizontal')
  })

  it('applies vertical styles when orientation is vertical', () => {
    render(<Separator orientation="vertical" />)
    const sep = screen.getByRole('separator')
    expect(sep).toHaveAttribute('data-orientation', 'vertical')
    expect(sep).toHaveAttribute('aria-orientation', 'vertical')
  })

  it('renders on the Astryx Divider primitive', () => {
    render(<Separator />)
    expect(screen.getByRole('separator')).toHaveClass('astryx-divider')
  })

  it('merges custom className', () => {
    render(<Separator className="my-sep" />)
    expect(screen.getByRole('separator')).toHaveClass('my-sep')
  })

  it('forwards ref', () => {
    const ref = vi.fn()
    render(<Separator ref={ref} />)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement))
  })

  it('passes through additional HTML attributes', () => {
    render(<Separator data-testid="custom-sep" id="sep-1" />)
    const sep = screen.getByTestId('custom-sep')
    expect(sep).toHaveAttribute('id', 'sep-1')
  })

  it('has no accessibility violations (horizontal)', async () => {
    const { container } = render(<Separator />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('has no accessibility violations (vertical)', async () => {
    const { container } = render(<Separator orientation="vertical" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
