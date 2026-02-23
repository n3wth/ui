# Docs on Demo Site

**Date:** 2026-02-23
**Status:** Approved

## Goal

Render the markdown documentation files from `docs/` as pages on the demo site (ui.newth.ai), with proper routing, sidebar navigation, and styled prose that matches the design system.

## Approach

react-router v7 + @mdx-js/rollup

## Dependencies

- `react-router` -- client-side routing
- `@mdx-js/rollup` -- compile .md to React components at build time
- `remark-gfm` -- GFM tables, strikethrough
- `rehype-highlight` or `rehype-prism-plus` -- syntax highlighting

## Architecture

1. **Vite plugin**: Add `@mdx-js/rollup` to `vite.demo.config.ts` with remark/rehype plugins.
2. **Router**: Wrap App in `BrowserRouter`. Showcase at `/`, docs at `/docs/:slug`.
3. **DocsLayout**: Sidebar listing all doc pages + MDX content area.
4. **Auto-discovery**: `import.meta.glob('../docs/*.md')` for dynamic route registration.
5. **Styled prose**: CSS class mapping markdown elements to design tokens (typography, tables, code blocks).

## File Changes

- `vite.demo.config.ts` -- add mdx plugin
- `demo/main.tsx` -- wrap in BrowserRouter
- `demo/App.tsx` -- add Routes, restructure as route-based
- New: `demo/DocsLayout.tsx` -- sidebar + content wrapper
- New: `demo/docs-styles.css` -- prose/markdown styling
- Import docs from `../docs/*.md`

## Nav Changes

- Add "Docs" link to Nav items pointing to `/docs/getting-started`
- Docs sidebar lists: Getting Started, Theming, Components, Hooks, CSS Utilities
