import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { render, screen } from '@testing-library/react'
import { useToast, ToastProvider } from './useToast'
import type { ReactNode } from 'react'

describe('useToast (standalone)', () => {
  it('starts with empty toasts array', () => {
    const { result } = renderHook(() => useToast())
    expect(result.current.toasts).toHaveLength(0)
  })

  it('adds a toast', () => {
    const { result } = renderHook(() => useToast())
    act(() => {
      result.current.toast({ title: 'Hello' })
    })
    expect(result.current.toasts).toHaveLength(1)
    expect(result.current.toasts[0].title).toBe('Hello')
  })

  it('returns a toast id', () => {
    const { result } = renderHook(() => useToast())
    let id: string = ''
    act(() => {
      id = result.current.toast({ title: 'Test' })
    })
    expect(id).toBeTruthy()
    expect(typeof id).toBe('string')
  })

  it('dismisses a toast by id', () => {
    const { result } = renderHook(() => useToast())
    let id: string = ''
    act(() => {
      id = result.current.toast({ title: 'Dismiss me' })
    })
    expect(result.current.toasts).toHaveLength(1)
    act(() => {
      result.current.dismiss(id)
    })
    expect(result.current.toasts).toHaveLength(0)
  })

  it('dismisses all toasts', () => {
    const { result } = renderHook(() => useToast())
    act(() => {
      result.current.toast({ title: 'One' })
      result.current.toast({ title: 'Two' })
      result.current.toast({ title: 'Three' })
    })
    expect(result.current.toasts).toHaveLength(3)
    act(() => {
      result.current.dismissAll()
    })
    expect(result.current.toasts).toHaveLength(0)
  })

  it('respects maxToasts limit', () => {
    const { result } = renderHook(() => useToast(2))
    act(() => {
      result.current.toast({ title: 'One' })
      result.current.toast({ title: 'Two' })
      result.current.toast({ title: 'Three' })
    })
    expect(result.current.toasts).toHaveLength(2)
    // Should keep the most recent
    expect(result.current.toasts[1].title).toBe('Three')
  })

  it('toast.success sets variant to success', () => {
    const { result } = renderHook(() => useToast())
    act(() => {
      result.current.toast.success({ title: 'Done' })
    })
    expect(result.current.toasts[0].variant).toBe('success')
  })

  it('toast.error sets variant to error', () => {
    const { result } = renderHook(() => useToast())
    act(() => {
      result.current.toast.error({ title: 'Failed' })
    })
    expect(result.current.toasts[0].variant).toBe('error')
  })

  it('toast.warning sets variant to warning', () => {
    const { result } = renderHook(() => useToast())
    act(() => {
      result.current.toast.warning({ title: 'Caution' })
    })
    expect(result.current.toasts[0].variant).toBe('warning')
  })

  it('toast.info sets variant to info', () => {
    const { result } = renderHook(() => useToast())
    act(() => {
      result.current.toast.info({ title: 'FYI' })
    })
    expect(result.current.toasts[0].variant).toBe('info')
  })

  it('defaults variant to "default"', () => {
    const { result } = renderHook(() => useToast())
    act(() => {
      result.current.toast({ title: 'Basic' })
    })
    expect(result.current.toasts[0].variant).toBe('default')
  })

  it('defaults duration to 5000', () => {
    const { result } = renderHook(() => useToast())
    act(() => {
      result.current.toast({ title: 'Timed' })
    })
    expect(result.current.toasts[0].duration).toBe(5000)
  })
})

describe('ToastProvider', () => {
  function wrapper({ children }: { children: ReactNode }) {
    return <ToastProvider>{children}</ToastProvider>
  }

  it('provides toast context to children', () => {
    const { result } = renderHook(() => useToast(), { wrapper })
    expect(result.current.toasts).toHaveLength(0)
    act(() => {
      result.current.toast({ title: 'From provider' })
    })
    expect(result.current.toasts).toHaveLength(1)
  })

  it('renders children', () => {
    render(
      <ToastProvider>
        <div data-testid="child">Child content</div>
      </ToastProvider>
    )
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })
})
