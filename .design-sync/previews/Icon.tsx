import { Icon } from '@n3wth/ui'

// Icon renders via `currentColor` with no color styling of its own — the
// shared PreviewSurface/N3wthProvider(dark) wrapper (cfg.provider) now
// supplies the DS's dark canvas for every preview, so no per-component
// backdrop is needed here.
const row = { display: 'flex', gap: 14, flexWrap: 'wrap' as const, alignItems: 'center' }

export function CommonIcons() {
  return (
    <div style={row}>
      <Icon name="search" />
      <Icon name="check" />
      <Icon name="x" />
      <Icon name="star" />
      <Icon name="settings" />
      <Icon name="user" />
      <Icon name="download" />
      <Icon name="trash" />
      <Icon name="lock" />
      <Icon name="bell" />
    </div>
  )
}

export function Sizes() {
  return (
    <div style={{ ...row, alignItems: 'flex-end' }}>
      <Icon name="star" size="xs" />
      <Icon name="star" size="sm" />
      <Icon name="star" size="md" />
      <Icon name="star" size="lg" />
      <Icon name="star" size="xl" />
    </div>
  )
}

export function NumericSize() {
  return (
    <div style={{ ...row, alignItems: 'flex-end' }}>
      <Icon name="heart" size={14} />
      <Icon name="heart" size={28} />
      <Icon name="heart" size={48} />
    </div>
  )
}

export function StatusIcons() {
  return (
    <div style={row}>
      <Icon name="info" />
      <Icon name="warning" />
      <Icon name="success" />
      <Icon name="error" />
    </div>
  )
}
