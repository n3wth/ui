import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import * as matchers from 'vitest-axe/matchers'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './Accordion'

expect.extend(matchers)

function renderAccordion(
  props: {
    type?: 'single' | 'multiple'
    defaultValue?: string[]
    value?: string[]
    onChange?: (v: string[]) => void
    collapsible?: boolean
  } = {}
) {
  return render(
    <Accordion
      type={props.type}
      defaultValue={props.defaultValue}
      value={props.value}
      onChange={props.onChange}
      collapsible={props.collapsible}
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>Section One</AccordionTrigger>
        <AccordionContent>Content One</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Section Two</AccordionTrigger>
        <AccordionContent>Content Two</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3" disabled>
        <AccordionTrigger>Section Three</AccordionTrigger>
        <AccordionContent>Content Three</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

describe('Accordion', () => {
  it('renders items with correct ARIA attributes', () => {
    renderAccordion({ defaultValue: ['item-1'] })

    const trigger1 = screen.getByText('Section One')
    expect(trigger1).toHaveAttribute('aria-expanded', 'true')
    expect(trigger1.tagName).toBe('BUTTON')
    expect(trigger1).toHaveAttribute('aria-controls')

    const trigger2 = screen.getByText('Section Two')
    expect(trigger2).toHaveAttribute('aria-expanded', 'false')

    // Content regions exist
    const contentId = trigger1.getAttribute('aria-controls')!
    const region = document.getElementById(contentId)
    expect(region).toHaveAttribute('role', 'region')
    expect(region).toHaveAttribute('aria-labelledby', trigger1.id)
  })

  it('toggles content on click', async () => {
    const user = userEvent.setup()
    renderAccordion()

    const trigger1 = screen.getByText('Section One')
    expect(trigger1).toHaveAttribute('aria-expanded', 'false')

    await user.click(trigger1)
    expect(trigger1).toHaveAttribute('aria-expanded', 'true')
  })

  it('single mode: only one open at a time', async () => {
    const user = userEvent.setup()
    renderAccordion({ type: 'single', defaultValue: ['item-1'] })

    const trigger1 = screen.getByText('Section One')
    const trigger2 = screen.getByText('Section Two')

    expect(trigger1).toHaveAttribute('aria-expanded', 'true')
    expect(trigger2).toHaveAttribute('aria-expanded', 'false')

    await user.click(trigger2)
    expect(trigger1).toHaveAttribute('aria-expanded', 'false')
    expect(trigger2).toHaveAttribute('aria-expanded', 'true')
  })

  it('multiple mode: multiple open simultaneously', async () => {
    const user = userEvent.setup()
    renderAccordion({ type: 'multiple', defaultValue: ['item-1'] })

    const trigger1 = screen.getByText('Section One')
    const trigger2 = screen.getByText('Section Two')

    expect(trigger1).toHaveAttribute('aria-expanded', 'true')

    await user.click(trigger2)
    expect(trigger1).toHaveAttribute('aria-expanded', 'true')
    expect(trigger2).toHaveAttribute('aria-expanded', 'true')
  })

  it('collapsible: can close the only open item in single mode', async () => {
    const user = userEvent.setup()
    renderAccordion({ type: 'single', defaultValue: ['item-1'], collapsible: true })

    const trigger1 = screen.getByText('Section One')
    expect(trigger1).toHaveAttribute('aria-expanded', 'true')

    await user.click(trigger1)
    expect(trigger1).toHaveAttribute('aria-expanded', 'false')
  })

  it('single mode without collapsible: cannot close the open item', async () => {
    const user = userEvent.setup()
    renderAccordion({ type: 'single', defaultValue: ['item-1'], collapsible: false })

    const trigger1 = screen.getByText('Section One')
    expect(trigger1).toHaveAttribute('aria-expanded', 'true')

    await user.click(trigger1)
    expect(trigger1).toHaveAttribute('aria-expanded', 'true')
  })

  it('disabled items cannot be toggled', async () => {
    const user = userEvent.setup()
    renderAccordion()

    const trigger3 = screen.getByText('Section Three')
    expect(trigger3).toHaveAttribute('aria-disabled', 'true')
    expect(trigger3).toHaveAttribute('aria-expanded', 'false')

    await user.click(trigger3)
    expect(trigger3).toHaveAttribute('aria-expanded', 'false')
  })

  it('disabled trigger has correct styling classes', () => {
    renderAccordion()
    const trigger3 = screen.getByText('Section Three')
    expect(trigger3).toHaveClass('opacity-50')
    expect(trigger3).toHaveClass('cursor-not-allowed')
  })

  it('keyboard navigation: ArrowDown focuses next trigger', async () => {
    const user = userEvent.setup()
    renderAccordion()

    screen.getByText('Section One').focus()
    await user.keyboard('{ArrowDown}')
    expect(screen.getByText('Section Two')).toHaveFocus()
  })

  it('keyboard navigation: ArrowUp focuses previous trigger', async () => {
    const user = userEvent.setup()
    renderAccordion()

    screen.getByText('Section Two').focus()
    await user.keyboard('{ArrowUp}')
    expect(screen.getByText('Section One')).toHaveFocus()
  })

  it('keyboard navigation: ArrowDown wraps to first', async () => {
    const user = userEvent.setup()
    renderAccordion()

    screen.getByText('Section Three').focus()
    await user.keyboard('{ArrowDown}')
    expect(screen.getByText('Section One')).toHaveFocus()
  })

  it('keyboard navigation: ArrowUp wraps to last', async () => {
    const user = userEvent.setup()
    renderAccordion()

    screen.getByText('Section One').focus()
    await user.keyboard('{ArrowUp}')
    expect(screen.getByText('Section Three')).toHaveFocus()
  })

  it('keyboard navigation: Home focuses first trigger', async () => {
    const user = userEvent.setup()
    renderAccordion()

    screen.getByText('Section Three').focus()
    await user.keyboard('{Home}')
    expect(screen.getByText('Section One')).toHaveFocus()
  })

  it('keyboard navigation: End focuses last trigger', async () => {
    const user = userEvent.setup()
    renderAccordion()

    screen.getByText('Section One').focus()
    await user.keyboard('{End}')
    expect(screen.getByText('Section Three')).toHaveFocus()
  })

  it('controlled mode: value + onChange', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    renderAccordion({ value: ['item-1'], onChange })

    const trigger2 = screen.getByText('Section Two')
    await user.click(trigger2)
    expect(onChange).toHaveBeenCalledWith(['item-2'])
  })

  it('controlled mode: does not update internal state', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    renderAccordion({ value: ['item-1'], onChange })

    const trigger1 = screen.getByText('Section One')
    const trigger2 = screen.getByText('Section Two')

    await user.click(trigger2)
    // Still controlled by value prop, so item-1 remains open
    expect(trigger1).toHaveAttribute('aria-expanded', 'true')
    expect(trigger2).toHaveAttribute('aria-expanded', 'false')
  })

  it('has no accessibility violations', async () => {
    const { container } = renderAccordion({ defaultValue: ['item-1'] })
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('content uses grid-template-rows for animation', () => {
    const { container } = renderAccordion({ defaultValue: ['item-1'] })

    const trigger1 = screen.getByText('Section One')
    const contentId = trigger1.getAttribute('aria-controls')!
    const contentRegion = document.getElementById(contentId)!

    // Open item should have grid-template-rows: 1fr
    expect(contentRegion.style.gridTemplateRows).toBe('1fr')
    expect(contentRegion).toHaveClass('grid')

    // Closed item
    const trigger2 = screen.getByText('Section Two')
    const content2Id = trigger2.getAttribute('aria-controls')!
    const content2Region = document.getElementById(content2Id)!
    expect(content2Region.style.gridTemplateRows).toBe('0fr')
  })

  it('has displayName on all components', () => {
    expect(Accordion.displayName).toBe('Accordion')
    expect(AccordionItem.displayName).toBe('AccordionItem')
    expect(AccordionTrigger.displayName).toBe('AccordionTrigger')
    expect(AccordionContent.displayName).toBe('AccordionContent')
  })

  it('throws when AccordionTrigger is used outside Accordion context', () => {
    expect(() =>
      render(<AccordionTrigger>Orphan</AccordionTrigger>)
    ).toThrow('Accordion compound components must be used within an <Accordion> parent')
  })

  it('throws when AccordionContent is used outside AccordionItem context', () => {
    expect(() =>
      render(
        <Accordion>
          <AccordionContent>Orphan</AccordionContent>
        </Accordion>
      )
    ).toThrow('AccordionTrigger/AccordionContent must be used within an <AccordionItem> parent')
  })

  it('trigger renders chevron SVG', () => {
    renderAccordion()
    const trigger1 = screen.getByText('Section One')
    const svg = trigger1.querySelector('svg')
    expect(svg).toBeTruthy()
    expect(svg).toHaveAttribute('aria-hidden', 'true')
    expect(svg).toHaveAttribute('width', '16')
    expect(svg).toHaveAttribute('height', '16')
  })

  it('chevron rotates when open', () => {
    renderAccordion({ defaultValue: ['item-1'] })
    const trigger1 = screen.getByText('Section One')
    const svg1 = trigger1.querySelector('svg')!
    expect(svg1).toHaveClass('rotate-180')

    const trigger2 = screen.getByText('Section Two')
    const svg2 = trigger2.querySelector('svg')!
    expect(svg2).not.toHaveClass('rotate-180')
  })
})
