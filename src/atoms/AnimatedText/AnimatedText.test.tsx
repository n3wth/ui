import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AnimatedText } from './AnimatedText'

describe('AnimatedText', () => {
  it('renders children', () => {
    render(<AnimatedText>Hello World</AnimatedText>)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('renders as span by default', () => {
    render(<AnimatedText>Text</AnimatedText>)
    expect(screen.getByText('Text').tagName).toBe('SPAN')
  })

  it('renders as custom tag', () => {
    render(<AnimatedText as="h1">Title</AnimatedText>)
    expect(screen.getByText('Title').tagName).toBe('H1')
  })

  it('applies animation delay and duration as inline styles', () => {
    render(<AnimatedText delay={200} duration={800}>Text</AnimatedText>)
    const el = screen.getByText('Text')
    expect(el.style.animationDelay).toBe('200ms')
    expect(el.style.animationDuration).toBe('800ms')
  })

  it('applies initial animation class', () => {
    render(<AnimatedText animation="fade-in">Text</AnimatedText>)
    expect(screen.getByText('Text').className).toContain('opacity-0')
  })

})
