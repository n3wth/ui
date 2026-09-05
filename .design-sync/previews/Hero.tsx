import { Hero } from '@n3wth/ui'

// Hero's title/description use var(--color-white) foreground tokens and is
// designed to sit on the app's dark canvas (same pattern as Toast) — needs
// a dark backdrop to read correctly in an isolated capture.
const backdrop = { background: 'var(--color-bg)', padding: 8, borderRadius: 12 }

export function Default() {
  return (
    <div style={backdrop}>
      <Hero
        badge="v0.9.0"
        title="Flat. Minimal. Fast."
        description="Atomic design system for Newth sites — components, tokens, and patterns shared across the ecosystem."
        ctas={[
          { label: 'Get Started', href: '#get-started' },
          { label: 'View on GitHub', href: 'https://github.com/n3wth/ui', variant: 'secondary' },
        ]}
      />
    </div>
  )
}

export function LeftAligned() {
  return (
    <div style={backdrop}>
      <Hero
        align="left"
        badge="New"
        title="Built for real products"
        description="Every component ships fully typed, themeable, and accessible out of the box."
        ctas={[{ label: 'Read the docs', href: '#docs' }]}
      />
    </div>
  )
}

export function Large() {
  return (
    <div style={backdrop}>
      <Hero
        size="large"
        title="Design once. Ship everywhere."
        ctas={[
          { label: 'Install', href: '#install' },
          { label: 'Browse components', href: '#components', variant: 'ghost' },
        ]}
      />
    </div>
  )
}

export function NoGradient() {
  return (
    <div style={backdrop}>
      <Hero
        gradient={false}
        badge="Stable"
        title="Plain title, no gradient text"
        description="Some brands want a solid color title instead of the default gradient treatment."
        ctas={[{ label: 'Learn more', href: '#learn-more' }]}
      />
    </div>
  )
}
