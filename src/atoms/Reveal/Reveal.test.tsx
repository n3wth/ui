import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Reveal } from './Reveal'

describe('Reveal', () => {
  it('renders children', () => {
    render(<Reveal>content</Reveal>)
    expect(screen.getByText('content')).toBeInTheDocument()
  })
})
