import { Nav } from '@n3wth/ui'

const items = [
  { label: 'Components', href: '/', isActive: true },
  { label: 'Docs', href: '/docs/getting-started' },
  { label: 'GitHub', href: 'https://github.com/n3wth/ui', external: true },
]

export function Default() {
  return (
    <Nav logo="@n3wth/ui" logoHref="/" items={items} theme="dark" onThemeToggle={() => {}} />
  )
}

export function Minimal() {
  return (
    <Nav
      logo="n3wth"
      logoHref="/"
      items={[
        { label: 'Work', href: '/work' },
        { label: 'Contact', href: '/contact' },
      ]}
      showThemeToggle={false}
    />
  )
}
