import { useState } from 'react'
import { cn } from '../../src/utils/cn'
import { Icon } from '../../src/atoms/Icon'

interface CodeSnippetProps {
  code: string
  className?: string
}

export function CodeSnippet({ code, className }: CodeSnippetProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={cn('relative group', className)}>
      <pre className="p-4 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] font-mono text-xs text-[var(--color-grey-300)] overflow-x-auto">
        <code>{code}</code>
      </pre>
      <button
        onClick={handleCopy}
        className={cn(
          'absolute top-2 right-2',
          'p-1.5 rounded-lg',
          'text-[var(--color-grey-400)]',
          'hover:text-[var(--color-white)] hover:bg-[var(--glass-bg)]',
          'opacity-0 group-hover:opacity-100',
          'transition-all duration-200',
          'focus-ring',
        )}
        aria-label={copied ? 'Copied' : 'Copy code'}
      >
        <Icon name={copied ? 'check' : 'copy'} size="xs" />
      </button>
    </div>
  )
}
