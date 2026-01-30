import { Shape } from '../../atoms/Shape'
import { cn } from '../../utils/cn'
import { presets, CompositePreset, ShapeLayer } from './presets'

export interface CompositeShapeProps {
  preset?: CompositePreset
  layers?: ShapeLayer[]
  scale?: number
  className?: string
  style?: React.CSSProperties
}

export function CompositeShape({
  preset,
  layers,
  scale = 1,
  className,
  style,
}: CompositeShapeProps) {
  const shapeLayers = layers || (preset ? presets[preset] : [])

  if (shapeLayers.length === 0) {
    return null
  }

  // Calculate bounding box for the composition
  const bounds = shapeLayers.reduce(
    (acc, layer) => {
      const halfSize = layer.size / 2
      const x = layer.offsetX || 0
      const y = layer.offsetY || 0
      return {
        minX: Math.min(acc.minX, x - halfSize),
        maxX: Math.max(acc.maxX, x + halfSize),
        minY: Math.min(acc.minY, y - halfSize),
        maxY: Math.max(acc.maxY, y + halfSize),
      }
    },
    { minX: 0, maxX: 0, minY: 0, maxY: 0 }
  )

  const width = (bounds.maxX - bounds.minX) * scale
  const height = (bounds.maxY - bounds.minY) * scale
  const centerX = -bounds.minX
  const centerY = -bounds.minY

  return (
    <div
      className={cn('relative inline-block', className)}
      style={{
        width,
        height,
        ...style,
      }}
    >
      {shapeLayers.map((layer, index) => {
        const x = ((layer.offsetX || 0) + centerX) * scale
        const y = ((layer.offsetY || 0) + centerY) * scale
        const size = layer.size * scale

        return (
          <div
            key={index}
            className="absolute"
            style={{
              left: x,
              top: y,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Shape
              type={layer.type}
              size={size}
              color={layer.color}
              pattern={layer.pattern}
              patternColors={layer.patternColors}
              rotation={layer.rotation}
              opacity={layer.opacity}
            />
          </div>
        )
      })}
    </div>
  )
}
