import { Progress } from '@n3wth/ui'

// The default variant's fill and the track use --color-white / --glass-*
// tokens tuned for the app's dark canvas — needs the dark backdrop, same
// reasoning as Toast/Label.
const backdrop = { background: 'var(--color-bg)', padding: 24, borderRadius: 12 }
const stack = { display: 'flex', flexDirection: 'column' as const, gap: 16, width: 280 }

export function Variants() {
  return (
    <div style={backdrop}>
      <div style={stack}>
        <Progress value={72} variant="default" label="Uploading assets" showValue />
        <Progress value={100} variant="success" label="Backup complete" showValue />
        <Progress value={40} variant="warning" label="Storage used" showValue />
        <Progress value={15} variant="error" label="Sync failed" showValue />
      </div>
    </div>
  )
}

export function Sizes() {
  return (
    <div style={backdrop}>
      <div style={stack}>
        <Progress value={60} size="sm" label="Small" />
        <Progress value={60} size="md" label="Medium" />
        <Progress value={60} size="lg" label="Large" />
      </div>
    </div>
  )
}

export function Minimal() {
  return (
    <div style={backdrop}>
      <div style={{ width: 280 }}>
        <Progress value={35} />
      </div>
    </div>
  )
}
