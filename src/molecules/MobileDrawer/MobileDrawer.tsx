import { type HTMLAttributes, type ReactNode, useEffect } from 'react'
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
}

export function MobileDrawer({
  isOpen,
  onClose,
  children,
  width = '280px',
  position = 'right',
  zIndex = 50,
  className,
  ...props
}: MobileDrawerProps) {
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

  const translateClass = position === 'right'
    ? (isOpen ? 'translate-x-0' : 'translate-x-full')
    : (isOpen ? 'translate-x-0' : '-translate-x-full')

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
        aria-hidden={!isOpen}
      />

      {/* Drawer panel */}
      <div
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
        aria-hidden={!isOpen}
        {...props}
      >
        {children}
      </div>
    </>
  )
}
