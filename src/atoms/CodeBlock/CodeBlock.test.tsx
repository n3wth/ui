import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CodeBlock } from './CodeBlock'

describe('CodeBlock', () => {
  it('renders a pre element', () => {
    const { container } = render(<CodeBlock code="const x = 1" />)
    expect(container.querySelector('pre')).toBeInTheDocument()
  })

  it('renders code content', () => {
    render(<CodeBlock code="hello world" />)
    expect(screen.getByText('hello')).toBeInTheDocument()
  })

  it('renders a code element inside pre', () => {
    const { container } = render(<CodeBlock code="x = 1" language="typescript" />)
    expect(container.querySelector('pre code')).toBeInTheDocument()
  })

  it('renders line numbers when showLineNumbers is true', () => {
    const code = 'line1\nline2\nline3'
    const { container } = render(<CodeBlock code={code} showLineNumbers />)
    const lineNumberSpan = container.querySelector('.select-none')
    expect(lineNumberSpan).toBeInTheDocument()
    expect(lineNumberSpan?.textContent).toContain('1')
    expect(lineNumberSpan?.textContent).toContain('3')
  })

  it('does not render line numbers by default', () => {
    const { container } = render(<CodeBlock code="const x = 1" />)
    const lineNumberSpan = container.querySelector('.select-none')
    expect(lineNumberSpan).toBeNull()
  })
})
