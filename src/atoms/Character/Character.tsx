import { cn } from '../../utils/cn'

export type Expression =
  | 'happy'
  | 'wink'
  | 'surprised'
  | 'excited'
  | 'thinking'
  | 'cool'
  | 'sleepy'
  | 'love'

export type Accessory = 'none' | 'glasses' | 'hat' | 'flower' | 'bowtie'

export interface CharacterProps {
  expression?: Expression
  size?: number
  color?: string
  featureColor?: string
  accessory?: Accessory
  accessoryColor?: string
  animate?: boolean
  className?: string
  style?: React.CSSProperties
}

function renderEyes(expression: Expression, featureColor: string) {
  switch (expression) {
    case 'happy':
      return (
        <>
          <circle cx="9" cy="10" r="1.5" fill={featureColor} />
          <circle cx="15" cy="10" r="1.5" fill={featureColor} />
        </>
      )
    case 'wink':
      return (
        <>
          <circle cx="9" cy="10" r="1.5" fill={featureColor} />
          <path d="M13.5 10.5L16.5 9.5" stroke={featureColor} strokeWidth="1.5" strokeLinecap="round" />
        </>
      )
    case 'surprised':
      return (
        <>
          <circle cx="9" cy="10" r="2" fill={featureColor} />
          <circle cx="15" cy="10" r="2" fill={featureColor} />
        </>
      )
    case 'excited':
      return (
        <>
          <path d="M7 9L11 11" stroke={featureColor} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M17 9L13 11" stroke={featureColor} strokeWidth="1.5" strokeLinecap="round" />
        </>
      )
    case 'thinking':
      return (
        <>
          <circle cx="9" cy="10" r="1.5" fill={featureColor} />
          <circle cx="15" cy="11" r="1.5" fill={featureColor} />
        </>
      )
    case 'cool':
      return null // Glasses cover eyes
    case 'sleepy':
      return (
        <>
          <path d="M7 10H11" stroke={featureColor} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M13 10H17" stroke={featureColor} strokeWidth="1.5" strokeLinecap="round" />
        </>
      )
    case 'love':
      return (
        <>
          <path d="M7.5 9.5C7.5 8.5 8.5 8 9 8.5C9.5 8 10.5 8.5 10.5 9.5C10.5 10.5 9 12 9 12C9 12 7.5 10.5 7.5 9.5Z" fill="#FF6B9D" />
          <path d="M13.5 9.5C13.5 8.5 14.5 8 15 8.5C15.5 8 16.5 8.5 16.5 9.5C16.5 10.5 15 12 15 12C15 12 13.5 10.5 13.5 9.5Z" fill="#FF6B9D" />
        </>
      )
    default:
      return (
        <>
          <circle cx="9" cy="10" r="1.5" fill={featureColor} />
          <circle cx="15" cy="10" r="1.5" fill={featureColor} />
        </>
      )
  }
}

function renderMouth(expression: Expression, featureColor: string) {
  switch (expression) {
    case 'happy':
    case 'wink':
      return (
        <path d="M8 14C8 14 10 16 12 16C14 16 16 14 16 14" stroke={featureColor} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )
    case 'surprised':
      return <circle cx="12" cy="15" r="2" fill={featureColor} />
    case 'excited':
      return (
        <path d="M8 13C8 13 10 17 12 17C14 17 16 13 16 13" stroke={featureColor} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )
    case 'thinking':
      return (
        <path d="M10 15L14 14" stroke={featureColor} strokeWidth="1.5" strokeLinecap="round" />
      )
    case 'cool':
      return (
        <path d="M9 14C9 14 10.5 15.5 12 15.5C13.5 15.5 15 14 15 14" stroke={featureColor} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )
    case 'sleepy':
      return (
        <path d="M10 15L14 15" stroke={featureColor} strokeWidth="1.5" strokeLinecap="round" />
      )
    case 'love':
      return (
        <path d="M8 14C8 14 10 16 12 16C14 16 16 14 16 14" stroke={featureColor} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )
    default:
      return (
        <path d="M8 14C8 14 10 16 12 16C14 16 16 14 16 14" stroke={featureColor} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )
  }
}

function renderAccessory(accessory: Accessory, accessoryColor: string, featureColor: string) {
  switch (accessory) {
    case 'glasses':
      return (
        <g>
          <circle cx="9" cy="10" r="3" fill="none" stroke={featureColor} strokeWidth="1.5" />
          <circle cx="15" cy="10" r="3" fill="none" stroke={featureColor} strokeWidth="1.5" />
          <path d="M12 10H12" stroke={featureColor} strokeWidth="1.5" />
          <path d="M6 10H6" stroke={featureColor} strokeWidth="1.5" />
          <path d="M18 10H18" stroke={featureColor} strokeWidth="1.5" />
        </g>
      )
    case 'hat':
      return (
        <g>
          <rect x="6" y="1" width="12" height="3" rx="1" fill={accessoryColor} />
          <rect x="8" y="-2" width="8" height="4" rx="1" fill={accessoryColor} />
        </g>
      )
    case 'flower':
      return (
        <g transform="translate(16, 2)">
          <circle cx="0" cy="0" r="2" fill={accessoryColor} />
          <circle cx="2" cy="-1" r="2" fill={accessoryColor} />
          <circle cx="2" cy="1" r="2" fill={accessoryColor} />
          <circle cx="-1" cy="-1.5" r="2" fill={accessoryColor} />
          <circle cx="-1" cy="1.5" r="2" fill={accessoryColor} />
          <circle cx="0.5" cy="0" r="1.5" fill="#FFD93D" />
        </g>
      )
    case 'bowtie':
      return (
        <g transform="translate(12, 19)">
          <path d="M-3 0L0 2L3 0L0 -2L-3 0Z" fill={accessoryColor} />
          <circle cx="0" cy="0" r="1" fill={featureColor} />
        </g>
      )
    default:
      return null
  }
}

export function Character({
  expression = 'happy',
  size = 48,
  color = '#A78BFA',
  featureColor = '#1d1d1f',
  accessory = 'none',
  accessoryColor = '#FF6B9D',
  animate = false,
  className,
  style,
}: CharacterProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={cn(
        'character',
        animate && 'character-animate',
        className
      )}
      style={style}
    >
      <style>
        {animate
          ? `
          .character-animate .character-face {
            animation: characterBounce 2s ease-in-out infinite;
          }
          @keyframes characterBounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-1px); }
          }
          @media (prefers-reduced-motion: reduce) {
            .character-animate .character-face {
              animation: none;
            }
          }
        `
          : ''}
      </style>
      <g className="character-face">
        {/* Face */}
        <circle cx="12" cy="12" r="10" fill={color} />

        {/* Eyes */}
        {renderEyes(expression, featureColor)}

        {/* Mouth */}
        {renderMouth(expression, featureColor)}

        {/* Accessory */}
        {renderAccessory(accessory, accessoryColor, featureColor)}
      </g>
    </svg>
  )
}
