import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { axe } from 'vitest-axe'
import * as matchers from 'vitest-axe/matchers'
import { Avatar } from './Avatar'

expect.extend(matchers)

describe('Avatar', () => {
  it('renders with an image when src is provided', () => {
    render(<Avatar src="https://example.com/photo.jpg" alt="User" />)
    const img = screen.getByRole('img')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', 'https://example.com/photo.jpg')
    expect(img).toHaveAttribute('alt', 'User')
  })

  it('renders fallback initials when no src', () => {
    render(<Avatar fallback="ON" />)
    expect(screen.getByText('ON')).toBeInTheDocument()
  })

  it('renders empty when no src and no fallback', () => {
    const { container } = render(<Avatar />)
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toBeInTheDocument()
    // Should show empty span
    const span = wrapper.querySelector('span')
    expect(span).toBeInTheDocument()
    expect(span?.textContent).toBe('')
  })

  it('falls back to initials on image error', () => {
    render(<Avatar src="https://example.com/broken.jpg" fallback="AB" alt="User" />)
    const img = screen.getByRole('img')
    fireEvent.error(img)
    expect(screen.getByText('AB')).toBeInTheDocument()
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  it('applies size classes', () => {
    const { container, rerender } = render(<Avatar fallback="A" size="xs" />)
    expect(container.firstChild).toHaveClass('w-6', 'h-6')

    rerender(<Avatar fallback="A" size="sm" />)
    expect(container.firstChild).toHaveClass('w-8', 'h-8')

    rerender(<Avatar fallback="A" size="md" />)
    expect(container.firstChild).toHaveClass('w-10', 'h-10')

    rerender(<Avatar fallback="A" size="lg" />)
    expect(container.firstChild).toHaveClass('w-12', 'h-12')

    rerender(<Avatar fallback="A" size="xl" />)
    expect(container.firstChild).toHaveClass('w-16', 'h-16')
  })

  it('applies fallback styling (glass bg + border)', () => {
    const { container } = render(<Avatar fallback="ON" />)
    expect(container.firstChild).toHaveClass('bg-[var(--glass-bg)]')
    expect(container.firstChild).toHaveClass('border')
    expect(container.firstChild).toHaveClass('border-[var(--glass-border)]')
  })

  it('does not apply fallback border when image is shown', () => {
    const { container } = render(<Avatar src="https://example.com/photo.jpg" alt="User" />)
    expect(container.firstChild).not.toHaveClass('bg-[var(--glass-bg)]')
  })

  it('renders image with object-cover and rounded-full', () => {
    render(<Avatar src="https://example.com/photo.jpg" alt="User" />)
    const img = screen.getByRole('img')
    expect(img).toHaveClass('object-cover', 'rounded-full')
  })

  it('merges custom className', () => {
    const { container } = render(<Avatar fallback="A" className="my-class" />)
    expect(container.firstChild).toHaveClass('my-class')
  })

  it('forwards ref', () => {
    const ref = vi.fn()
    render(<Avatar ref={ref} fallback="A" />)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement))
  })

  it('has no accessibility violations with image', async () => {
    const { container } = render(<Avatar src="https://example.com/photo.jpg" alt="User avatar" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('has no accessibility violations with fallback', async () => {
    const { container } = render(<Avatar fallback="ON" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
