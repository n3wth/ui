import { useState, useEffect, type ComponentType } from 'react'
import { NavLink, useParams } from 'react-router'
import { SiteNav } from './SiteNav'
import { Footer } from '../src/organisms/Footer'
import { Icon } from '../src/atoms/Icon'
import { cn } from '../src/utils/cn'
import { SEO, JsonLdWebPage, JsonLdBreadcrumb } from './SEO'

const docModules = import.meta.glob<{ default: ComponentType }>([
  '../docs/getting-started.md',
  '../docs/theming.md',
  '../docs/components.md',
  '../docs/hooks.md',
  '../docs/css-utilities.md',
], { eager: true })

export interface DocPage {
  slug: string
  title: string
  description: string
  Component: ComponentType
}

const DOC_DESCRIPTIONS: Record<string, string> = {
  'getting-started': 'Quick setup guide for @n3wth/ui. Install, configure Tailwind CSS 4, and start building with flat, minimal React components.',
  'theming': 'Customize @n3wth/ui with CSS custom properties. Dark and light themes, color tokens, and typography configuration.',
  'components': 'Complete component reference for @n3wth/ui. Atoms, molecules, and organisms for building modern React interfaces.',
  'hooks': 'React hooks included in @n3wth/ui. useTheme, useMediaQuery, useKeyboardShortcuts, useScrollReveal, and more.',
  'css-utilities': 'CSS utility classes in @n3wth/ui. Glass effects, animations, typography, and responsive utilities.',
}

function slugToTitle(slug: string): string {
  return slug
    .replace(/-/g, ' ')
    .replace(/css /i, 'CSS ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

export const docPages: DocPage[] = Object.entries(docModules)
  .map(([path, mod]) => {
    const slug = path.replace('../docs/', '').replace('.md', '')
    return {
      slug,
      title: slugToTitle(slug),
      description: DOC_DESCRIPTIONS[slug] || `Documentation for ${slugToTitle(slug)} in @n3wth/ui design system.`,
      Component: mod.default,
    }
  })
  .sort((a, b) => {
    const order = ['getting-started', 'theming', 'components', 'hooks', 'css-utilities']
    return order.indexOf(a.slug) - order.indexOf(b.slug)
  })

export function DocsLayout() {
  const { slug } = useParams()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const currentPage = docPages.find((p) => p.slug === slug) ?? docPages[0]
  const Content = currentPage.Component

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  const pageUrl = `https://ui.n3wth.com/docs/${currentPage.slug}`

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-white)]">
      <SEO
        title={currentPage.title}
        description={currentPage.description}
        path={`/docs/${currentPage.slug}`}
        ogImage={`/og/${currentPage.slug}.png`}
      />
      <JsonLdWebPage
        title={`${currentPage.title} | @n3wth/ui`}
        description={currentPage.description}
        url={pageUrl}
      />
      <JsonLdBreadcrumb
        items={[
          { name: '@n3wth/ui', url: 'https://ui.n3wth.com' },
          { name: 'Docs', url: 'https://ui.n3wth.com/docs/getting-started' },
          { name: currentPage.title, url: pageUrl },
        ]}
      />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-20 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--color-accent)] focus:text-[var(--color-bg)] focus:rounded-lg focus:outline-none"
        aria-label="Skip to main content"
      >
        Skip to main content
      </a>

      <SiteNav />

      <div className="pt-24 max-w-6xl mx-auto px-6 md:px-12 pb-24">
        <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-12">
          {/* Sidebar - desktop */}
          <aside className="hidden lg:block">
            <nav className="sticky top-20 space-y-1">
              {docPages.map((page) => (
                <NavLink
                  key={page.slug}
                  to={`/docs/${page.slug}`}
                  className={({ isActive }) =>
                    cn(
                      'w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm',
                      'transition-colors duration-150',
                      isActive
                        ? 'bg-[var(--glass-bg)] text-[var(--color-white)] border border-[var(--glass-border)]'
                        : 'text-[var(--color-grey-400)] hover:text-[var(--color-white)] hover:bg-[var(--glass-bg)] border border-transparent'
                    )
                  }
                >
                  {page.title}
                </NavLink>
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
              <span>{currentPage.title}</span>
              <Icon name={sidebarOpen ? 'chevron-up' : 'chevron-down'} size="xs" />
            </button>
            {sidebarOpen && (
              <nav className="mt-2 p-2 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] space-y-1">
                {docPages.map((page) => (
                  <NavLink
                    key={page.slug}
                    to={`/docs/${page.slug}`}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm',
                        'transition-colors duration-150',
                        isActive
                          ? 'bg-[var(--glass-bg)] text-[var(--color-white)]'
                          : 'text-[var(--color-grey-400)]'
                      )
                    }
                  >
                    {page.title}
                  </NavLink>
                ))}
              </nav>
            )}
          </div>

          {/* Content */}
          <main id="main-content" className="min-w-0 pt-8 lg:pt-0">
            <article className="prose">
              <Content />
            </article>
          </main>
        </div>
      </div>

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
