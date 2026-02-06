import {
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react'
import { cn } from '../../utils/cn'
import { Icon } from '../../atoms/Icon'
import type { IconName } from '../../atoms/Icon'

export type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info'

export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'top-center'
  | 'bottom-right'
  | 'bottom-left'
  | 'bottom-center'

export interface ToastData {
  id: string
  variant: ToastVariant
  title?: string
  description?: string
  duration?: number
  icon?: ReactNode
}

export interface ToastProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  variant?: ToastVariant
  title?: string
  description?: string
  duration?: number
  icon?: ReactNode
  onDismiss?: () => void
  open?: boolean
}

const variantIcons: Record<ToastVariant, IconName> = {
  default: 'bell',
  success: 'success',
  error: 'error',
  warning: 'warning',
  info: 'info',
}

const variantStyles: Record<ToastVariant, string[]> = {
  default: [
    'border-[var(--glass-border)]',
  ],
  success: [
    'border-[var(--color-sage)]/30',
  ],
  error: [
    'border-[var(--color-coral)]/30',
  ],
  warning: [
    'border-[var(--color-gold)]/30',
  ],
  info: [
    'border-[var(--color-mint)]/30',
  ],
}

const variantIconColors: Record<ToastVariant, string> = {
  default: 'text-[var(--color-grey-400)]',
  success: 'text-[var(--color-sage)]',
  error: 'text-[var(--color-coral)]',
  warning: 'text-[var(--color-gold)]',
  info: 'text-[var(--color-mint)]',
}

export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      variant = 'default',
      title,
      description,
      duration = 5000,
      icon,
      onDismiss,
      open = true,
      className,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(open)
    const [isExiting, setIsExiting] = useState(false)
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const handleDismiss = useCallback(() => {
      setIsExiting(true)
      setTimeout(() => {
        setIsVisible(false)
        onDismiss?.()
      }, 200)
    }, [onDismiss])

    useEffect(() => {
      if (!open) {
        handleDismiss()
        return
      }
      setIsVisible(true)
      setIsExiting(false)
    }, [open, handleDismiss])

    useEffect(() => {
      if (duration > 0 && isVisible && !isExiting) {
        timerRef.current = setTimeout(handleDismiss, duration)
        return () => {
          if (timerRef.current) clearTimeout(timerRef.current)
        }
      }
    }, [duration, isVisible, isExiting, handleDismiss])

    if (!isVisible) return null

    const iconElement = icon ?? (
      <Icon
        name={variantIcons[variant]}
        size="sm"
        className={variantIconColors[variant]}
      />
    )

    return (
      <div
        ref={ref}
        role="alert"
        aria-live="polite"
        className={cn(
          // Base
          'pointer-events-auto',
          'w-[360px] max-w-[calc(100vw-2rem)]',
          'rounded-2xl border',
          'bg-[var(--glass-bg)] backdrop-blur-lg',
          'p-4',
          // Animation
          'motion-safe:transition-[transform,opacity] motion-safe:duration-200 motion-safe:ease-out',
          isExiting
            ? 'opacity-0 translate-x-2'
            : 'opacity-100 translate-x-0 motion-safe:animate-[toastSlideIn_0.3s_cubic-bezier(0.4,0,0.2,1)]',
          // Variant border
          variantStyles[variant],
          className
        )}
        {...props}
      >
        <div className="flex items-start gap-3">
          <span className="mt-0.5 shrink-0">{iconElement}</span>
          <div className="flex-1 min-w-0">
            {title && (
              <p className="text-sm font-medium text-[var(--color-white)]">
                {title}
              </p>
            )}
            {description && (
              <p className={cn(
                'text-sm text-[var(--color-grey-400)]',
                title && 'mt-1'
              )}>
                {description}
              </p>
            )}
          </div>
          <button
            onClick={handleDismiss}
            className={cn(
              'shrink-0 mt-0.5',
              'rounded-full p-1',
              'text-[var(--color-grey-400)]',
              'hover:text-[var(--color-white)] hover:bg-[var(--glass-bg)]',
              'transition-colors duration-150',
              'focus-ring',
            )}
            aria-label="Dismiss notification"
          >
            <Icon name="x" size="xs" />
          </button>
        </div>
      </div>
    )
  }
)

Toast.displayName = 'Toast'

export interface ToastContainerProps extends HTMLAttributes<HTMLDivElement> {
  position?: ToastPosition
  children?: ReactNode
}

const positionStyles: Record<ToastPosition, string> = {
  'top-right': 'top-0 right-0 items-end',
  'top-left': 'top-0 left-0 items-start',
  'top-center': 'top-0 left-1/2 -translate-x-1/2 items-center',
  'bottom-right': 'bottom-0 right-0 items-end',
  'bottom-left': 'bottom-0 left-0 items-start',
  'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2 items-center',
}

export function ToastContainer({
  position = 'top-right',
  children,
  className,
  ...props
}: ToastContainerProps) {
  return (
    <div
      className={cn(
        'fixed z-50',
        'flex flex-col gap-3',
        'p-4',
        'pointer-events-none',
        positionStyles[position],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
