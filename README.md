# n3wth/ui 🛠️

Atomic design system for n3wth projects. A dark, monochrome **wireframe/blueprint** system.
White is the accent. Flat — no shadows, no glows, no gradients. Hairline rails, corner tick
cross-marks, and precision typography (Geist + Geist Mono for code only).

**[Live Demo](https://ui.newth.ai)** / **[npm package](https://www.npmjs.com/package/@n3wth/ui)** / **[Registry](https://github.com/n3wth/ui/blob/main/registry.json)**

---

## 🤖 AI-Native Integration

This library is optimized for AI-driven development (**v0**, **Cursor**, **Google AI Studio**, **Claude Code**).

- **v0 / Shadcn**: Point v0 to this repo or use the [registry.json](./registry.json).
- **Google AI Studio**: Use the [native system instructions](./google-ai-studio-instructions.json).
- **Cursor**: Automated context via [.cursorrules](./.cursorrules).

---

## 📦 Install

```bash
npm install @n3wth/ui
```

### Quick Start

```tsx
import { Button, Card, Hero, Section } from '@n3wth/ui'
import '@n3wth/ui/styles'

export default function App() {
  return (
    <Section>
      <Hero title="Hello World" subtitle="Wireframe monochrome design system" />
      <Card>
        <Button variant="primary">Click Me</Button>
      </Card>
    </Section>
  )
}
```

---

## 🎨 Design Tokens

Built on **Tailwind CSS 4**.

| Token | Description |
| :--- | :--- |
| **Typography** | `font-display` / `font-sans` (Geist), `font-mono` (Geist Mono — code only) |
| **Surfaces** | `--bg` `#08090b`, `--bg-soft`, `--bg-raise` |
| **Ink** | `--ink` `#f2f3f5`, `--ink-dim`, `--ink-faint`, `--ink-ghost` |
| **Accent** | `--accent` `#ffffff` (white-led), `--accent-dim`, `--accent-ink`, `--accent-rail` |
| **Rails** | `--rail` (hairline), `--rail-strong` |
| **Motion** | `--ease` `cubic-bezier(0.16,1,0.3,1)` (also `ease-wire`) |
| **Type utilities** | `.wf-display`, `.wf-h2`, `.wf-h3`, `.wf-body`, `.wf-label` |
| **Spacing** | Safe areas: `safe-top`, `safe-bottom` |

> Legacy color names (`bg`, `white`, `grey-*`, `sage`, `coral`, etc.) are bridged onto the
> monochrome palette, so existing components inherit the new look automatically.

---

## 🧩 Components

| Category | Components |
| :--- | :--- |
| **Atoms** | `Button`, `Badge`, `Input`, `Icon`, `AnimatedText`, `NoiseOverlay`, `ScrollIndicator` |
| **Molecules** | `Card`, `CommandBox`, `ThemeToggle`, `MobileDrawer`, `NavLink`, `CompositeShape` |
| **Organisms** | `Nav`, `Hero`, `Section`, `Footer` |
| **Wireframe** | `Logo`, `Marks` (`Identity` / `Fork` / `Nodes` / `Shield` / `Cube`), `DitherField`, `Frame` (+ `CornerTicks`, `SectionHeader`), `Reveal` |

### Wireframe primitives

Shared, framework-portable primitives (plain React + SVG/canvas — work in both Next and Vite):

- **`Logo`** — the rounded agentic cursor glyph. Inherits `currentColor`.
- **`Marks`** — geometric blueprint SVG marks on a 64/120 grid, stroke 1, layered opacity,
  monochrome `currentColor`. `Marks.Identity`, `Marks.Fork`, `Marks.Nodes`, `Marks.Shield`, `Marks.Cube`.
- **`DitherField`** — cursor-reactive ASCII dither canvas. Client-only; `accent` defaults to `"255,255,255"`.
- **`Frame`** — hairline rail wrapper with 9px corner tick cross-marks; ships `CornerTicks` and `SectionHeader`.
- **`Reveal`** — IntersectionObserver scroll-reveal wrapper, reduced-motion safe, no GSAP dependency.

Registry names (installable via the shadcn/registry CLI): `logo`, `marks`, `dither-field`, `frame`, `reveal`.

UI icons should come from `lucide-react` (stroke 1.5); `Marks` are for diagrams only.

---

## 🪝 Hooks

- `useTheme` — Dark/light mode with system persistence.
- `useMediaQuery` — Clean responsive breakpoint handling.
- `useKeyboardShortcuts` — Global keyboard event management.
- `useScrollReveal` — Entry animations for atomic elements.
- `useReducedMotion` — Respects user accessibility preferences.

---

## 🛠️ Development

```bash
# Clone and install
git clone https://github.com/n3wth/ui
npm install

# Run the showcase/demo
npm run demo

# Build for production
npm run build

# Update AI Registry
npm run registry:build
```

### Releasing

We use a semantic patch/minor/major flow that automatically updates AI registry artifacts:

```bash
npm run release:patch
```

---

## 📜 License

MIT © [Oliver Newth](https://newth.ai)
