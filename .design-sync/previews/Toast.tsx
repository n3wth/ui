import { Toast } from '@n3wth/ui'

// Toast is a glass-surface component (translucent bg + backdrop-blur)
// designed to float over the app's dark canvas — it needs that dark
// backdrop to read correctly, the same way it always renders in product.
const backdrop = {
  background: 'var(--color-bg)',
  padding: 24,
  borderRadius: 12,
}
const stack = { display: 'flex', flexDirection: 'column' as const, gap: 12 }

export function Variants() {
  return (
    <div style={backdrop}>
      <div style={stack}>
        <Toast
          variant="default"
          title="Notification"
          description="You have a new message."
          duration={0}
        />
        <Toast
          variant="success"
          title="Changes saved"
          description="Your profile has been updated."
          duration={0}
        />
        <Toast
          variant="error"
          title="Upload failed"
          description="The file exceeds the 10MB limit."
          duration={0}
        />
        <Toast
          variant="warning"
          title="Storage almost full"
          description="You're using 92% of your available space."
          duration={0}
        />
        <Toast
          variant="info"
          title="New version available"
          description="Refresh the page to update."
          duration={0}
        />
      </div>
    </div>
  )
}

export function TitleOnly() {
  return (
    <div style={backdrop}>
      <Toast variant="success" title="Copied to clipboard" duration={0} />
    </div>
  )
}

export function LongDescription() {
  return (
    <div style={backdrop}>
      <Toast
        variant="error"
        title="Payment failed"
        description="We couldn't charge your card ending in 4242. Please update your billing details to keep your subscription active."
        duration={0}
      />
    </div>
  )
}
