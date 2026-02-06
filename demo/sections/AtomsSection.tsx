import { useState } from 'react'
import { Button } from '../../src/atoms/Button'
import { Badge } from '../../src/atoms/Badge'
import { Input } from '../../src/atoms/Input'
import { Icon } from '../../src/atoms/Icon'
import type { IconName } from '../../src/atoms/Icon'
import { DemoSection, DemoBlock } from './DemoSection'
import { CodeSnippet } from './CodeSnippet'

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

export function AtomsSection() {
  const [inputValue, setInputValue] = useState('')
  const [btnVariant, setBtnVariant] = useState<'primary' | 'secondary' | 'ghost' | 'glass'>('primary')
  const [btnSize, setBtnSize] = useState<'sm' | 'md' | 'lg'>('md')
  const [btnLoading, setBtnLoading] = useState(false)

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
                className={`px-2 py-1 text-xs rounded-full border transition-colors ${
                  btnVariant === v
                    ? 'bg-[var(--color-white)] text-[var(--color-bg)] border-[var(--color-white)]'
                    : 'bg-transparent text-[var(--color-grey-400)] border-[var(--glass-border)] hover:border-[var(--glass-highlight)]'
                }`}
              >
                {v}
              </button>
            ))}
            <span className="text-xs text-[var(--color-grey-400)] ml-4 mr-2">Size:</span>
            {(['sm', 'md', 'lg'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setBtnSize(s)}
                className={`px-2 py-1 text-xs rounded-full border transition-colors ${
                  btnSize === s
                    ? 'bg-[var(--color-white)] text-[var(--color-bg)] border-[var(--color-white)]'
                    : 'bg-transparent text-[var(--color-grey-400)] border-[var(--glass-border)] hover:border-[var(--glass-highlight)]'
                }`}
              >
                {s}
              </button>
            ))}
            <button
              onClick={() => setBtnLoading(!btnLoading)}
              className={`px-2 py-1 text-xs rounded-full border transition-colors ml-4 ${
                btnLoading
                  ? 'bg-[var(--color-white)] text-[var(--color-bg)] border-[var(--color-white)]'
                  : 'bg-transparent text-[var(--color-grey-400)] border-[var(--glass-border)] hover:border-[var(--glass-highlight)]'
              }`}
            >
              Loading
            </button>
          </div>

          {/* Preview */}
          <div className="p-8 rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] flex items-center justify-center gap-4">
            <Button variant={btnVariant} size={btnSize} isLoading={btnLoading}>
              Button
            </Button>
            <Button variant={btnVariant} size={btnSize} isLoading={btnLoading} leftIcon={<Icon name="star" size="sm" />}>
              With Icon
            </Button>
            <Button variant={btnVariant} size={btnSize} disabled>
              Disabled
            </Button>
          </div>

          <CodeSnippet code={`<Button variant="${btnVariant}" size="${btnSize}"${btnLoading ? ' isLoading' : ''}>
  Button
</Button>`} />
        </div>
      </DemoBlock>

      {/* Badges */}
      <DemoBlock title="Badge">
        <div className="p-8 rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] flex flex-wrap gap-3 items-center justify-center">
          <Badge>Default</Badge>
          <Badge variant="sage">Sage</Badge>
          <Badge variant="coral">Coral</Badge>
          <Badge variant="mint">Mint</Badge>
          <Badge variant="gold">Gold</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
        <CodeSnippet className="mt-4" code={`<Badge variant="sage">Sage</Badge>
<Badge variant="coral">Coral</Badge>`} />
      </DemoBlock>

      {/* Input */}
      <DemoBlock title="Input">
        <div className="max-w-sm space-y-4">
          <Input
            placeholder="Default input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Input
            variant="glass"
            placeholder="Glass variant"
            leftIcon={<Icon name="search" size="sm" />}
          />
          <Input placeholder="With error" error="This field is required" />
        </div>
        <CodeSnippet className="mt-4" code={`<Input
  variant="glass"
  placeholder="Search..."
  leftIcon={<Icon name="search" size="sm" />}
/>`} />
      </DemoBlock>

      {/* Icons */}
      <DemoBlock title="Icon (Iconoir)">
        <div className="flex flex-wrap gap-2">
          {iconNames.map((name) => (
            <div
              key={name}
              className="flex flex-col items-center gap-1.5 p-2.5 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)] min-w-[64px] hover:border-[var(--glass-highlight)] transition-colors"
              title={name}
            >
              <Icon name={name} size="md" />
              <span className="text-[9px] text-[var(--color-grey-400)] leading-none">{name}</span>
            </div>
          ))}
        </div>
        <CodeSnippet className="mt-4" code={`<Icon name="search" size="md" />
<Icon name="github" size="lg" className="text-[var(--color-sage)]" />`} />
      </DemoBlock>
    </DemoSection>
  )
}
