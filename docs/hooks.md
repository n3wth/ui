# Hooks

## useTheme

Manages dark/light mode with localStorage persistence and system preference detection.

```tsx
import { useTheme } from '@n3wth/ui'

function App() {
  const { theme, toggleTheme, setTheme, isDark, isLight } = useTheme()

  return (
    <button onClick={toggleTheme}>
      Current: {theme}
    </button>
  )
}
```

**Options:**

| Option | Type | Default | Description |
|---|---|---|---|
| `defaultTheme` | `'dark' \| 'light'` | `'dark'` | Initial theme |
| `storageKey` | `string` | `'n3wth-theme'` | localStorage key |
| `attribute` | `string` | `'data-theme'` | HTML attribute set on `<html>` |

**Returns:**

| Property | Type | Description |
|---|---|---|
| `theme` | `'dark' \| 'light'` | Current theme |
| `setTheme` | `(theme: Theme) => void` | Set specific theme |
| `toggleTheme` | `() => void` | Toggle between dark/light |
| `isDark` | `boolean` | True when dark |
| `isLight` | `boolean` | True when light |

## useMediaQuery

Responds to CSS media queries. SSR-safe (returns `false` or custom default on server).

```tsx
import { useMediaQuery, useIsMobile, useBreakpoint } from '@n3wth/ui'

function Component() {
  const isWide = useMediaQuery('(min-width: 1200px)')
  const isMobile = useIsMobile()
  const breakpoint = useBreakpoint() // 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}
```

**Helper hooks:**

| Hook | Query | SSR Default |
|---|---|---|
| `useIsMobile()` | `max-width: 767px` | `true` |
| `useIsTablet()` | `768px - 1023px` | `false` |
| `useIsDesktop()` | `min-width: 1024px` | `false` |
| `useIsLargeDesktop()` | `min-width: 1280px` | `false` |
| `useBreakpoint()` | All breakpoints | `'xs'` |
| `useIsTouchDevice()` | `hover: none, pointer: coarse` | `false` |
| `useIsPortrait()` | `orientation: portrait` | `true` |
| `useIsLandscape()` | `orientation: landscape` | `false` |

**Breakpoints constant:**

```tsx
import { BREAKPOINTS } from '@n3wth/ui'
// { sm: 640, md: 768, lg: 1024, xl: 1280, '2xl': 1536 }
```

## useKeyboardShortcuts

Registers global keyboard shortcuts with modifier key support.

```tsx
import { useKeyboardShortcuts, getModifierKey, formatShortcut } from '@n3wth/ui'

function App() {
  useKeyboardShortcuts([
    { keys: ['meta', 'k'], handler: () => openSearch() },
    { keys: ['escape'], handler: () => closePanel() },
  ])

  const mod = getModifierKey() // 'cmd' on Mac, 'ctrl' on others
  const label = formatShortcut(['meta', 'k']) // '⌘K'
}
```

**Options:**

| Option | Type | Default | Description |
|---|---|---|---|
| `disabled` | `boolean` | `false` | Disable all shortcuts |
| `preventDefault` | `boolean` | `true` | Prevent default browser behavior |

## useReducedMotion

Detects the user's motion preference.

```tsx
import { useReducedMotion, useMotionConfig, usePrefersHighContrast } from '@n3wth/ui'

function Component() {
  const prefersReduced = useReducedMotion()
  const motionConfig = useMotionConfig()
  const highContrast = usePrefersHighContrast()
}
```

## useToast

Toast notification system. Requires `ToastProvider` at the app root.

```tsx
import { ToastProvider, useToast } from '@n3wth/ui'

// Root
<ToastProvider maxToasts={5} position="top-right">
  <App />
</ToastProvider>

// Component
function MyComponent() {
  const { toast, dismiss, dismissAll } = useToast()

  const notify = () => {
    toast.success({ title: 'Done', description: 'Item saved', duration: 3000 })
  }
}
```

**Toast methods:**

| Method | Description |
|---|---|
| `toast({ title, description, variant, duration, icon })` | Generic toast |
| `toast.success(options)` | Green success toast |
| `toast.error(options)` | Red error toast |
| `toast.warning(options)` | Gold warning toast |
| `toast.info(options)` | Blue info toast |
| `dismiss(id)` | Dismiss specific toast |
| `dismissAll()` | Dismiss all toasts |

**Options:**

| Option | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | - | Toast heading |
| `description` | `string` | - | Toast body |
| `variant` | `'default' \| 'success' \| 'error' \| 'warning' \| 'info'` | `'default'` | Color variant |
| `duration` | `number` | `5000` | Auto-dismiss time (ms) |
| `icon` | `ReactNode` | - | Custom icon |

## Animation hooks (GSAP)

These hooks require `gsap` as a peer dependency. All respect `prefers-reduced-motion`.

### useScrollReveal

Scroll-triggered entrance animations.

```tsx
import { useScrollReveal } from '@n3wth/ui'

function Component() {
  const ref = useScrollReveal({
    direction: 'up',
    duration: 0.8,
    delay: 0,
    stagger: 0.1,
    distance: 40,
  })

  return (
    <div ref={ref}>
      <div>Animates in</div>
      <div>Staggered</div>
    </div>
  )
}
```

| Option | Type | Default | Description |
|---|---|---|---|
| `direction` | `'up' \| 'down' \| 'left' \| 'right'` | `'up'` | Entrance direction |
| `duration` | `number` | `0.8` | Animation duration (seconds) |
| `delay` | `number` | `0` | Start delay |
| `stagger` | `boolean \| number` | `0.1` | Child stagger interval |
| `distance` | `number` | `40` | Slide distance (px) |

### useCountUp

Animate a number from 0 to a target value.

```tsx
import { useCountUp } from '@n3wth/ui'

function Stat() {
  const { ref, value } = useCountUp({ end: 1234, duration: 2 })
  return <span ref={ref}>{value}</span>
}
```

### useStaggerList

Staggered entrance animation for list items.

```tsx
import { useStaggerList } from '@n3wth/ui'

function List() {
  const ref = useStaggerList({ stagger: 0.05, duration: 0.4 })
  return (
    <ul ref={ref}>
      <li>Item 1</li>
      <li>Item 2</li>
    </ul>
  )
}
```

### usePageTransition

Page enter/exit animations for route transitions.

### useTextReveal

Character-by-character text reveal animation.

### useButtonPulse

Attention-grabbing pulse animation for CTA buttons.
