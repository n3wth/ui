import { Switch } from '@n3wth/ui'

// Switch's `label` prop only sets aria-label (no visible text node), so each
// story pairs it with its own visible caption — the way a real form would.
// The shared PreviewSurface/N3wthProvider(dark) wrapper (cfg.provider) now
// supplies the DS's dark canvas for every preview, so no per-component
// backdrop is needed here.
const row = { display: 'flex', gap: 24, flexWrap: 'wrap' as const, alignItems: 'center' }
const stack = { display: 'flex', flexDirection: 'column' as const, gap: 12 }
const withCaption = { display: 'flex', alignItems: 'center', gap: 10 }
const caption = { fontSize: 14, color: 'var(--color-white)' }

export function Sizes() {
  return (
    <div style={row}>
      <div style={withCaption}>
        <Switch size="sm" label="Small" defaultChecked />
        <span style={caption}>Small</span>
      </div>
      <div style={withCaption}>
        <Switch size="md" label="Medium" defaultChecked />
        <span style={caption}>Medium</span>
      </div>
      <div style={withCaption}>
        <Switch size="lg" label="Large" defaultChecked />
        <span style={caption}>Large</span>
      </div>
    </div>
  )
}

export function States() {
  return (
    <div style={stack}>
      <div style={withCaption}>
        <Switch label="Notifications enabled" defaultChecked />
        <span style={caption}>Notifications enabled</span>
      </div>
      <div style={withCaption}>
        <Switch label="Notifications disabled" defaultChecked={false} />
        <span style={caption}>Notifications disabled</span>
      </div>
      <div style={withCaption}>
        <Switch label="Disabled (off)" disabled />
        <span style={{ ...caption, opacity: 0.5 }}>Disabled (off)</span>
      </div>
      <div style={withCaption}>
        <Switch label="Disabled (on)" disabled defaultChecked />
        <span style={{ ...caption, opacity: 0.5 }}>Disabled (on)</span>
      </div>
    </div>
  )
}
