import { describe, it, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useKeyboardShortcuts, getModifierKey, formatShortcut } from './useKeyboardShortcuts'

function fireKey(key: string, options: Partial<KeyboardEvent> = {}) {
  window.dispatchEvent(
    new KeyboardEvent('keydown', {
      key,
      bubbles: true,
      ...options,
    })
  )
}

describe('useKeyboardShortcuts', () => {
  it('calls handler on matching key press', () => {
    const handler = vi.fn()
    renderHook(() =>
      useKeyboardShortcuts({
        shortcuts: [{ key: 'k', handler }],
      })
    )
    fireKey('k')
    expect(handler).toHaveBeenCalledOnce()
  })

  it('does not call handler for non-matching key', () => {
    const handler = vi.fn()
    renderHook(() =>
      useKeyboardShortcuts({
        shortcuts: [{ key: 'k', handler }],
      })
    )
    fireKey('j')
    expect(handler).not.toHaveBeenCalled()
  })

  it('matches with modifier keys', () => {
    const handler = vi.fn()
    renderHook(() =>
      useKeyboardShortcuts({
        shortcuts: [{ key: 'k', ctrl: true, handler }],
      })
    )
    // Without ctrl - should not match
    fireKey('k')
    expect(handler).not.toHaveBeenCalled()

    // With ctrl - should match
    fireKey('k', { ctrlKey: true })
    expect(handler).toHaveBeenCalledOnce()
  })

  it('matches meta key', () => {
    const handler = vi.fn()
    renderHook(() =>
      useKeyboardShortcuts({
        shortcuts: [{ key: 'k', meta: true, handler }],
      })
    )
    fireKey('k', { metaKey: true })
    expect(handler).toHaveBeenCalledOnce()
  })

  it('matches shift key', () => {
    const handler = vi.fn()
    renderHook(() =>
      useKeyboardShortcuts({
        shortcuts: [{ key: 'k', shift: true, handler }],
      })
    )
    fireKey('k', { shiftKey: true })
    expect(handler).toHaveBeenCalledOnce()
  })

  it('matches alt key', () => {
    const handler = vi.fn()
    renderHook(() =>
      useKeyboardShortcuts({
        shortcuts: [{ key: 'k', alt: true, handler }],
      })
    )
    fireKey('k', { altKey: true })
    expect(handler).toHaveBeenCalledOnce()
  })

  it('does not fire when enabled=false', () => {
    const handler = vi.fn()
    renderHook(() =>
      useKeyboardShortcuts({
        shortcuts: [{ key: 'k', handler }],
        enabled: false,
      })
    )
    fireKey('k')
    expect(handler).not.toHaveBeenCalled()
  })

  it('skips events from input elements', () => {
    const handler = vi.fn()
    renderHook(() =>
      useKeyboardShortcuts({
        shortcuts: [{ key: 'k', handler }],
      })
    )
    const input = document.createElement('input')
    document.body.appendChild(input)
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', bubbles: true }))
    expect(handler).not.toHaveBeenCalled()
    document.body.removeChild(input)
  })

  it('skips events from textarea elements', () => {
    const handler = vi.fn()
    renderHook(() =>
      useKeyboardShortcuts({
        shortcuts: [{ key: 'k', handler }],
      })
    )
    const textarea = document.createElement('textarea')
    document.body.appendChild(textarea)
    textarea.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', bubbles: true }))
    expect(handler).not.toHaveBeenCalled()
    document.body.removeChild(textarea)
  })

  it('skips events from contentEditable elements', () => {
    // The hook checks target.isContentEditable, so we verify
    // the hook logic handles contentEditable elements by dispatching
    // a keydown event with a target that has isContentEditable = true
    const handler = vi.fn()
    renderHook(() =>
      useKeyboardShortcuts({
        shortcuts: [{ key: 'k', handler }],
      })
    )
    const event = new KeyboardEvent('keydown', { key: 'k', bubbles: true })
    Object.defineProperty(event, 'target', {
      value: { tagName: 'DIV', isContentEditable: true },
    })
    window.dispatchEvent(event)
    expect(handler).not.toHaveBeenCalled()
  })

  it('is case-insensitive for key matching', () => {
    const handler = vi.fn()
    renderHook(() =>
      useKeyboardShortcuts({
        shortcuts: [{ key: 'K', handler }],
      })
    )
    fireKey('k')
    expect(handler).toHaveBeenCalledOnce()
  })

  it('cleans up event listener on unmount', () => {
    const handler = vi.fn()
    const { unmount } = renderHook(() =>
      useKeyboardShortcuts({
        shortcuts: [{ key: 'k', handler }],
      })
    )
    unmount()
    fireKey('k')
    expect(handler).not.toHaveBeenCalled()
  })
})

describe('getModifierKey', () => {
  it('returns "ctrl" when navigator is undefined', () => {
    const original = navigator.platform
    Object.defineProperty(navigator, 'platform', { value: '', configurable: true })
    // Since navigator exists in jsdom, it won't return 'ctrl' by default
    // but platform won't include 'mac'
    expect(getModifierKey()).toBe('ctrl')
    Object.defineProperty(navigator, 'platform', { value: original, configurable: true })
  })
})

describe('formatShortcut', () => {
  it('formats a simple key', () => {
    const result = formatShortcut({ key: 'k', handler: () => {} })
    expect(result).toContain('K')
  })

  it('includes modifier keys', () => {
    const result = formatShortcut({ key: 'k', ctrl: true, shift: true, handler: () => {} })
    expect(result).toContain('K')
    // In jsdom (non-Mac), should contain Ctrl and Shift
    expect(result).toContain('Ctrl')
    expect(result).toContain('Shift')
  })
})
