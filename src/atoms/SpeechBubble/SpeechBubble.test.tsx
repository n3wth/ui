import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SpeechBubble } from './SpeechBubble'

describe('SpeechBubble', () => {
  it('renders children', () => {
    render(<SpeechBubble>Hello!</SpeechBubble>)
    expect(screen.getByText('Hello!')).toBeInTheDocument()
  })

  it('renders speech tail SVG by default', () => {
    const { container } = render(<SpeechBubble>Text</SpeechBubble>)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('renders thought dots for thought variant', () => {
    const { container } = render(<SpeechBubble variant="thought">Hmm</SpeechBubble>)
    expect(container.querySelector('svg')).toBeNull()
  })

  it('applies size classes', () => {
    const { container: sm } = render(<SpeechBubble size="sm">S</SpeechBubble>)
    const { container: lg } = render(<SpeechBubble size="lg">L</SpeechBubble>)
    expect(sm.innerHTML).not.toBe(lg.innerHTML)
  })

})
