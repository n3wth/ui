import type { SVGProps } from 'react'

/**
 * Geometric marks for the wireframe/blueprint system.
 * Each shape carries meaning: rings = one identity, fork = two workspaces,
 * nodes = the launch path, shield = layered security, cube = a built artifact.
 *
 * All stroke-based, flat, monochrome — they read as blueprint diagrams.
 * They inherit `currentColor`, draw on a 0..120 grid with stroke width 1,
 * and layer opacity for depth. `fill:none` except deliberate nodes.
 *
 * UI icons (arrows/chevrons/play) should come from lucide-react, not here.
 */

const S = 'currentColor'

export interface MarkProps extends Omit<SVGProps<SVGSVGElement>, 'viewBox' | 'fill'> {
  /** Pixel size (width & height). Defaults to fluid via className if omitted. */
  size?: number
}

function MarkBase({ size, children, ...props }: MarkProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      width={size}
      height={size}
      strokeWidth={1}
      aria-hidden
      {...props}
    >
      {children}
    </svg>
  )
}

/** Identity — concentric rings converging on one verified core. */
export function MarkIdentity(props: MarkProps) {
  return (
    <MarkBase {...props}>
      <circle cx="60" cy="60" r="52" stroke={S} strokeOpacity="0.18" />
      <circle cx="60" cy="60" r="38" stroke={S} strokeOpacity="0.28" strokeDasharray="2 5" />
      <circle cx="60" cy="60" r="24" stroke={S} strokeOpacity="0.45" />
      <circle cx="60" cy="60" r="6" fill={S} fillOpacity="0.9" />
      <path d="M60 8v20M60 92v20M8 60h20M92 60h20" stroke={S} strokeOpacity="0.3" />
    </MarkBase>
  )
}

/** Two workspaces — one stem forking into two distinct lanes. */
export function MarkFork(props: MarkProps) {
  return (
    <MarkBase {...props}>
      <circle cx="60" cy="20" r="5" fill={S} />
      <path d="M60 25v22" stroke={S} strokeOpacity="0.5" />
      <path d="M60 47c0 0 0 8-22 8M60 47c0 0 0 8 22 8" stroke={S} strokeOpacity="0.4" />
      <path d="M38 55v40M82 55v40" stroke={S} strokeOpacity="0.4" />
      <rect x="28" y="95" width="20" height="14" rx="2" stroke={S} strokeOpacity="0.6" />
      <rect x="72" y="95" width="20" height="14" rx="2" stroke={S} strokeOpacity="0.6" />
    </MarkBase>
  )
}

/** Launch path — three connected nodes, the sign-in → choose → launch flow. */
export function MarkNodes(props: MarkProps) {
  return (
    <MarkBase {...props}>
      <path d="M24 60h72" stroke={S} strokeOpacity="0.3" strokeDasharray="2 4" />
      <circle cx="24" cy="60" r="7" stroke={S} strokeOpacity="0.6" />
      <circle cx="60" cy="60" r="7" stroke={S} strokeOpacity="0.6" />
      <circle cx="96" cy="60" r="7" fill={S} fillOpacity="0.85" />
      <path d="M60 53v-18M60 35h18" stroke={S} strokeOpacity="0.3" />
    </MarkBase>
  )
}

/** Security — layered lattice shield. */
export function MarkShield(props: MarkProps) {
  return (
    <MarkBase {...props}>
      <path d="M60 14 96 26v28c0 26-17 38-36 44-19-6-36-18-36-44V26L60 14Z" stroke={S} strokeOpacity="0.5" />
      <path
        d="M60 26 84 34v20c0 18-12 27-24 31-12-4-24-13-24-31V34L60 26Z"
        stroke={S}
        strokeOpacity="0.3"
        strokeDasharray="2 4"
      />
      <path
        d="M50 58l7 7 14-15"
        stroke={S}
        strokeOpacity="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </MarkBase>
  )
}

/** Artifact — an isometric wireframe cube, a built/shipped unit. */
export function MarkCube(props: MarkProps) {
  return (
    <MarkBase {...props}>
      {/* outer hexagon silhouette */}
      <path
        d="M60 16 100 39v42L60 104 20 81V39L60 16Z"
        stroke={S}
        strokeOpacity="0.45"
        strokeLinejoin="round"
      />
      {/* top face */}
      <path d="M20 39 60 62l40-23" stroke={S} strokeOpacity="0.6" strokeLinejoin="round" />
      {/* vertical spine */}
      <path d="M60 62v42" stroke={S} strokeOpacity="0.6" />
      {/* inner construction lines */}
      <path d="M60 16v46M20 39l40 23M100 39 60 62" stroke={S} strokeOpacity="0.22" strokeDasharray="2 4" />
      <circle cx="60" cy="62" r="3" fill={S} fillOpacity="0.85" />
    </MarkBase>
  )
}

export const Marks = {
  Identity: MarkIdentity,
  Fork: MarkFork,
  Nodes: MarkNodes,
  Shield: MarkShield,
  Cube: MarkCube,
}
