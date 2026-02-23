# CSS Utilities

These classes are available when you import `@n3wth/ui/styles`.

## Glass effects

| Class | Description |
|---|---|
| `.glass-card` | Transparent card with glass border, 20px radius |
| `.glass-pill` | Rounded pill with glass bg, backdrop blur, scale animation |
| `.glass-nav` | Solid navigation background |
| `.command-box` | Glass input/command area with hover state |

## Typography

| Class | Description |
|---|---|
| `.label` | 11px uppercase, letter-spaced, grey-400 |
| `.index-num` | 10px tabular-nums, grey-600 |
| `.text-glow` | Text shadow for readability over backgrounds |
| `.text-glow-subtle` | Lighter text shadow |
| `.hero-gradient-text` | Animated gradient text fill |

## Focus and interaction

| Class | Description |
|---|---|
| `.focus-ring` | 2px accent outline on `:focus-visible` |
| `.focus-glow` | Box shadow glow on `:focus-within` |
| `.glow-white` | Hover glow for primary elements |
| `.glow-accent` | Hover glow with accent color |
| `.gradient-border` | Gradient border on hover |
| `.shine-sweep` | Diagonal light sweep on hover |
| `.copy-btn` | Copy button with copied state |
| `.link-hover` | Animated underline on hover |

## Animation

| Class | Description |
|---|---|
| `.animate-in` | Fade-up entrance (0.6s) |
| `.card-enter` | Card entrance with scale (0.4s) |
| `.page-enter` | Page enter transition |
| `.page-exit` | Page exit transition |
| `.skeleton-shimmer` | Loading shimmer pulse |
| `.skeleton-exit` | Skeleton fade-out |
| `.workflow-node-enter` | Scale-bounce entrance |
| `.connection-line` | SVG line draw animation |

## Layout

| Class | Description |
|---|---|
| `.line-clamp-1` / `.line-clamp-2` / `.line-clamp-3` | Text truncation to N lines |
| `.scrollbar-hidden` | Hide scrollbar (cross-browser) |
| `.truncate` | Single-line text truncation |
| `.sr-only` | Screen reader only (visually hidden) |

## Mobile and responsive

| Class | Description |
|---|---|
| `.touch-target` | 44px minimum size (WCAG 2.5.5 AAA) |
| `.touch-target-sm` | 36px minimum size |
| `.safe-area-top` / `.safe-area-bottom` / etc. | Device safe area insets |
| `.safe-area-inset` | All safe area insets |
| `.min-h-screen-mobile` | 100dvh (accounts for mobile browser chrome) |
| `.h-screen-mobile` | 100dvh |
| `.container-mobile` | Responsive horizontal padding |
| `.gap-responsive` | 1rem / 1.5rem / 2rem at breakpoints |
| `.p-responsive` | 1rem / 1.5rem / 2rem at breakpoints |
| `.stack-mobile` | Column on mobile, row on md+ |
| `.landscape-compact` | Reduced padding in landscape |
| `.landscape-hidden` | Hidden in landscape orientation |

## Fluid text (mobile only, < 768px)

| Class | Range |
|---|---|
| `.text-fluid-sm` | 0.75rem - 0.875rem |
| `.text-fluid-base` | 0.875rem - 1rem |
| `.text-fluid-lg` | 1rem - 1.25rem |
| `.text-fluid-xl` | 1.25rem - 1.5rem |
| `.text-fluid-2xl` | 1.5rem - 2rem |
| `.text-fluid-3xl` | 1.875rem - 3rem |

## Accessibility

All animations and transitions are disabled when `prefers-reduced-motion: reduce` is active. Glass borders are thickened and focus outlines widened in `prefers-contrast: high` mode.

On touch devices (`hover: none, pointer: coarse`), hover effects are replaced with active/tap states. iOS tap highlight color is set automatically.

Input zoom on iOS is prevented by enforcing `font-size: 16px` on form fields at mobile widths.
