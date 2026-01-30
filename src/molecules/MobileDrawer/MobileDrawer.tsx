import { type HTMLAttributes, type ReactNode, useEffect, useRef, useCallback } from 'react'
import { cn } from '../../utils/cn'

export interface MobileDrawerProps extends HTMLAttributes<HTMLDivElement> {
  /** Whether the drawer is open */
  isOpen: boolean
  /** Callback when drawer should close */
  onClose: () => void
  /** Drawer content */
  children: ReactNode
  /** Width of the drawer */
  width?: string
  /** Position of the drawer */
  position?: 'left' | 'right'
  /** Z-index for the drawer */
  zIndex?: number
  /** Accessible label for the drawer */
  ariaLabel?: string
}

export function MobileDrawer({
  isOpen,
  onClose,
  children,
  width = '280px',
  position = 'right',
  zIndex = 50,
  ariaLabel = 'Navigation menu',
  className,
  ...props
}: MobileDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  // Focus management
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement
      // Focus first focusable element in drawer
      const firstFocusable = drawerRef.current?.querySelector<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
      firstFocusable?.focus()
    } else if (previousActiveElement.current) {
      previousActiveElement.current.focus()
      previousActiveElement.current = null
    }
  }, [isOpen])

  // Focus trap
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== 'Tab' || !drawerRef.current) return

    const focusableElements = drawerRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault()
      lastElement?.focus()
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault()
      firstElement?.focus()
    }
  }, [])

  const translateClass =
    position === 'right'
      ? isOpen
        ? 'translate-x-0'
        : 'translate-x-full'
      : isOpen
        ? 'translate-x-0'
        : '-translate-x-full'

  const positionClass = position === 'right' ? 'right-0' : 'left-0'

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={cn(
          'fixed inset-0 bg-black/50 transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        style={{ zIndex }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal={isOpen}
        aria-label={ariaLabel}
        aria-hidden={!isOpen}
        className={cn(
          'mobile-menu-drawer',
          'fixed top-0 h-full',
          'transition-transform duration-300 ease-out',
          translateClass,
          positionClass,
          className
        )}
        style={{
          width,
          maxWidth: '80vw',
          zIndex: zIndex + 1,
        }}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </div>
    </>
  )
}
