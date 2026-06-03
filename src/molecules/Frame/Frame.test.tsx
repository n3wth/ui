import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Frame, SectionHeader } from './Frame'

describe('Frame', () => {
  it('renders children and ticks by default', () => {
    const { container } = render(<Frame>boxed</Frame>)
    expect(screen.getByText('boxed')).toBeInTheDocument()
    expect(container.querySelectorAll('span').length).toBeGreaterThan(0)
  })

  it('SectionHeader renders label and index', () => {
    render(<SectionHeader label="Overview" index="01" />)
    expect(screen.getByText('Overview')).toBeInTheDocument()
    expect(screen.getByText('01')).toBeInTheDocument()
  })
})
