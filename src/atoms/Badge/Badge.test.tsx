import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Badge } from './Badge'
import { expectNoAxeViolations } from '../../test/a11y'

describe('Badge', () => {
  it('renders children text', () => {
    render(<Badge>New</Badge>)
    expect(screen.getByText('New')).toBeInTheDocument()
  })

  it('renders as a span element', () => {
    render(<Badge>Tag</Badge>)
    expect(screen.getByText('Tag').tagName).toBe('SPAN')
  })

  it('applies default variant', () => {
    render(<Badge>Default</Badge>)
    expect(screen.getByText('Default')).toHaveClass('bg-[var(--glass-bg)]')
  })

  it('applies color variants', () => {
    const { rerender } = render(<Badge variant="sage">Sage</Badge>)
    expect(screen.getByText('Sage')).toHaveClass('text-[var(--color-sage)]')

    rerender(<Badge variant="coral">Coral</Badge>)
    expect(screen.getByText('Coral')).toHaveClass('text-[var(--color-coral)]')

    rerender(<Badge variant="mint">Mint</Badge>)
    expect(screen.getByText('Mint')).toHaveClass('text-[var(--color-mint)]')

    rerender(<Badge variant="gold">Gold</Badge>)
    expect(screen.getByText('Gold')).toHaveClass('text-[var(--color-gold)]')
  })

  it('applies size classes', () => {
    const { rerender } = render(<Badge size="sm">Sm</Badge>)
    expect(screen.getByText('Sm')).toHaveClass('text-[10px]')

    rerender(<Badge size="md">Md</Badge>)
    expect(screen.getByText('Md')).toHaveClass('text-xs')
  })

  it('merges custom className', () => {
    render(<Badge className="custom">Badge</Badge>)
    expect(screen.getByText('Badge')).toHaveClass('custom')
  })

  describe('Accessibility', () => {
    it('has no axe violations', async () => {
      const { container } = render(<Badge>Test Badge</Badge>)
      await expectNoAxeViolations(container)
    })

    it('has no axe violations with different variants', async () => {
      const { container } = render(
        <div>
          <Badge variant="sage">Sage</Badge>
          <Badge variant="coral">Coral</Badge>
          <Badge variant="mint">Mint</Badge>
          <Badge variant="gold">Gold</Badge>
        </div>
      )
      await expectNoAxeViolations(container)
    })
  })
})
