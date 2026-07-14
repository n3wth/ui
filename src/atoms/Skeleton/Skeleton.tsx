import { type HTMLAttributes } from 'react'
import { Skeleton as AstryxSkeleton } from '@astryxdesign/core/Skeleton'
import { cn } from '../../utils/cn'

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** Skeleton variant */
  variant?: 'text' | 'circular' | 'rectangular'
  /** Width of the skeleton */
  width?: string | number
  /** Height of the skeleton */
  height?: string | number
  /** Enable shimmer animation */
  animate?: boolean
}

// Maps the original `variant` prop onto Astryx's numeric/keyword radius scale.
const radiusForVariant = {
  text: 1,
  circular: 'rounded',
  rectangular: 2,
} as const

/**
 * Skeleton loading placeholder.
 *
 * Delegates to Astryx's `Skeleton` primitive (theming, shimmer animation,
 * staggering) while keeping the original `variant`/`animate` prop surface.
 * Astryx's skeleton always animates, so `animate={false}` falls back to a
 * static placeholder using the legacy glass-highlight styling.
 */
export function Skeleton({
  variant = 'text',
  width,
  height,
  animate = true,
  className,
  style,
  ...props
}: SkeletonProps) {
  // 'text' skeletons default to a single line height, matching the previous
  // `h-4` (16px) Tailwind class when no explicit height is provided.
  const resolvedHeight = height ?? (variant === 'text' ? 16 : undefined)

  if (!animate) {
    const variantRadius = {
      text: 'rounded',
      circular: 'rounded-full',
      rectangular: 'rounded-lg',
    }[variant]

    return (
      <div
        aria-hidden="true"
        data-animate="false"
        className={cn('bg-[var(--glass-highlight)]', variantRadius, className)}
        style={{
          width: typeof width === 'number' ? `${width}px` : width,
          height: typeof resolvedHeight === 'number' ? `${resolvedHeight}px` : resolvedHeight,
          ...style,
        }}
        {...props}
      />
    )
  }

  return (
    <AstryxSkeleton
      width={width ?? '100%'}
      height={resolvedHeight ?? '100%'}
      radius={radiusForVariant[variant]}
      className={className}
      style={style}
      {...props}
    />
  )
}

export interface CardSkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of text lines to show */
  lines?: number
  /** Show header indicator */
  showHeader?: boolean
  /** Show tags row */
  showTags?: boolean
}

/**
 * Pre-composed card skeleton for common use cases
 */
export function CardSkeleton({
  lines = 2,
  showHeader = true,
  showTags = true,
  className,
  ...props
}: CardSkeletonProps) {
  return (
    <div
      className={cn(
        'p-5 md:p-6 rounded-2xl border',
        'bg-[var(--glass-bg)] border-[var(--glass-border)]',
        className
      )}
      {...props}
    >
      {showHeader && (
        <div className="mb-3 md:mb-4">
          <Skeleton variant="circular" width={12} height={12} />
        </div>
      )}

      <Skeleton width="70%" height={20} className="mb-2" />

      <div className="space-y-2 mb-3 md:mb-4">
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton
            key={i}
            width={i === lines - 1 ? '85%' : '100%'}
            height={14}
            className="bg-[var(--glass-bg)]"
          />
        ))}
      </div>

      {showTags && (
        <div className="flex flex-wrap gap-2">
          {[50, 60, 70].map((width, i) => (
            <Skeleton
              key={i}
              width={width}
              height={12}
              className="bg-[var(--glass-bg)]"
            />
          ))}
        </div>
      )}
    </div>
  )
}
