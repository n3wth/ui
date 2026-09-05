import { Badge } from '@n3wth/ui'

const row = { display: 'flex', gap: 10, flexWrap: 'wrap' as const, alignItems: 'center' }

export function Variants() {
  return (
    <div style={row}>
      <Badge variant="default">Default</Badge>
      <Badge variant="sage">Active</Badge>
      <Badge variant="coral">Failed</Badge>
      <Badge variant="mint">New</Badge>
      <Badge variant="gold">Pro</Badge>
      <Badge variant="outline">Draft</Badge>
    </div>
  )
}

export function Sizes() {
  return (
    <div style={{ ...row, alignItems: 'center' }}>
      <Badge variant="sage" size="sm">
        Small
      </Badge>
      <Badge variant="sage" size="md">
        Medium
      </Badge>
    </div>
  )
}

export function InContext() {
  return (
    <div style={row}>
      <span style={{ fontSize: 14, color: 'var(--color-white)' }}>Deployment status</span>
      <Badge variant="sage" size="sm">
        Live
      </Badge>
      <span style={{ fontSize: 14, color: 'var(--color-white)' }}>Plan</span>
      <Badge variant="gold" size="sm">
        Pro
      </Badge>
    </div>
  )
}
