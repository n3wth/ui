import { NavLink, Icon } from '@n3wth/ui'

// NavLink's text color is var(--color-white) except the active `pill`
// variant — it's designed for the app's dark canvas (same pattern as
// Toast/Hero/Section), so the row itself needs a dark backdrop, not just
// the glass panel styling, or the default/underline/inactive-pill links
// are invisible against a light capture background.
const row = {
  display: 'flex',
  flexWrap: 'wrap' as const,
  gap: 24,
  alignItems: 'center',
  padding: 24,
  borderRadius: 16,
  border: '1px solid var(--glass-border)',
  background: 'var(--color-bg)',
}

export function Variants() {
  return (
    <div style={row}>
      <NavLink href="#" variant="default">Default</NavLink>
      <NavLink href="#" variant="underline">Underline</NavLink>
      <NavLink href="#" variant="pill">Pill</NavLink>
    </div>
  )
}

export function ActiveState() {
  return (
    <div style={row}>
      <NavLink href="#" variant="pill" isActive>Active</NavLink>
      <NavLink href="#" variant="pill">Inactive</NavLink>
      <NavLink href="#" variant="underline" isActive>Active</NavLink>
      <NavLink href="#" variant="underline">Inactive</NavLink>
    </div>
  )
}

export function WithIcon() {
  return (
    <div style={row}>
      <NavLink href="https://github.com/n3wth/ui" variant="default">
        <Icon name="external-link" size="sm" style={{ marginRight: 6 }} />
        GitHub
      </NavLink>
      <NavLink href="#docs" variant="pill" isActive>
        <Icon name="external-link" size="sm" style={{ marginRight: 6 }} />
        Docs
      </NavLink>
    </div>
  )
}
