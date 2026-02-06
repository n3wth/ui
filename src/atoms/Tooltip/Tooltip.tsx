import {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useCallback,
  useId,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../../utils/cn'

export type TooltipPosition = 'top' | 'right' | 'bottom' | 'left'

export interface TooltipProps {
  /** Content to display inside the tooltip */
  content: ReactNode
  /** The element that triggers the tooltip */
  children: ReactNode
  /** Preferred position of the tooltip relative to the trigger */
  position?: TooltipPosition
  /** Delay in ms before showing the tooltip */
  showDelay?: number
  /** Delay in ms before hiding the tooltip */
  hideDelay?: number
  /** Whether the tooltip is disabled */
  disabled?: boolean
  /** Show arrow indicator */
  arrow?: boolean
  /** Additional class names for the tooltip popup */
  className?: string
}

interface Coords {
  top: number
  left: number
  actualPosition: TooltipPosition
}

function getCoords(
  triggerRect: DOMRect,
  tooltipRect: DOMRect,
  preferred: TooltipPosition,
  gap: number
): Coords {
  const viewport = {
    width: window.innerWidth,
    height: window.innerHeight,
  }

  const positions: Record<TooltipPosition, { top: number; left: number }> = {
    top: {
      top: triggerRect.top - tooltipRect.height - gap,
      left: triggerRect.left + (triggerRect.width - tooltipRect.width) / 2,
    },
    bottom: {
      top: triggerRect.bottom + gap,
      left: triggerRect.left + (triggerRect.width - tooltipRect.width) / 2,
    },
    left: {
      top: triggerRect.top + (triggerRect.height - tooltipRect.height) / 2,
      left: triggerRect.left - tooltipRect.width - gap,
    },
    right: {
      top: triggerRect.top + (triggerRect.height - tooltipRect.height) / 2,
      left: triggerRect.right + gap,
    },
  }

  const fits = (pos: TooltipPosition): boolean => {
    const { top, left } = positions[pos]
    return (
      top >= 0 &&
      left >= 0 &&
      top + tooltipRect.height <= viewport.height &&
      left + tooltipRect.width <= viewport.width
    )
  }

  const fallbackOrder: Record<TooltipPosition, TooltipPosition[]> = {
    top: ['top', 'bottom', 'right', 'left'],
    bottom: ['bottom', 'top', 'right', 'left'],
    left: ['left', 'right', 'top', 'bottom'],
    right: ['right', 'left', 'top', 'bottom'],
  }

  const actualPosition = fallbackOrder[preferred].find(fits) ?? preferred
  const coords = positions[actualPosition]

  const pad = 8
  return {
    top: Math.max(pad, Math.min(coords.top, viewport.height - tooltipRect.height - pad)),
    left: Math.max(pad, Math.min(coords.left, viewport.width - tooltipRect.width - pad)),
    actualPosition,
  }
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      content,
      children,
      position = 'top',
      showDelay = 200,
      hideDelay = 0,
      disabled = false,
      arrow = true,
      className,
    },
    ref
  ) => {
    const [visible, setVisible] = useState(false)
    const [coords, setCoords] = useState<Coords | null>(null)
    const triggerRef = useRef<HTMLDivElement | null>(null)
    const tooltipRef = useRef<HTMLDivElement | null>(null)
    const showTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
    const hideTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
    const tooltipId = useId()

    const updatePosition = useCallback(() => {
      const trigger = triggerRef.current
      const tooltip = tooltipRef.current
      if (!trigger || !tooltip) return

      const triggerRect = trigger.getBoundingClientRect()
      const tooltipRect = tooltip.getBoundingClientRect()
      setCoords(getCoords(triggerRect, tooltipRect, position, 8))
    }, [position])

    const show = useCallback(() => {
      if (disabled) return
      if (hideTimeout.current !== undefined) clearTimeout(hideTimeout.current)
      showTimeout.current = setTimeout(() => {
        setVisible(true)
      }, showDelay)
    }, [disabled, showDelay])

    const hide = useCallback(() => {
      if (showTimeout.current !== undefined) clearTimeout(showTimeout.current)
      hideTimeout.current = setTimeout(() => {
        setVisible(false)
        setCoords(null)
      }, hideDelay)
    }, [hideDelay])

    useEffect(() => {
      if (visible) {
        const id = requestAnimationFrame(updatePosition)
        return () => cancelAnimationFrame(id)
      }
    }, [visible, updatePosition])

    useEffect(() => {
      if (!visible) return

      const handleUpdate = () => updatePosition()
      window.addEventListener('scroll', handleUpdate, true)
      window.addEventListener('resize', handleUpdate)
      return () => {
        window.removeEventListener('scroll', handleUpdate, true)
        window.removeEventListener('resize', handleUpdate)
      }
    }, [visible, updatePosition])

    useEffect(() => {
      return () => {
        if (showTimeout.current !== undefined) clearTimeout(showTimeout.current)
        if (hideTimeout.current !== undefined) clearTimeout(hideTimeout.current)
      }
    }, [])

    const arrowStyles: Record<TooltipPosition, string> = {
      top: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45',
      bottom: 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45',
      left: 'right-0 top-1/2 translate-x-1/2 -translate-y-1/2 rotate-45',
      right: 'left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45',
    }

    const actualPos = coords?.actualPosition ?? position

    const tooltipElement = visible
      ? createPortal(
          <div
            ref={tooltipRef}
            id={tooltipId}
            role="tooltip"
            style={
              coords
                ? { top: coords.top, left: coords.left }
                : { top: -9999, left: -9999 }
            }
            className={cn(
              'fixed z-50 pointer-events-none',
              'max-w-xs px-3 py-1.5',
              'text-xs font-medium text-[var(--color-white)]',
              'rounded-lg',
              'bg-[var(--glass-bg)] backdrop-blur-lg',
              'border border-[var(--glass-border)]',
              coords
                ? [
                    'opacity-100 scale-100',
                    'motion-safe:transition-[opacity,transform] motion-safe:duration-150 motion-safe:ease-out',
                  ]
                : 'opacity-0 scale-95',
              className
            )}
          >
            {content}
            {arrow && (
              <span
                aria-hidden
                className={cn(
                  'absolute w-2 h-2',
                  'bg-[var(--glass-bg)]',
                  'border border-[var(--glass-border)]',
                  arrowStyles[actualPos],
                  actualPos === 'top' && 'border-t-0 border-l-0',
                  actualPos === 'bottom' && 'border-b-0 border-r-0',
                  actualPos === 'left' && 'border-l-0 border-b-0',
                  actualPos === 'right' && 'border-r-0 border-t-0'
                )}
              />
            )}
          </div>,
          document.body
        )
      : null

    return (
      <>
        <div
          ref={(node) => {
            triggerRef.current = node
            if (typeof ref === 'function') ref(node)
            else if (ref) ref.current = node
          }}
          onMouseEnter={show}
          onMouseLeave={hide}
          onFocus={show}
          onBlur={hide}
          aria-describedby={visible ? tooltipId : undefined}
          className="inline-flex"
        >
          {children}
        </div>
        {tooltipElement}
      </>
    )
  }
)

Tooltip.displayName = 'Tooltip'
