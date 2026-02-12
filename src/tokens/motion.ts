export const motion = {
  duration: {
    instant: '0ms',
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
    slower: '500ms',
  },
  easing: {
    default: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
  scale: {
    press: '0.96',
    hover: '1.02',
    active: '1.05',
  },
} as const

export type MotionDuration = keyof typeof motion.duration
export type MotionEasing = keyof typeof motion.easing
