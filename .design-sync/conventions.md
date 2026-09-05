# @n3wth/ui — design system conventions

Atomic, flat, minimal, iOS-inspired React component library. This is the single
source of truth for three production sites — **n3wth.com**, **agents.n3wth.com**,
and **garden.n3wth.com** — which all consume it via `@import '@n3wth/ui/theme'`.
Build with the real exported components; don't reimplement them.

## Dark-first

The system is **dark-first**: `--color-bg` is `#08090b` and `--color-ink` is
`#f2f3f5`. The library intentionally ships **no `body` background** — the
consuming app paints the dark canvas. When composing, assume a dark surface;
light text (`var(--color-ink)`, `var(--color-white)`) and translucent tokens
(`--glass-bg`, `--glass-border`) are designed for it and are invisible on white.

## Token vocabulary (Tailwind v4 `@theme`)

Use `var(--…)` custom properties or the Tailwind utilities generated from them
(`bg-[var(--color-bg)]`, `text-[var(--color-ink)]`, `border-[var(--color-rail)]`):

- **Surfaces:** `--color-bg` #08090b, `--color-bg-soft`, `--color-bg-raise`.
- **Ink (text):** `--color-ink` (primary), `--color-ink-dim`, `--color-ink-faint`,
  `--color-ink-label`, `--color-ink-ghost` — descending emphasis.
- **Rails (hairlines/borders):** `--color-rail`, `--color-rail-strong`,
  `--color-accent-rail`.
- **Accent:** `--color-accent` (#ffffff), `--color-accent-dim`, `--color-accent-ink`.
- **Category / semantic:** `--color-sage` (success #30d158), `--color-coral`
  (error #ff6961), `--color-mint` (info #64d2ff), `--color-gold` (warning #ffd60a),
  plus `--color-success/-warning/-error/-info` and their `*-bg` tints.
- **Glass:** `--glass-bg`, `--glass-border`, `--glass-highlight`.
- A legacy Apple-style greyscale (`--color-grey-100…800`) remains for older
  components; prefer the ink/rail vocabulary above for new work.

## Type

- **Display / titles:** Mona Sans (`--font-display`, weights 200–900, variable).
- **Body / UI:** Geist Sans.
- **Code:** Geist Mono.

`@n3wth/ui/theme` ships tokens only and declares NO fonts (each app wires its
own — Geist via `next/font`, local `@font-face`, etc.); this synced bundle
includes the woff2 so previews render in the real families.

## Astryx-backed components

`Separator`, `Skeleton`, and `Card`'s surface are built on `@astryxdesign/core`.
They read their tokens from an ancestor `<Theme>`, mounted once via
`N3wthProvider` (defaults to dark mode). Wrap the app root in `N3wthProvider`.

## Structure

Atomic: **atoms** (Button, Badge, Input, Icon, Switch, Avatar, …), **molecules**
(Card, Modal, Tabs, Toast, Dropdown, Accordion, …), **organisms** (Nav, Footer,
Hero, Section). Compound components expose sub-parts (e.g. `Card` →
`CardHeader`/`CardTitle`/`CardContent`/`CardFooter`).
