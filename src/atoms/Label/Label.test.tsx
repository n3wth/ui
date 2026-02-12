import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { axe } from 'vitest-axe'
import { toHaveNoViolations } from 'vitest-axe/matchers'
import { Label } from './Label'

expect.extend({ toHaveNoViolations })

describe('Label', () => {
  it('renders a label element', () => {
    render(<Label>Username</Label>)
    expect(screen.getByText('Username')).toBeInTheDocument()
    expect(screen.getByText('Username').tagName).toBe('LABEL')
  })

  it('renders children content', () => {
    render(<Label>Email address</Label>)
    expect(screen.getByText('Email address')).toBeInTheDocument()
  })

  it('supports htmlFor prop', () => {
    render(<Label htmlFor="email-input">Email</Label>)
    expect(screen.getByText('Email')).toHaveAttribute('for', 'email-input')
  })

  it('shows required asterisk when required', () => {
    const { container } = render(<Label required>Name</Label>)
    const asterisk = container.querySelector('.text-\\[var\\(--color-coral\\)\\]')
    expect(asterisk).toBeInTheDocument()
    expect(asterisk).toHaveTextContent('*')
  })

  it('hides required asterisk from screen readers', () => {
    const { container } = render(<Label required>Name</Label>)
    const asterisk = container.querySelector('[aria-hidden="true"]')
    expect(asterisk).toBeInTheDocument()
    expect(asterisk).toHaveTextContent('*')
  })

  it('does not show asterisk when not required', () => {
    const { container } = render(<Label>Name</Label>)
    expect(container.textContent).not.toContain('*')
  })

  it('applies disabled styles', () => {
    render(<Label disabled>Disabled label</Label>)
    const label = screen.getByText('Disabled label')
    expect(label).toHaveClass('opacity-50')
    expect(label).toHaveClass('cursor-not-allowed')
  })

  it('does not apply disabled styles by default', () => {
    render(<Label>Active label</Label>)
    const label = screen.getByText('Active label')
    expect(label).not.toHaveClass('opacity-50')
    expect(label).not.toHaveClass('cursor-not-allowed')
  })

  it('merges custom className', () => {
    render(<Label className="my-custom">Custom</Label>)
    expect(screen.getByText('Custom')).toHaveClass('my-custom')
  })

  it('forwards ref', () => {
    const ref = vi.fn()
    render(<Label ref={ref}>Ref test</Label>)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLLabelElement))
  })

  it('passes through native label attributes', () => {
    render(<Label data-testid="custom-label" id="my-label">Test</Label>)
    const label = screen.getByTestId('custom-label')
    expect(label).toHaveAttribute('id', 'my-label')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <div>
        <Label htmlFor="test-input">Accessible label</Label>
        <input id="test-input" type="text" />
      </div>
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
