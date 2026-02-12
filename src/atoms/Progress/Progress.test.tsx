import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { axe } from 'vitest-axe'
import { toHaveNoViolations } from 'vitest-axe/matchers'
import { Progress } from './Progress'

expect.extend({ toHaveNoViolations })

describe('Progress', () => {
  it('renders a progressbar', () => {
    render(<Progress value={50} label="Loading" />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('sets aria attributes correctly', () => {
    render(<Progress value={30} max={200} label="Upload progress" />)
    const bar = screen.getByRole('progressbar')
    expect(bar).toHaveAttribute('aria-valuenow', '30')
    expect(bar).toHaveAttribute('aria-valuemin', '0')
    expect(bar).toHaveAttribute('aria-valuemax', '200')
    expect(bar).toHaveAttribute('aria-label', 'Upload progress')
  })

  it('defaults max to 100', () => {
    render(<Progress value={75} label="Progress" />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuemax', '100')
  })

  it('clamps percentage between 0 and 100', () => {
    const { container, rerender } = render(<Progress value={150} label="Over" />)
    const fill = container.querySelector('[role="progressbar"] > div') as HTMLElement
    expect(fill.style.width).toBe('100%')

    rerender(<Progress value={-10} label="Under" />)
    const fillAfter = container.querySelector('[role="progressbar"] > div') as HTMLElement
    expect(fillAfter.style.width).toBe('0%')
  })

  it('calculates percentage from value and max', () => {
    const { container } = render(<Progress value={25} max={50} label="Half" />)
    const fill = container.querySelector('[role="progressbar"] > div') as HTMLElement
    expect(fill.style.width).toBe('50%')
  })

  it('shows percentage text when showValue is true', () => {
    render(<Progress value={42} showValue label="Loading" />)
    expect(screen.getByText('42%')).toBeInTheDocument()
  })

  it('does not show percentage text by default', () => {
    render(<Progress value={42} label="Loading" />)
    expect(screen.queryByText('42%')).not.toBeInTheDocument()
  })

  it('applies size classes', () => {
    const { rerender } = render(<Progress value={50} size="sm" label="Small" />)
    expect(screen.getByRole('progressbar')).toHaveClass('h-1.5')

    rerender(<Progress value={50} size="md" label="Medium" />)
    expect(screen.getByRole('progressbar')).toHaveClass('h-2')

    rerender(<Progress value={50} size="lg" label="Large" />)
    expect(screen.getByRole('progressbar')).toHaveClass('h-3')
  })

  it('applies variant fill colors', () => {
    const { container, rerender } = render(<Progress value={50} variant="default" label="Default" />)
    const fill = container.querySelector('[role="progressbar"] > div') as HTMLElement
    expect(fill).toHaveClass('bg-[var(--color-white)]')

    rerender(<Progress value={50} variant="success" label="Success" />)
    const fillSuccess = container.querySelector('[role="progressbar"] > div') as HTMLElement
    expect(fillSuccess).toHaveClass('bg-[var(--color-sage)]')

    rerender(<Progress value={50} variant="warning" label="Warning" />)
    const fillWarning = container.querySelector('[role="progressbar"] > div') as HTMLElement
    expect(fillWarning).toHaveClass('bg-[var(--color-gold)]')

    rerender(<Progress value={50} variant="error" label="Error" />)
    const fillError = container.querySelector('[role="progressbar"] > div') as HTMLElement
    expect(fillError).toHaveClass('bg-[var(--color-coral)]')
  })

  it('merges custom className', () => {
    const { container } = render(<Progress value={50} className="my-custom" label="Custom" />)
    expect(container.firstChild).toHaveClass('my-custom')
  })

  it('forwards ref', () => {
    const ref = vi.fn()
    render(<Progress ref={ref} value={50} label="Ref test" />)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement))
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Progress value={50} label="Accessible progress" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
