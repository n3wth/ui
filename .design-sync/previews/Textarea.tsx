import { Textarea, Label } from '@n3wth/ui'

// Label and Textarea's typed/value text both render in the DS's default
// `var(--color-white)`, correct for the product's dark canvas — the shared
// PreviewSurface/N3wthProvider(dark) wrapper (cfg.provider) now supplies
// that canvas for every preview, so no per-component backdrop is needed here.
const field = { display: 'flex', flexDirection: 'column' as const, gap: 6, width: 280 }
const row = { display: 'flex', gap: 16, flexWrap: 'wrap' as const, alignItems: 'flex-start' }

export function Default() {
  return (
    <div style={field}>
      <Label htmlFor="textarea-default">Message</Label>
      <Textarea
        id="textarea-default"
        placeholder="Tell us what's on your mind…"
        style={{ width: '100%' }}
      />
    </div>
  )
}

export function ResizeModes() {
  return (
    <div style={row}>
      <div style={field}>
        <Label htmlFor="textarea-none">No resize</Label>
        <Textarea id="textarea-none" resize="none" defaultValue="Fixed height, can't be resized." />
      </div>
      <div style={field}>
        <Label htmlFor="textarea-both">Free resize</Label>
        <Textarea id="textarea-both" resize="both" defaultValue="Drag the corner to resize freely." />
      </div>
    </div>
  )
}

export function ErrorState() {
  return (
    <div style={field}>
      <Label htmlFor="textarea-error">Feedback</Label>
      <Textarea
        id="textarea-error"
        error
        defaultValue="Too short."
        aria-describedby="textarea-error-msg"
      />
      <span id="textarea-error-msg" style={{ fontSize: 12, color: 'var(--color-coral)' }}>
        Please provide at least 20 characters.
      </span>
    </div>
  )
}
