import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Section, SectionHeader } from './Section'

describe('Section', () => {
  it('renders as a section element', () => {
    render(<Section>Content</Section>)
    const section = screen.getByText('Content').closest('section')
    expect(section).toBeInTheDocument()
  })

  it('wraps content in container by default', () => {
    const { container } = render(<Section>Content</Section>)
    expect(container.querySelector('.mx-auto')).toBeInTheDocument()
  })

  it('renders without container', () => {
    const { container } = render(<Section container={false}>Content</Section>)
    expect(container.querySelector('.mx-auto')).not.toBeInTheDocument()
  })

  it('applies size classes', () => {
    const { container } = render(<Section size="lg">Content</Section>)
    expect(container.querySelector('.max-w-7xl')).toBeInTheDocument()
  })

  it('applies spacing classes', () => {
    const { container } = render(<Section spacing="none">Content</Section>)
    const section = container.querySelector('section')
    expect(section).toHaveClass('py-0')
  })

  it('adds scroll-margin when id is present', () => {
    const { container } = render(<Section id="about">Content</Section>)
    expect(container.querySelector('section')).toHaveClass('scroll-mt-20')
  })
})

describe('SectionHeader', () => {
  it('renders title as h2', () => {
    render(<SectionHeader title="My Section" />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('My Section')
  })

  it('renders description', () => {
    render(<SectionHeader title="Title" description="A description" />)
    expect(screen.getByText('A description')).toBeInTheDocument()
  })

  it('does not render description when not provided', () => {
    const { container } = render(<SectionHeader title="Title" />)
    expect(container.querySelectorAll('p')).toHaveLength(0)
  })

  it('applies center alignment', () => {
    const { container } = render(<SectionHeader title="Title" align="center" />)
    expect(container.firstChild).toHaveClass('text-center')
  })
})
