import { Label } from '@n3wth/ui'

// Label uses --color-white text and its sibling controls use the
// --glass-bg/--glass-border tokens, all tuned for the app's dark canvas —
// same as Toast, this needs the dark backdrop to read at all (on the
// capture sheet's white page these are all near-invisible).
const backdrop = { background: 'var(--color-bg)', padding: 24, borderRadius: 12 }
const field = { display: 'flex', flexDirection: 'column' as const, gap: 6, width: 240 }
const input = {
  padding: '8px 12px',
  borderRadius: 8,
  border: '1px solid var(--glass-border)',
  background: 'var(--glass-bg)',
  color: 'var(--color-white)',
  fontSize: 14,
  fontFamily: 'inherit',
}

export function Default() {
  return (
    <div style={backdrop}>
      <div style={field}>
        <Label htmlFor="email">Email address</Label>
        <input id="email" type="email" placeholder="you@example.com" style={input} />
      </div>
    </div>
  )
}

export function Required() {
  return (
    <div style={backdrop}>
      <div style={field}>
        <Label htmlFor="name" required>
          Full name
        </Label>
        <input id="name" type="text" placeholder="Jane Doe" style={input} />
      </div>
    </div>
  )
}

export function Disabled() {
  return (
    <div style={backdrop}>
      <div style={field}>
        <Label htmlFor="plan" disabled>
          Plan (managed by admin)
        </Label>
        <input
          id="plan"
          type="text"
          defaultValue="Enterprise"
          disabled
          style={{ ...input, opacity: 0.5, cursor: 'not-allowed' }}
        />
      </div>
    </div>
  )
}
