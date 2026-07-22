import { Button, Icon } from '@n3wth/ui'

const row = { display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' as const }

export function Variants() {
  return (
    <div style={row}>
      <Button variant="primary">Get Started</Button>
      <Button variant="secondary">Learn More</Button>
      <Button variant="ghost">Cancel</Button>
      <Button variant="glass">Explore</Button>
    </div>
  )
}

export function Sizes() {
  return (
    <div style={{ ...row, alignItems: 'flex-end' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  )
}

export function States() {
  return (
    <div style={row}>
      <Button disabled>Disabled</Button>
      <Button isLoading>Saving…</Button>
      <Button leftIcon={<Icon name="star" size="sm" />}>Starred</Button>
    </div>
  )
}
