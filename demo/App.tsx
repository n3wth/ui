import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router'
import { version } from '../package.json'
import { SiteNav } from './SiteNav'
import { Hero } from '../src/organisms/Hero'
import { Footer } from '../src/organisms/Footer'
import { Icon } from '../src/atoms/Icon'
import { useTheme } from '../src/hooks/useTheme'
import { cn } from '../src/utils/cn'
import { FloatingShapes } from './FloatingShapes'
import { TokensSection } from './sections/TokensSection'
import { AtomsSection } from './sections/AtomsSection'
import { MoleculesSection } from './sections/MoleculesSection'
import { OrganismsSection } from './sections/OrganismsSection'
import { HooksSection } from './sections/HooksSection'
import { DocsLayout } from './DocsLayout'

const sidebarItems = [
  { id: 'tokens', label: 'Design Tokens', icon: 'sparkles' as const },
  { id: 'atoms', label: 'Atoms', icon: 'grid' as const },
  { id: 'molecules', label: 'Molecules', icon: 'code' as const },
  { id: 'organisms', label: 'Organisms', icon: 'list' as const },
  { id: 'hooks', label: 'Hooks', icon: 'terminal' as const },
]

function Showcase() {
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
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--color-accent)] focus:text-[var(--color-bg)] focus:rounded"
      >
        Skip to main content
      </a>

      {/* Nav */}
      <SiteNav />

      {/* Hero */}
      <div className="relative">
        <FloatingShapes />
        <Hero
          badge={`v${version}`}
          title="Flat, minimal components"
          description={<>An atomic design system for Newth sites.<br />No shadows, no glows.</>}
          ctas={[
            { label: 'Browse components', href: '#atoms' },
            { label: 'View source', href: 'https://github.com/n3wth/ui', variant: 'secondary' },
          ]}
        />
      </div>

      {/* Main content with sidebar */}
      <div id="main-content" className="max-w-6xl mx-auto px-6 md:px-12 pb-24">
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
        sites={[
          { name: 'hop.flights', href: 'https://hop.flights' },
          { name: 'r3', href: 'https://r3.n3wth.com' },
          { name: 'kit', href: 'https://kit.n3wth.com' },
          { name: 'garden', href: 'https://garden.n3wth.com' },
          { name: 'skills', href: 'https://skills.n3wth.com' },
          { name: 'n3wth.com', href: 'https://n3wth.com' },
        ]}
        currentSite="n3wth/ui"
        legalLinks={[
          { label: 'Email', href: 'mailto:hey@n3wth.com' },
          { label: 'Privacy', href: 'https://n3wth.com/privacy' },
        ]}
        copyright={`\u00A9 ${new Date().getFullYear()} n3wth`}
      />
    </div>
  )
}

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Showcase />} />
      <Route path="/docs/:slug" element={<DocsLayout />} />
      <Route path="/docs" element={<Navigate to="/docs/getting-started" replace />} />
    </Routes>
  )
}
