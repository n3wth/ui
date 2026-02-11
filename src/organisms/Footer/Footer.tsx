import { type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../utils/cn'

export interface FooterLink {
  label: string
  href: string
}

export interface FooterSection {
  title: string
  links: FooterLink[]
}

export interface FooterSite {
  name: string
  href: string
}

const DEFAULT_SITES: FooterSite[] = [
  { name: 'n3wth', href: 'https://n3wth.com' },
  { name: 'Skills', href: 'https://skills.n3wth.com' },
  { name: 'UI', href: 'https://ui.n3wth.com' },
  { name: 'Garden', href: 'https://garden.n3wth.com' },
]

const DEFAULT_LEGAL: FooterLink[] = [
  { label: 'Terms', href: '/terms' },
  { label: 'Privacy', href: '/privacy' },
]

export interface FooterProps extends HTMLAttributes<HTMLElement> {
  /** Site ecosystem links. Defaults to n3wth ecosystem. */
  sites?: FooterSite[]
  /** Name of the current site to highlight (renders as text instead of link). */
  currentSite?: string
  /** Legal/bottom links. Defaults to Terms + Privacy. */
  legalLinks?: FooterLink[]
  /** Copyright text. Defaults to current year + Oliver Newth. */
  copyright?: string
  /** Optional logo for rich footer layout (shows sections grid above sites bar). */
  logo?: ReactNode
  /** Optional description shown below logo in rich layout. */
  description?: string
  /** Optional section columns for rich footer layout. */
  sections?: FooterSection[]
  /** Optional social icon links shown below description in rich layout. */
  socialLinks?: Array<{
    label: string
    href: string
    icon: ReactNode
  }>
  /** @deprecated Use legalLinks instead. */
  bottomLinks?: FooterLink[]
}

export function Footer({
  sites = DEFAULT_SITES,
  currentSite,
  legalLinks,
  copyright,
  logo,
  description,
  sections = [],
  socialLinks = [],
  bottomLinks,
  className,
  ...props
}: FooterProps) {
  const year = new Date().getFullYear()
  const resolvedCopyright = copyright ?? `\u00A9 ${year} Oliver Newth`
  const resolvedLegal = legalLinks ?? bottomLinks ?? DEFAULT_LEGAL
  const hasSections = sections.length > 0

  return (
    <footer
      className={cn(
        'border-t border-[var(--glass-border)]',
        'bg-[var(--color-bg)]',
        className
      )}
      {...props}
    >
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        {/* Rich layout: sections + brand */}
        {hasSections && (
          <div className="py-16">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-4 lg:grid-cols-5">
              <div className="md:col-span-2 lg:col-span-2">
                {logo && <div className="mb-4">{logo}</div>}
                {description && (
                  <p className="text-sm text-[var(--color-grey-400)] max-w-sm leading-relaxed">
                    {description}
                  </p>
                )}
                {socialLinks.length > 0 && (
                  <div className="flex items-center gap-4 mt-6">
                    {socialLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        className={cn(
                          'text-[var(--color-grey-600)]',
                          'hover:text-[var(--color-white)]',
                          'transition-colors duration-200'
                        )}
                        aria-label={link.label}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.icon}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {sections.map((section) => (
                <div key={section.title}>
                  <h4 className="label mb-4">{section.title}</h4>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          className="text-sm text-[var(--color-grey-400)] hover:text-[var(--color-white)] transition-colors duration-200"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom bar: sites + copyright + legal */}
        <div className={cn(
          'flex flex-col gap-4 py-10',
          hasSections && 'border-t border-[var(--glass-border)]'
        )}>
          <nav className="flex items-center gap-4">
            {sites.map((site, i) => (
              <span key={site.name} className="flex items-center gap-4">
                {site.name === currentSite ? (
                  <span className="text-sm font-medium text-[var(--color-white)]">
                    {site.name}
                  </span>
                ) : (
                  <a
                    href={site.href}
                    className="text-sm text-[var(--color-grey-500)] hover:text-[var(--color-white)] transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {site.name}
                  </a>
                )}
                {i < sites.length - 1 && (
                  <span className="text-[var(--color-grey-700)]">/</span>
                )}
              </span>
            ))}
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p className="text-xs text-[var(--color-grey-600)]">
              {resolvedCopyright}
            </p>
            {resolvedLegal.length > 0 && (
              <nav className="flex items-center gap-4 text-xs text-[var(--color-grey-500)]">
                {resolvedLegal.map((link, i) => (
                  <span key={link.href} className="flex items-center gap-4">
                    <a
                      href={link.href}
                      className="hover:text-[var(--color-white)] transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                    {i < resolvedLegal.length - 1 && (
                      <span className="text-[var(--color-grey-700)]">/</span>
                    )}
                  </span>
                ))}
              </nav>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
