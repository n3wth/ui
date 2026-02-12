import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { axe } from 'vitest-axe'
import { toHaveNoViolations } from 'vitest-axe/matchers'
import { Textarea } from './Textarea'

expect.extend({ toHaveNoViolations })

describe('Textarea', () => {
  it('renders a textarea element', () => {
    render(<Textarea placeholder="Enter text" />)
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter text').tagName).toBe('TEXTAREA')
  })

  it('handles text input', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Textarea onChange={onChange} />)
    await user.type(screen.getByRole('textbox'), 'hello world')
    expect(onChange).toHaveBeenCalled()
  })

  it('forwards ref', () => {
    const ref = vi.fn()
    render(<Textarea ref={ref} />)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLTextAreaElement))
  })

  it('applies error styling', () => {
    render(<Textarea error />)
    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveClass('border-[var(--color-coral)]')
  })

  it('sets aria-invalid when error is true', () => {
    render(<Textarea error />)
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
  })

  it('does not set aria-invalid when no error', () => {
    render(<Textarea />)
    expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-invalid')
  })

  it('applies default border when no error', () => {
    render(<Textarea />)
    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveClass('border-[var(--glass-border)]')
    expect(textarea).not.toHaveClass('border-[var(--color-coral)]')
  })

  it('defaults to vertical resize', () => {
    render(<Textarea />)
    expect(screen.getByRole('textbox')).toHaveClass('resize-y')
  })

  it('applies resize none', () => {
    render(<Textarea resize="none" />)
    expect(screen.getByRole('textbox')).toHaveClass('resize-none')
  })

  it('applies resize both', () => {
    render(<Textarea resize="both" />)
    expect(screen.getByRole('textbox')).toHaveClass('resize')
  })

  it('merges custom className', () => {
    render(<Textarea className="my-custom" />)
    expect(screen.getByRole('textbox')).toHaveClass('my-custom')
  })

  it('passes through native textarea attributes', () => {
    render(<Textarea rows={5} maxLength={100} disabled />)
    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveAttribute('rows', '5')
    expect(textarea).toHaveAttribute('maxlength', '100')
    expect(textarea).toBeDisabled()
  })

  it('applies base styling', () => {
    render(<Textarea />)
    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveClass('bg-transparent')
    expect(textarea).toHaveClass('rounded-lg')
    expect(textarea).toHaveClass('text-sm')
    expect(textarea).toHaveClass('min-h-[80px]')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <div>
        <label htmlFor="test-textarea">Description</label>
        <Textarea id="test-textarea" />
      </div>
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
