# @n3wth/ui - Claude Code Instructions

## Overview

Flat, minimal design system for n3wth projects. Built on Tailwind CSS 4 with iOS-inspired aesthetics.

## Installation

```bash
npm install @n3wth/ui
```

```tsx
import '@n3wth/ui/styles'
```

## Key Components

### Nav

Fixed navigation bar with hide-on-scroll behavior. Used across n3wth, skills, and ui sites.

```tsx
import { Nav } from '@n3wth/ui'

<Nav
  logo="n3wth"
  logoHref="/"
  items={[
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'GitHub', href: 'https://github.com/n3wth', external: true },
  ]}
  fixed           // Position fixed at top
  hideOnScroll    // Hide on scroll down, show on scroll up
  showThemeToggle // Show theme toggle (requires onThemeToggle)
  theme="dark"
  onThemeToggle={() => {}}
/>
```

**Props:**
- `logo` - ReactNode for the logo
- `logoHref` - Link for logo click (default: "/")
- `items` - Array of `{ label, href, isActive?, external? }`
- `fixed` - Fixed position at top
- `hideOnScroll` - Smooth scroll-based visibility
- `theme` - "dark" | "light"
- `onThemeToggle` - Theme toggle callback
- `showThemeToggle` - Show/hide theme toggle (default: true)

**Alignment:** Nav content uses `max-w-6xl mx-auto px-6 md:px-12` on the inner container. Ensure your page sections use the same padding pattern for alignment.

### Tailwind v4 Integration

When using @n3wth/ui components, add the `@source` directive to scan component classes:

```css
@import 'tailwindcss';
@import '@n3wth/ui/styles';

/* Required: scan @n3wth/ui for Tailwind classes */
@source "../node_modules/@n3wth/ui/dist";
```

### CSS Custom Properties

Components use CSS variables for theming. Define these in your `:root`:

```css
:root {
  --color-bg: #000000;
  --color-white: #ffffff;
  --color-grey-400: #86868b;
  --color-accent: #ffffff;
}
```

The `@n3wth/ui/styles` import provides default values.

## Component Patterns

### Container Alignment

All sections should use consistent container styling:

```tsx
// Page section - padding on inner container to match Nav/Footer
<div className="mx-auto max-w-6xl px-6 md:px-12">
  {/* Content */}
</div>

// Nav handles this internally
<Nav fixed hideOnScroll ... />
```

### Theme Toggle

```tsx
import { Nav, useTheme } from '@n3wth/ui'

function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Nav
      theme={theme}
      onThemeToggle={toggleTheme}
      // ...other props
    />
  )
}
```

## File Structure

```
src/
├── atoms/          # Button, Badge, Input, Icon, etc.
├── molecules/      # Card, NavLink, ThemeToggle, MobileDrawer
├── organisms/      # Nav, Hero, Section, Footer
├── hooks/          # useTheme, useMediaQuery, useReducedMotion
├── tokens/         # Design tokens (colors, typography, spacing)
└── styles.css      # Global styles and CSS custom properties
```

## Common Issues

### Nav items not visible
Add `@source` directive to scan @n3wth/ui classes (see Tailwind v4 Integration above).

### Colors showing as black
Ensure `:root` CSS custom properties are defined, or import `@n3wth/ui/styles`.

### Misaligned content
Use matching container constraints: `max-w-6xl mx-auto px-6 md:px-12`

## Deployment

### npm Publishing (GitHub Actions)

Publishing is automated via GitHub Actions. Do NOT use `npm publish` locally.

1. Bump version: `npm version patch` (or minor/major)
2. Push: `git push && git push --tags`
3. Create release: `gh release create v$(node -p "require('./package.json').version") --generate-notes`
4. The `.github/workflows/publish.yml` triggers on release creation and publishes to both npm and GitHub Packages

Shortcut: `npm run release:patch` does all steps at once.

### Demo Site (Vercel)

The demo site at https://ui.newth.ai deploys automatically from the `main` branch via Vercel.

- **Project:** Linked to `n3wth/ui` GitHub repo
- **Build:** Standard Vite build (`npm run build`)
- **Auto-deploy:** Every push to `main` triggers a new deployment
- **Preview:** PRs get preview deployments automatically

### Downstream Consumers

After publishing a new version, update consumers:
- `newthai` (portfolio site) - `npm install @n3wth/ui@latest`
- `r3` (website) - `npm install @n3wth/ui@latest` in `website/`

## Version History

- **v0.5.3** - Dependency updates
- **v0.5.2** - Consistent width alignment (Nav, Footer, content all use max-w-6xl px-6 md:px-12)
- **v0.5.0** - Nav hideOnScroll, alignment fixes, solid background
- **v0.4.x** - Initial Nav component, NavLink variants
- **v0.3.x** - Hero, Section, Footer organisms
