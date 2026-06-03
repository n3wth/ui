import { Logo } from '../../src/atoms/Logo'
import { Marks } from '../../src/atoms/Marks'
import { DitherField } from '../../src/atoms/DitherField'
import { Reveal } from '../../src/atoms/Reveal'
import { Frame, SectionHeader } from '../../src/molecules/Frame'

const marks = [
  { key: 'Identity', Cmp: Marks.Identity },
  { key: 'Fork', Cmp: Marks.Fork },
  { key: 'Nodes', Cmp: Marks.Nodes },
  { key: 'Shield', Cmp: Marks.Shield },
  { key: 'Cube', Cmp: Marks.Cube },
] as const

export function WireframeSection() {
  return (
    <section id="wireframe" className="scroll-mt-24 space-y-8">
      <SectionHeader
        index="05"
        label="Wireframe Primitives"
        description="Shared blueprint primitives — monochrome, flat, framework-portable."
      />

      {/* Logo + Marks */}
      <div className="space-y-4">
        <span className="wf-label">Logo / Marks</span>
        <div className="flex flex-wrap items-end gap-8" style={{ color: 'var(--ink)' }}>
          <div className="flex flex-col items-center gap-2">
            <Logo size={40} />
            <span className="index-num">Logo</span>
          </div>
          {marks.map(({ key, Cmp }) => (
            <div key={key} className="flex flex-col items-center gap-2">
              <Cmp size={64} />
              <span className="index-num">{key}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Frame + ticks */}
      <div className="space-y-4">
        <span className="wf-label">Frame + Corner Ticks</span>
        <Frame className="p-8">
          <p className="wf-h3">Hairline frame</p>
          <p className="wf-body mt-1">9px tick cross-marks pinned to each corner.</p>
        </Frame>
      </div>

      {/* DitherField */}
      <div className="space-y-4">
        <span className="wf-label">DitherField (move your cursor)</span>
        <Frame ticks={false} className="h-64 overflow-hidden">
          <DitherField />
        </Frame>
      </div>

      {/* Reveal */}
      <div className="space-y-4">
        <span className="wf-label">Reveal</span>
        <Reveal>
          <Frame className="p-6">
            <p className="wf-body" style={{ color: 'var(--ink)' }}>
              This block fades + lifts in on scroll via IntersectionObserver (reduced-motion safe).
            </p>
          </Frame>
        </Reveal>
      </div>
    </section>
  )
}
