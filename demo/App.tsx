import { useState, useEffect } from 'react'
import { version } from '../package.json'
import { Nav } from '../src/organisms/Nav'
import { Hero } from '../src/organisms/Hero'
import { Footer } from '../src/organisms/Footer'
import { Icon } from '../src/atoms/Icon'
import { useTheme } from '../src/hooks/useTheme'
import { cn } from '../src/utils/cn'
import { TokensSection } from './sections/TokensSection'
import { AtomsSection } from './sections/AtomsSection'
import { MoleculesSection } from './sections/MoleculesSection'
import { OrganismsSection } from './sections/OrganismsSection'
import { HooksSection } from './sections/HooksSection'

const sidebarItems = [
  { id: 'tokens', label: 'Design Tokens', icon: 'sparkles' as const },
  { id: 'atoms', label: 'Atoms', icon: 'grid' as const },
  { id: 'molecules', label: 'Molecules', icon: 'code' as const },
  { id: 'organisms', label: 'Organisms', icon: 'list' as const },
  { id: 'hooks', label: 'Hooks', icon: 'terminal' as const },
]

export function App() {
  const { theme, toggleTheme } = useTheme()
  const [activeSection, setActiveSection] = useState('tokens')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Track active section via intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    )

    for (const item of sidebarItems) {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setSidebarOpen(false)
    }
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-white)]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--color-sage)] focus:text-black focus:rounded"
      >
        Skip to main content
      </a>

      {/* Nav */}
      <Nav
        logo="@n3wth/ui"
        logoHref="#"
        items={[
          { label: 'Tokens', href: '#tokens' },
          { label: 'Atoms', href: '#atoms' },
          { label: 'Molecules', href: '#molecules' },
          { label: 'Hooks', href: '#hooks' },
          { label: 'GitHub', href: 'https://github.com/n3wth/ui', external: true },
        ]}
        theme={theme}
        onThemeToggle={toggleTheme}
        fixed
        hideOnScroll
      />

      {/* Hero */}
      <Hero
        badge={`v${version}`}
        title="Flat. Minimal."
        description={<>Atomic design system for Newth sites.<br />No shadows, no glows &mdash; just clean glass morphism.</>}
        ctas={[
          { label: 'Browse Components', href: '#atoms' },
          { label: 'View Source', href: 'https://github.com/n3wth/ui', variant: 'secondary' },
        ]}
      />

      {/* Main content with sidebar */}
      <div id="main-content" className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-12">
          {/* Sidebar - desktop */}
          <aside className="hidden lg:block">
            <nav className="sticky top-20 space-y-1">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={cn(
                    'w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-left',
                    'transition-colors duration-150',
                    activeSection === item.id
                      ? 'bg-[var(--glass-bg)] text-[var(--color-white)] border border-[var(--glass-border)]'
                      : 'text-[var(--color-grey-400)] hover:text-[var(--color-white)] hover:bg-[var(--glass-bg)] border border-transparent'
                  )}
                >
                  <Icon name={item.icon} size="sm" />
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Mobile sidebar toggle */}
          <div className="lg:hidden sticky top-16 z-30 -mx-4 sm:-mx-6 px-4 sm:px-6 py-3 bg-[var(--color-bg)]/80 backdrop-blur-lg border-b border-[var(--glass-border)]">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="flex items-center gap-2 text-sm text-[var(--color-grey-400)]"
            >
              <Icon name="menu" size="sm" />
              <span>{sidebarItems.find((i) => i.id === activeSection)?.label || 'Navigate'}</span>
              <Icon name={sidebarOpen ? 'chevron-up' : 'chevron-down'} size="xs" />
            </button>
            {sidebarOpen && (
              <nav className="mt-2 p-2 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] space-y-1">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={cn(
                      'w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-left',
                      'transition-colors duration-150',
                      activeSection === item.id
                        ? 'bg-[var(--glass-bg)] text-[var(--color-white)]'
                        : 'text-[var(--color-grey-400)]'
                    )}
                  >
                    <Icon name={item.icon} size="sm" />
                    {item.label}
                  </button>
                ))}
              </nav>
            )}
          </div>

          {/* Content */}
          <main className="min-w-0 space-y-20 pt-8 lg:pt-0">
            <TokensSection />
            <AtomsSection />
            <MoleculesSection theme={theme} onThemeToggle={toggleTheme} />
            <OrganismsSection />
            <HooksSection />
          </main>
        </div>
      </div>

      {/* Footer */}
      <Footer
        logo={<span className="font-display text-lg font-semibold">@n3wth/ui</span>}
        description="A flat, minimal design system for modern web applications."
        sections={[
          {
            title: 'Documentation',
            links: [
              { label: 'Design Tokens', href: '#tokens' },
              { label: 'Components', href: '#atoms' },
              { label: 'Hooks', href: '#hooks' },
            ],
          },
          {
            title: 'Resources',
            links: [
              { label: 'GitHub', href: 'https://github.com/n3wth/ui' },
              { label: 'npm', href: 'https://www.npmjs.com/package/@n3wth/ui' },
              { label: 'newth.ai', href: 'https://newth.ai' },
            ],
          },
          {
            title: 'Legal',
            links: [
              { label: 'Privacy', href: 'https://newth.ai/privacy' },
              { label: 'MIT License', href: 'https://opensource.org/licenses/MIT' },
            ],
          },
        ]}
        theme={theme}
        onThemeToggle={toggleTheme}
      />
    </div>
  )
}
