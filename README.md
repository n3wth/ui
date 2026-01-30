# @n3wth/ui

Atomic design system for Newth sites - flat, minimal, iOS-inspired.

## Publishing

```bash
npm run release:patch   # 0.3.2 → 0.3.3
npm run release:minor   # 0.3.2 → 0.4.0
npm run release:major   # 0.3.2 → 1.0.0
```

Single command: bumps version, commits, pushes, tags, creates GitHub release with auto-generated notes. GitHub Actions then publishes to npm via OIDC trusted publishing.

## Development

```bash
npm run dev          # Watch mode for library
npm run demo         # Run demo app at localhost:5173
npm run build        # Build library to dist/
npm run demo:build   # Build demo app for Vercel
```

## Structure

- `src/atoms/` - Basic building blocks (Button, Badge, Input, Icon, etc.)
- `src/molecules/` - Composite components (Card, NavLink, MobileDrawer, etc.)
- `src/organisms/` - Complex components (Nav, Footer, Hero, Section)
- `src/hooks/` - React hooks (useTheme, useMediaQuery, useKeyboardShortcuts)
- `src/tokens/` - Design tokens (colors, typography, spacing, effects)
- `demo/` - Demo app deployed to ui.newth.ai

## Adding Components

1. Create component folder: `src/atoms/ComponentName/`
2. Create files: `ComponentName.tsx`, `index.ts`
3. Export from `src/atoms/index.ts` (or molecules/organisms)
4. Export from `src/index.ts`
5. Run `npm run release:patch`

## Consumers

- `newthai` (newth.ai) - uses @n3wth/ui components
