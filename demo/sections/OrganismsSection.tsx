import { DemoSection, DemoBlock } from './DemoSection'
import { CodeSnippet } from './CodeSnippet'

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
      </DemoBlock>
    </DemoSection>
  )
}
