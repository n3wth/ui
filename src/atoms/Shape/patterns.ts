/**
 * SVG pattern generators for shapes
 * Returns pattern definition and pattern ID for use in fills
 */

export type PatternType = 'solid' | 'checkered' | 'striped' | 'dotted'

export interface PatternConfig {
  type: PatternType
  colors: string[]
  scale?: number
  angle?: number
}

let patternCounter = 0

export function generatePatternId(): string {
  return `pattern-${++patternCounter}-${Date.now()}`
}

export function generateCheckeredPattern(
  id: string,
  colors: [string, string],
  scale: number = 1
): string {
  const size = 10 * scale
  const half = size / 2
  return `
    <pattern id="${id}" patternUnits="userSpaceOnUse" width="${size}" height="${size}">
      <rect width="${half}" height="${half}" fill="${colors[0]}"/>
      <rect x="${half}" y="${half}" width="${half}" height="${half}" fill="${colors[0]}"/>
      <rect x="${half}" width="${half}" height="${half}" fill="${colors[1]}"/>
      <rect y="${half}" width="${half}" height="${half}" fill="${colors[1]}"/>
    </pattern>
  `
}

export function generateStripedPattern(
  id: string,
  colors: string[],
  scale: number = 1,
  angle: number = 45
): string {
  const stripeWidth = 4 * scale
  const totalWidth = stripeWidth * colors.length
  const stripes = colors
    .map(
      (color, i) =>
        `<rect x="${i * stripeWidth}" width="${stripeWidth}" height="${totalWidth}" fill="${color}"/>`
    )
    .join('')
  return `
    <pattern id="${id}" patternUnits="userSpaceOnUse" width="${totalWidth}" height="${totalWidth}" patternTransform="rotate(${angle})">
      ${stripes}
    </pattern>
  `
}

export function generateDottedPattern(
  id: string,
  bgColor: string,
  dotColor: string,
  scale: number = 1
): string {
  const size = 8 * scale
  const radius = 1.5 * scale
  return `
    <pattern id="${id}" patternUnits="userSpaceOnUse" width="${size}" height="${size}">
      <rect width="${size}" height="${size}" fill="${bgColor}"/>
      <circle cx="${size / 2}" cy="${size / 2}" r="${radius}" fill="${dotColor}"/>
    </pattern>
  `
}

export function generatePattern(config: PatternConfig): { defs: string; fill: string } | null {
  if (config.type === 'solid' || config.colors.length === 0) {
    return null
  }

  const id = generatePatternId()
  const scale = config.scale ?? 1

  switch (config.type) {
    case 'checkered':
      return {
        defs: generateCheckeredPattern(id, [config.colors[0], config.colors[1] || config.colors[0]], scale),
        fill: `url(#${id})`,
      }
    case 'striped':
      return {
        defs: generateStripedPattern(id, config.colors, scale, config.angle ?? 45),
        fill: `url(#${id})`,
      }
    case 'dotted':
      return {
        defs: generateDottedPattern(id, config.colors[0], config.colors[1] || '#fff', scale),
        fill: `url(#${id})`,
      }
    default:
      return null
  }
}
