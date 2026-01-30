import { cn } from '../../utils/cn'

export type BubbleDirection = 'left' | 'right' | 'top' | 'bottom'
export type BubbleVariant = 'speech' | 'thought'
export type BubbleSize = 'sm' | 'md' | 'lg'

export interface SpeechBubbleProps {
  children: React.ReactNode
  direction?: BubbleDirection
  variant?: BubbleVariant
  size?: BubbleSize
  color?: string
  borderColor?: string
  className?: string
  style?: React.CSSProperties
}

const sizeClasses: Record<BubbleSize, string> = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-2 text-sm',
  lg: 'px-4 py-3 text-base',
}

export function SpeechBubble({
  children,
  direction = 'bottom',
  variant = 'speech',
  size = 'md',
  color = 'var(--glass-bg, rgba(255, 255, 255, 0.05))',
  borderColor = 'var(--glass-border, rgba(255, 255, 255, 0.1))',
  className,
  style,
}: SpeechBubbleProps) {
  const isThought = variant === 'thought'

  // Tail positioning
  const tailPosition: Record<BubbleDirection, string> = {
    bottom: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-full',
    top: 'top-0 left-1/2 -translate-x-1/2 -translate-y-full rotate-180',
    left: 'left-0 top-1/2 -translate-x-full -translate-y-1/2 -rotate-90',
    right: 'right-0 top-1/2 translate-x-full -translate-y-1/2 rotate-90',
  }

  // Thought bubble dots positioning
  const dotsPosition: Record<BubbleDirection, string> = {
    bottom: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-[150%]',
    top: 'top-0 left-1/2 -translate-x-1/2 -translate-y-[150%]',
    left: 'left-0 top-1/2 -translate-x-[150%] -translate-y-1/2',
    right: 'right-0 top-1/2 translate-x-[150%] -translate-y-1/2',
  }

  return (
    <div
      className={cn('relative inline-block', className)}
      style={style}
    >
      <div
        className={cn(
          'relative rounded-xl',
          sizeClasses[size]
        )}
        style={{
          backgroundColor: color,
          border: `1px solid ${borderColor}`,
        }}
      >
        {children}

        {/* Speech tail or thought dots */}
        {isThought ? (
          <div className={cn('absolute flex gap-1', dotsPosition[direction])}>
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: color, border: `1px solid ${borderColor}` }}
            />
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: color, border: `1px solid ${borderColor}` }}
            />
          </div>
        ) : (
          <div className={cn('absolute', tailPosition[direction])}>
            <svg
              width="12"
              height="8"
              viewBox="0 0 12 8"
              fill="none"
            >
              <path
                d="M6 8L0 0H12L6 8Z"
                fill={color}
              />
              <path
                d="M0.5 0L6 7L11.5 0"
                stroke={borderColor}
                strokeWidth="1"
                fill="none"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  )
}
