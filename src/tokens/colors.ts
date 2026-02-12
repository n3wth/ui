export const colors = {
  // Dark mode (default)
  dark: {
    bg: '#000000',
    bgSecondary: '#0a0a0a',
    white: '#ffffff',
    grey: {
      100: '#f5f5f7',
      200: '#e8e8ed',
      300: '#c7c7cc',
      400: '#86868b',
      600: '#6e6e73',
      800: '#1d1d1f',
    },
    accent: '#ffffff',
    accentSoft: 'rgba(255, 255, 255, 0.15)',
    glass: {
      bg: 'rgba(255, 255, 255, 0.05)',
      border: 'rgba(255, 255, 255, 0.1)',
      highlight: 'rgba(255, 255, 255, 0.15)',
    },
    // Category colors (flat, no glow)
    category: {
      sage: '#30d158',
      coral: '#ff6961',
      mint: '#64d2ff',
      gold: '#ffd60a',
    },
    // Semantic colors
    semantic: {
      success: '#30d158',
      successBg: 'rgba(48, 209, 88, 0.1)',
      warning: '#ffd60a',
      warningBg: 'rgba(255, 214, 10, 0.1)',
      error: '#ff6961',
      errorBg: 'rgba(255, 105, 97, 0.1)',
      info: '#64d2ff',
      infoBg: 'rgba(100, 210, 255, 0.1)',
    },
    // Playful illustration colors
    playful: {
      pink: '#FF6B9D',
      green: '#2ECC71',
      maroon: '#922B3E',
      olive: '#8B7355',
      peach: '#FFAB91',
      lavender: '#A78BFA',
      teal: '#20B2AA',
      mustard: '#F39C12',
    },
  },
  // Light mode
  light: {
    bg: '#ffffff',
    bgSecondary: '#f5f5f7',
    white: '#1d1d1f',
    grey: {
      100: '#1d1d1f',
      200: '#3a3a3c',
      300: '#48484a',
      400: '#636366',
      600: '#8e8e93',
      800: '#e5e5ea',
    },
    accent: '#1d1d1f',
    accentSoft: 'rgba(0, 0, 0, 0.1)',
    glass: {
      bg: 'rgba(0, 0, 0, 0.03)',
      border: 'rgba(0, 0, 0, 0.08)',
      highlight: 'rgba(0, 0, 0, 0.12)',
    },
    category: {
      sage: '#248a3d',
      coral: '#d70015',
      mint: '#0071e3',
      gold: '#b25000',
    },
    // Semantic colors
    semantic: {
      success: '#248a3d',
      successBg: 'rgba(36, 138, 61, 0.08)',
      warning: '#b25000',
      warningBg: 'rgba(178, 80, 0, 0.08)',
      error: '#d70015',
      errorBg: 'rgba(215, 0, 21, 0.08)',
      info: '#0071e3',
      infoBg: 'rgba(0, 113, 227, 0.08)',
    },
    // Playful illustration colors (slightly adjusted for light mode)
    playful: {
      pink: '#E91E63',
      green: '#27AE60',
      maroon: '#7B1E2E',
      olive: '#6B5344',
      peach: '#FF8A65',
      lavender: '#9575CD',
      teal: '#009688',
      mustard: '#E67E22',
    },
  },
} as const

export type ColorMode = keyof typeof colors
