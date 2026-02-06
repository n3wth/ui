import { useState } from 'react'
import { useTheme } from '../../src/hooks/useTheme'
import { useReducedMotion } from '../../src/hooks/useReducedMotion'
import { useIsMobile, useIsTablet, useIsDesktop, useBreakpoint } from '../../src/hooks/useMediaQuery'
import { Button } from '../../src/atoms/Button'
import { Badge } from '../../src/atoms/Badge'
import { DemoSection, DemoBlock } from './DemoSection'
import { CodeSnippet } from './CodeSnippet'

export function HooksSection() {
  const { theme } = useTheme()
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()
  const isDesktop = useIsDesktop()
  const breakpoint = useBreakpoint()
  const [count, setCount] = useState(0)

  return (
    <DemoSection id="hooks" title="Hooks" description="React hooks for theme, media queries, accessibility, and animations.">
      {/* useTheme */}
      <DemoBlock title="useTheme">
        <div className="p-6 rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)]">
          <div className="flex items-center gap-3">
            <span className="text-sm text-[var(--color-grey-400)]">Current theme:</span>
            <Badge variant={theme === 'dark' ? 'default' : 'sage'}>{theme}</Badge>
          </div>
        </div>
        <CodeSnippet className="mt-4" code={`import { useTheme } from '@n3wth/ui'

function ThemeSwitch() {
  const { theme, setTheme, toggleTheme } = useTheme()

  return (
    <button onClick={toggleTheme}>
      {theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
    </button>
  )
}`} />
      </DemoBlock>

      {/* useMediaQuery */}
      <DemoBlock title="useMediaQuery / useIsMobile / useBreakpoint">
        <div className="p-6 rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] space-y-3">
          <div className="flex flex-wrap gap-2">
            <Badge variant={isMobile ? 'sage' : 'outline'}>Mobile: {isMobile ? 'Yes' : 'No'}</Badge>
            <Badge variant={isTablet ? 'sage' : 'outline'}>Tablet: {isTablet ? 'Yes' : 'No'}</Badge>
            <Badge variant={isDesktop ? 'sage' : 'outline'}>Desktop: {isDesktop ? 'Yes' : 'No'}</Badge>
          </div>
          <p className="text-sm text-[var(--color-grey-400)]">
            Current breakpoint: <strong className="text-[var(--color-white)]">{breakpoint}</strong>
          </p>
        </div>
        <CodeSnippet className="mt-4" code={`import { useIsMobile, useBreakpoint, useMediaQuery } from '@n3wth/ui'

function ResponsiveLayout() {
  const isMobile = useIsMobile()      // < 768px
  const isTablet = useIsTablet()      // 768-1023px
  const isDesktop = useIsDesktop()    // >= 1024px
  const breakpoint = useBreakpoint()  // 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  const isWide = useMediaQuery('(min-width: 1440px)')

  return (
    <div className={isMobile ? 'stack' : 'grid-cols-3'}>
      {isWide && <Sidebar />}
      <Main />
    </div>
  )
}`} />
      </DemoBlock>

      {/* useReducedMotion */}
      <DemoBlock title="useReducedMotion">
        <div className="p-6 rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)]">
          <div className="flex items-center gap-3">
            <span className="text-sm text-[var(--color-grey-400)]">prefers-reduced-motion:</span>
            <Badge variant={prefersReducedMotion ? 'coral' : 'sage'}>
              {prefersReducedMotion ? 'Reduced' : 'No Preference'}
            </Badge>
          </div>
        </div>
        <CodeSnippet className="mt-4" code={`import { useReducedMotion } from '@n3wth/ui'

function AnimatedCard() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div
      className={prefersReducedMotion ? 'opacity-100' : 'animate-fade-in'}
      style={{ transition: prefersReducedMotion ? 'none' : 'all 0.3s ease' }}
    >
      Accessible animation
    </div>
  )
}`} />
      </DemoBlock>

      {/* useCountUp */}
      <DemoBlock title="useCountUp">
        <div className="p-6 rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)]">
          <div className="flex items-center gap-4">
            <span className="font-display text-4xl font-bold text-[var(--color-white)] tabular-nums">
              {count}
            </span>
            <Button variant="secondary" size="sm" onClick={() => setCount((c) => c + 100)}>
              Add 100
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setCount(0)}>
              Reset
            </Button>
          </div>
        </div>
        <CodeSnippet className="mt-4" code={`import { useCountUp } from '@n3wth/ui'

function StatsCounter() {
  const { value, ref } = useCountUp({
    end: 1000,
    duration: 2,
    startOnView: true,
  })

  return <span ref={ref}>{value}</span>
}`} />
      </DemoBlock>

      {/* useKeyboardShortcuts */}
      <DemoBlock title="useKeyboardShortcuts">
        <div className="p-6 rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)]">
          <p className="text-sm text-[var(--color-grey-400)]">
            Register keyboard shortcuts with modifier keys. Handles platform differences (Cmd vs Ctrl) automatically.
          </p>
        </div>
        <CodeSnippet className="mt-4" code={`import { useKeyboardShortcuts, getModifierKey } from '@n3wth/ui'

function SearchDialog() {
  const [open, setOpen] = useState(false)
  const modKey = getModifierKey() // 'Cmd' | 'Ctrl'

  useKeyboardShortcuts([
    {
      key: 'k',
      modifiers: ['meta'],
      handler: () => setOpen(true),
      description: 'Open search',
    },
  ])

  return <span>Press {modKey}+K to search</span>
}`} />
      </DemoBlock>

      {/* Other hooks */}
      <DemoBlock title="Animation Hooks">
        <div className="p-6 rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] space-y-4">
          <div>
            <p className="text-sm font-medium text-[var(--color-white)]">useScrollReveal</p>
            <p className="text-xs text-[var(--color-grey-400)]">Trigger animations when elements enter viewport</p>
          </div>
          <div>
            <p className="text-sm font-medium text-[var(--color-white)]">useStaggerList</p>
            <p className="text-xs text-[var(--color-grey-400)]">Stagger entrance animations for list items</p>
          </div>
          <div>
            <p className="text-sm font-medium text-[var(--color-white)]">usePageTransition</p>
            <p className="text-xs text-[var(--color-grey-400)]">Page enter/exit transition classes</p>
          </div>
          <div>
            <p className="text-sm font-medium text-[var(--color-white)]">useTextReveal</p>
            <p className="text-xs text-[var(--color-grey-400)]">Character-by-character text reveal animation</p>
          </div>
          <div>
            <p className="text-sm font-medium text-[var(--color-white)]">useButtonPulse</p>
            <p className="text-xs text-[var(--color-grey-400)]">Attention-grabbing pulse animation for CTAs</p>
          </div>
        </div>
        <CodeSnippet className="mt-4" code={`import { useScrollReveal, useStaggerList } from '@n3wth/ui'

function FeatureGrid({ items }) {
  const revealRef = useScrollReveal({ threshold: 0.2 })
  const staggered = useStaggerList(items, { delay: 100 })

  return (
    <div ref={revealRef} className="grid grid-cols-3 gap-4">
      {staggered.map((item, i) => (
        <div key={i} style={item.style}>{item.content}</div>
      ))}
    </div>
  )
}`} />
      </DemoBlock>
    </DemoSection>
  )
}
