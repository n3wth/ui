import { Separator } from '@n3wth/ui'

// Heading text uses --color-white and the divider itself renders from the
// n3wth Astryx theme's --color-border, tuned for the app's dark canvas —
// needs the dark backdrop, same reasoning as Toast/Label/Progress.
const backdrop = { background: 'var(--color-bg)', padding: 24, borderRadius: 12 }

export function Horizontal() {
  return (
    <div style={backdrop}>
      <div style={{ width: 280 }}>
        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-white)', margin: 0 }}>
          Account settings
        </p>
        <div style={{ margin: '12px 0' }}>
          <Separator orientation="horizontal" />
        </div>
        <p style={{ fontSize: 14, color: 'var(--color-grey-400)', margin: 0 }}>
          Manage your profile, billing, and security preferences.
        </p>
      </div>
    </div>
  )
}

export function Vertical() {
  return (
    <div style={backdrop}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, height: 24 }}>
        <span style={{ fontSize: 14, color: 'var(--color-white)' }}>Edit</span>
        <Separator orientation="vertical" style={{ height: 16 }} />
        <span style={{ fontSize: 14, color: 'var(--color-white)' }}>Duplicate</span>
        <Separator orientation="vertical" style={{ height: 16 }} />
        <span style={{ fontSize: 14, color: 'var(--color-coral)' }}>Delete</span>
      </div>
    </div>
  )
}
