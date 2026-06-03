import type { SVGProps } from 'react'

export interface LogoProps extends Omit<SVGProps<SVGSVGElement>, 'viewBox'> {
  /** Pixel size (width & height). */
  size?: number
}

/**
 * Logo — the rounded agentic cursor glyph. The classic agent pointer,
 * softened with round joins. Monochrome, inherits `currentColor`.
 */
export function Logo({ size = 22, ...props }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
      {...props}
    >
      <path
        d="M7.4 5.1 26.8 14.2c1.5.7 1.4 2.9-.2 3.4l-7.6 2.2a2.4 2.4 0 0 0-1.6 1.5l-2.7 7.5c-.6 1.6-2.9 1.5-3.3-.2L5.3 7.2C4.9 5.6 6 4.4 7.4 5.1Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  )
}
