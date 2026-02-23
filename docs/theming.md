# Theming

@n3wth/ui uses CSS custom properties for theming, with dark mode as the default. Theme switching works via the `data-theme` attribute on `<html>`.

## Theme toggle

Use the `useTheme` hook to manage dark/light mode:

```tsx
import { useTheme, Nav } from '@n3wth/ui'

function App() {
  const { theme, toggleTheme, isDark } = useTheme()

  return (
    <Nav
      theme={theme}
      onThemeToggle={toggleTheme}
      showThemeToggle
      // ...
    />
  )
}
```

The hook persists the user's choice in `localStorage` and respects `prefers-color-scheme` on first visit.

## CSS custom properties

All components reference these variables. Override them in your CSS to customize the palette.

### Colors

| Variable | Dark | Light | Purpose |
|---|---|---|---|
| `--color-bg` | `#000000` | `#ffffff` | Page background |
| `--color-bg-secondary` | `#0a0a0a` | `#f5f5f7` | Secondary surfaces |
| `--color-white` | `#ffffff` | `#1d1d1f` | Primary text |
| `--color-accent` | `#ffffff` | `#1d1d1f` | Focus rings, accents |
| `--color-accent-soft` | `rgba(255,255,255,0.15)` | `rgba(0,0,0,0.1)` | Soft accent fills |

### Greys

| Variable | Dark | Light |
|---|---|---|
| `--color-grey-100` | `#f5f5f7` | `#1d1d1f` |
| `--color-grey-200` | `#e8e8ed` | `#3a3a3c` |
| `--color-grey-300` | `#c7c7cc` | `#48484a` |
| `--color-grey-400` | `#86868b` | `#636366` |
| `--color-grey-600` | `#6e6e73` | `#8e8e93` |
| `--color-grey-800` | `#1d1d1f` | `#e5e5ea` |

### Category colors

| Variable | Dark | Light | Usage |
|---|---|---|---|
| `--color-sage` | `#30d158` | `#248a3d` | Success, positive |
| `--color-coral` | `#ff6961` | `#d70015` | Error, destructive |
| `--color-mint` | `#64d2ff` | `#0071e3` | Info, links |
| `--color-gold` | `#ffd60a` | `#b25000` | Warning, attention |

### Semantic colors

| Variable | Purpose |
|---|---|
| `--color-success` / `--color-success-bg` | Success states |
| `--color-warning` / `--color-warning-bg` | Warning states |
| `--color-error` / `--color-error-bg` | Error states |
| `--color-info` / `--color-info-bg` | Informational states |

### Glass effect

| Variable | Dark | Light |
|---|---|---|
| `--glass-bg` | `rgba(255,255,255,0.05)` | `rgba(0,0,0,0.03)` |
| `--glass-border` | `rgba(255,255,255,0.1)` | `rgba(0,0,0,0.08)` |
| `--glass-highlight` | `rgba(255,255,255,0.15)` | `rgba(0,0,0,0.12)` |

## Typography

| Variable | Value |
|---|---|
| `--font-display` | Mona Sans (variable, 200-900) |
| `--font-sans` | Geist Sans (400, 500, 600) |
| `--font-mono` | Geist Mono (400, 500) |

## Custom theme example

Override variables in your CSS to apply a custom palette:

```css
:root,
[data-theme='dark'] {
  --color-bg: #0f172a;
  --color-white: #e2e8f0;
  --color-accent: #3b82f6;
  --color-sage: #22c55e;
  --glass-bg: rgba(255, 255, 255, 0.03);
  --glass-border: rgba(255, 255, 255, 0.06);
}

[data-theme='light'] {
  --color-bg: #ffffff;
  --color-white: #0f172a;
  --color-accent: #2563eb;
}
```

## TypeScript tokens

Design tokens are also available as TypeScript exports for use in JS:

```tsx
import { colors, typography, spacing, motion, effects } from '@n3wth/ui'

// colors.dark.category.sage → '#30d158'
// colors.light.bg → '#ffffff'
// typography.fontDisplay → "'Mona Sans', system-ui, sans-serif"
```
