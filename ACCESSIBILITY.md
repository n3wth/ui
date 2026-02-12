# Accessibility Guide

@n3wth/ui follows WCAG 2.2 Level AA standards to ensure all components are accessible to users with disabilities.

## Testing Accessibility

We use [vitest-axe](https://github.com/chaance/vitest-axe) for automated accessibility testing, which integrates [axe-core](https://github.com/dequelabs/axe-core) with Vitest.

### Running Accessibility Tests

```bash
# Run all tests (includes accessibility tests)
npm test

# Run tests for a specific component
npm test -- Button.test.tsx

# Watch mode
npm test:watch
```

### Writing Accessibility Tests

Import the test utilities:

```tsx
import { expectNoAxeViolations } from '../../test/a11y'
```

Add accessibility tests to your component test suite:

```tsx
describe('MyComponent', () => {
  // ... other tests

  describe('Accessibility', () => {
    it('has no axe violations', async () => {
      const { container } = render(<MyComponent />)
      await expectNoAxeViolations(container)
    })

    it('has proper ARIA attributes', () => {
      render(<MyComponent />)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-label', 'Expected label')
    })
  })
})
```

## Accessibility Features

### 1. Keyboard Navigation

All interactive components support full keyboard navigation:

- **Tab/Shift+Tab**: Navigate between focusable elements
- **Enter/Space**: Activate buttons and controls
- **Escape**: Close modals, dropdowns, and overlays
- **Arrow Keys**: Navigate within dropdowns, tabs, and lists
- **Home/End**: Jump to first/last item in lists

#### Component-Specific Shortcuts

**Dropdown**
- `ArrowDown`: Open menu or move to next option
- `ArrowUp`: Open menu (last item) or move to previous option
- `Home`: Jump to first option
- `End`: Jump to last option
- `Enter/Space`: Select option
- `Escape`: Close menu

**Modal**
- `Escape`: Close modal (if `closeOnEscape` is true)
- `Tab`: Focus trap keeps focus within modal

### 2. Focus Management

All interactive components use `focus-ring` class for visible focus indicators:

```css
.focus-ring:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
```

The `focus-visible` pseudo-class ensures focus rings only appear during keyboard navigation, not mouse clicks.

### 3. ARIA Attributes

Components use appropriate ARIA attributes for screen readers:

**Button**
- Accessible name via text content or `aria-label`
- `disabled` state properly conveyed

**Input**
- `aria-invalid`: Indicates validation errors
- `aria-describedby`: Links to error messages
- `aria-labelledby`: Links to associated labels

**Modal**
- `role="dialog"`
- `aria-modal="true"`
- `aria-label` or `aria-labelledby` for title
- Focus trap keeps keyboard navigation within modal

**Dropdown**
- `role="combobox"` on trigger
- `role="listbox"` on menu
- `role="option"` on items
- `aria-expanded`: Indicates open/closed state
- `aria-haspopup="listbox"`
- `aria-activedescendant`: Tracks keyboard focus
- `aria-disabled`: Marks disabled options

**Nav**
- `<nav>` semantic element
- `aria-label` on theme toggle and menu buttons
- `aria-expanded` on mobile menu button

**ThemeToggle**
- Descriptive `aria-label` that changes based on current theme
- Example: "Switch to light mode" when in dark mode

### 4. Touch Targets

All interactive elements meet the minimum 44x44px touch target size (WCAG 2.5.5).

Use the `touchTarget` prop on Button:

```tsx
<Button touchTarget>Click me</Button>
```

This adds `min-w-[44px] min-h-[44px]` classes.

### 5. Color Contrast

All text and interactive elements meet WCAG 2.2 AA contrast requirements:

- **Normal text**: Minimum 4.5:1 contrast ratio
- **Large text** (18pt+ or 14pt+ bold): Minimum 3:1 contrast ratio

Both dark and light themes have been designed with proper contrast ratios.

### 6. Reduced Motion

Components respect the `prefers-reduced-motion` media query:

```tsx
import { useReducedMotion } from '@n3wth/ui'

function MyComponent() {
  const prefersReducedMotion = useReducedMotion()
  
  return (
    <div className={prefersReducedMotion ? '' : 'animate-fade-in'}>
      Content
    </div>
  )
}
```

### 7. Screen Reader Support

**Semantic HTML**
- Use semantic elements (`<button>`, `<nav>`, `<main>`, etc.)
- Avoid generic `<div>` for interactive elements

**Screen Reader Only Text**
- Use `.sr-only` class for screen reader-only content:

```tsx
<button>
  <Icon />
  <span className="sr-only">Close menu</span>
</button>
```

**Live Regions**
- Toast notifications use `role="alert"` for immediate announcements
- Status updates use `aria-live` regions

## Best Practices

### 1. Always Provide Labels

❌ Bad:
```tsx
<Button><Icon /></Button>
<Input placeholder="Email" />
```

✅ Good:
```tsx
<Button aria-label="Close"><Icon /></Button>
<Input aria-label="Email address" placeholder="you@example.com" />
```

### 2. Use Semantic HTML

❌ Bad:
```tsx
<div onClick={handleClick}>Click me</div>
```

✅ Good:
```tsx
<Button onClick={handleClick}>Click me</Button>
```

### 3. Manage Focus

When opening modals or navigating:
```tsx
// Focus first interactive element
modalRef.current?.querySelector('button')?.focus()

// Return focus after closing
previouslyFocused.current?.focus()
```

### 4. Provide Error Messages

❌ Bad:
```tsx
<Input error={true} />
```

✅ Good:
```tsx
<Input 
  id="email"
  error="Please enter a valid email address" 
  aria-invalid="true"
/>
```

### 5. Test with Keyboard Only

- Disconnect your mouse
- Navigate through your app using only Tab, Enter, Escape, and Arrow keys
- Ensure all functionality is accessible

### 6. Test with Screen Readers

**macOS: VoiceOver**
- Enable: Cmd + F5
- Navigate: Ctrl + Option + Arrow keys
- Read: Ctrl + Option + A

**Windows: NVDA** (free)
- Download: https://www.nvaccess.org/
- Navigate: Arrow keys
- Read: Insert + Down arrow

## Tools

### Browser Extensions

- [axe DevTools](https://www.deque.com/axe/devtools/) - Automated accessibility testing
- [WAVE](https://wave.webaim.org/extension/) - Visual feedback about accessibility
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Built into Chrome DevTools

### Manual Testing

1. **Keyboard Navigation**: Navigate with Tab key, verify focus indicators
2. **Screen Reader**: Test with VoiceOver (Mac) or NVDA (Windows)
3. **Color Contrast**: Use Chrome DevTools or [Contrast Checker](https://webaim.org/resources/contrastchecker/)
4. **Zoom**: Test at 200% zoom to verify text reflows properly

## Resources

- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [WebAIM](https://webaim.org/)
- [Inclusive Components](https://inclusive-components.design/)

## Reporting Issues

If you find an accessibility issue:

1. Check if it's a known issue in GitHub Issues
2. Create a new issue with:
   - Component name
   - Description of the accessibility problem
   - Steps to reproduce
   - WCAG success criterion violated (if known)
   - Screen reader and/or browser used
