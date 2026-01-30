import { type HTMLAttributes, type ReactNode, useState, useCallback } from 'react'
import { cn } from '../../utils/cn'
import { NavLink } from '../../molecules/NavLink'
import { ThemeToggle } from '../../molecules/ThemeToggle'
import { MobileDrawer } from '../../molecules/MobileDrawer'

export interface NavItem {
  label: string
  href: string
  isActive?: boolean
  external?: boolean
}

export interface NavProps extends HTMLAttributes<HTMLElement> {
  logo?: ReactNode
  logoHref?: string
  items?: NavItem[]
  theme?: 'dark' | 'light'
  onThemeToggle?: () => void
  showThemeToggle?: boolean
  fixed?: boolean
}

export function Nav({
  logo,
  logoHref = '/',
  items = [],
  theme = 'dark',
  onThemeToggle,
  showThemeToggle = true,
  fixed = false,
  className,
  ...props
}: NavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev)
  }, [])

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  return (
    <>
      <nav
        className={cn(
          'glass-nav',
          'px-6 md:px-12 py-3 md:py-4',
          'flex items-center justify-between',
          fixed && 'fixed top-0 left-0 right-0 z-50',
          className
        )}
        {...props}
      >
        {/* Logo */}
        <a
          href={logoHref}
          className="text-base md:text-lg font-display font-semibold hover:opacity-70 transition-opacity"
          style={{ color: 'var(--color-accent)' }}
        >
          {logo}
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-6">
          {items.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              isActive={item.isActive}
              variant="underline"
              {...(item.external && { target: '_blank', rel: 'noopener noreferrer' })}
            >
              {item.label}
            </NavLink>
          ))}
          {showThemeToggle && onThemeToggle && (
            <ThemeToggle theme={theme} onToggle={onThemeToggle} size="sm" />
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg transition-all duration-200 hover:opacity-70"
          style={{ color: 'var(--color-grey-200)' }}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-300"
          >
            {isMenuOpen ? (
              <>
                <path d="M18 6L6 18" />
                <path d="M6 6l12 12" />
              </>
            ) : (
              <>
                <path d="M4 6h16" />
                <path d="M4 12h16" />
                <path d="M4 18h16" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={isMenuOpen}
        onClose={closeMenu}
        position="right"
        width="280px"
        zIndex={55}
        className="md:hidden"
      >
        <div className="flex flex-col h-full pt-20 px-6 pb-8">
          <div className="flex flex-col gap-2">
            <a
              href={logoHref}
              onClick={closeMenu}
              className="mobile-nav-link text-lg py-4 px-4 rounded-xl transition-all duration-200 min-h-[52px] flex items-center"
              style={{ color: 'var(--color-white)' }}
            >
              Home
            </a>
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="mobile-nav-link text-lg py-4 px-4 rounded-xl transition-all duration-200 min-h-[52px] flex items-center"
                style={{ color: 'var(--color-white)' }}
                {...(item.external && { target: '_blank', rel: 'noopener noreferrer' })}
              >
                {item.label}
                {item.external && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-2 opacity-50"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                )}
              </a>
            ))}
          </div>

          {showThemeToggle && onThemeToggle && (
            <div className="mt-auto pt-6 border-t" style={{ borderColor: 'var(--glass-border)' }}>
              <div className="flex items-center justify-between px-4">
                <span className="text-sm" style={{ color: 'var(--color-grey-400)' }}>
                  Theme
                </span>
                <ThemeToggle theme={theme} onToggle={onThemeToggle} size="sm" />
              </div>
            </div>
          )}
        </div>
      </MobileDrawer>
    </>
  )
}
