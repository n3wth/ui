import { useState, useCallback, type HTMLAttributes } from 'react'
import { cn } from '../../utils/cn'
import { Icon } from '../../atoms/Icon'

export interface CommandBoxProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  command: string
  variant?: 'default' | 'primary'
  showCopyButton?: boolean
  onCopy?: () => void
}

export function CommandBox({
  command,
  variant = 'default',
  showCopyButton = true,
  onCopy,
  className,
  ...props
}: CommandBoxProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(command)
      setCopied(true)
      onCopy?.()
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }, [command, onCopy])

  const baseStyles = [
    'flex items-center justify-between gap-3',
    'px-4 py-3',
    'rounded-xl',
    'border',
    'backdrop-blur-lg',
    'transition-[background-color,border-color] duration-200',
  ]

  const variants = {
    default: [
      'bg-[rgba(255,255,255,0.03)]',
      'border-[var(--glass-border)]',
      'hover:bg-[rgba(255,255,255,0.06)]',
      'hover:border-[var(--glass-highlight)]',
    ],
    primary: [
      'bg-[var(--glass-bg)]',
      'border-[var(--glass-highlight)]',
      'hover:bg-[rgba(255,255,255,0.12)]',
    ],
  }

  return (
    <div className={cn(baseStyles, variants[variant], className)} {...props}>
      <code className="text-sm font-mono text-[var(--color-grey-300)] truncate">{command}</code>
      {showCopyButton && (
        <>
          <button
            type="button"
            onClick={handleCopy}
            className={cn(
              'flex-shrink-0',
              'p-2 rounded-lg',
              'transition-[background-color,color,transform] duration-200',
              'hover:scale-105 active:scale-92',
              copied
                ? 'bg-[var(--color-sage)] text-[var(--color-bg)]'
                : 'bg-[rgba(255,255,255,0.1)] text-[var(--color-grey-400)] hover:bg-[rgba(255,255,255,0.15)] hover:text-[var(--color-white)]'
            )}
            aria-label={copied ? 'Copied!' : 'Copy to clipboard'}
          >
            <Icon name={copied ? 'check' : 'copy'} size="sm" />
          </button>
          {/* Live region for screen reader announcement */}
          <span className="sr-only" role="status" aria-live="polite">
            {copied ? 'Copied to clipboard' : ''}
          </span>
        </>
      )}
    </div>
  )
}
