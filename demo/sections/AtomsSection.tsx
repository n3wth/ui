import { useState } from 'react'
import { Button } from '../../src/atoms/Button'
import { Badge } from '../../src/atoms/Badge'
import { Input } from '../../src/atoms/Input'
import { Icon } from '../../src/atoms/Icon'
import type { IconName } from '../../src/atoms/Icon'
import { DemoSection, DemoBlock } from './DemoSection'
import { CodeSnippet } from './CodeSnippet'
import { PropsTable } from './PropsTable'

const iconNames: IconName[] = [
  'arrow-right', 'arrow-left', 'arrow-up', 'arrow-down',
  'chevron-right', 'chevron-left', 'chevron-up', 'chevron-down',
  'check', 'x', 'copy', 'search', 'menu',
  'sun', 'moon', 'external', 'github', 'terminal', 'code', 'sparkles',
  'plus', 'minus', 'settings', 'user', 'heart', 'star', 'mail',
  'calendar', 'clock', 'bell', 'home', 'folder', 'file', 'trash',
  'edit', 'eye', 'eye-off', 'lock', 'unlock', 'link', 'external-link',
  'download', 'upload', 'refresh', 'filter', 'sort', 'grid', 'list',
  'more-horizontal', 'more-vertical', 'info', 'warning', 'success', 'error',
]

const controlBtnClass = (active: boolean) =>
  `px-2 py-1 text-xs rounded-full border transition-colors ${
    active
      ? 'bg-[var(--color-white)] text-[var(--color-bg)] border-[var(--color-white)]'
      : 'bg-transparent text-[var(--color-grey-400)] border-[var(--glass-border)] hover:border-[var(--glass-highlight)]'
  }`

export function AtomsSection() {
  const [inputValue, setInputValue] = useState('')
  const [btnVariant, setBtnVariant] = useState<'primary' | 'secondary' | 'ghost' | 'glass'>('primary')
  const [btnSize, setBtnSize] = useState<'sm' | 'md' | 'lg'>('md')
  const [btnLoading, setBtnLoading] = useState(false)
  const [btnDisabled, setBtnDisabled] = useState(false)

  const [badgeVariant, setBadgeVariant] = useState<'default' | 'sage' | 'coral' | 'mint' | 'gold' | 'outline'>('default')
  const [badgeSize, setBadgeSize] = useState<'sm' | 'md'>('sm')

  const [inputVariant, setInputVariant] = useState<'default' | 'glass'>('default')
  const [inputIcon, setInputIcon] = useState(false)
  const [inputError, setInputError] = useState(false)
  const [inputSize, setInputSize] = useState<'sm' | 'md' | 'lg'>('md')

  const [iconSize, setIconSize] = useState<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md')
  const [iconColor, setIconColor] = useState<string>('')

  return (
    <DemoSection id="atoms" title="Atoms" description="The building blocks of the design system.">
      {/* Buttons */}
      <DemoBlock title="Button">
        <div className="space-y-6">
          {/* Controls */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs text-[var(--color-grey-400)] mr-2">Variant:</span>
            {(['primary', 'secondary', 'ghost', 'glass'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setBtnVariant(v)}
                className={controlBtnClass(btnVariant === v)}
              >
                {v}
              </button>
            ))}
            <span className="text-xs text-[var(--color-grey-400)] ml-4 mr-2">Size:</span>
            {(['sm', 'md', 'lg'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setBtnSize(s)}
                className={controlBtnClass(btnSize === s)}
              >
                {s}
              </button>
            ))}
            <button
              onClick={() => setBtnLoading(!btnLoading)}
              className={`${controlBtnClass(btnLoading)} ml-4`}
            >
              Loading
            </button>
            <button
              onClick={() => setBtnDisabled(!btnDisabled)}
              className={`${controlBtnClass(btnDisabled)} ml-2`}
            >
              Disabled
            </button>
          </div>

          {/* Preview */}
          <div className="p-12 rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] flex flex-col items-center justify-center gap-8 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-white)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div className="flex items-center gap-6 relative z-10">
              <Button variant={btnVariant} size={btnSize} isLoading={btnLoading} disabled={btnDisabled}>
                Button
              </Button>
              <Button variant={btnVariant} size={btnSize} isLoading={btnLoading} disabled={btnDisabled} leftIcon={<Icon name="star" size="sm" />}>
                With Icon
              </Button>
            </div>
          </div>

          <CodeSnippet code={`<Button 
  variant="${btnVariant}" 
  size="${btnSize}"${btnLoading ? '\n  isLoading' : ''}${btnDisabled ? '\n  disabled' : ''}
>
  Button
</Button>`} />

          <PropsTable
            props={[
              { name: 'variant', type: "'primary' | 'secondary' | 'ghost' | 'glass'", defaultValue: "'primary'", description: 'The visual style of the button.' },
              { name: 'size', type: "'sm' | 'md' | 'lg' | ResponsiveObject", defaultValue: "'md'", description: 'The size of the button. Supports responsive objects.' },
              { name: 'isLoading', type: 'boolean', defaultValue: 'false', description: 'Shows a loading spinner and disables interaction.' },
              { name: 'leftIcon', type: 'ReactNode', description: 'Icon to display before the text.' },
              { name: 'rightIcon', type: 'ReactNode', description: 'Icon to display after the text.' },
              { name: 'asChild', type: 'boolean', defaultValue: 'false', description: 'Whether to merge props into the child element (Slot pattern).' },
              { name: 'touchTarget', type: 'boolean', defaultValue: 'false', description: 'Ensures minimum 44px touch target for accessibility.' },
            ]}
          />
        </div>
      </DemoBlock>

      {/* Badges */}
      <DemoBlock title="Badge">
        <div className="space-y-6">
          {/* Controls */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs text-[var(--color-grey-400)] mr-2">Variant:</span>
            {(['default', 'sage', 'coral', 'mint', 'gold', 'outline'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setBadgeVariant(v)}
                className={controlBtnClass(badgeVariant === v)}
              >
                {v}
              </button>
            ))}
            <span className="text-xs text-[var(--color-grey-400)] ml-4 mr-2">Size:</span>
            {(['sm', 'md'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setBadgeSize(s)}
                className={controlBtnClass(badgeSize === s)}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Preview */}
          <div className="p-12 rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] flex flex-wrap gap-4 items-center justify-center">
            <Badge variant={badgeVariant} size={badgeSize}>
              {badgeVariant === 'default' ? 'Default' : badgeVariant.charAt(0).toUpperCase() + badgeVariant.slice(1)}
            </Badge>
            <Badge variant={badgeVariant} size={badgeSize}>Status</Badge>
            <Badge variant={badgeVariant} size={badgeSize}>v1.0</Badge>
          </div>

          <CodeSnippet code={`<Badge variant="${badgeVariant}" size="${badgeSize}">
  ${badgeVariant.charAt(0).toUpperCase() + badgeVariant.slice(1)}
</Badge>`} />

          <PropsTable
            props={[
              { name: 'variant', type: "'default' | 'sage' | 'coral' | 'mint' | 'gold' | 'outline'", defaultValue: "'default'", description: 'The color variant of the badge.' },
              { name: 'size', type: "'sm' | 'md'", defaultValue: "'sm'", description: 'The size of the badge.' },
              { name: 'children', type: 'ReactNode', description: 'The content of the badge.' },
            ]}
          />
        </div>
      </DemoBlock>

      {/* Input */}
      <DemoBlock title="Input">
        <div className="space-y-6">
          {/* Controls */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs text-[var(--color-grey-400)] mr-2">Variant:</span>
            {(['default', 'glass'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setInputVariant(v)}
                className={controlBtnClass(inputVariant === v)}
              >
                {v}
              </button>
            ))}
            <span className="text-xs text-[var(--color-grey-400)] ml-4 mr-2">Size:</span>
            {(['sm', 'md', 'lg'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setInputSize(s)}
                className={controlBtnClass(inputSize === s)}
              >
                {s}
              </button>
            ))}
            <button
              onClick={() => setInputIcon(!inputIcon)}
              className={`${controlBtnClass(inputIcon)} ml-4`}
            >
              Icon
            </button>
            <button
              onClick={() => setInputError(!inputError)}
              className={`${controlBtnClass(inputError)} ml-2`}
            >
              Error
            </button>
          </div>

          {/* Preview */}
          <div className="p-12 rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] flex items-center justify-center">
            <div className="w-full max-w-sm">
              <Input
                variant={inputVariant}
                inputSize={inputSize}
                placeholder={inputError ? 'Invalid input' : 'Type something...'}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                leftIcon={inputIcon ? <Icon name="search" size="sm" /> : undefined}
                error={inputError ? 'This field is required' : undefined}
              />
            </div>
          </div>

          <CodeSnippet code={`<Input
  variant="${inputVariant}"
  inputSize="${inputSize}"
  placeholder="Type something..."${inputIcon ? '\n  leftIcon={<Icon name="search" size="sm" />}' : ''}${inputError ? '\n  error="This field is required"' : ''}
/>`} />

          <PropsTable
            props={[
              { name: 'variant', type: "'default' | 'glass'", defaultValue: "'default'", description: 'The visual style of the input.' },
              { name: 'inputSize', type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: 'The vertical size of the input.' },
              { name: 'leftIcon', type: 'ReactNode', description: 'Icon to display at the start of the input.' },
              { name: 'rightIcon', type: 'ReactNode', description: 'Icon to display at the end of the input.' },
              { name: 'error', type: 'boolean | string', defaultValue: 'false', description: 'Error state. Passing a string displays it as a message.' },
              { name: 'labelId', type: 'string', description: 'Associated label id for accessibility.' },
            ]}
          />
        </div>
      </DemoBlock>

      {/* Icons */}
      <DemoBlock title="Icon (Iconoir)">
        <div className="space-y-6">
          {/* Controls */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs text-[var(--color-grey-400)] mr-2">Size:</span>
            {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setIconSize(s)}
                className={controlBtnClass(iconSize === s)}
              >
                {s}
              </button>
            ))}
            <span className="text-xs text-[var(--color-grey-400)] ml-4 mr-2">Color:</span>
            {([
              { label: 'default', value: '' },
              { label: 'sage', value: 'var(--color-sage)' },
              { label: 'coral', value: 'var(--color-coral)' },
              { label: 'mint', value: 'var(--color-mint)' },
              { label: 'gold', value: 'var(--color-gold)' },
            ] as const).map((c) => (
              <button
                key={c.label}
                onClick={() => setIconColor(c.value)}
                className={controlBtnClass(iconColor === c.value)}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Preview */}
          <div className="flex flex-wrap gap-2">
            {iconNames.map((name) => (
              <div
                key={name}
                className="flex flex-col items-center gap-1.5 p-2.5 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)] min-w-[64px] hover:border-[var(--glass-highlight)] transition-colors"
                title={name}
              >
                <Icon
                  name={name}
                  size={iconSize}
                  style={iconColor ? { color: iconColor } : undefined}
                />
                <span className="text-[9px] text-[var(--color-grey-400)] leading-none">{name}</span>
              </div>
            ))}
          </div>

          <CodeSnippet code={`<Icon name="search" size="${iconSize}"${iconColor ? ` style={{ color: '${iconColor}' }}` : ''} />
<Icon name="github" size="${iconSize}"${iconColor ? ` style={{ color: '${iconColor}' }}` : ''} />`} />
        </div>
      </DemoBlock>

      {/* CodeBlock */}
      <DemoBlock title="CodeBlock">
        <div className="space-y-4">
          <CodeSnippet showLineNumbers code={`import { Nav, Hero, Button, useTheme } from '@n3wth/ui'
import '@n3wth/ui/styles'

function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Nav
      logo="myapp"
      items={[
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
      ]}
      theme={theme}
      onThemeToggle={toggleTheme}
      fixed
      hideOnScroll
    />
  )
}`} />
          <CodeSnippet code={`// Quick start
npm install @n3wth/ui`} />
        </div>
      </DemoBlock>
    </DemoSection>
  )
}
