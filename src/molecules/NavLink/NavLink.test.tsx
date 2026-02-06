import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { NavLink } from './NavLink'

describe('NavLink', () => {
  it('renders an anchor element with children', () => {
    render(<NavLink href="/about">About</NavLink>)
    const link = screen.getByRole('link', { name: 'About' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/about')
  })

  it('applies default variant styles', () => {
    render(<NavLink href="/">Home</NavLink>)
    const link = screen.getByRole('link')
    expect(link).toHaveClass('inline-flex')
    expect(link).toHaveStyle({ color: 'var(--color-white)' })
  })

  it('applies active pill state', () => {
    render(<NavLink href="/" variant="pill" isActive>Home</NavLink>)
    const link = screen.getByRole('link')
    expect(link).toHaveStyle({ color: 'var(--color-bg)' })
    expect(link).toHaveClass('bg-[--color-white]')
  })

  it('applies pill variant', () => {
    render(<NavLink href="/" variant="pill">Pill</NavLink>)
    expect(screen.getByRole('link')).toHaveClass('rounded-full')
  })

  it('applies underline variant', () => {
    render(<NavLink href="/" variant="underline">Underline</NavLink>)
    expect(screen.getByRole('link')).toHaveClass('link-hover')
  })

  it('forwards ref', () => {
    const ref = vi.fn()
    render(<NavLink href="/" ref={ref}>Link</NavLink>)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLAnchorElement))
  })

  it('merges custom className', () => {
    render(<NavLink href="/" className="extra">Link</NavLink>)
    expect(screen.getByRole('link')).toHaveClass('extra')
  })
})
