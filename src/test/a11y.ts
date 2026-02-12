/**
 * Accessibility testing utilities
 * 
 * This file provides helpers for testing WCAG 2.2 AA compliance
 * using vitest-axe.
 */

import { axe } from 'vitest-axe'
import { expect } from 'vitest'

export { axe }

/**
 * Run axe accessibility tests on a container
 * 
 * @example
 * ```tsx
 * const { container } = render(<Button>Click me</Button>)
 * await expectNoAxeViolations(container)
 * ```
 */
export async function expectNoAxeViolations(container: HTMLElement) {
  const results = await axe(container)
  expect(results).toHaveNoViolations()
}

/**
 * Run axe accessibility tests with custom rules
 * 
 * @example
 * ```tsx
 * const { container } = render(<Component />)
 * await expectNoAxeViolations(container, {
 *   rules: {
 *     'color-contrast': { enabled: false } // Disable if testing non-visual component
 *   }
 * })
 * ```
 */
export async function expectNoAxeViolationsWithOptions(
  container: HTMLElement,
  options: Parameters<typeof axe>[1]
) {
  const results = await axe(container, options)
  expect(results).toHaveNoViolations()
}
