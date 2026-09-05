import { Section, SectionHeader } from '@n3wth/ui'

// SectionHeader's title uses var(--color-white) and Section is always used
// on the app's dark canvas (same pattern as Toast/Hero) — needs a dark
// backdrop to read correctly in an isolated capture.
const backdrop = { background: 'var(--color-bg)', borderRadius: 12 }

const placeholderBlock = {
  height: 96,
  borderRadius: 12,
  border: '1px dashed var(--glass-border)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 13,
  color: 'var(--color-grey-400)',
}

export function Default() {
  return (
    <div style={backdrop}>
      <Section id="features">
        <SectionHeader
          title="Features"
          description="Everything you need to build a consistent product surface."
        />
        <div style={placeholderBlock}>content goes here</div>
      </Section>
    </div>
  )
}

export function Compact() {
  return (
    <div style={backdrop}>
      <Section size="sm" spacing="sm">
        <SectionHeader title="Compact section" description="Tighter spacing, narrower container." align="center" />
        <div style={placeholderBlock}>content goes here</div>
      </Section>
    </div>
  )
}

export function LargeSpacing() {
  return (
    <div style={backdrop}>
      <Section size="lg" spacing="lg">
        <SectionHeader title="Spacious section" description="Wide container with generous vertical rhythm." />
        <div style={placeholderBlock}>content goes here</div>
      </Section>
    </div>
  )
}

export function FullBleed() {
  return (
    <div style={backdrop}>
      <Section size="full" container={false} spacing="none">
        <div style={{ ...placeholderBlock, height: 64 }}>full-bleed content, no inner container</div>
      </Section>
    </div>
  )
}
