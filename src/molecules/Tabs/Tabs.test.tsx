import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Tabs, TabsList, TabsTab, TabsPanel } from './Tabs'

function renderTabs(props: { defaultValue?: string; value?: string; onChange?: (v: string) => void } = {}) {
  return render(
    <Tabs defaultValue={props.defaultValue ?? 'tab1'} value={props.value} onChange={props.onChange}>
      <TabsList>
        <TabsTab value="tab1">Tab 1</TabsTab>
        <TabsTab value="tab2">Tab 2</TabsTab>
        <TabsTab value="tab3">Tab 3</TabsTab>
      </TabsList>
      <TabsPanel value="tab1">Panel 1</TabsPanel>
      <TabsPanel value="tab2">Panel 2</TabsPanel>
      <TabsPanel value="tab3">Panel 3</TabsPanel>
    </Tabs>
  )
}

describe('Tabs', () => {
  it('renders tablist role', () => {
    renderTabs()
    expect(screen.getByRole('tablist')).toBeInTheDocument()
  })

  it('renders tab buttons with role="tab"', () => {
    renderTabs()
    expect(screen.getAllByRole('tab')).toHaveLength(3)
  })

  it('shows the active panel', () => {
    renderTabs({ defaultValue: 'tab1' })
    expect(screen.getByText('Panel 1')).toBeInTheDocument()
    expect(screen.queryByText('Panel 2')).toBeNull()
  })

  it('switches panels on tab click', async () => {
    const user = userEvent.setup()
    renderTabs()
    await user.click(screen.getByText('Tab 2'))
    expect(screen.getByText('Panel 2')).toBeInTheDocument()
    expect(screen.queryByText('Panel 1')).toBeNull()
  })

  it('sets aria-selected on active tab', () => {
    renderTabs({ defaultValue: 'tab1' })
    expect(screen.getByText('Tab 1')).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('Tab 2')).toHaveAttribute('aria-selected', 'false')
  })

  it('active tab has tabIndex=0, others have tabIndex=-1', () => {
    renderTabs({ defaultValue: 'tab1' })
    expect(screen.getByText('Tab 1')).toHaveAttribute('tabindex', '0')
    expect(screen.getByText('Tab 2')).toHaveAttribute('tabindex', '-1')
  })

  it('panel has role="tabpanel"', () => {
    renderTabs()
    expect(screen.getByRole('tabpanel')).toBeInTheDocument()
  })

  it('calls onChange in controlled mode', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    renderTabs({ value: 'tab1', onChange })
    await user.click(screen.getByText('Tab 2'))
    expect(onChange).toHaveBeenCalledWith('tab2')
  })

  it('navigates with ArrowRight key', async () => {
    const user = userEvent.setup()
    renderTabs()
    screen.getByText('Tab 1').focus()
    await user.keyboard('{ArrowRight}')
    expect(screen.getByText('Tab 2')).toHaveFocus()
  })

  it('navigates with ArrowLeft key', async () => {
    const user = userEvent.setup()
    renderTabs()
    screen.getByText('Tab 1').focus()
    await user.keyboard('{ArrowLeft}')
    // Wraps to last tab
    expect(screen.getByText('Tab 3')).toHaveFocus()
  })

  it('navigates with Home/End keys', async () => {
    const user = userEvent.setup()
    renderTabs()
    screen.getByText('Tab 2').focus()
    await user.keyboard('{Home}')
    expect(screen.getByText('Tab 1')).toHaveFocus()

    await user.keyboard('{End}')
    expect(screen.getByText('Tab 3')).toHaveFocus()
  })

  it('has displayName on all components', () => {
    expect(Tabs.displayName).toBe('Tabs')
    expect(TabsList.displayName).toBe('TabsList')
    expect(TabsTab.displayName).toBe('TabsTab')
    expect(TabsPanel.displayName).toBe('TabsPanel')
  })

  it('throws when used outside Tabs context', () => {
    expect(() => render(<TabsTab value="x">X</TabsTab>)).toThrow(
      'Tabs compound components must be used within a <Tabs> parent'
    )
  })
})
