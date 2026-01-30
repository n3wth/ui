# @n3wth/ui

[![npm version](https://img.shields.io/npm/v/@n3wth/ui.svg)](https://www.npmjs.com/package/@n3wth/ui)
[![npm downloads](https://img.shields.io/npm/dm/@n3wth/ui.svg)](https://www.npmjs.com/package/@n3wth/ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Atomic design system for Newth sites. Flat, minimal, iOS-inspired. No shadows, no glows, just clean glass morphism.

**Demo**: [ui.newth.ai](https://ui.newth.ai)

## Highlights

- Glass morphism tokens with a Tailwind CSS preset
- Dark/light themes with system preference sync
- Accessibility helpers: keyboard shortcuts + reduced motion support

## Installation

```bash
npm install @n3wth/ui
```

### Peer Dependencies

Requires React 18+ and React DOM:

```bash
npm install react react-dom
```

## Quick Start

```tsx
import { Button, Card, Nav } from '@n3wth/ui'
import '@n3wth/ui/styles'
```

### Tailwind CSS Preset

Include the design tokens in your Tailwind config:

```js
// tailwind.config.js
export default {
  presets: [require('@n3wth/ui/tailwind')],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@n3wth/ui/dist/**/*.js'
  ]
}
```

## Components

### Atoms

Basic building blocks:

| Component | Description |
|-----------|-------------|
| `Button` | Primary, secondary, ghost, glass variants with loading state |
| `Badge` | Default, sage, coral, mint, gold, outline variants |
| `Input` | Text input with glass variant, icons, and error state |
| `Icon` | 20+ SVG icons (arrows, check, x, copy, search, github, etc.) |
| `AnimatedText` | Text with entrance animations |
| `HamburgerIcon` | Animated menu icon |
| `NoiseOverlay` | Subtle noise texture overlay |
| `ScrollIndicator` | Scroll progress indicator |

### Molecules

Composite components:

| Component | Description |
|-----------|-------------|
| `Card` | Container with header, content, footer. Glass/interactive variants |
| `NavLink` | Navigation link with underline/pill styles |
| `CommandBox` | Copy-to-clipboard code display |
| `ThemeToggle` | Dark/light mode toggle |
| `MobileDrawer` | Slide-out mobile navigation |

### Organisms

Complex UI sections:

| Component | Description |
|-----------|-------------|
| `Nav` | Fixed navigation with mobile menu and theme toggle |
| `Hero` | Hero section with badge, title, description, CTAs |
| `Section` | Content section wrapper with header |
| `Footer` | Multi-column footer with sections |

## Hooks

```tsx
import { useTheme, useMediaQuery, useKeyboardShortcuts, useReducedMotion } from '@n3wth/ui'
```

| Hook | Description |
|------|-------------|
| `useTheme` | Dark/light theme management with system preference detection |
| `useMediaQuery` | Responsive breakpoint detection |
| `useKeyboardShortcuts` | Keyboard shortcut handler |
| `useReducedMotion` | Respects user's motion preferences |

## Design Tokens

The Tailwind preset includes:

- **Colors**: Semantic color palette with dark mode support
- **Typography**: Display and body font families
- **Spacing**: Consistent spacing scale
- **Effects**: Glass morphism and blur effects

## Customization

Override the CSS variables or extend the Tailwind preset to match your brand.

```css
:root {
  --color-bg: #0b0b0c;
}
```

## Development

```bash
# Install dependencies
npm install

# Watch mode for library development
npm run dev

# Run demo app at localhost:5173
npm run demo

# Build library to dist/
npm run build

# Build demo for deployment
npm run demo:build

# Lint
npm run lint
```

## Project Structure

```
src/
  atoms/        # Button, Badge, Input, Icon, etc.
  molecules/    # Card, NavLink, CommandBox, etc.
  organisms/    # Nav, Hero, Footer, Section
  hooks/        # useTheme, useMediaQuery, etc.
  tokens/       # Design tokens (colors, typography)
demo/           # Demo app (ui.newth.ai)
```

## Usage Examples

### Button

```tsx
import { Button, Icon } from '@n3wth/ui'

<Button variant="primary">Primary</Button>
<Button variant="glass" isLoading>Loading</Button>
<Button leftIcon={<Icon name="github" />}>GitHub</Button>
```

### Card

```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@n3wth/ui'

<Card variant="glass">
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content here</CardContent>
</Card>
```

### Theme

```tsx
import { useTheme, ThemeToggle } from '@n3wth/ui'

function App() {
  const { theme, toggleTheme } = useTheme()
  return <ThemeToggle theme={theme} onToggle={toggleTheme} />
}
```

## Browser Support

Supports all modern browsers. Uses CSS custom properties and backdrop-filter for glass effects.

## License

MIT
