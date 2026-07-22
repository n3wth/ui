import { Input, Label, Icon } from '@n3wth/ui'

// Label and Input's typed/value text both render in the DS's default
// `var(--color-white)`, correct for the product's dark canvas — the shared
// PreviewSurface/N3wthProvider(dark) wrapper (cfg.provider) now supplies
// that canvas for every preview, so no per-component backdrop is needed here.
const field = { display: 'flex', flexDirection: 'column' as const, gap: 6, width: 240 }
const row = { display: 'flex', gap: 16, flexWrap: 'wrap' as const, alignItems: 'flex-start' }

export function Variants() {
  return (
    <div style={row}>
      <div style={field}>
        <Label htmlFor="input-default">Email</Label>
        <Input id="input-default" variant="default" placeholder="you@example.com" />
      </div>
      <div style={field}>
        <Label htmlFor="input-glass">Email</Label>
        <Input id="input-glass" variant="glass" placeholder="you@example.com" />
      </div>
    </div>
  )
}

export function Sizes() {
  return (
    <div style={{ ...row, alignItems: 'center' }}>
      <Input inputSize="sm" placeholder="Small" style={{ width: 160 }} />
      <Input inputSize="md" placeholder="Medium" style={{ width: 200 }} />
      <Input inputSize="lg" placeholder="Large" style={{ width: 240 }} />
    </div>
  )
}

export function WithIcons() {
  return (
    <div style={row}>
      <Input
        leftIcon={<Icon name="search" size="sm" />}
        placeholder="Search…"
        style={{ width: 220 }}
      />
      <Input
        type="password"
        rightIcon={<Icon name="eye" size="sm" />}
        placeholder="Password"
        style={{ width: 220 }}
      />
    </div>
  )
}

export function States() {
  return (
    <div style={row}>
      <div style={field}>
        <Label htmlFor="input-error">Username</Label>
        <Input id="input-error" defaultValue="taken-handle" error="This username is already taken" />
      </div>
      <div style={field}>
        <Label htmlFor="input-disabled" disabled>
          Company
        </Label>
        <Input id="input-disabled" disabled placeholder="Disabled" />
      </div>
    </div>
  )
}
