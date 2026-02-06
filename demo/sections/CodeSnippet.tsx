import { useState, useMemo } from 'react'
import { cn } from '../../src/utils/cn'
import { Icon } from '../../src/atoms/Icon'

interface CodeSnippetProps {
  code: string
  language?: 'typescript' | 'javascript' | 'bash' | 'css' | 'json'
  showLineNumbers?: boolean
  className?: string
}

interface Token {
  type: 'keyword' | 'string' | 'number' | 'comment' | 'property' | 'punctuation' | 'tag' | 'attr' | 'text'
  value: string
}

const COLORS: Record<Token['type'], string> = {
  keyword: 'var(--color-coral)',
  string: 'var(--color-mint)',
  number: 'var(--color-gold)',
  comment: 'var(--color-grey-500)',
  property: 'var(--color-sage)',
  punctuation: 'var(--color-grey-400)',
  tag: 'var(--color-coral)',
  attr: 'var(--color-sage)',
  text: 'var(--color-grey-200)',
}

function tokenize(code: string): Token[] {
  const tokens: Token[] = []
  let remaining = code

  const patterns: [RegExp, Token['type']][] = [
    [/^\/\/.*$/m, 'comment'],
    [/^\/\*[\s\S]*?\*\//, 'comment'],
    [/^#.*$/m, 'comment'],
    [/^'[^']*'/, 'string'],
    [/^"[^"]*"/, 'string'],
    [/^`[^`]*`/, 'string'],
    [/^\b(const|let|var|function|return|if|else|for|while|import|export|from|default|class|extends|new|this|true|false|null|undefined|async|await|try|catch|throw|finally|typeof|instanceof|in|of|type|interface|enum)\b/, 'keyword'],
    [/^<\/?[A-Z][a-zA-Z]*/, 'tag'],
    [/^\b[a-z][a-zA-Z]*(?=\s*=\s*[{"'])/, 'attr'],
    [/^\b\d+(\.\d+)?\b/, 'number'],
    [/^[a-zA-Z_][a-zA-Z0-9_]*(?=\s*[:])/, 'property'],
    [/^[{}[\](),;:=<>!&|?+\-*/%^~.@]/, 'punctuation'],
    [/^\s+/, 'text'],
    [/^[^\s{}[\](),;:'"`=<>!&|?+\-*/%^~.@]+/, 'text'],
  ]

  while (remaining.length > 0) {
    let matched = false
    for (const [pattern, type] of patterns) {
      const match = remaining.match(pattern)
      if (match) {
        tokens.push({ type, value: match[0] })
        remaining = remaining.slice(match[0].length)
        matched = true
        break
      }
    }
    if (!matched) {
      tokens.push({ type: 'text', value: remaining[0] })
      remaining = remaining.slice(1)
    }
  }

  return tokens
}

export function CodeSnippet({ code, showLineNumbers = false, className }: CodeSnippetProps) {
  const [copied, setCopied] = useState(false)
  const tokens = useMemo(() => tokenize(code), [code])
  const lines = useMemo(() => code.split('\n'), [code])

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={cn('relative group', className)}>
      <pre
        className="p-4 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] font-mono text-xs overflow-x-auto"
        style={{ color: 'var(--color-grey-200)' }}
      >
        <code className={showLineNumbers ? 'flex' : undefined}>
          {showLineNumbers && (
            <span className="select-none pr-4 text-[var(--color-grey-600)] border-r border-[var(--glass-border)] mr-4">
              {lines.map((_, i) => (
                <span key={i} className="block">{i + 1}</span>
              ))}
            </span>
          )}
          <span className={showLineNumbers ? 'flex-1' : undefined}>
            {tokens.map((token, i) => (
              <span key={i} style={{ color: COLORS[token.type] }}>{token.value}</span>
            ))}
          </span>
        </code>
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
