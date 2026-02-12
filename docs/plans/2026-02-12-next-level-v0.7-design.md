# @n3wth/ui v0.7 Design: Next Level

## Tracks

### Track A: New Atom Components
Switch, Avatar, Separator, Progress, Label, Textarea

Each follows existing pattern:
- `src/atoms/{Name}/{Name}.tsx` + `{Name}.test.tsx` + `index.ts`
- forwardRef, cn() for classnames, CSS variables for theming
- Flat design (no shadows/glows), focus-ring class, reduced motion support
- Tests: render, props, variants, a11y (vitest-axe), ref forwarding

### Track B: New Molecule Components
Accordion (compound pattern: Accordion, AccordionItem, AccordionTrigger, AccordionContent)

Follows Tabs pattern:
- Context-based compound components
- Keyboard navigation (Arrow keys, Home/End)
- WAI-ARIA accordion pattern (aria-expanded, aria-controls)
- Animated open/close with reduced motion respect

### Track C: Quality Infrastructure
1. Motion tokens (`src/tokens/motion.ts`)
2. Semantic color tokens (success/warning/error/info added to colors.ts)
3. vitest-axe integration across all existing test files

### Track D: Integration
Update barrel exports (atoms/index.ts, molecules/index.ts, src/index.ts)
Update styles.css with semantic color variables
