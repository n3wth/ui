import { Tooltip } from '@n3wth/ui'
import { useEffect, useRef, type ReactNode } from 'react'

// Tooltip only opens on real hover/focus (no controlled/open prop), which
// can't happen in a static capture. Force it open by dispatching a native
// mouseenter at the trigger ref right after mount (showDelay=0 so it opens
// on the same tick) — this exercises the component's real show path rather
// than reimplementing its look.
function OpenTooltip({
  children,
  ...props
}: React.ComponentProps<typeof Tooltip>) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    // React's synthetic onMouseEnter is derived from native 'mouseover'
    // (mouseenter itself doesn't bubble, so React doesn't listen for it
    // directly) — dispatch 'mouseover' so the real show() handler fires.
    ref.current?.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }))
  }, [])
  return (
    <Tooltip ref={ref} showDelay={0} {...props}>
      {children}
    </Tooltip>
  )
}

// Both the trigger and the tooltip popup use --glass-bg/--glass-border/
// --color-white, tuned for the app's dark canvas (same reasoning as
// Toast/Label/Progress/Separator). But the popup itself portals straight to
// document.body (see Tooltip.tsx), escaping any wrapper div — so a local
// backdrop div isn't enough here; darken the page body itself on mount.
function Stage({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.body.style.background = 'var(--color-bg)'
  }, [])
  return (
    <div style={{ padding: '64px 80px', display: 'flex', alignItems: 'center' }}>{children}</div>
  )
}

const row = { display: 'flex', gap: 64, alignItems: 'center' }
const trigger: React.CSSProperties = {
  padding: '6px 12px',
  borderRadius: 8,
  border: '1px solid var(--glass-border)',
  background: 'var(--glass-bg)',
  color: 'var(--color-white)',
  fontSize: 13,
}

function Trigger({ children }: { children: ReactNode }) {
  return <span style={trigger}>{children}</span>
}

export function Positions() {
  return (
    <Stage>
      <div style={row}>
        <OpenTooltip content="Saves your changes" position="top">
          <Trigger>Top</Trigger>
        </OpenTooltip>
        <OpenTooltip content="Saves your changes" position="bottom">
          <Trigger>Bottom</Trigger>
        </OpenTooltip>
        <OpenTooltip content="Saves your changes" position="left">
          <Trigger>Left</Trigger>
        </OpenTooltip>
        <OpenTooltip content="Saves your changes" position="right">
          <Trigger>Right</Trigger>
        </OpenTooltip>
      </div>
    </Stage>
  )
}

export function WithoutArrow() {
  return (
    <Stage>
      <OpenTooltip content="No arrow indicator" position="top" arrow={false}>
        <Trigger>Hover target</Trigger>
      </OpenTooltip>
    </Stage>
  )
}

export function LongContent() {
  return (
    <Stage>
      <OpenTooltip
        content="Your plan includes unlimited projects, priority support, and advanced analytics."
        position="bottom"
      >
        <Trigger>Plan details</Trigger>
      </OpenTooltip>
    </Stage>
  )
}
