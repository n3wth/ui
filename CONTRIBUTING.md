# Contributing to n3wth/ui

This repository is optimized for AI-driven development. If you are an AI assistant (Gemini, Claude, or v0) being asked to use this library, please follow these guidelines:

## AI Instructions
1.  **Read the Rules**: Always consult `.cursorrules` for the latest design principles and technical constraints.
2.  **System Prompt**: For Google AI Studio, reference `google-ai-studio-instructions.json`.
3.  **Registry**: For v0/Shadcn, use the registry defined in `registry.json`.
4.  **Style Guide**: Adhere to the iOS-inspired, minimal, flat design aesthetic.
5.  **Components**: Prioritize using existing atoms and molecules in `src/`.

## Development

### Adding a New Component
1.  Create the file in `src/atoms`, `src/molecules`, or `src/organisms`.
2.  Write tests for the component (including accessibility tests).
3.  Run `npm run registry:build` to update the AI registry metadata.
4.  Ensure you export the component in `src/index.ts`.

### Accessibility Requirements

All components must meet WCAG 2.2 Level AA standards. See [ACCESSIBILITY.md](./ACCESSIBILITY.md) for detailed guidelines.

**Required for every component:**
- [ ] Keyboard navigation support
- [ ] Focus-visible indicators (use `focus-ring` class)
- [ ] Proper ARIA attributes
- [ ] Accessible labels for interactive elements
- [ ] Color contrast meets 4.5:1 ratio
- [ ] Touch targets meet 44x44px minimum (use `touchTarget` prop when applicable)
- [ ] Automated accessibility tests using vitest-axe

**Test checklist:**
```tsx
describe('Accessibility', () => {
  it('has no axe violations', async () => {
    const { container } = render(<Component />)
    await expectNoAxeViolations(container)
  })

  it('has proper ARIA attributes', () => {
    // Test specific ARIA attributes
  })

  it('supports keyboard navigation', async () => {
    // Test keyboard interactions
  })
})
```

See [ACCESSIBILITY.md](./ACCESSIBILITY.md) for complete testing guidelines and best practices.

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test:watch

# Run tests for specific file
npm test -- MyComponent.test.tsx
```

All PRs must have passing tests, including accessibility tests.

