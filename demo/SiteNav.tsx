import { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router'
import { Icon } from '../src/atoms/Icon'
import { ThemeToggle } from '../src/molecules/ThemeToggle'

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

export interface SiteNavProps {
  theme: 'dark' | 'light'
  onThemeToggle: () => void
}

export function SiteNav({ theme, onThemeToggle }: SiteNavProps) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <>
      <header
        className="fixed inset-x-3 md:inset-x-4 z-50 flex md:justify-center pointer-events-none"
        style={{ top: 'calc(0.75rem + env(safe-area-inset-top))' }}
      >
        <div
          className="pointer-events-auto flex h-12 w-full items-center gap-1 pl-4 pr-2 md:w-auto md:pl-5 rounded-full"
          style={{
            background: 'color-mix(in srgb, var(--color-bg) 82%, transparent)',
            backdropFilter: 'blur(20px) saturate(1.5)',
            border: '1px solid var(--glass-border)',
          }}
        >
          <a
            href="/"
            className="text-[15px] font-semibold tracking-[-0.01em] whitespace-nowrap"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-white)' }}
          >
            @n3wth<span style={{ color: 'var(--color-grey-500)' }}>/</span>ui
          </a>

          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-0.5 ml-3">
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
            <a href="https://github.com/n3wth/ui" target="_blank" rel="noopener noreferrer" className="nav-pill-link">
              GitHub
            </a>
          </nav>

          <span className="ml-auto inline-flex items-center gap-1.5">
            <ThemeToggle theme={theme} onToggle={onThemeToggle} size="sm" />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="nav-pill-icon md:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              <Icon name={open ? 'x' : 'menu'} size="md" />
            </button>
          </span>
        </div>
      </header>

      {open && (
        <div
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-[70] md:hidden flex flex-col"
          style={{
            background: 'var(--color-bg)',
            paddingTop: 'env(safe-area-inset-top)',
            paddingBottom: 'env(safe-area-inset-bottom)',
          }}
        >
          <div className="flex items-center justify-between h-16 px-4">
            <span
              className="text-[15px] font-semibold tracking-[-0.01em]"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-white)' }}
            >
              @n3wth<span style={{ color: 'var(--color-grey-500)' }}>/</span>ui
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="nav-pill-icon"
              aria-label="Close navigation"
            >
              <Icon name="x" size="lg" />
            </button>
          </div>
          <nav className="flex flex-col gap-1 px-4 pt-2" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={() => setOpen(false)}
                className="mobile-nav-pill-link"
              >
                {item.label}
              </NavLink>
            ))}
            <a
              href="https://github.com/n3wth/ui"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-nav-pill-link"
              onClick={() => setOpen(false)}
            >
              GitHub
            </a>
          </nav>
        </div>
      )}
    </>
  )
}
