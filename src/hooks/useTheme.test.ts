import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useTheme } from './useTheme'

// Mock localStorage
const storageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => { store[key] = value }),
    removeItem: vi.fn((key: string) => { delete store[key] }),
    clear: vi.fn(() => { store = {} }),
    get length() { return Object.keys(store).length },
    key: vi.fn((i: number) => Object.keys(store)[i] ?? null),
  }
})()

describe('useTheme', () => {
  beforeEach(() => {
    storageMock.clear()
    Object.defineProperty(window, 'localStorage', { value: storageMock, writable: true })
    document.documentElement.removeAttribute('data-theme')
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    })
  })

  it('returns dark theme by default', () => {
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('dark')
    expect(result.current.isDark).toBe(true)
    expect(result.current.isLight).toBe(false)
  })

  it('respects defaultTheme option', () => {
    const { result } = renderHook(() => useTheme({ defaultTheme: 'light' }))
    expect(result.current.theme).toBe('light')
  })

  it('toggles theme', () => {
    const { result } = renderHook(() => useTheme())
    act(() => result.current.toggleTheme())
    expect(result.current.theme).toBe('light')
    expect(result.current.isLight).toBe(true)
  })

  it('sets theme directly', () => {
    const { result } = renderHook(() => useTheme())
    act(() => result.current.setTheme('light'))
    expect(result.current.theme).toBe('light')
  })

  it('persists theme to localStorage', () => {
    const { result } = renderHook(() => useTheme())
    act(() => result.current.setTheme('light'))
    expect(storageMock.setItem).toHaveBeenCalledWith('n3wth-theme', 'light')
  })

  it('reads theme from localStorage', () => {
    storageMock.getItem.mockReturnValueOnce('light')
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('light')
  })

  it('sets data-theme attribute on document', () => {
    const { result } = renderHook(() => useTheme())
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    act(() => result.current.setTheme('light'))
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
  })

  it('uses custom storageKey', () => {
    const { result } = renderHook(() => useTheme({ storageKey: 'custom-key' }))
    act(() => result.current.setTheme('light'))
    expect(storageMock.setItem).toHaveBeenCalledWith('custom-key', 'light')
  })
})
