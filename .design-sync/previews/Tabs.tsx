import { Tabs, TabsList, TabsTab, TabsPanel } from '@n3wth/ui'

const wrap = {
  maxWidth: 480,
  padding: 24,
  borderRadius: 16,
  border: '1px solid var(--glass-border)',
  background: 'var(--glass-bg)',
}

export function Underline() {
  return (
    <div style={wrap}>
      <Tabs defaultValue="overview" variant="underline">
        <TabsList>
          <TabsTab value="overview">Overview</TabsTab>
          <TabsTab value="features">Features</TabsTab>
          <TabsTab value="settings">Settings</TabsTab>
        </TabsList>
        <TabsPanel value="overview">
          Overview content with an animated indicator that follows the active tab.
        </TabsPanel>
        <TabsPanel value="features">
          Keyboard navigation (arrow keys), focus management, and controlled or
          uncontrolled modes.
        </TabsPanel>
        <TabsPanel value="settings">
          Settings panel — Tabs support both underline and pill variants.
        </TabsPanel>
      </Tabs>
    </div>
  )
}

export function Pill() {
  return (
    <div style={wrap}>
      <Tabs defaultValue="features" variant="pill">
        <TabsList>
          <TabsTab value="overview">Overview</TabsTab>
          <TabsTab value="features">Features</TabsTab>
          <TabsTab value="settings">Settings</TabsTab>
        </TabsList>
        <TabsPanel value="overview">Overview content.</TabsPanel>
        <TabsPanel value="features">Feature list and pricing tiers.</TabsPanel>
        <TabsPanel value="settings">Account and notification preferences.</TabsPanel>
      </Tabs>
    </div>
  )
}
