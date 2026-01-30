# @n3wth/ui

Atomic design system for Newth sites - flat, minimal, iOS-inspired.

## Publishing

**GitHub Actions workflow** triggers on release creation (`on: release`).

Uses **OIDC trusted publishing** - no npm token needed. Authentication happens via GitHub's OIDC provider.

**One-time setup on npmjs.com**:
1. Go to https://www.npmjs.com/package/@n3wth/ui/access
2. Find "Trusted Publisher" section → Select GitHub Actions
3. Configure: org=`n3wth`, repo=`n3wth-ui`, workflow=`publish.yml`

**To publish a new version**:
1. Update version in `package.json`
2. Commit and push to main
3. Create a GitHub release: `gh release create v0.x.x --title "v0.x.x" --notes "changelog"`
4. Workflow publishes to npm automatically

**Manual publish** (if needed):
```bash
npm publish --access public --otp=<code>
```

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
5. Bump version, commit, create release

## Consumers

- `newthai` (newth.ai) - uses @n3wth/ui components
