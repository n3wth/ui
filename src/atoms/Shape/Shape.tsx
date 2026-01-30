import { cn } from '../../utils/cn'
import { generatePattern, PatternType } from './patterns'

export type ShapeType =
  | 'circle'
  | 'square'
  | 'triangle'
  | 'diamond'
  | 'hexagon'
  | 'semicircle'
  | 'arc'
  | 'pill'
  | 'star'

export interface ShapeProps {
  type: ShapeType
  size?: number | { width: number; height: number }
  color?: string
  pattern?: PatternType
  patternColors?: string[]
  patternScale?: number
  patternAngle?: number
  rotation?: number
  opacity?: number
  className?: string
  style?: React.CSSProperties
}

function getShapePath(type: ShapeType): string {
  switch (type) {
    case 'circle':
      return ''
    case 'square':
      return ''
    case 'triangle':
      return 'M12 2L22 20H2L12 2Z'
    case 'diamond':
      return 'M12 1L23 12L12 23L1 12L12 1Z'
    case 'hexagon':
      return 'M12 2L21.5 7V17L12 22L2.5 17V7L12 2Z'
    case 'semicircle':
      return 'M2 12A10 10 0 0 1 22 12Z'
    case 'arc':
      return 'M4 20A12 12 0 0 1 20 20'
    case 'pill':
      return ''
    case 'star':
      return 'M12 2L14.5 8.5L21.5 9L16.5 13.5L18 21L12 17L6 21L7.5 13.5L2.5 9L9.5 8.5L12 2Z'
    default:
      return ''
  }
}

export function Shape({
  type,
  size = 48,
  color = 'currentColor',
  pattern = 'solid',
  patternColors,
  patternScale = 1,
  patternAngle = 45,
  rotation = 0,
  opacity = 1,
  className,
  style,
}: ShapeProps) {
  const width = typeof size === 'number' ? size : size.width
  const height = typeof size === 'number' ? size : size.height

  const patternResult =
    pattern !== 'solid' && patternColors
      ? generatePattern({
          type: pattern,
          colors: patternColors,
          scale: patternScale,
          angle: patternAngle,
        })
      : null

  const fill = patternResult?.fill ?? color

  const renderShape = () => {
    switch (type) {
      case 'circle':
        return <circle cx="12" cy="12" r="10" fill={fill} />
      case 'square':
        return <rect x="2" y="2" width="20" height="20" rx="2" fill={fill} />
      case 'pill':
        return <rect x="2" y="6" width="20" height="12" rx="6" fill={fill} />
      case 'arc':
        return (
          <path
            d="M4 20A12 12 0 0 1 20 20"
            fill="none"
            stroke={fill}
            strokeWidth="4"
            strokeLinecap="round"
          />
        )
      default: {
        const path = getShapePath(type)
        return path ? <path d={path} fill={fill} /> : null
      }
    }
  }

  return (
    <svg
      viewBox="0 0 24 24"
      width={width}
      height={height}
      className={cn('shape', className)}
      style={{
        transform: rotation ? `rotate(${rotation}deg)` : undefined,
        opacity,
        ...style,
      }}
    >
      {patternResult && (
        <defs dangerouslySetInnerHTML={{ __html: patternResult.defs }} />
      )}
      {renderShape()}
    </svg>
  )
}
