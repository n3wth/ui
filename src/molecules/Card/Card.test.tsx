import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'
import * as matchers from 'vitest-axe/matchers'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card'

expect.extend(matchers)

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Card content</Card>)
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('renders on the Astryx Card primitive', () => {
    const { container } = render(<Card>Content</Card>)
    expect(container.firstChild).toHaveClass('astryx-card')
  })

  it('applies glass variant with backdrop blur', () => {
    const { container } = render(<Card variant="glass">Glass</Card>)
    expect(container.firstChild).toHaveClass('backdrop-blur-lg')
  })

  it('applies interactive variant', () => {
    const { container } = render(<Card variant="interactive">Interactive</Card>)
    expect(container.firstChild).toHaveClass('cursor-pointer')
  })

  it('applies padding sizes', () => {
    const { container: noneContainer } = render(<Card padding="none">No pad</Card>)
    const { container: lgContainer } = render(<Card padding="lg">Lg pad</Card>)
    const noneClass = (noneContainer.firstChild as HTMLElement).className
    const lgClass = (lgContainer.firstChild as HTMLElement).className
    expect(noneClass).not.toBe(lgClass)
  })

  it('merges custom className', () => {
    const { container } = render(<Card className="my-card">Content</Card>)
    expect(container.firstChild).toHaveClass('my-card')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>
        <CardContent>Content</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})

describe('CardHeader', () => {
  it('renders children', () => {
    render(<CardHeader>Header</CardHeader>)
    expect(screen.getByText('Header')).toBeInTheDocument()
  })
})

describe('CardTitle', () => {
  it('renders as h3 by default', () => {
    render(<CardTitle>Title</CardTitle>)
    expect(screen.getByText('Title').tagName).toBe('H3')
  })

  it('renders with custom heading level', () => {
    render(<CardTitle as="h1">Title</CardTitle>)
    expect(screen.getByText('Title').tagName).toBe('H1')
  })
})

describe('CardDescription', () => {
  it('renders as paragraph', () => {
    render(<CardDescription>Description</CardDescription>)
    expect(screen.getByText('Description').tagName).toBe('P')
  })
})

describe('CardContent', () => {
  it('renders children', () => {
    render(<CardContent>Main content</CardContent>)
    expect(screen.getByText('Main content')).toBeInTheDocument()
  })
})

describe('CardFooter', () => {
  it('renders children with border top', () => {
    const { container } = render(<CardFooter>Footer</CardFooter>)
    expect(screen.getByText('Footer')).toBeInTheDocument()
    expect(container.firstChild).toHaveClass('border-t')
  })
})
