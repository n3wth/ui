import { NavLink } from 'react-router'
import { Icon } from '../src/atoms/Icon'

/**
 * Floating nav-island, matching n3wth.com and garden.n3wth.com exactly:
 * a rounded pill anchored near the top, wordmark left, page links center,
 * icon zone right. Those two sites each hand-roll this same pattern
 * rather than importing a shared component (there isn't one yet), so
 * this file is ui.n3wth.com's own copy of it — same shape, this repo's
 * own color tokens (--color-white / --color-grey-400 / --glass-border
 * instead of --ink / --ink-dim / --rail).
 */

const navItems = [
  { label: 'Components', href: '/' },
  { label: 'Docs', href: '/docs/getting-started' },
]

export function SiteNav() {
  return (
    <header
      className="fixed inset-x-3 md:inset-x-4 z-50 flex md:justify-center pointer-events-none"
      style={{ top: 'calc(0.75rem + env(safe-area-inset-top))' }}
    >
      <div
        className="site-nav-pill pointer-events-auto flex h-12 w-full items-center gap-1 pl-4 pr-2 md:w-auto md:pl-5 rounded-full"
      >
        <a
          href="/"
          className="flex items-center gap-2 text-[15px] font-semibold tracking-[-0.01em] whitespace-nowrap"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-white)' }}
        >
          <svg
            viewBox="0 0 32 32"
            fill="currentColor"
            className="w-5 h-5"
            aria-hidden="true"
          >
            <path d="M9.4 6.6 25.2 14a1.5 1.5 0 0 1-.15 2.78l-6.1 1.78a2 2 0 0 0-1.32 1.24l-2.2 6.1c-.5 1.36-2.42 1.27-2.78-.15L8.0 8.2A1.6 1.6 0 0 1 9.4 6.6Z" />
          </svg>
          <span>n3wth<span style={{ color: 'var(--color-grey-500)' }}>/</span>ui</span>
        </a>

        <nav aria-label="Main navigation" className="flex items-center gap-0.5 ml-3">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `nav-pill-link ${isActive ? 'nav-pill-link-active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <span className="ml-auto inline-flex items-center gap-1.5">
          <a
            href="https://github.com/n3wth/ui"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-pill-icon"
            aria-label="GitHub"
          >
            <Icon name="github" size="md" />
          </a>
        </span>
      </div>
    </header>
  )
}
