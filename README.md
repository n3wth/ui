# n3wth/ui

Atomic design system. Flat, minimal, iOS-inspired. No shadows, no glows, just clean glass morphism.

**[ui.newth.ai](https://ui.newth.ai)** / **[npm](https://www.npmjs.com/package/@n3wth/ui)**

## Install

```bash
npm install @n3wth/ui
```

```tsx
import { Button, Card, Nav } from '@n3wth/ui'
import '@n3wth/ui/styles'
```

## Components

**Atoms** - Button, Badge, Input, Icon, AnimatedText, HamburgerIcon, NoiseOverlay, ScrollIndicator

**Molecules** - Card, NavLink, CommandBox, ThemeToggle, MobileDrawer

**Organisms** - Nav, Hero, Section, Footer

## Hooks

`useTheme` - Dark/light mode with system detection

`useMediaQuery` - Responsive breakpoints

`useKeyboardShortcuts` - Keyboard handler

`useReducedMotion` - Motion preference detection

## Tailwind Preset

```js
// tailwind.config.js
export default {
  presets: [require('@n3wth/ui/tailwind')],
  content: ['./node_modules/@n3wth/ui/dist/**/*.js']
}
```

## Development

```bash
npm run dev          # Watch library
npm run demo         # Demo at localhost:5173
npm run build        # Build to dist/
```

## License

MIT
