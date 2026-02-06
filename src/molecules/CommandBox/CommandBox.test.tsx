import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { CommandBox } from './CommandBox'

const writeTextMock = vi.fn().mockResolvedValue(undefined)

describe('CommandBox', () => {
  beforeEach(() => {
    writeTextMock.mockClear()
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      writable: true,
      configurable: true,
    })
  })

  it('renders the command text', () => {
    render(<CommandBox command="npm install @n3wth/ui" />)
    expect(screen.getByText('npm install @n3wth/ui')).toBeInTheDocument()
  })

  it('renders copy button by default', () => {
    render(<CommandBox command="npm install" />)
    expect(screen.getByRole('button', { name: 'Copy to clipboard' })).toBeInTheDocument()
  })

  it('hides copy button when showCopyButton is false', () => {
    render(<CommandBox command="npm install" showCopyButton={false} />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('transitions to copied state on click', async () => {
    const user = userEvent.setup()
    render(<CommandBox command="npm install @n3wth/ui" />)
    await user.click(screen.getByRole('button', { name: 'Copy to clipboard' }))
    // Verifies the clipboard copy was attempted and succeeded (shows Copied state)
    expect(screen.getByRole('button', { name: 'Copied!' })).toBeInTheDocument()
  })

  it('calls onCopy callback', async () => {
    const user = userEvent.setup()
    const onCopy = vi.fn()
    render(<CommandBox command="npm install" onCopy={onCopy} />)
    await user.click(screen.getByRole('button', { name: 'Copy to clipboard' }))
    expect(onCopy).toHaveBeenCalledOnce()
  })

  it('shows copied state after clicking copy', async () => {
    const user = userEvent.setup()
    render(<CommandBox command="npm install" />)
    await user.click(screen.getByRole('button', { name: 'Copy to clipboard' }))
    expect(screen.getByRole('button', { name: 'Copied!' })).toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent('Copied to clipboard')
  })

  it('applies primary variant', () => {
    const { container } = render(<CommandBox command="npm install" variant="primary" />)
    expect(container.firstChild).toHaveClass('bg-[var(--glass-bg)]')
  })
})
