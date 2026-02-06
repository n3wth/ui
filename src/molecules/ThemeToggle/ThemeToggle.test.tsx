import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { ThemeToggle } from './ThemeToggle'

describe('ThemeToggle', () => {
  it('renders a button', () => {
    render(<ThemeToggle theme="dark" onToggle={() => {}} />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('has accessible label for dark mode', () => {
    render(<ThemeToggle theme="dark" onToggle={() => {}} />)
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-label',
      'Switch to light mode'
    )
  })

  it('has accessible label for light mode', () => {
    render(<ThemeToggle theme="light" onToggle={() => {}} />)
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-label',
      'Switch to dark mode'
    )
  })

  it('calls onToggle when clicked', async () => {
    const user = userEvent.setup()
    const onToggle = vi.fn()
    render(<ThemeToggle theme="dark" onToggle={onToggle} />)
    await user.click(screen.getByRole('button'))
    expect(onToggle).toHaveBeenCalledOnce()
  })

  it('applies size classes', () => {
    const { rerender } = render(<ThemeToggle theme="dark" onToggle={() => {}} size="sm" />)
    expect(screen.getByRole('button')).toHaveClass('w-8', 'h-8')

    rerender(<ThemeToggle theme="dark" onToggle={() => {}} size="md" />)
    expect(screen.getByRole('button')).toHaveClass('w-10', 'h-10')
  })
})
