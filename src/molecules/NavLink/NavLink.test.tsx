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

  it('applies default variant', () => {
    render(<NavLink href="/">Home</NavLink>)
    expect(screen.getByRole('link')).toHaveClass('text-[var(--color-grey-400)]')
  })

  it('applies active state', () => {
    render(<NavLink href="/" isActive>Home</NavLink>)
    expect(screen.getByRole('link')).toHaveClass('text-[var(--color-white)]')
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
