import { type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../utils/cn'
import { Badge } from '../../atoms/Badge'
import { Button } from '../../atoms/Button'

export interface HeroCTA {
  label: string
  href: string
  variant?: 'primary' | 'secondary' | 'ghost'
}

export interface HeroProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  badge?: string
  title: ReactNode
  description?: ReactNode
  ctas?: HeroCTA[]
  align?: 'left' | 'center'
  size?: 'default' | 'large'
  gradient?: boolean
}

export function Hero({
  badge,
  title,
  description,
  ctas = [],
  align = 'center',
  size = 'default',
  gradient = true,
  className,
  ...props
}: HeroProps) {
  const alignments = {
    left: 'text-left items-start',
    center: 'text-center items-center',
  }

  const titleSizes = {
    default: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl',
    large: 'text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl',
  }

  return (
    <section
      className={cn(
        'relative',
        'px-4 sm:px-6 py-12 sm:py-20 md:py-24 lg:py-32 xl:py-40',
        className
      )}
      {...props}
    >
      <div
        className={cn(
          'mx-auto max-w-4xl',
          'flex flex-col gap-4 sm:gap-6 md:gap-8',
          alignments[align]
        )}
      >
        {badge && (
          <Badge variant="default" size="md" className="animate-in">
            {badge}
          </Badge>
        )}

        <h1
          className={cn(
            'font-display font-semibold tracking-tight',
            titleSizes[size],
            gradient ? 'hero-gradient-text' : 'text-[var(--color-white)]',
            'animate-in',
            'leading-tight sm:leading-snug'
          )}
          style={{ animationDelay: '0.1s', textAlign: align === 'center' ? 'center' : 'left', width: '100%', display: 'block' }}
        >
          {title}
        </h1>

        {description && (
          <p
            className={cn(
              'text-base sm:text-lg md:text-xl',
              'text-[var(--color-grey-400)]',
              'max-w-2xl leading-relaxed sm:leading-relaxed',
              'animate-in',
              'px-0 sm:px-0'
            )}
            style={{ animationDelay: '0.2s' }}
          >
            {description}
          </p>
        )}

        {ctas.length > 0 && (
          <div
            className={cn(
              'flex flex-col sm:flex-wrap gap-3 sm:gap-4 mt-2 sm:mt-4 w-full sm:w-auto',
              align === 'center' ? 'sm:justify-center' : 'sm:justify-start',
              'animate-in'
            )}
            style={{ animationDelay: '0.3s' }}
          >
            {ctas.map((cta, index) => (
              <Button
                key={cta.href}
                variant={cta.variant || (index === 0 ? 'primary' : 'secondary')}
                size="lg"
                asChild
                className="w-full sm:w-auto"
              >
                <a href={cta.href}>{cta.label}</a>
              </Button>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
