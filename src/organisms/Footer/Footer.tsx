import { type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../utils/cn'
import { NavLink } from '../../molecules/NavLink'

export interface FooterLink {
  label: string
  href: string
}

export interface FooterSection {
  title: string
  links: FooterLink[]
}

export interface FooterProps extends HTMLAttributes<HTMLElement> {
  logo?: ReactNode
  description?: string
  sections?: FooterSection[]
  bottomLinks?: FooterLink[]
  copyright?: string
  socialLinks?: Array<{
    label: string
    href: string
    icon: ReactNode
  }>
}

export function Footer({
  logo,
  description,
  sections = [],
  bottomLinks = [],
  copyright,
  socialLinks = [],
  className,
  ...props
}: FooterProps) {
  return (
    <footer
      className={cn(
        'border-t border-[var(--glass-border)]',
        'bg-[var(--color-bg)]',
        className
      )}
      {...props}
    >
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand Column */}
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

          {/* Link Sections */}
          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="label mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <NavLink href={link.href} variant="default">
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        {(copyright || bottomLinks.length > 0) && (
          <div className="mt-16 pt-8 border-t border-[var(--glass-border)] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {copyright && (
              <p className="text-xs text-[var(--color-grey-600)]">{copyright}</p>
            )}
            {bottomLinks.length > 0 && (
              <div className="flex flex-wrap items-center gap-6">
                {bottomLinks.map((link) => (
                  <NavLink key={link.href} href={link.href} variant="default">
                    <span className="text-xs">{link.label}</span>
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </footer>
  )
}
