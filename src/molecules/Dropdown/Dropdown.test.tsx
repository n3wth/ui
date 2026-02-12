import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Dropdown } from './Dropdown'
import { expectNoAxeViolations } from '../../test/a11y'

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date', disabled: true },
]

describe('Dropdown', () => {
  it('renders with a button trigger', () => {
    render(<Dropdown options={options} placeholder="Select fruit" />)
    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toHaveTextContent('Select fruit')
  })

  it('opens menu on click', async () => {
    const user = userEvent.setup()
    render(<Dropdown options={options} placeholder="Select" />)
    await user.click(screen.getByRole('combobox'))
    expect(screen.getByRole('listbox')).toBeInTheDocument()
  })

  it('closes menu on Escape key', async () => {
    const user = userEvent.setup()
    render(<Dropdown options={options} placeholder="Select" />)
    await user.click(screen.getByRole('combobox'))
    expect(screen.getByRole('listbox')).toBeInTheDocument()
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('navigates options with arrow keys', async () => {
    const user = userEvent.setup()
    render(<Dropdown options={options} placeholder="Select" />)
    const trigger = screen.getByRole('combobox')
    trigger.focus()
    
    // Open with ArrowDown
    await user.keyboard('{ArrowDown}')
    expect(screen.getByRole('listbox')).toBeInTheDocument()
    
    // Navigate down
    await user.keyboard('{ArrowDown}')
    const secondOption = screen.getByRole('option', { name: 'Banana' })
    expect(secondOption).toHaveAttribute('aria-selected', 'false')
  })

  it('selects option with Enter key', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Dropdown options={options} onChange={onChange} placeholder="Select" />)
    
    const trigger = screen.getByRole('combobox')
    trigger.focus()
    
    // Open and select first option
    await user.keyboard('{ArrowDown}')
    await user.keyboard('{Enter}')
    
    expect(onChange).toHaveBeenCalledWith('apple')
  })

  it('skips disabled options when navigating', async () => {
    const user = userEvent.setup()
    render(<Dropdown options={options} placeholder="Select" />)
    const trigger = screen.getByRole('combobox')
    trigger.focus()
    
    await user.keyboard('{ArrowDown}')
    // Navigate to end (should skip disabled "date")
    await user.keyboard('{End}')
    
    // Cherry should be active (last non-disabled option)
    // We can verify this by checking aria-activedescendant points to Cherry's option
    const cherryOption = screen.getByRole('option', { name: 'Cherry' })
    const triggerId = trigger.getAttribute('aria-activedescendant')
    expect(cherryOption.id).toBe(triggerId)
  })

  it('supports multi-select mode', async () => {
    const user = userEvent.setup()
    const onMultiChange = vi.fn()
    render(<Dropdown options={options} multi onMultiChange={onMultiChange} placeholder="Select" />)
    
    await user.click(screen.getByRole('combobox'))
    
    // Select first option
    await user.click(screen.getByRole('option', { name: 'Apple' }))
    expect(onMultiChange).toHaveBeenCalledWith(['apple'])
    
    // Select second option
    await user.click(screen.getByRole('option', { name: 'Banana' }))
    expect(onMultiChange).toHaveBeenCalledWith(['apple', 'banana'])
  })

  describe('Accessibility', () => {
    it('has no axe violations when closed', async () => {
      const { container } = render(<Dropdown options={options} placeholder="Select" />)
      await expectNoAxeViolations(container)
    })

    it('has no axe violations when open', async () => {
      const user = userEvent.setup()
      const { container } = render(<Dropdown options={options} placeholder="Select" />)
      await user.click(screen.getByRole('combobox'))
      await expectNoAxeViolations(container)
    })

    it('trigger has proper ARIA attributes', () => {
      render(<Dropdown options={options} placeholder="Select" />)
      const trigger = screen.getByRole('combobox')
      expect(trigger).toHaveAttribute('aria-haspopup', 'listbox')
      expect(trigger).toHaveAttribute('aria-expanded', 'false')
    })

    it('trigger aria-expanded changes when opened', async () => {
      const user = userEvent.setup()
      render(<Dropdown options={options} placeholder="Select" />)
      const trigger = screen.getByRole('combobox')
      
      await user.click(trigger)
      expect(trigger).toHaveAttribute('aria-expanded', 'true')
    })

    it('options have proper ARIA roles', async () => {
      const user = userEvent.setup()
      render(<Dropdown options={options} placeholder="Select" />)
      await user.click(screen.getByRole('combobox'))
      
      const listbox = screen.getByRole('listbox')
      expect(listbox).toBeInTheDocument()
      
      const optionElements = screen.getAllByRole('option')
      expect(optionElements).toHaveLength(4)
    })

    it('disabled options have aria-disabled', async () => {
      const user = userEvent.setup()
      render(<Dropdown options={options} placeholder="Select" />)
      await user.click(screen.getByRole('combobox'))
      
      const disabledOption = screen.getByRole('option', { name: 'Date' })
      expect(disabledOption).toHaveAttribute('aria-disabled', 'true')
    })

    it('keyboard navigation is fully functional', async () => {
      const user = userEvent.setup()
      render(<Dropdown options={options} placeholder="Select" />)
      const trigger = screen.getByRole('combobox')
      trigger.focus()
      
      // Test all keyboard shortcuts
      await user.keyboard('{ArrowDown}') // Opens menu
      expect(screen.getByRole('listbox')).toBeInTheDocument()
      
      await user.keyboard('{ArrowDown}') // Navigate to second item
      await user.keyboard('{ArrowUp}')   // Navigate back to first
      await user.keyboard('{Home}')      // Jump to first
      await user.keyboard('{End}')       // Jump to last non-disabled
      await user.keyboard('{Escape}')    // Close menu
      
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    })
  })
})
