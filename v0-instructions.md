# v0 Integration Instructions for @n3wth/ui

This design system is atomic, minimal, and iOS-inspired. When generating UI with v0, please follow these guidelines:

## Core Principles
- **Minimalism**: Use whitespace effectively. Avoid unnecessary borders or shadows.
- **Flat Design**: No heavy shadows. Use `glass-card` or subtle borders for depth.
- **Typography**: Use `font-display` (Mona Sans) for headings and `font-sans` (Geist Sans) for UI elements.
- **Colors**: Use the semantic variables defined in the theme (e.g., `text-white`, `bg-bg`, `text-accent`).

## Component Usage
- **Atoms**: Use `Button`, `Badge`, `Input`, and `Icon` from `@n3wth/ui`.
- **Molecules**: Use `Card`, `CommandBox`, and `ThemeToggle`.
- **Organisms**: Use `Nav`, `Hero`, and `Section` to structure pages.

## Layout
- Use the `Section` component for top-level page sections.
- Use `container-mobile` for consistent horizontal padding.
- For interactive cards, use the `glass-card` class or `Card` molecule.

## Utilities
- Use the `cn` utility from `@n3wth/ui/utils` for class merging.
- Prefer fluid typography classes like `text-fluid-xl`.

## Examples
To import a component:
\`\`\`tsx
import { Button, Card, Section } from "@n3wth/ui";
\`\`\`

To apply the design system's styles:
Make sure to import the CSS in your root file:
\`\`\`tsx
import "@n3wth/ui/styles";
\`\`\`
