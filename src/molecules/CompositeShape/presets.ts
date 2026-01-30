import { ShapeType, PatternType } from '../../atoms/Shape'

export interface ShapeLayer {
  type: ShapeType
  color: string
  pattern?: PatternType
  patternColors?: string[]
  size: number
  offsetX?: number
  offsetY?: number
  rotation?: number
  opacity?: number
}

export type CompositePreset =
  | 'rainbow-arc'
  | 'cluster'
  | 'stack'
  | 'flower'
  | 'bear'
  | 'snail'
  | 'orbit'
  | 'checkerboard-stack'

export const presets: Record<CompositePreset, ShapeLayer[]> = {
  'rainbow-arc': [
    { type: 'arc', color: '#FF6B9D', size: 80, offsetX: 0, offsetY: 0 },
    { type: 'arc', color: '#FF7F50', size: 68, offsetX: 0, offsetY: 6 },
    { type: 'arc', color: '#FFD93D', size: 56, offsetX: 0, offsetY: 12 },
    { type: 'arc', color: '#2ECC71', size: 44, offsetX: 0, offsetY: 18 },
    { type: 'arc', color: '#5DADE2', size: 32, offsetX: 0, offsetY: 24 },
    { type: 'arc', color: '#A78BFA', size: 20, offsetX: 0, offsetY: 30 },
  ],

  cluster: [
    { type: 'circle', color: '#2ECC71', size: 48, offsetX: 0, offsetY: 0 },
    { type: 'circle', color: '#FF6B9D', size: 36, offsetX: 30, offsetY: -10 },
    { type: 'diamond', color: '#FFD93D', size: 28, offsetX: -20, offsetY: 25 },
    { type: 'triangle', color: '#5DADE2', size: 32, offsetX: 35, offsetY: 20 },
  ],

  stack: [
    { type: 'square', color: '#8B7355', size: 56, offsetX: 0, offsetY: 0, rotation: 5 },
    { type: 'square', color: '#FFAB91', size: 48, offsetX: 4, offsetY: -8, rotation: -3 },
    { type: 'square', color: '#A78BFA', size: 40, offsetX: 8, offsetY: -16, rotation: 2 },
  ],

  flower: [
    { type: 'circle', color: '#FF6B9D', size: 32, offsetX: 0, offsetY: -20 },
    { type: 'circle', color: '#FF6B9D', size: 32, offsetX: 19, offsetY: -6 },
    { type: 'circle', color: '#FF6B9D', size: 32, offsetX: 12, offsetY: 16 },
    { type: 'circle', color: '#FF6B9D', size: 32, offsetX: -12, offsetY: 16 },
    { type: 'circle', color: '#FF6B9D', size: 32, offsetX: -19, offsetY: -6 },
    { type: 'circle', color: '#FFD93D', size: 24, offsetX: 0, offsetY: 0 },
  ],

  bear: [
    // Ears
    { type: 'circle', color: '#8B7355', size: 24, offsetX: -20, offsetY: -24 },
    { type: 'circle', color: '#8B7355', size: 24, offsetX: 20, offsetY: -24 },
    { type: 'circle', color: '#FFAB91', size: 12, offsetX: -20, offsetY: -24 },
    { type: 'circle', color: '#FFAB91', size: 12, offsetX: 20, offsetY: -24 },
    // Face
    { type: 'circle', color: '#8B7355', size: 56, offsetX: 0, offsetY: 0 },
    // Muzzle
    { type: 'circle', color: '#FFAB91', size: 28, offsetX: 0, offsetY: 8 },
  ],

  snail: [
    // Body
    { type: 'pill', color: '#2ECC71', size: 48, offsetX: -10, offsetY: 15 },
    // Shell layers
    { type: 'semicircle', color: '#922B3E', size: 44, offsetX: 10, offsetY: -5, rotation: -30 },
    { type: 'semicircle', color: '#FF6B9D', size: 32, offsetX: 14, offsetY: -2, rotation: -30 },
    { type: 'circle', color: '#FFD93D', size: 16, offsetX: 18, offsetY: 2 },
  ],

  orbit: [
    { type: 'circle', color: '#A78BFA', size: 32, offsetX: 0, offsetY: 0 },
    { type: 'circle', color: '#FF6B9D', size: 16, offsetX: 35, offsetY: 0 },
    { type: 'circle', color: '#2ECC71', size: 12, offsetX: -30, offsetY: 20 },
    { type: 'diamond', color: '#FFD93D', size: 14, offsetX: 10, offsetY: -35 },
  ],

  'checkerboard-stack': [
    {
      type: 'square',
      color: '#FFAB91',
      pattern: 'checkered',
      patternColors: ['#FFAB91', '#8B7355'],
      size: 48,
      offsetX: 0,
      offsetY: 0,
    },
    { type: 'circle', color: '#2ECC71', size: 24, offsetX: 30, offsetY: -15 },
    { type: 'diamond', color: '#922B3E', size: 20, offsetX: -20, offsetY: -25 },
  ],
}
