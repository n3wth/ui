import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@n3wth/ui'

const wrap = { maxWidth: 480 }

export function Single() {
  return (
    <div style={wrap}>
      <Accordion type="single" defaultValue={['item-1']} collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>What is @n3wth/ui?</AccordionTrigger>
          <AccordionContent>
            A flat, minimal design system for Newth sites — atoms, molecules, and organisms
            built with Tailwind and shipped as a tree-shakeable package.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Does it support dark mode?</AccordionTrigger>
          <AccordionContent>
            Yes — every component reads CSS custom properties that flip with the site's theme.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Full keyboard navigation, ARIA roles, and focus management are built in.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export function Multiple() {
  return (
    <div style={wrap}>
      <Accordion type="multiple" defaultValue={['billing', 'shipping']}>
        <AccordionItem value="billing">
          <AccordionTrigger>Billing details</AccordionTrigger>
          <AccordionContent>
            Update your card, invoice address, and billing email.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="shipping">
          <AccordionTrigger>Shipping address</AccordionTrigger>
          <AccordionContent>
            Manage the addresses used for physical deliveries.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="archived" disabled>
          <AccordionTrigger>Archived (disabled)</AccordionTrigger>
          <AccordionContent>This section is locked.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
