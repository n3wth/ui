import { Footer, Icon } from '@n3wth/ui'

export function Minimal() {
  return <Footer currentSite="n3wth/ui" />
}

export function Rich() {
  return (
    <Footer
      logo={
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600 }}>
          @n3wth/ui
        </span>
      }
      description="A flat, minimal design system for modern web applications."
      currentSite="n3wth/ui"
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
          ],
        },
      ]}
      socialLinks={[
        {
          label: 'GitHub',
          href: 'https://github.com/n3wth/ui',
          icon: <Icon name="github" size="sm" />,
        },
        {
          label: 'Email',
          href: 'mailto:hello@n3wth.com',
          icon: <Icon name="mail" size="sm" />,
        },
      ]}
    />
  )
}
