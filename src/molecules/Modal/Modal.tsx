import {
  forwardRef,
  useEffect,
  useRef,
  useCallback,
  useId,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../../utils/cn'

export type ModalSize = 'sm' | 'md' | 'lg' | 'full'

export interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'role'> {
  /** Whether the modal is open */
  isOpen: boolean
  /** Callback when modal should close */
  onClose: () => void
  /** Modal content */
  children: ReactNode
  /** Size of the modal panel */
  size?: ModalSize
  /** Whether clicking the backdrop closes the modal */
  closeOnBackdropClick?: boolean
  /** Whether pressing Escape closes the modal */
  closeOnEscape?: boolean
  /** Accessible label for the modal (used if no Modal.Header is provided) */
  ariaLabel?: string
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

const sizeClasses: Record<ModalSize, string> = {
  sm: 'max-w-[400px]',
  md: 'max-w-[560px]',
  lg: 'max-w-[720px]',
  full: 'max-w-none w-screen h-[100dvh] !rounded-none',
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      isOpen,
      onClose,
      children,
      size = 'md',
      closeOnBackdropClick = true,
      closeOnEscape = true,
      ariaLabel,
      className,
      ...props
    },
    ref
  ) => {
    const internalRef = useRef<HTMLDivElement>(null)
    const panelRef = (ref as React.RefObject<HTMLDivElement>) || internalRef
    const previousActiveElement = useRef<HTMLElement | null>(null)
    const labelId = useId()
    const descriptionId = useId()
    const [mounted, setMounted] = useState(false)
    const [visible, setVisible] = useState(false)

    // Mount/unmount with animation
    useEffect(() => {
      if (isOpen) {
        setMounted(true)
        // Trigger enter animation on next frame
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setVisible(true)
          })
        })
      } else {
        setVisible(false)
        const timer = setTimeout(() => setMounted(false), 200)
        return () => clearTimeout(timer)
      }
    }, [isOpen])

    // Lock body scroll when open
    useEffect(() => {
      if (isOpen) {
        const scrollY = window.scrollY
        document.body.style.overflow = 'hidden'
        document.body.style.position = 'fixed'
        document.body.style.top = `-${scrollY}px`
        document.body.style.width = '100%'
      } else {
        const top = document.body.style.top
        document.body.style.overflow = ''
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.width = ''
        if (top) {
          window.scrollTo(0, parseInt(top, 10) * -1)
        }
      }
      return () => {
        document.body.style.overflow = ''
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.width = ''
      }
    }, [isOpen])

    // Escape key handler
    useEffect(() => {
      if (!closeOnEscape || !isOpen) return
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.stopPropagation()
          onClose()
        }
      }
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }, [isOpen, onClose, closeOnEscape])

    // Focus management
    useEffect(() => {
      if (isOpen) {
        previousActiveElement.current = document.activeElement as HTMLElement
        // Focus first focusable element in panel
        const panel = panelRef.current
        if (panel) {
          const firstFocusable = panel.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)
          if (firstFocusable) {
            firstFocusable.focus()
          } else {
            panel.focus()
          }
        }
      } else if (previousActiveElement.current) {
        previousActiveElement.current.focus()
        previousActiveElement.current = null
      }
    }, [isOpen, panelRef])

    // Focus trap
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key !== 'Tab' || !panelRef.current) return

        const focusableElements =
          panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
        if (focusableElements.length === 0) {
          e.preventDefault()
          return
        }

        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      },
      [panelRef]
    )

    // Backdrop click handler
    const handleBackdropClick = useCallback(
      (e: React.MouseEvent) => {
        if (closeOnBackdropClick && e.target === e.currentTarget) {
          onClose()
        }
      },
      [closeOnBackdropClick, onClose]
    )

    if (!mounted) return null

    return createPortal(
      <div
        className={cn(
          'fixed inset-0 z-50 flex items-center justify-center',
          // Backdrop
          'transition-[background-color,backdrop-filter] duration-200 ease-out',
          visible
            ? 'bg-black/60 backdrop-blur-sm'
            : 'bg-black/0 backdrop-blur-none',
          // Reduced motion: instant transitions
          'motion-reduce:transition-none'
        )}
        onClick={handleBackdropClick}
        aria-hidden="true"
      >
        {/* Panel */}
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={ariaLabel ? undefined : labelId}
          aria-label={ariaLabel}
          aria-describedby={descriptionId}
          tabIndex={-1}
          className={cn(
            'relative w-full mx-4',
            sizeClasses[size],
            // Glass panel styling
            'bg-[var(--color-bg-secondary)] border border-[var(--glass-border)]',
            'backdrop-blur-lg',
            size !== 'full' && 'rounded-2xl',
            // Focus ring
            'focus-ring',
            // Animation
            'transition-[opacity,transform] duration-200 ease-out',
            visible
              ? 'opacity-100 scale-100 translate-y-0'
              : 'opacity-0 scale-95 translate-y-2',
            // Reduced motion: no scale/translate, instant
            'motion-reduce:transition-none motion-reduce:transform-none',
            className
          )}
          onKeyDown={handleKeyDown}
          // Pass through the label/description IDs via data attributes for sub-components
          data-modal-label-id={labelId}
          data-modal-description-id={descriptionId}
          {...props}
        >
          {children}
        </div>
      </div>,
      document.body
    )
  }
)

Modal.displayName = 'Modal'

// --- Compound sub-components ---

export interface ModalHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function ModalHeader({ children, className, ...props }: ModalHeaderProps) {
  return (
    <div
      className={cn(
        'px-6 pt-6 pb-0',
        'flex items-start justify-between gap-4',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

ModalHeader.displayName = 'ModalHeader'

export interface ModalTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode
  as?: 'h1' | 'h2' | 'h3' | 'h4'
}

export function ModalTitle({ children, as: Tag = 'h2', className, id, ...props }: ModalTitleProps) {
  return (
    <Tag
      id={id}
      className={cn(
        'font-display text-lg font-semibold text-[var(--color-white)]',
        'tracking-tight',
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}

ModalTitle.displayName = 'ModalTitle'

export interface ModalDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode
}

export function ModalDescription({ children, className, id, ...props }: ModalDescriptionProps) {
  return (
    <p
      id={id}
      className={cn(
        'text-sm text-[var(--color-grey-400)]',
        'mt-1',
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
}

ModalDescription.displayName = 'ModalDescription'

export interface ModalBodyProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function ModalBody({ children, className, ...props }: ModalBodyProps) {
  return (
    <div
      className={cn(
        'px-6 py-4',
        'overflow-y-auto',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

ModalBody.displayName = 'ModalBody'

export interface ModalFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function ModalFooter({ children, className, ...props }: ModalFooterProps) {
  return (
    <div
      className={cn(
        'px-6 pb-6 pt-0',
        'border-t border-[var(--glass-border)]',
        'mt-2 pt-4',
        'flex items-center justify-end gap-3',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

ModalFooter.displayName = 'ModalFooter'

export interface ModalCloseButtonProps extends HTMLAttributes<HTMLButtonElement> {
  /** Accessible label for the close button */
  ariaLabel?: string
}

export function ModalCloseButton({
  ariaLabel = 'Close',
  className,
  onClick,
  ...props
}: ModalCloseButtonProps) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={cn(
        'inline-flex items-center justify-center',
        'w-8 h-8 rounded-lg',
        'text-[var(--color-grey-400)]',
        'hover:text-[var(--color-white)] hover:bg-[var(--glass-bg)]',
        'transition-colors duration-200',
        'focus-ring',
        'motion-reduce:transition-none',
        className
      )}
      onClick={onClick}
      {...props}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M4 4l8 8M12 4l-8 8" />
      </svg>
    </button>
  )
}

ModalCloseButton.displayName = 'ModalCloseButton'
