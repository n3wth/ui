import { Avatar } from '@n3wth/ui'

const row = { display: 'flex', gap: 12, flexWrap: 'wrap' as const, alignItems: 'center' }

// Inline data-URI so the capture never depends on a network fetch.
const photo =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><rect width="64" height="64" fill="#5B7B6B"/><circle cx="32" cy="24" r="12" fill="#EDEAE3"/><rect x="10" y="40" width="44" height="24" rx="12" fill="#EDEAE3"/></svg>`
  )

export function Sizes() {
  return (
    <div style={{ ...row, alignItems: 'flex-end' }}>
      <Avatar size="xs" src={photo} alt="Oliver Newth" />
      <Avatar size="sm" src={photo} alt="Oliver Newth" />
      <Avatar size="md" src={photo} alt="Oliver Newth" />
      <Avatar size="lg" src={photo} alt="Oliver Newth" />
      <Avatar size="xl" src={photo} alt="Oliver Newth" />
    </div>
  )
}

export function Fallback() {
  return (
    <div style={row}>
      <Avatar size="md" fallback="ON" alt="Oliver Newth" />
      <Avatar size="md" fallback="AB" alt="Amy Brooks" />
      <Avatar size="md" fallback="?" alt="Unknown user" />
    </div>
  )
}
