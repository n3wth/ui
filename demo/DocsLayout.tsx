import { useState, useEffect, type ComponentType } from 'react'
import { NavLink, useParams } from 'react-router'
import { Nav } from '../src/organisms/Nav'
import { Footer } from '../src/organisms/Footer'
import { Icon } from '../src/atoms/Icon'
import { useTheme } from '../src/hooks/useTheme'
import { cn } from '../src/utils/cn'

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
  Component: ComponentType
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
      Component: mod.default,
    }
  })
  .sort((a, b) => {
    const order = ['getting-started', 'theming', 'components', 'hooks', 'css-utilities']
    return order.indexOf(a.slug) - order.indexOf(b.slug)
  })

export function DocsLayout() {
  const { theme, toggleTheme } = useTheme()
  const { slug } = useParams()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const currentPage = docPages.find((p) => p.slug === slug) ?? docPages[0]
  const Content = currentPage.Component

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-white)]">
      <Nav
        logo="@n3wth/ui"
        logoHref="/"
        items={[
          { label: 'Components', href: '/' },
          { label: 'Docs', href: '/docs/getting-started', isActive: true },
          { label: 'GitHub', href: 'https://github.com/n3wth/ui', external: true },
        ]}
        theme={theme}
        onThemeToggle={toggleTheme}
        fixed
        hideOnScroll
      />

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
          <main className="min-w-0 pt-8 lg:pt-0">
            <article className="prose">
              <Content />
            </article>
          </main>
        </div>
      </div>

      <Footer
        logo={<span className="font-display text-lg font-semibold">@n3wth/ui</span>}
        description="A flat, minimal design system for modern web applications."
        sections={[
          {
            title: 'Documentation',
            links: docPages.map((p) => ({ label: p.title, href: `/docs/${p.slug}` })),
          },
          {
            title: 'Resources',
            links: [
              { label: 'GitHub', href: 'https://github.com/n3wth/ui' },
              { label: 'npm', href: 'https://www.npmjs.com/package/@n3wth/ui' },
              { label: 'newth.ai', href: 'https://newth.ai' },
            ],
          },
        ]}
        theme={theme}
        onThemeToggle={toggleTheme}
      />
    </div>
  )
}
