import { DemoSection, DemoBlock } from './DemoSection'
import { CodeSnippet } from './CodeSnippet'
import { PropsTable } from './PropsTable'

export function OrganismsSection() {
  return (
    <DemoSection id="organisms" title="Organisms" description="Complex UI components composed of molecules and atoms for page-level structure.">
      <DemoBlock title="Nav">
        <p className="text-sm text-[var(--color-grey-400)] mb-4">
          Fixed navigation bar with logo, links, theme toggle, and responsive mobile drawer. See the top of this page for a live example.
        </p>
        <CodeSnippet code={`<Nav
  logo="@n3wth/ui"
  logoHref="/"
  items={[
    { label: 'Docs', href: '/docs' },
    { label: 'GitHub', href: 'https://github.com/n3wth/ui', external: true },
  ]}
  theme={theme}
  onThemeToggle={toggleTheme}
/>`} />

        <PropsTable
          props={[
            { name: 'logo', type: 'ReactNode', description: 'The brand logo or text.' },
            { name: 'logoHref', type: 'string', defaultValue: "'/'", description: 'Link for the logo.' },
            { name: 'items', type: 'NavItem[]', defaultValue: '[]', description: 'Navigation links. Each item has label, href, isActive, external.' },
            { name: 'theme', type: "'dark' | 'light'", defaultValue: "'dark'", description: 'Current theme state.' },
            { name: 'onThemeToggle', type: '() => void', description: 'Callback function for theme switching.' },
            { name: 'showThemeToggle', type: 'boolean', defaultValue: 'true', description: 'Whether to show the theme toggle button.' },
            { name: 'fixed', type: 'boolean', defaultValue: 'false', description: 'If true, nav is fixed to the top.' },
            { name: 'hideOnScroll', type: 'boolean', defaultValue: 'false', description: 'If true, nav hides when scrolling down.' },
          ]}
        />
      </DemoBlock>

      <DemoBlock title="Hero">
        <p className="text-sm text-[var(--color-grey-400)] mb-4">
          Hero section with animated gradient text, badge, description, and CTA buttons. Scroll to the top of the page for the live demo.
        </p>
        <CodeSnippet code={`<Hero
  badge="v0.4.0"
  title="Flat. Minimal."
  description="Atomic design system for Newth sites."
  ctas={[
    { label: 'Get Started', href: '#get-started' },
    { label: 'GitHub', href: 'https://github.com/n3wth/ui', variant: 'secondary' },
  ]}
/>`} />

        <PropsTable
          props={[
            { name: 'title', type: 'string | ReactNode', description: 'Main headline.' },
            { name: 'description', type: 'string', description: 'Subtext below the title.' },
            { name: 'badge', type: 'string', description: 'Small badge text shown above the title.' },
            { name: 'ctas', type: 'CtaProps[]', description: 'Array of Call to Action buttons.' },
            { name: 'className', type: 'string', description: 'Additional CSS classes.' },
          ]}
        />
      </DemoBlock>

      <DemoBlock title="Section">
        <p className="text-sm text-[var(--color-grey-400)] mb-4">
          Content wrapper with optional alternate background. Used throughout this demo site.
        </p>
        <CodeSnippet code={`<Section id="features" variant="alternate">
  <SectionHeader
    title="Features"
    description="Everything you need"
  />
  {/* content */}
</Section>`} />

        <PropsTable
          props={[
            { name: 'id', type: 'string', description: 'HTML ID for scroll targeting.' },
            { name: 'variant', type: "'default' | 'alternate'", defaultValue: "'default'", description: 'Background style.' },
            { name: 'children', type: 'ReactNode', description: 'Section content.' },
            { name: 'className', type: 'string', description: 'Additional CSS classes.' },
          ]}
        />
      </DemoBlock>

      <DemoBlock title="Footer">
        <p className="text-sm text-[var(--color-grey-400)] mb-4">
          Multi-column footer with sections, links, logo, and theme toggle. Scroll to the bottom of this page for the live example.
        </p>
        <CodeSnippet code={`<Footer
  logo={<span className="font-display text-lg">@n3wth/ui</span>}
  description="A flat, minimal design system."
  sections={[
    {
      title: 'Docs',
      links: [
        { label: 'Get Started', href: '#' },
        { label: 'Components', href: '#' },
      ],
    },
  ]}
  theme={theme}
  onThemeToggle={toggleTheme}
/>`} />

        <PropsTable
          props={[
            { name: 'logo', type: 'ReactNode', description: 'Brand logo for the footer.' },
            { name: 'description', type: 'string', description: 'Small blurb below the logo.' },
            { name: 'sections', type: 'FooterSection[]', description: 'Columns of links.' },
            { name: 'theme', type: "'dark' | 'light'", description: 'Current theme state.' },
            { name: 'onThemeToggle', type: '() => void', description: 'Theme toggle callback.' },
          ]}
        />
      </DemoBlock>
    </DemoSection>
  )
}
