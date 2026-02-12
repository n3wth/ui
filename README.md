# n3wth/ui 🛠️

Atomic design system for n3wth projects. Flat, minimal, iOS-inspired.  
No shadows, no glows—just clean glassmorphism and precision typography.

**[Live Demo](https://ui.newth.ai)** / **[npm package](https://www.npmjs.com/package/@n3wth/ui)** / **[Registry](https://github.com/n3wth/ui/blob/main/registry.json)**

---

## 🤖 AI-Native Integration

This library is optimized for AI-driven development (**v0**, **Cursor**, **Google AI Studio**, **Claude Code**).

- **v0 / Shadcn**: Point v0 to this repo or use the [registry.json](./registry.json).
- **Google AI Studio**: Use the [native system instructions](./google-ai-studio-instructions.json).
- **Cursor**: Automated context via [.cursorrules](./.cursorrules).

---

## 📦 Install

You can use components in two ways:

### Option 1: NPM Package (recommended for full library)

```bash
npm install @n3wth/ui
```

```tsx
import { Button, Card, Hero, Section } from '@n3wth/ui'
import '@n3wth/ui/styles'

export default function App() {
  return (
    <Section>
      <Hero title="Hello World" subtitle="iOS-inspired design system" />
      <Card>
        <Button variant="accent">Click Me</Button>
      </Card>
    </Section>
  )
}
```

### Option 2: shadcn Registry (install components individually)

First, configure your project to use the `@n3wth` registry. Add this to your `components.json`:

```json
{
  "registries": {
    "@n3wth": "https://ui.newth.ai/r/{name}.json"
  }
}
```

Then install individual components:

```bash
# Install specific components
npx shadcn@latest add @n3wth/button
npx shadcn@latest add @n3wth/card
npx shadcn@latest add @n3wth/modal
npx shadcn@latest add @n3wth/tabs

# Available components: utils, button, badge, input, card, modal, tabs, hero, nav, section, footer
```

#### Setting up for Registry Usage

When using components via the registry, you need to set up:

1. **Tailwind CSS 4** with the `@n3wth/ui` preset:

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'
import n3wthPreset from '@n3wth/ui/tailwind'

export default {
  presets: [n3wthPreset],
  content: ['./src/**/*.{ts,tsx}'],
} satisfies Config
```

2. **CSS variables** in your styles:

```css
@import 'tailwindcss';

/* Import n3wth/ui styles for CSS variables and design tokens */
@import '@n3wth/ui/styles';

/* Required: scan @n3wth/ui for Tailwind classes */
@source "../node_modules/@n3wth/ui/dist";
```

Or define variables manually:

```css
:root {
  --color-bg: #000000;
  --color-bg-secondary: #0a0a0a;
  --color-white: #ffffff;
  --color-grey-400: #86868b;
  --color-grey-600: #6e6e73;
  --glass-bg: rgba(255, 255, 255, 0.05);
  --glass-border: rgba(255, 255, 255, 0.1);
  --glass-highlight: rgba(255, 255, 255, 0.15);
  
  /* Category colors */
  --color-sage: #30d158;
  --color-coral: #ff6961;
  --color-mint: #64d2ff;
  --color-gold: #ffd60a;
}
```

---

## 🎨 Design Tokens

Built on **Tailwind CSS 4**.

| Token | Description |
| :--- | :--- |
| **Typography** | `font-display` (Mona Sans), `font-sans` (Geist Sans) |
| **Glass** | `.glass-card`, `.glass-pill`, `.glass-nav` |
| **Colors** | Semantic tokens: `bg`, `bg-secondary`, `sage`, `coral`, `gold`, `mint` |
| **Spacing** | iOS-standard safe areas: `safe-top`, `safe-bottom` |

---

## 🧩 Components

| Category | Components |
| :--- | :--- |
| **Atoms** | `Button`, `Badge`, `Input`, `Icon`, `AnimatedText`, `NoiseOverlay`, `ScrollIndicator` |
| **Molecules** | `Card`, `CommandBox`, `ThemeToggle`, `MobileDrawer`, `NavLink`, `CompositeShape` |
| **Organisms** | `Nav`, `Hero`, `Section`, `Footer` |

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

### Testing Registry Installation (End-to-End)

To test that the registry distribution works correctly:

1. **Create a fresh Vite + React project:**

```bash
npm create vite@latest test-n3wth-registry -- --template react-ts
cd test-n3wth-registry
npm install
```

2. **Initialize shadcn:**

```bash
npx shadcn@latest init
```

3. **Configure the `@n3wth` registry** in `components.json`:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/index.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  },
  "registries": {
    "@n3wth": "https://ui.newth.ai/r/{name}.json"
  }
}
```

4. **Install and use components:**

```bash
# Install a component
npx shadcn@latest add @n3wth/button

# Test in your app
```

```tsx
// src/App.tsx
import { Button } from '@/components/ui/button'

function App() {
  return (
    <div className="p-8">
      <Button variant="primary">Hello from @n3wth/ui!</Button>
    </div>
  )
}

export default App
```

5. **Verify:**
   - Component installs with correct dependencies (e.g., `utils` is auto-installed)
   - Styles work correctly with CSS variables
   - TypeScript types are available

### Releasing

We use a semantic patch/minor/major flow that automatically updates AI registry artifacts:

```bash
npm run release:patch
```

---

## 📜 License

MIT © [Oliver Newth](https://newth.ai)
