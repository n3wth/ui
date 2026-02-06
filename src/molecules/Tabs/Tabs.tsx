import {
  forwardRef,
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
  useId,
  type HTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
  type KeyboardEvent,
} from 'react'
import { cn } from '../../utils/cn'
import { useReducedMotion } from '../../hooks/useReducedMotion'

type TabsVariant = 'underline' | 'pill'

interface TabsContextValue {
  activeValue: string
  setActiveValue: (value: string) => void
  variant: TabsVariant
  baseId: string
  registerTab: (value: string, element: HTMLButtonElement | null) => void
  getTabElements: () => Map<string, HTMLButtonElement>
}

const TabsContext = createContext<TabsContextValue | null>(null)

function useTabsContext() {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error('Tabs compound components must be used within a <Tabs> parent')
  }
  return context
}

// --- Tabs Root ---

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** The controlled active tab value */
  value?: string
  /** Callback when active tab changes */
  onChange?: (value: string) => void
  /** The default active tab value for uncontrolled mode */
  defaultValue?: string
  /** Visual variant */
  variant?: TabsVariant
  children: ReactNode
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ value, onChange, defaultValue, variant = 'underline', children, className, ...props }, ref) => {
    const [internalValue, setInternalValue] = useState(defaultValue ?? '')
    const tabElementsRef = useRef<Map<string, HTMLButtonElement>>(new Map())
    const baseId = useId()

    const activeValue = value !== undefined ? value : internalValue

    const setActiveValue = useCallback(
      (newValue: string) => {
        if (value === undefined) {
          setInternalValue(newValue)
        }
        onChange?.(newValue)
      },
      [value, onChange]
    )

    const registerTab = useCallback((tabValue: string, element: HTMLButtonElement | null) => {
      if (element) {
        tabElementsRef.current.set(tabValue, element)
      } else {
        tabElementsRef.current.delete(tabValue)
      }
    }, [])

    const getTabElements = useCallback(() => tabElementsRef.current, [])

    return (
      <TabsContext.Provider value={{ activeValue, setActiveValue, variant, baseId, registerTab, getTabElements }}>
        <div ref={ref} className={cn('flex flex-col', className)} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    )
  }
)

Tabs.displayName = 'Tabs'

// --- TabsList ---

export interface TabsListProps extends HTMLAttributes<HTMLDivElement> {
  /** Enable glass morphism background */
  glass?: boolean
  children: ReactNode
}

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ glass = false, children, className, ...props }, ref) => {
    const { variant, activeValue, getTabElements } = useTabsContext()
    const listRef = useRef<HTMLDivElement>(null)
    const indicatorRef = useRef<HTMLDivElement>(null)
    const prefersReducedMotion = useReducedMotion()

    // Merge forwarded ref with internal ref
    const mergedRef = useCallback(
      (node: HTMLDivElement | null) => {
        (listRef as React.MutableRefObject<HTMLDivElement | null>).current = node
        if (typeof ref === 'function') ref(node)
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
      },
      [ref]
    )

    // Animate indicator position
    useEffect(() => {
      const indicator = indicatorRef.current
      const list = listRef.current
      if (!indicator || !list) return

      const tabs = getTabElements()
      const activeTab = tabs.get(activeValue)
      if (!activeTab) {
        indicator.style.opacity = '0'
        return
      }

      const listRect = list.getBoundingClientRect()
      const tabRect = activeTab.getBoundingClientRect()

      const left = tabRect.left - listRect.left
      const width = tabRect.width

      indicator.style.opacity = '1'
      indicator.style.transform = `translateX(${left}px)`
      indicator.style.width = `${width}px`

      if (variant === 'pill') {
        indicator.style.height = `${tabRect.height}px`
      }
    }, [activeValue, variant, getTabElements])

    const isUnderline = variant === 'underline'
    const isPill = variant === 'pill'

    return (
      <div
        ref={mergedRef}
        role="tablist"
        className={cn(
          'relative flex items-center gap-1',
          isUnderline && 'border-b border-[var(--glass-border)]',
          isPill && [
            'p-1 rounded-full',
            'bg-[var(--glass-bg)]',
            'border border-[var(--glass-border)]',
          ],
          glass && 'backdrop-blur-lg',
          className
        )}
        {...props}
      >
        {/* Animated indicator */}
        <div
          ref={indicatorRef}
          aria-hidden
          className={cn(
            'absolute left-0',
            prefersReducedMotion
              ? 'transition-none'
              : 'transition-[transform,width,opacity] duration-200 ease-out',
            isUnderline && [
              'bottom-0 h-[2px]',
              'bg-[var(--color-white)]',
            ],
            isPill && [
              'top-1 rounded-full',
              'bg-[var(--color-white)]',
            ],
          )}
          style={{ opacity: 0, width: 0 }}
        />
        {children}
      </div>
    )
  }
)

TabsList.displayName = 'TabsList'

// --- TabsTab ---

export interface TabsTabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Unique value identifying this tab */
  value: string
  children: ReactNode
}

export const TabsTab = forwardRef<HTMLButtonElement, TabsTabProps>(
  ({ value, children, className, onKeyDown, ...props }, ref) => {
    const { activeValue, setActiveValue, variant, baseId, registerTab, getTabElements } = useTabsContext()
    const internalRef = useRef<HTMLButtonElement | null>(null)
    const isActive = activeValue === value

    const mergedRef = useCallback(
      (node: HTMLButtonElement | null) => {
        internalRef.current = node
        registerTab(value, node)
        if (typeof ref === 'function') ref(node)
        else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node
      },
      [ref, registerTab, value]
    )

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLButtonElement>) => {
        onKeyDown?.(e)
        if (e.defaultPrevented) return

        const tabs = getTabElements()
        const tabValues = Array.from(tabs.keys())
        const currentIndex = tabValues.indexOf(value)

        let targetIndex: number | null = null

        switch (e.key) {
          case 'ArrowRight':
            targetIndex = (currentIndex + 1) % tabValues.length
            break
          case 'ArrowLeft':
            targetIndex = (currentIndex - 1 + tabValues.length) % tabValues.length
            break
          case 'Home':
            targetIndex = 0
            break
          case 'End':
            targetIndex = tabValues.length - 1
            break
          default:
            return
        }

        e.preventDefault()
        const targetValue = tabValues[targetIndex]
        const targetElement = tabs.get(targetValue)
        if (targetElement) {
          targetElement.focus()
          setActiveValue(targetValue)
        }
      },
      [onKeyDown, getTabElements, value, setActiveValue]
    )

    const isUnderline = variant === 'underline'
    const isPill = variant === 'pill'

    return (
      <button
        ref={mergedRef}
        role="tab"
        type="button"
        id={`${baseId}-tab-${value}`}
        aria-selected={isActive}
        aria-controls={`${baseId}-panel-${value}`}
        tabIndex={isActive ? 0 : -1}
        onClick={() => setActiveValue(value)}
        onKeyDown={handleKeyDown}
        className={cn(
          'relative z-10',
          'inline-flex items-center justify-center',
          'text-sm font-medium',
          'focus-ring',
          'transition-colors duration-200 ease-out',
          'cursor-pointer',
          'whitespace-nowrap',
          isUnderline && [
            'px-3 py-2',
            isActive
              ? 'text-[var(--color-white)]'
              : 'text-[var(--color-grey-400)] hover:text-[var(--color-white)]',
          ],
          isPill && [
            'px-3 py-1.5',
            'rounded-full',
            isActive
              ? 'text-[var(--color-bg)]'
              : 'text-[var(--color-grey-400)] hover:text-[var(--color-white)]',
          ],
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

TabsTab.displayName = 'TabsTab'

// --- TabsPanel ---

export interface TabsPanelProps extends HTMLAttributes<HTMLDivElement> {
  /** The tab value this panel corresponds to */
  value: string
  children: ReactNode
}

export const TabsPanel = forwardRef<HTMLDivElement, TabsPanelProps>(
  ({ value, children, className, ...props }, ref) => {
    const { activeValue, baseId } = useTabsContext()
    const isActive = activeValue === value

    if (!isActive) return null

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={`${baseId}-panel-${value}`}
        aria-labelledby={`${baseId}-tab-${value}`}
        tabIndex={0}
        className={cn('mt-2 focus-ring', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

TabsPanel.displayName = 'TabsPanel'
