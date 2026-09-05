import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
} from '@n3wth/ui'

export function Variants() {
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' as const }}>
      {(['default', 'glass', 'interactive'] as const).map((variant) => (
        <div key={variant} style={{ width: 220 }}>
          <Card variant={variant}>
            <CardHeader>
              <CardTitle>{variant[0].toUpperCase() + variant.slice(1)} card</CardTitle>
              <CardDescription>
                {variant === 'glass'
                  ? 'Backdrop blur over content'
                  : variant === 'interactive'
                    ? 'Hover for lift and border glow'
                    : 'Basic bordered surface'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p style={{ fontSize: 14, color: 'var(--color-grey-400)' }}>
                Cards group related content and actions about a single subject.
              </p>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  )
}

export function WithFooterActions() {
  return (
    <div style={{ width: 320 }}>
      <Card variant="default" padding="lg">
        <CardHeader>
          <CardTitle>Upgrade to Pro</CardTitle>
          <CardDescription>Unlock unlimited projects and priority support.</CardDescription>
        </CardHeader>
        <CardContent>
          <p style={{ fontSize: 14, color: 'var(--color-grey-400)' }}>
            $12/month, billed annually. Cancel anytime.
          </p>
        </CardContent>
        <CardFooter>
          <Button size="sm" variant="ghost">
            Not now
          </Button>
          <Button size="sm" variant="secondary">
            Upgrade
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export function CompactPadding() {
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' as const }}>
      {(['none', 'sm', 'lg'] as const).map((padding) => (
        <div key={padding} style={{ width: 220 }}>
          <Card variant="default" padding={padding}>
            <CardContent>
              <p style={{ fontSize: 13, color: 'var(--color-grey-400)' }}>
                padding=&quot;{padding}&quot;
              </p>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  )
}
