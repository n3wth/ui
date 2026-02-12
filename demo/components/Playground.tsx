import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'
import { cn } from '../../src/utils/cn'

interface PlaygroundProps {
  code: string
  scope?: Record<string, any>
  noInline?: boolean
  className?: string
}

export function Playground({ code, scope = {}, noInline = false, className }: PlaygroundProps) {
  return (
    <LiveProvider code={code} scope={scope} noInline={noInline}>
      <div className={cn('space-y-4', className)}>
        {/* Preview */}
        <div className="p-8 rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] flex items-center justify-center gap-4 min-h-[120px]">
          <LivePreview />
        </div>

        {/* Editor */}
        <div className="rounded-xl border border-[var(--glass-border)] bg-[var(--color-bg)] overflow-hidden">
          <div className="px-4 py-2 border-b border-[var(--glass-border)] bg-[var(--glass-bg)]">
            <span className="text-xs font-medium text-[var(--color-grey-400)]">
              Edit code below
            </span>
          </div>
          <LiveEditor
            className="font-mono text-sm leading-relaxed"
            style={{
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
              backgroundColor: 'var(--color-bg)',
              padding: '1rem',
              overflowX: 'auto',
            }}
          />
        </div>

        {/* Error */}
        <LiveError className="p-4 rounded-xl border border-[var(--color-coral)] bg-[var(--color-coral)]/10 text-[var(--color-coral)] text-sm font-mono" />
      </div>
    </LiveProvider>
  )
}
