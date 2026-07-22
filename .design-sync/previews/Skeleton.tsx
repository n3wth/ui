import { Skeleton } from '@n3wth/ui'

// The animate=true path delegates to Astryx's own Skeleton primitive (visible
// fine on white), but animate=false falls back to the legacy
// `bg-[var(--glass-highlight)]` styling — a translucent-white token tuned for
// the app's dark canvas, invisible without it (same reasoning as
// Toast/Label/Progress/Separator/Tooltip).
const backdrop = { background: 'var(--color-bg)', padding: 24, borderRadius: 12 }

export function Variants() {
  return (
    <div style={backdrop}>
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end' }}>
        <Skeleton variant="text" width={160} />
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="rectangular" width={120} height={80} />
      </div>
    </div>
  )
}

export function AnimatedVsStatic() {
  return (
    <div style={backdrop}>
      <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 12, width: 240 }}>
        <Skeleton variant="text" width="100%" animate />
        <Skeleton variant="text" width="100%" animate={false} />
      </div>
    </div>
  )
}

export function CardLoadingState() {
  return (
    <div style={backdrop}>
      <div
        style={{
          width: 280,
          padding: 20,
          borderRadius: 16,
          border: '1px solid var(--glass-border)',
          background: 'var(--glass-bg)',
          display: 'flex',
          flexDirection: 'column' as const,
          gap: 10,
        }}
      >
        <Skeleton variant="circular" width={32} height={32} />
        <Skeleton variant="text" width="70%" height={20} />
        <Skeleton variant="text" width="100%" height={14} />
        <Skeleton variant="text" width="85%" height={14} />
      </div>
    </div>
  )
}
