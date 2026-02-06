import { describe, it, expect, vi } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Toast, ToastContainer } from './Toast'

describe('Toast', () => {
  it('renders with role="alert"', () => {
    render(<Toast title="Hello" duration={0} />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('renders title and description', () => {
    render(<Toast title="Success" description="Operation completed" duration={0} />)
    expect(screen.getByText('Success')).toBeInTheDocument()
    expect(screen.getByText('Operation completed')).toBeInTheDocument()
  })

  it('renders dismiss button with aria-label', () => {
    render(<Toast title="Test" duration={0} />)
    expect(screen.getByLabelText('Dismiss notification')).toBeInTheDocument()
  })

  it('calls onDismiss when dismiss button clicked', async () => {
    const user = userEvent.setup()
    const onDismiss = vi.fn()
    render(<Toast title="Test" duration={0} onDismiss={onDismiss} />)
    await user.click(screen.getByLabelText('Dismiss notification'))
    // Wait for the exit animation timeout
    await vi.waitFor(() => expect(onDismiss).toHaveBeenCalledOnce())
  })

  it('auto-dismisses after duration', async () => {
    vi.useFakeTimers()
    const onDismiss = vi.fn()
    render(<Toast title="Test" duration={1000} onDismiss={onDismiss} />)

    act(() => {
      vi.advanceTimersByTime(1000)
    })
    act(() => {
      vi.advanceTimersByTime(200) // exit animation
    })

    expect(onDismiss).toHaveBeenCalledOnce()
    vi.useRealTimers()
  })

  it('does not render when open=false', async () => {
    vi.useFakeTimers()
    render(<Toast title="Test" open={false} duration={0} />)
    act(() => {
      vi.advanceTimersByTime(300)
    })
    expect(screen.queryByRole('alert')).toBeNull()
    vi.useRealTimers()
  })

  it('applies variant styles', () => {
    const { rerender } = render(<Toast title="Test" variant="success" duration={0} />)
    expect(screen.getByRole('alert').className).toContain('sage')

    rerender(<Toast title="Test" variant="error" duration={0} />)
    expect(screen.getByRole('alert').className).toContain('coral')
  })

  it('has displayName', () => {
    expect(Toast.displayName).toBe('Toast')
  })
})

describe('ToastContainer', () => {
  it('renders children', () => {
    render(
      <ToastContainer>
        <div data-testid="child">Child</div>
      </ToastContainer>
    )
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })

  it('applies position classes', () => {
    const { container } = render(<ToastContainer position="bottom-left">Content</ToastContainer>)
    expect(container.firstChild).toHaveClass('bottom-0')
    expect(container.firstChild).toHaveClass('left-0')
  })
})
