import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { axe } from 'vitest-axe'
import * as matchers from 'vitest-axe/matchers'
import { Nav } from './Nav'

expect.extend(matchers)

const items = [
  { label: 'About', href: '/about' },
  { label: 'Work', href: '/work', isActive: true },
  { label: 'GitHub', href: 'https://github.com', external: true },
]

describe('Nav', () => {
  it('renders a nav element', () => {
    render(<Nav />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('renders logo link', () => {
    render(<Nav logo="Newth" logoHref="/" />)
    expect(screen.getByText('Newth')).toHaveAttribute('href', '/')
  })

  it('renders navigation items', () => {
    render(<Nav items={items} />)
    // Items appear in both desktop and mobile nav, so use getAllByText
    expect(screen.getAllByText('About').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Work').length).toBeGreaterThanOrEqual(1)
  })

  it('renders theme toggle when configured', () => {
    const onToggle = vi.fn()
    render(<Nav theme="dark" onThemeToggle={onToggle} showThemeToggle />)
    // Multiple toggles rendered (desktop + mobile), just check one exists
    const toggles = screen.getAllByLabelText('Switch to light mode')
    expect(toggles.length).toBeGreaterThanOrEqual(1)
  })

  it('hides theme toggle when showThemeToggle is false', () => {
    render(<Nav showThemeToggle={false} />)
    expect(screen.queryByLabelText(/Switch to/)).not.toBeInTheDocument()
  })

  it('applies fixed positioning', () => {
    render(<Nav fixed />)
    expect(screen.getByRole('navigation')).toHaveClass('fixed')
  })

  it('renders mobile menu button', () => {
    render(<Nav items={items} />)
    expect(screen.getByLabelText('Open menu')).toBeInTheDocument()
  })

  it('toggles mobile menu on button click', async () => {
    const user = userEvent.setup()
    render(<Nav items={items} />)
    await user.click(screen.getByLabelText('Open menu'))
    expect(screen.getByLabelText('Close menu')).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Nav logo="Newth" logoHref="/" items={items} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
