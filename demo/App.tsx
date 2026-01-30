import { useState } from 'react'
import { Button } from '../src/atoms/Button'
import { Badge } from '../src/atoms/Badge'
import { Input } from '../src/atoms/Input'
import { Icon } from '../src/atoms/Icon'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../src/molecules/Card'
import { NavLink } from '../src/molecules/NavLink'
import { CommandBox } from '../src/molecules/CommandBox'
import { ThemeToggle } from '../src/molecules/ThemeToggle'
import { Nav } from '../src/organisms/Nav'
import { Hero } from '../src/organisms/Hero'
import { Footer } from '../src/organisms/Footer'
import { Section, SectionHeader } from '../src/organisms/Section'
import { useTheme } from '../src/hooks/useTheme'

export function App() {
  const { theme, toggleTheme } = useTheme()
  const [inputValue, setInputValue] = useState('')

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-white)]">
      {/* Nav */}
      <Nav
        logo={<span className="font-display text-xl font-semibold">@n3wth/ui</span>}
        items={[
          { label: 'Get Started', href: '#get-started' },
          { label: 'Atoms', href: '#atoms' },
          { label: 'Molecules', href: '#molecules' },
          { label: 'Organisms', href: '#organisms' },
        ]}
        theme={theme}
        onThemeToggle={toggleTheme}
        cta={{ label: 'GitHub', href: 'https://github.com/n3wth/n3wth-ui' }}
      />

      {/* Hero */}
      <Hero
        badge="v0.2.2"
        title={<>Flat. Minimal. <span style={{ opacity: 0.5 }}>Beautiful.</span></>}
        description="Atomic design system for Newth sites. No shadows, no glows — just clean glass morphism."
        ctas={[
          { label: 'Get Started', href: '#get-started' },
          { label: 'View Source', href: 'https://github.com/n3wth/n3wth-ui', variant: 'secondary' },
        ]}
      />

      {/* Get Started Section */}
      <Section id="get-started">
        <SectionHeader
          title="Get Started"
          description="Install and configure @n3wth/ui in your project"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:col-span-2">
            <Card variant="glass">
              <CardHeader>
                <CardTitle>Why teams pick @n3wth/ui</CardTitle>
                <CardDescription>Design tokens, accessibility helpers, and clean UI primitives</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3 text-sm text-[var(--color-grey-400)]">
                  <div className="flex flex-col gap-2">
                    <span className="text-[var(--color-white)] font-medium">Fast setup</span>
                    <span>Import styles and use the Tailwind preset to match tokens instantly.</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-[var(--color-white)] font-medium">Accessible</span>
                    <span>Keyboard shortcuts and reduced motion support are built in.</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-[var(--color-white)] font-medium">Production ready</span>
                    <span>Designed for modern React apps with a minimal, polished aesthetic.</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Installation */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3 text-[var(--color-grey-400)]">1. Install the package</h3>
              <CommandBox command="npm install @n3wth/ui" />
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3 text-[var(--color-grey-400)]">2. Import components and styles</h3>
              <div className="p-4 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] font-mono text-sm">
                <div className="text-[var(--color-sage)]">import</div>
                <div className="pl-4 text-[var(--color-white)]">{`{ Button, Card, Nav }`}</div>
                <div className="text-[var(--color-sage)]">from <span className="text-[var(--color-coral)]">'@n3wth/ui'</span></div>
                <div className="mt-2 text-[var(--color-sage)]">import <span className="text-[var(--color-coral)]">'@n3wth/ui/styles'</span></div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3 text-[var(--color-grey-400)]">3. Add Tailwind preset (optional)</h3>
              <div className="p-4 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] font-mono text-sm">
                <div className="text-[var(--color-grey-400)]">// tailwind.config.js</div>
                <div className="text-[var(--color-sage)]">export default {'{'}</div>
                <div className="pl-4">presets: [<span className="text-[var(--color-coral)]">require('@n3wth/ui/tailwind')</span>]</div>
                <div className="text-[var(--color-sage)]">{'}'}</div>
              </div>
            </div>
          </div>

          {/* Quick Reference */}
          <div className="space-y-6">
            <Card variant="glass">
              <CardHeader>
                <CardTitle>Components</CardTitle>
                <CardDescription>What's included</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-[var(--color-sage)] font-medium">Atoms:</span>
                    <span className="text-[var(--color-grey-400)]"> Button, Badge, Input, Icon, AnimatedText</span>
                  </div>
                  <div>
                    <span className="text-[var(--color-coral)] font-medium">Molecules:</span>
                    <span className="text-[var(--color-grey-400)]"> Card, NavLink, CommandBox, ThemeToggle, MobileDrawer</span>
                  </div>
                  <div>
                    <span className="text-[var(--color-mint)] font-medium">Organisms:</span>
                    <span className="text-[var(--color-grey-400)]"> Nav, Hero, Section, Footer</span>
                  </div>
                  <div>
                    <span className="text-[var(--color-gold)] font-medium">Hooks:</span>
                    <span className="text-[var(--color-grey-400)]"> useTheme, useMediaQuery, useKeyboardShortcuts</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card variant="glass">
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-[var(--color-grey-400)]">
                  <li>React 18+ or React 19</li>
                  <li>Tailwind CSS v4 (for preset)</li>
                  <li>Modern browser with CSS custom properties</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  size="sm"
                  variant="secondary"
                  rightIcon={<Icon name="external" size="sm" />}
                  onClick={() => window.open('https://github.com/n3wth/n3wth-ui', '_blank')}
                >
                  View on GitHub
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </Section>

      {/* Atoms Section */}
      <Section id="atoms">
        <SectionHeader
          title="Atoms"
          description="The building blocks of the design system"
        />

        <div className="space-y-12">
          {/* Buttons */}
          <div>
            <h3 className="text-lg font-medium mb-4 text-[var(--color-grey-400)]">Buttons</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="glass">Glass</Button>
              <Button variant="primary" isLoading>Loading</Button>
              <Button variant="secondary" leftIcon={<Icon name="github" size="sm" />}>
                With Icon
              </Button>
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>

          {/* Badges */}
          <div>
            <h3 className="text-lg font-medium mb-4 text-[var(--color-grey-400)]">Badges</h3>
            <div className="flex flex-wrap gap-3">
              <Badge>Default</Badge>
              <Badge variant="sage">Sage</Badge>
              <Badge variant="coral">Coral</Badge>
              <Badge variant="mint">Mint</Badge>
              <Badge variant="gold">Gold</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </div>

          {/* Inputs */}
          <div>
            <h3 className="text-lg font-medium mb-4 text-[var(--color-grey-400)]">Inputs</h3>
            <div className="flex flex-col gap-4 max-w-sm">
              <Input
                placeholder="Default input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Input
                variant="glass"
                placeholder="Glass input"
                leftIcon={<Icon name="search" size="sm" />}
              />
              <Input
                placeholder="With error"
                error="This field is required"
              />
            </div>
          </div>

          {/* Icons */}
          <div>
            <h3 className="text-lg font-medium mb-4 text-[var(--color-grey-400)]">Icons</h3>
            <div className="flex flex-wrap gap-4">
              {(['arrow-right', 'arrow-left', 'arrow-up', 'arrow-down', 'chevron-right', 'chevron-down', 'check', 'x', 'copy', 'search', 'menu', 'sun', 'moon', 'external', 'github', 'terminal', 'code', 'sparkles', 'plus', 'minus'] as const).map((name) => (
                <div key={name} className="flex flex-col items-center gap-2 p-3 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)]">
                  <Icon name={name} size="md" />
                  <span className="text-xs text-[var(--color-grey-400)]">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Molecules Section */}
      <Section id="molecules" variant="alternate">
        <SectionHeader
          title="Molecules"
          description="Combinations of atoms forming functional UI patterns"
        />

        <div className="space-y-12">
          {/* Cards */}
          <div>
            <h3 className="text-lg font-medium mb-4 text-[var(--color-grey-400)]">Cards</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Default Card</CardTitle>
                  <CardDescription>A simple card component</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[var(--color-grey-400)]">
                    Cards contain content and actions about a single subject.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button size="sm" variant="secondary">Learn More</Button>
                </CardFooter>
              </Card>

              <Card variant="glass">
                <CardHeader>
                  <CardTitle>Glass Card</CardTitle>
                  <CardDescription>With backdrop blur effect</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[var(--color-grey-400)]">
                    Glass morphism variant with subtle transparency.
                  </p>
                </CardContent>
              </Card>

              <Card variant="interactive">
                <CardHeader>
                  <CardTitle>Interactive Card</CardTitle>
                  <CardDescription>Hover to see the effect</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[var(--color-grey-400)]">
                    This card responds to hover interactions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* NavLinks */}
          <div>
            <h3 className="text-lg font-medium mb-4 text-[var(--color-grey-400)]">NavLinks</h3>
            <div className="flex gap-6">
              <NavLink href="#" variant="underline" isActive>Active</NavLink>
              <NavLink href="#" variant="underline">Inactive</NavLink>
              <NavLink href="#" variant="pill">Pill Style</NavLink>
              <NavLink href="#" variant="pill" isActive>Active Pill</NavLink>
            </div>
          </div>

          {/* CommandBox */}
          <div>
            <h3 className="text-lg font-medium mb-4 text-[var(--color-grey-400)]">CommandBox</h3>
            <div className="max-w-md">
              <CommandBox command="npm install @n3wth/ui" />
            </div>
          </div>

          {/* ThemeToggle */}
          <div>
            <h3 className="text-lg font-medium mb-4 text-[var(--color-grey-400)]">ThemeToggle</h3>
            <div className="flex gap-4 items-center">
              <ThemeToggle theme={theme} onToggle={toggleTheme} size="sm" />
              <ThemeToggle theme={theme} onToggle={toggleTheme} size="md" />
              <span className="text-sm text-[var(--color-grey-400)]">Current: {theme}</span>
            </div>
          </div>
        </div>
      </Section>

      {/* Organisms Section */}
      <Section id="organisms">
        <SectionHeader
          title="Organisms"
          description="Complex UI components composed of molecules and atoms"
        />

        <div className="space-y-8">
          <p className="text-[var(--color-grey-400)]">
            The Nav, Hero, and Footer components are demonstrated in this page layout.
            Scroll up to see the Nav, or down to see the Footer.
          </p>

          <div className="p-6 rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)]">
            <h4 className="font-medium mb-2">Included Organisms:</h4>
            <ul className="list-disc list-inside text-[var(--color-grey-400)] space-y-1">
              <li><strong>Nav</strong> - Fixed navigation with mobile menu</li>
              <li><strong>Hero</strong> - Hero section with badge, title, description, CTAs</li>
              <li><strong>Footer</strong> - Multi-column footer with sections</li>
              <li><strong>Section</strong> - Content section wrapper with header</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <Footer
        logo={<span className="font-display text-lg font-semibold">@n3wth/ui</span>}
        description="A flat, minimal design system for modern web applications."
        sections={[
          {
            title: 'Documentation',
            links: [
              { label: 'Get Started', href: '#get-started' },
              { label: 'Components', href: '#atoms' },
              { label: 'Hooks', href: '#molecules' },
            ],
          },
          {
            title: 'Resources',
            links: [
              { label: 'GitHub', href: 'https://github.com/n3wth/n3wth-ui' },
              { label: 'npm', href: 'https://www.npmjs.com/package/@n3wth/ui' },
              { label: 'newth.ai', href: 'https://newth.ai' },
            ],
          },
        ]}
        copyright="2025 Oliver Newth. All rights reserved."
        theme={theme}
        onThemeToggle={toggleTheme}
      />
    </div>
  )
}
