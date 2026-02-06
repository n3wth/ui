import { DemoSection, DemoBlock } from './DemoSection'
import { CodeSnippet } from './CodeSnippet'

const colorTokens = [
  { name: '--color-bg', value: 'var(--color-bg)', label: 'Background' },
  { name: '--color-bg-secondary', value: 'var(--color-bg-secondary)', label: 'Background Secondary' },
  { name: '--color-white', value: 'var(--color-white)', label: 'White (foreground)' },
  { name: '--color-grey-100', value: 'var(--color-grey-100)', label: 'Grey 100' },
  { name: '--color-grey-200', value: 'var(--color-grey-200)', label: 'Grey 200' },
  { name: '--color-grey-300', value: 'var(--color-grey-300)', label: 'Grey 300' },
  { name: '--color-grey-400', value: 'var(--color-grey-400)', label: 'Grey 400' },
  { name: '--color-grey-600', value: 'var(--color-grey-600)', label: 'Grey 600' },
  { name: '--color-grey-800', value: 'var(--color-grey-800)', label: 'Grey 800' },
]

const accentTokens = [
  { name: '--color-sage', value: 'var(--color-sage)', label: 'Sage' },
  { name: '--color-coral', value: 'var(--color-coral)', label: 'Coral' },
  { name: '--color-mint', value: 'var(--color-mint)', label: 'Mint' },
  { name: '--color-gold', value: 'var(--color-gold)', label: 'Gold' },
]

const glassTokens = [
  { name: '--glass-bg', value: 'var(--glass-bg)', label: 'Glass Background' },
  { name: '--glass-border', value: 'var(--glass-border)', label: 'Glass Border' },
  { name: '--glass-highlight', value: 'var(--glass-highlight)', label: 'Glass Highlight' },
]

function ColorSwatch({ name, value, label }: { name: string; value: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="w-10 h-10 rounded-lg border border-[var(--glass-border)] shrink-0"
        style={{ backgroundColor: value }}
      />
      <div className="min-w-0">
        <div className="text-xs font-medium text-[var(--color-white)] truncate">{label}</div>
        <div className="text-[10px] font-mono text-[var(--color-grey-400)] truncate">{name}</div>
      </div>
    </div>
  )
}

export function TokensSection() {
  return (
    <DemoSection id="tokens" title="Design Tokens" description="CSS custom properties that power the design system. Automatically adapt to light/dark themes.">
      <DemoBlock title="Core Colors">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {colorTokens.map((token) => (
            <ColorSwatch key={token.name} {...token} />
          ))}
        </div>
      </DemoBlock>

      <DemoBlock title="Category Colors">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {accentTokens.map((token) => (
            <ColorSwatch key={token.name} {...token} />
          ))}
        </div>
      </DemoBlock>

      <DemoBlock title="Glass Morphism">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          {glassTokens.map((token) => (
            <ColorSwatch key={token.name} {...token} />
          ))}
        </div>
        <div className="flex gap-4 mt-6">
          <div className="flex-1 p-6 rounded-2xl bg-[var(--glass-bg)] border border-[var(--glass-border)] backdrop-blur-lg">
            <p className="text-sm text-[var(--color-grey-400)]">Glass panel with blur</p>
          </div>
          <div className="flex-1 p-6 rounded-2xl bg-[var(--glass-bg)] border border-[var(--glass-highlight)]">
            <p className="text-sm text-[var(--color-grey-400)]">Glass with highlight border</p>
          </div>
        </div>
      </DemoBlock>

      <DemoBlock title="Typography">
        <div className="space-y-3">
          <p className="font-display text-3xl font-semibold tracking-tight text-[var(--color-white)]">Mona Sans (Display)</p>
          <p className="font-sans text-base text-[var(--color-white)]">Geist Sans (Body/UI)</p>
          <p className="font-mono text-sm text-[var(--color-grey-400)]">Geist Mono (Code)</p>
        </div>
      </DemoBlock>

      <DemoBlock title="Usage">
        <CodeSnippet code={`/* CSS custom properties */
.my-component {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  color: var(--color-white);
}

/* Tailwind classes via preset */
<div className="bg-glass-bg border-glass-border text-white" />`} />
      </DemoBlock>
    </DemoSection>
  )
}
