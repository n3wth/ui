import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Button } from './Button'
import { expectNoAxeViolations } from '../../test/a11y'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('applies variant classes', () => {
    const { rerender } = render(<Button variant="primary">Btn</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-[var(--color-white)]')

    rerender(<Button variant="ghost">Btn</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-transparent')

    rerender(<Button variant="glass">Btn</Button>)
    expect(screen.getByRole('button')).toHaveClass('backdrop-blur-lg')
  })

  it('applies size classes', () => {
    const { rerender } = render(<Button size="sm">Btn</Button>)
    expect(screen.getByRole('button')).toHaveClass('text-xs')

    rerender(<Button size="lg">Btn</Button>)
    expect(screen.getByRole('button')).toHaveClass('text-base')
  })

  it('handles click events', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Click</Button>)
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('disables the button', () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('shows loading spinner and disables', () => {
    render(<Button isLoading>Loading</Button>)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button.querySelector('.animate-spin')).toBeInTheDocument()
  })

  it('renders left and right icons', () => {
    render(
      <Button leftIcon={<span data-testid="left" />} rightIcon={<span data-testid="right" />}>
        With Icons
      </Button>
    )
    expect(screen.getByTestId('left')).toBeInTheDocument()
    expect(screen.getByTestId('right')).toBeInTheDocument()
  })

  it('applies touch target minimum size', () => {
    render(<Button touchTarget>Touch</Button>)
    expect(screen.getByRole('button')).toHaveClass('min-w-[44px]')
    expect(screen.getByRole('button')).toHaveClass('min-h-[44px]')
  })

  it('merges custom className', () => {
    render(<Button className="my-custom">Btn</Button>)
    expect(screen.getByRole('button')).toHaveClass('my-custom')
  })

  it('forwards ref', () => {
    const ref = vi.fn()
    render(<Button ref={ref}>Ref</Button>)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLButtonElement))
  })

  describe('Accessibility', () => {
    it('has no axe violations', async () => {
      const { container } = render(<Button>Accessible Button</Button>)
      await expectNoAxeViolations(container)
    })

    it('has no axe violations when disabled', async () => {
      const { container } = render(<Button disabled>Disabled Button</Button>)
      await expectNoAxeViolations(container)
    })

    it('has no axe violations when loading', async () => {
      const { container } = render(<Button isLoading>Loading Button</Button>)
      await expectNoAxeViolations(container)
    })

    it('has no axe violations with icons', async () => {
      const { container } = render(
        <Button leftIcon={<span aria-hidden="true">←</span>}>
          With Icon
        </Button>
      )
      await expectNoAxeViolations(container)
    })

    it('has focus-ring class for keyboard navigation', () => {
      render(<Button>Focus Test</Button>)
      expect(screen.getByRole('button')).toHaveClass('focus-ring')
    })

    it('meets touch target size when touchTarget is true', () => {
      render(<Button touchTarget>Touch Button</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('min-w-[44px]')
      expect(button).toHaveClass('min-h-[44px]')
    })
  })
})
