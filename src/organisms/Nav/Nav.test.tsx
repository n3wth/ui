import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Nav } from './Nav'
import { expectNoAxeViolations } from '../../test/a11y'

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

  describe('Accessibility', () => {
    it('has no axe violations', async () => {
      const { container } = render(<Nav logo="n3wth" items={items} />)
      await expectNoAxeViolations(container)
    })

    it('has no axe violations with theme toggle', async () => {
      const onToggle = vi.fn()
      const { container } = render(
        <Nav 
          logo="n3wth"
          items={items}
          theme="dark" 
          onThemeToggle={onToggle} 
          showThemeToggle 
        />
      )
      await expectNoAxeViolations(container)
    })

    it('mobile menu button has proper aria-label', () => {
      render(<Nav items={items} />)
      expect(screen.getByLabelText('Open menu')).toBeInTheDocument()
    })

    it('theme toggle has proper aria-label', () => {
      const onToggle = vi.fn()
      render(<Nav theme="dark" onThemeToggle={onToggle} showThemeToggle />)
      const toggles = screen.getAllByLabelText('Switch to light mode')
      expect(toggles.length).toBeGreaterThanOrEqual(1)
    })

    it('external links have proper attributes', () => {
      render(<Nav items={items} />)
      // Find the GitHub link (external)
      const links = screen.getAllByRole('link')
      const externalLink = links.find(link => 
        link.getAttribute('href') === 'https://github.com'
      )
      expect(externalLink).toHaveAttribute('target', '_blank')
      expect(externalLink).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })
})
