/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        // Geist for display + body; Geist Mono is for literal code/machine output only.
        display: ['Geist Sans', 'system-ui', 'sans-serif'],
        sans: ['Geist Sans', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'ui-monospace', 'SF Mono', 'Menlo', 'Monaco', 'monospace'],
      },
      colors: {
        // Wireframe canonical tokens (white-led monochrome)
        ink: {
          DEFAULT: 'var(--ink)',
          dim: 'var(--ink-dim)',
          faint: 'var(--ink-faint)',
          ghost: 'var(--ink-ghost)',
        },
        rail: {
          DEFAULT: 'var(--rail)',
          strong: 'var(--rail-strong)',
        },
        'bg-soft': 'var(--bg-soft)',
        'bg-raise': 'var(--bg-raise)',
        'accent-dim': 'var(--accent-dim)',
        'accent-ink': 'var(--accent-ink)',
        'accent-rail': 'var(--accent-rail)',
        // Legacy bridge tokens (remapped to monochrome in theme CSS)
        bg: 'var(--color-bg)',
        'bg-secondary': 'var(--color-bg-secondary)',
        white: 'var(--color-white)',
        grey: {
          100: 'var(--color-grey-100)',
          200: 'var(--color-grey-200)',
          300: 'var(--color-grey-300)',
          400: 'var(--color-grey-400)',
          600: 'var(--color-grey-600)',
          800: 'var(--color-grey-800)',
        },
        accent: 'var(--color-accent)',
        'accent-soft': 'var(--color-accent-soft)',
        sage: 'var(--color-sage)',
        coral: 'var(--color-coral)',
        mint: 'var(--color-mint)',
        gold: 'var(--color-gold)',
        glass: {
          bg: 'var(--glass-bg)',
          border: 'var(--glass-border)',
          highlight: 'var(--glass-highlight)',
        },
      },
      borderRadius: {
        DEFAULT: '1rem',
        card: '1.25rem',
        pill: '9999px',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        // Wireframe system easing (matches --ease token)
        'wire': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'spring': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      letterSpacing: {
        label: '0.16em',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'gradient-shift': 'gradientShift 8s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      // Mobile-first spacing scale
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      // Touch-friendly minimum sizes (WCAG 2.5.5)
      minWidth: {
        'touch': '44px',
        'touch-sm': '36px',
      },
      minHeight: {
        'touch': '44px',
        'touch-sm': '36px',
        'screen-dvh': '100dvh',
      },
      height: {
        'screen-dvh': '100dvh',
      },
      // Fluid typography scale
      fontSize: {
        'fluid-xs': 'clamp(0.75rem, 2vw, 0.875rem)',
        'fluid-sm': 'clamp(0.875rem, 2.5vw, 1rem)',
        'fluid-base': 'clamp(1rem, 3vw, 1.125rem)',
        'fluid-lg': 'clamp(1.125rem, 3.5vw, 1.25rem)',
        'fluid-xl': 'clamp(1.25rem, 4vw, 1.5rem)',
        'fluid-2xl': 'clamp(1.5rem, 5vw, 2rem)',
        'fluid-3xl': 'clamp(1.875rem, 6vw, 2.5rem)',
        'fluid-4xl': 'clamp(2.25rem, 8vw, 3.5rem)',
        'fluid-5xl': 'clamp(3rem, 10vw, 4.5rem)',
        // Wireframe type scale
        'wf-display': ['clamp(3rem, 8.6vw, 7rem)', { lineHeight: '0.92', letterSpacing: '-0.045em', fontWeight: '600' }],
        'wf-h2': ['clamp(1.85rem, 3.8vw, 3.1rem)', { letterSpacing: '-0.03em', fontWeight: '600' }],
        'wf-h3': ['1.0625rem', { fontWeight: '600' }],
        'wf-body': ['0.9375rem', { lineHeight: '1.65' }],
        'wf-label': ['0.75rem', { letterSpacing: '0.16em', fontWeight: '500' }],
      },
    },
  },
}
