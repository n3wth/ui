import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Icon } from './Icon'

describe('Icon', () => {
  it('renders an SVG element', () => {
    const { container } = render(<Icon name="check" />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('sets aria-hidden for decorative icons', () => {
    const { container } = render(<Icon name="check" />)
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
  })

  it('applies size classes', () => {
    const { container, rerender } = render(<Icon name="check" size="sm" />)
    expect(container.querySelector('svg')).toHaveClass('w-4', 'h-4')

    rerender(<Icon name="check" size="lg" />)
    expect(container.querySelector('svg')).toHaveClass('w-6', 'h-6')
  })

  it('supports numeric size', () => {
    const { container } = render(<Icon name="check" size={40} />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('width', '40')
    expect(svg).toHaveAttribute('height', '40')
  })

  it('returns null for unknown icon names', () => {
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const { container } = render(<Icon name={'nonexistent' as any} />)
    expect(container.firstChild).toBeNull()
    spy.mockRestore()
  })

  it('merges custom className', () => {
    const { container } = render(<Icon name="check" className="text-red-500" />)
    expect(container.querySelector('svg')).toHaveClass('text-red-500')
  })
})
