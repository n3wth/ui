import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { ErrorBoundary, ErrorFallback } from './ErrorBoundary'

function ThrowingComponent({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) throw new Error('Test error')
  return <div>Normal content</div>
}

describe('ErrorBoundary', () => {
  // Suppress React error boundary console.error
  const originalError = console.error
  beforeEach(() => {
    console.error = vi.fn()
  })
  afterEach(() => {
    console.error = originalError
  })

  it('renders children when no error', () => {
    render(
      <ErrorBoundary>
        <div>Child</div>
      </ErrorBoundary>
    )
    expect(screen.getByText('Child')).toBeInTheDocument()
  })

  it('renders default fallback UI on error', () => {
    render(
      <ErrorBoundary>
        <ThrowingComponent shouldThrow={true} />
      </ErrorBoundary>
    )
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Try Again' })).toBeInTheDocument()
  })

  it('renders custom fallback on error', () => {
    render(
      <ErrorBoundary fallback={<div>Custom error UI</div>}>
        <ThrowingComponent shouldThrow={true} />
      </ErrorBoundary>
    )
    expect(screen.getByText('Custom error UI')).toBeInTheDocument()
  })

  it('calls onError callback', () => {
    const onError = vi.fn()
    render(
      <ErrorBoundary onError={onError}>
        <ThrowingComponent shouldThrow={true} />
      </ErrorBoundary>
    )
    expect(onError).toHaveBeenCalledWith(
      expect.any(Error),
      expect.objectContaining({ componentStack: expect.any(String) })
    )
  })

  it('recovers when Try Again is clicked', async () => {
    const user = userEvent.setup()
    let shouldThrow = true

    function Controlled() {
      if (shouldThrow) throw new Error('fail')
      return <div>Recovered</div>
    }

    render(
      <ErrorBoundary>
        <Controlled />
      </ErrorBoundary>
    )

    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    shouldThrow = false
    await user.click(screen.getByRole('button', { name: 'Try Again' }))
    expect(screen.getByText('Recovered')).toBeInTheDocument()
  })
})

describe('ErrorFallback', () => {
  it('renders default title and message', () => {
    render(<ErrorFallback />)
    expect(screen.getByText('Page Error')).toBeInTheDocument()
    expect(screen.getByText(/could not be displayed/)).toBeInTheDocument()
  })

  it('renders custom title and message', () => {
    render(<ErrorFallback title="404" message="Not found" />)
    expect(screen.getByText('404')).toBeInTheDocument()
    expect(screen.getByText('Not found')).toBeInTheDocument()
  })

  it('shows reload button by default', () => {
    render(<ErrorFallback />)
    expect(screen.getByRole('button', { name: 'Reload Page' })).toBeInTheDocument()
  })

  it('hides reload button', () => {
    render(<ErrorFallback showReload={false} />)
    expect(screen.queryByRole('button', { name: 'Reload Page' })).not.toBeInTheDocument()
  })

  it('shows home link by default', () => {
    render(<ErrorFallback />)
    expect(screen.getByRole('link', { name: 'Go Home' })).toHaveAttribute('href', '/')
  })

  it('uses custom homeUrl', () => {
    render(<ErrorFallback homeUrl="/dashboard" />)
    expect(screen.getByRole('link', { name: 'Go Home' })).toHaveAttribute('href', '/dashboard')
  })
})
