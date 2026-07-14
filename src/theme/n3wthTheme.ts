// n3wth theme for Astryx — canonical @n3wth/ui wireframe/blueprint palette.
// Dark near-black canvas, hairline rails, grayscale ink ramp, white accent,
// Geist Sans + Geist Mono. Values mirror @n3wth/ui/theme (single source of
// truth for n3wth.com, agents.n3wth.com, garden.n3wth.com).
// Token pairs are [light, dark]; the site runs dark-only but light values
// follow the same language (paper white, near-black ink) for future use.
//
// Canonical copy lives here (@n3wth/ui/src/theme/n3wthTheme.ts) and is
// mirrored into garden.n3wth.com (src/theme/n3wthTheme.ts) — keep both in
// sync when editing tokens.

import { defineTheme } from '@astryxdesign/core/theme'

export const n3wthTheme = defineTheme({
  name: 'n3wth',

  typography: {
    scale: { base: 16, ratio: 1.25 },
    body: {
      family: 'Geist Sans',
      fallbacks: 'system-ui, -apple-system, sans-serif',
    },
    heading: {
      family: 'Geist Sans',
      fallbacks: 'system-ui, -apple-system, sans-serif',
    },
    code: {
      family: 'Geist Mono',
      fallbacks: "ui-monospace, 'SF Mono', Menlo, Monaco, monospace",
    },
  },

  motion: {
    fast: 150,
    medium: 300,
    ratio: 0.75,
    easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
  },

  tokens: {
    // Core semantic — @n3wth/ui canonical palette
    '--color-accent': ['#08090b', '#ffffff'],
    '--color-accent-muted': ['rgba(8, 9, 11, 0.08)', 'rgba(255, 255, 255, 0.15)'],
    '--color-on-accent': ['#ffffff', '#08090b'],
    '--color-neutral': ['rgba(8, 9, 11, 0.08)', 'rgba(255, 255, 255, 0.09)'],
    '--color-background-body': ['#f5f5f7', '#08090b'],
    '--color-background-surface': ['#ffffff', '#0d0e10'],
    '--color-background-card': ['#ffffff', '#0d0e10'],
    '--color-background-popover': ['#ffffff', '#131316'],
    '--color-background-muted': ['#e8e8ed', '#131316'],
    '--color-background-inverted': ['#1d1d1f', '#ffffff'],
    '--color-overlay': ['rgba(29, 29, 31, 0.4)', 'rgba(8, 9, 11, 0.7)'],
    '--color-overlay-hover': ['rgba(8, 9, 11, 0.05)', 'rgba(255, 255, 255, 0.05)'],
    '--color-overlay-pressed': ['rgba(8, 9, 11, 0.1)', 'rgba(255, 255, 255, 0.1)'],

    // Text — ink ramp
    '--color-text-primary': ['#1d1d1f', '#f2f3f5'],
    '--color-text-secondary': ['#6e6e73', '#9aa0a8'],
    '--color-text-disabled': ['#c7c7cc', '#62666d'],
    '--color-text-accent': ['#08090b', '#ffffff'],

    // Icons
    '--color-icon-primary': ['#1d1d1f', '#f2f3f5'],
    '--color-icon-secondary': ['#6e6e73', '#9aa0a8'],
    '--color-icon-disabled': ['#c7c7cc', '#62666d'],
    '--color-icon-accent': ['#08090b', '#ffffff'],

    // Hairline rails
    '--color-border': ['rgba(8, 9, 11, 0.1)', 'rgba(255, 255, 255, 0.09)'],
    '--color-border-emphasized': ['rgba(8, 9, 11, 0.2)', 'rgba(255, 255, 255, 0.17)'],
    '--color-skeleton': ['#e8e8ed', '#2c2f34'],
    '--color-track': ['#e8e8ed', '#2c2f34'],
    '--color-shadow': ['rgba(0, 0, 0, 0.08)', 'rgba(0, 0, 0, 0.4)'],

    // Semantic status — @n3wth/ui success/warning/error/info
    '--color-success': ['#248a3d', '#30d158'],
    '--color-success-muted': ['rgba(48, 209, 88, 0.15)', 'rgba(48, 209, 88, 0.15)'],
    '--color-on-success': ['#ffffff', '#08090b'],
    '--color-error': ['#d70015', '#ff6961'],
    '--color-error-muted': ['rgba(255, 105, 97, 0.15)', 'rgba(255, 105, 97, 0.15)'],
    '--color-on-error': ['#ffffff', '#08090b'],
    '--color-warning': ['#b8860b', '#ffd60a'],
    '--color-warning-muted': ['rgba(255, 214, 10, 0.12)', 'rgba(255, 214, 10, 0.12)'],
    '--color-on-warning': ['#1d1d1f', '#08090b'],

    // Category tints — sage / gold / mint / coral mapped onto Astryx
    // green / yellow / cyan / red variants (Badges, callouts, tag pills)
    '--color-background-green': ['rgba(48, 209, 88, 0.12)', 'rgba(48, 209, 88, 0.12)'],
    '--color-border-green': ['#248a3d', '#30d158'],
    '--color-icon-green': ['#248a3d', '#30d158'],
    '--color-text-green': ['#0a5c22', '#8ef2ab'],
    '--color-background-yellow': ['rgba(255, 214, 10, 0.12)', 'rgba(255, 214, 10, 0.12)'],
    '--color-border-yellow': ['#9a7d00', '#ffd60a'],
    '--color-icon-yellow': ['#9a7d00', '#ffd60a'],
    '--color-text-yellow': ['#6b5803', '#ffe566'],
    '--color-background-cyan': ['rgba(100, 210, 255, 0.12)', 'rgba(100, 210, 255, 0.12)'],
    '--color-border-cyan': ['#0071a4', '#64d2ff'],
    '--color-icon-cyan': ['#0071a4', '#64d2ff'],
    '--color-text-cyan': ['#054a6b', '#a9e5ff'],
    '--color-background-red': ['rgba(255, 105, 97, 0.12)', 'rgba(255, 105, 97, 0.12)'],
    '--color-border-red': ['#d70015', '#ff6961'],
    '--color-icon-red': ['#d70015', '#ff6961'],
    '--color-text-red': ['#8a1006', '#ffb3ae'],
    '--color-background-gray': ['rgba(8, 9, 11, 0.06)', 'rgba(255, 255, 255, 0.06)'],
    '--color-border-gray': ['#6e6e73', '#62666d'],
    '--color-icon-gray': ['#6e6e73', '#9aa0a8'],
    '--color-text-gray': ['#1d1d1f', '#e8e8ed'],
  },

  components: {
    // n3wth.com CTAs are pills
    button: {
      base: { borderRadius: '9999px' },
    },
  },
})
