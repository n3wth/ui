# Getting Started

## Prerequisites

- Node.js 18+
- React 18 or 19
- Tailwind CSS 4

## Install

```bash
npm install @n3wth/ui
```

## Setup

### 1. Import styles

Add the global stylesheet to your app entry point:

```tsx
import '@n3wth/ui/styles'
```

This provides:
- Font faces (Mona Sans, Geist Sans, Geist Mono)
- CSS custom properties for theming
- Glass utility classes
- Animation keyframes
- Reduced motion and high contrast support

### 2. Configure Tailwind CSS 4

Add the `@source` directive so Tailwind scans the library's class names:

```css
@import 'tailwindcss';
@import '@n3wth/ui/styles';

/* Required: scan @n3wth/ui for Tailwind classes */
@source "../node_modules/@n3wth/ui/dist";
```

Without this directive, component styles that use Tailwind classes won't be included in your CSS output.

### 3. Use components

```tsx
import { Button, Card, CardHeader, CardTitle, CardContent } from '@n3wth/ui'
import '@n3wth/ui/styles'

export default function App() {
  return (
    <Card variant="glass">
      <CardHeader>
        <CardTitle>Hello</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="primary">Click me</Button>
      </CardContent>
    </Card>
  )
}
```

## Optional: GSAP animations

Some hooks (`useScrollReveal`, `useCountUp`, `useStaggerList`, `usePageTransition`, `useTextReveal`, `useButtonPulse`) and the `AnimatedText` component require GSAP as a peer dependency:

```bash
npm install gsap
```

GSAP is optional. All other components and hooks work without it.

## Fonts

The stylesheet references font files from `/fonts/`. If you're self-hosting, copy the font files from `node_modules/@n3wth/ui/public/fonts/` to your public directory. The required files:

- `MonaSans-Variable.woff2` (display/headings)
- `MonaSans-Variable-Italic.woff2`
- `Geist-Regular.woff2` (body)
- `Geist-Medium.woff2`
- `Geist-SemiBold.woff2`
- `GeistMono-Regular.woff2` (code)
- `GeistMono-Medium.woff2`

If fonts fail to load, the system font stack (`system-ui, sans-serif`) is used as a fallback.

## Quick example: full page

```tsx
import { Nav, Hero, Section, SectionHeader, Footer, useTheme } from '@n3wth/ui'
import '@n3wth/ui/styles'

function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-white)]">
      <Nav
        logo="My App"
        items={[
          { label: 'Features', href: '#features' },
          { label: 'GitHub', href: 'https://github.com', external: true },
        ]}
        theme={theme}
        onThemeToggle={toggleTheme}
        fixed
        hideOnScroll
      />

      <Hero
        title="Build fast"
        description="A flat, minimal design system."
        ctas={[{ label: 'Get Started', href: '#features' }]}
      />

      <Section id="features">
        <SectionHeader title="Features" description="Everything you need." />
      </Section>

      <Footer
        logo="My App"
        description="Built with @n3wth/ui"
        copyright="2026 My App"
      />
    </div>
  )
}
```

## Container alignment

All sections use consistent container constraints. Match these across your layout:

```tsx
<div className="mx-auto max-w-6xl px-6 md:px-12">
  {/* Your content */}
</div>
```

The `Nav`, `Footer`, and `Section` components handle this internally.
