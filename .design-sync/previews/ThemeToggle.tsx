import { ThemeToggle } from '@n3wth/ui'

// ThemeToggle's border/icon colors are glass tokens tuned for the app's
// dark canvas (same pattern as Toast/Hero/Section/NavLink) — low contrast
// without a dark backdrop.
const row = {
  display: 'flex',
  gap: 16,
  alignItems: 'center',
  background: 'var(--color-bg)',
  padding: 20,
  borderRadius: 12,
  color: 'var(--color-white)',
}

export function Sizes() {
  return (
    <div style={row}>
      <ThemeToggle theme="dark" onToggle={() => {}} size="sm" />
      <ThemeToggle theme="dark" onToggle={() => {}} size="md" />
    </div>
  )
}

export function DarkTheme() {
  return (
    <div style={row}>
      <ThemeToggle theme="dark" onToggle={() => {}} size="md" />
      <span style={{ fontSize: 13, opacity: 0.7 }}>currently dark — click to switch to light</span>
    </div>
  )
}

export function LightTheme() {
  return (
    <div style={row}>
      <ThemeToggle theme="light" onToggle={() => {}} size="md" />
      <span style={{ fontSize: 13, opacity: 0.7 }}>currently light — click to switch to dark</span>
    </div>
  )
}
