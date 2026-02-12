import {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  useId,
  createContext,
  useContext,
  type ReactNode,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
} from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../../utils/cn'

/* ------------------------------------------------------------------
   Types
   ------------------------------------------------------------------ */

export interface DropdownOption {
  value: string
  label: string
  disabled?: boolean
}

export interface DropdownProps {
  /** Options to display */
  options: DropdownOption[]
  /** Controlled value (single-select) */
  value?: string
  /** Controlled values (multi-select) */
  values?: string[]
  /** Default value for uncontrolled single-select */
  defaultValue?: string
  /** Default values for uncontrolled multi-select */
  defaultValues?: string[]
  /** Called when selection changes (single-select) */
  onChange?: (value: string) => void
  /** Called when selection changes (multi-select) */
  onMultiChange?: (values: string[]) => void
  /** Enable multi-select mode */
  multi?: boolean
  /** Enable search/filter input */
  searchable?: boolean
  /** Placeholder text when nothing is selected */
  placeholder?: string
  /** Search input placeholder */
  searchPlaceholder?: string
  /** Disabled state */
  disabled?: boolean
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
  /** Visual variant */
  variant?: 'default' | 'glass'
  /** Additional class names for the trigger */
  className?: string
  /** Additional class names for the menu */
  menuClassName?: string
  /** Use portal rendering for overflow contexts */
  portal?: boolean
  /** Children for compound API (overrides options-based rendering) */
  children?: ReactNode
}

/* ------------------------------------------------------------------
   Context for compound API
   ------------------------------------------------------------------ */

interface DropdownContextValue {
  isOpen: boolean
  activeIndex: number
  selectedValues: Set<string>
  multi: boolean
  listboxId: string
  triggerId: string
  toggle: () => void
  close: () => void
  select: (value: string) => void
  setActiveIndex: (index: number) => void
  registerItem: (value: string, index: number) => void
}

const DropdownContext = createContext<DropdownContextValue | null>(null)

function useDropdownContext() {
  const ctx = useContext(DropdownContext)
  if (!ctx) throw new Error('Dropdown compound components must be used within <Dropdown>')
  return ctx
}

/* ------------------------------------------------------------------
   Hooks
   ------------------------------------------------------------------ */

function useClickOutside(
  refs: React.RefObject<HTMLElement | null>[],
  handler: () => void
) {
  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      const target = e.target as Node
      if (refs.every((r) => r.current && !r.current.contains(target))) {
        handler()
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [refs, handler])
}

function usePositioning(
  triggerRef: React.RefObject<HTMLElement | null>,
  isOpen: boolean
) {
  const [style, setStyle] = useState<React.CSSProperties>({})

  useEffect(() => {
    if (!isOpen || !triggerRef.current) return

    function update() {
      const trigger = triggerRef.current
      if (!trigger) return
      const rect = trigger.getBoundingClientRect()
      setStyle({
        position: 'fixed',
        top: rect.bottom + 4,
        left: rect.left,
        width: rect.width,
        zIndex: 9999,
      })
    }

    update()
    window.addEventListener('scroll', update, true)
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update, true)
      window.removeEventListener('resize', update)
    }
  }, [isOpen, triggerRef])

  return style
}

/* ------------------------------------------------------------------
   Sub-components
   ------------------------------------------------------------------ */

export interface DropdownTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
}

export const DropdownTrigger = forwardRef<HTMLButtonElement, DropdownTriggerProps>(
  ({ children, className, onClick, ...props }, ref) => {
    const ctx = useDropdownContext()

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
      onClick?.(e)
      ctx.toggle()
    }

    return (
      <button
        ref={ref}
        id={ctx.triggerId}
        type="button"
        role="combobox"
        aria-expanded={ctx.isOpen}
        aria-haspopup="listbox"
        aria-controls={ctx.isOpen ? ctx.listboxId : undefined}
        className={className}
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    )
  }
)
DropdownTrigger.displayName = 'Dropdown.Trigger'

export interface DropdownMenuProps extends HTMLAttributes<HTMLUListElement> {
  children?: ReactNode
}

export const DropdownMenu = forwardRef<HTMLUListElement, DropdownMenuProps>(
  ({ children, className, ...props }, ref) => {
    const ctx = useDropdownContext()

    if (!ctx.isOpen) return null

    return (
      <ul
        ref={ref}
        id={ctx.listboxId}
        role="listbox"
        aria-multiselectable={ctx.multi || undefined}
        tabIndex={-1}
        className={className}
        {...props}
      >
        {children}
      </ul>
    )
  }
)
DropdownMenu.displayName = 'Dropdown.Menu'

export interface DropdownItemProps extends HTMLAttributes<HTMLLIElement> {
  value: string
  disabled?: boolean
  children?: ReactNode
}

export const DropdownItem = forwardRef<HTMLLIElement, DropdownItemProps>(
  ({ value, disabled = false, children, className, onClick, ...props }, ref) => {
    const ctx = useDropdownContext()
    const isSelected = ctx.selectedValues.has(value)

    const handleClick = (e: MouseEvent<HTMLLIElement>) => {
      if (disabled) return
      onClick?.(e)
      ctx.select(value)
    }

    return (
      <li
        ref={ref}
        role="option"
        aria-selected={isSelected}
        aria-disabled={disabled || undefined}
        data-value={value}
        className={className}
        onClick={handleClick}
        {...props}
      >
        {children ?? value}
      </li>
    )
  }
)
DropdownItem.displayName = 'Dropdown.Item'

/* ------------------------------------------------------------------
   Chevron icon (inline SVG to avoid dependency)
   ------------------------------------------------------------------ */

function ChevronIcon({ open, className }: { open: boolean; className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={cn(
        'transition-transform duration-200 shrink-0',
        open && 'rotate-180',
        className
      )}
      aria-hidden="true"
    >
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      className="shrink-0"
      aria-hidden="true"
    >
      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      className="shrink-0"
      aria-hidden="true"
    >
      <path
        d="M3.5 8.5L6.5 11.5L12.5 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/* ------------------------------------------------------------------
   Main Dropdown component
   ------------------------------------------------------------------ */

export const Dropdown = Object.assign(
  forwardRef<HTMLDivElement, DropdownProps>(
    (
      {
        options = [],
        value,
        values,
        defaultValue,
        defaultValues,
        onChange,
        onMultiChange,
        multi = false,
        searchable = false,
        placeholder = 'Select...',
        searchPlaceholder = 'Search...',
        disabled = false,
        size = 'md',
        variant = 'default',
        className,
        menuClassName,
        portal = false,
        children,
      },
      ref
    ) => {
      const uid = useId()
      const triggerId = `dropdown-trigger-${uid}`
      const listboxId = `dropdown-listbox-${uid}`

      // State
      const [isOpen, setIsOpen] = useState(false)
      const [search, setSearch] = useState('')
      const [activeIndex, setActiveIndex] = useState(-1)

      // Selection state (controlled or uncontrolled)
      const [internalValue, setInternalValue] = useState<string | undefined>(defaultValue)
      const [internalValues, setInternalValues] = useState<string[]>(defaultValues ?? [])

      const isControlled = multi ? values !== undefined : value !== undefined
      const selectedValue = useMemo(
        () => (isControlled ? value : internalValue),
        [isControlled, value, internalValue]
      )
      const selectedMultiValues = useMemo(
        () => (isControlled ? (values ?? []) : internalValues),
        [isControlled, values, internalValues]
      )
      const selectedSet = useMemo(
        () => new Set(multi ? selectedMultiValues : selectedValue ? [selectedValue] : []),
        [multi, selectedMultiValues, selectedValue]
      )

      // Refs
      const triggerRef = useRef<HTMLButtonElement>(null)
      const menuRef = useRef<HTMLUListElement>(null)
      const searchRef = useRef<HTMLInputElement>(null)
      const containerRef = useRef<HTMLDivElement>(null)
      const itemMapRef = useRef<Map<number, string>>(new Map())

      // Filtered options
      const filteredOptions = useMemo(() => {
        if (!search) return options
        const lower = search.toLowerCase()
        return options.filter((o) => o.label.toLowerCase().includes(lower))
      }, [options, search])

      // Position for portal mode
      const portalStyle = usePositioning(triggerRef, isOpen && portal)

      // Close handler
      const close = useCallback(() => {
        setIsOpen(false)
        setSearch('')
        setActiveIndex(-1)
        triggerRef.current?.focus()
      }, [])

      // Toggle
      const toggle = useCallback(() => {
        if (disabled) return
        setIsOpen((prev) => {
          if (prev) {
            setSearch('')
            setActiveIndex(-1)
          }
          return !prev
        })
      }, [disabled])

      // Selection
      const select = useCallback(
        (val: string) => {
          if (multi) {
            const next = selectedSet.has(val)
              ? selectedMultiValues.filter((v) => v !== val)
              : [...selectedMultiValues, val]
            if (!isControlled) setInternalValues(next)
            onMultiChange?.(next)
          } else {
            if (!isControlled) setInternalValue(val)
            onChange?.(val)
            close()
          }
        },
        [multi, selectedSet, selectedMultiValues, isControlled, onChange, onMultiChange, close]
      )

      // Register item (for compound API)
      const registerItem = useCallback((val: string, index: number) => {
        itemMapRef.current.set(index, val)
      }, [])

      // Click outside
      useClickOutside([containerRef, menuRef], () => {
        if (isOpen) close()
      })

      // Focus search input when menu opens
      useEffect(() => {
        if (isOpen && searchable) {
          requestAnimationFrame(() => searchRef.current?.focus())
        }
      }, [isOpen, searchable])

      // Keyboard handler
      const handleKeyDown = useCallback(
        (e: KeyboardEvent<HTMLDivElement>) => {
          if (disabled) return

          switch (e.key) {
            case 'ArrowDown': {
              e.preventDefault()
              if (!isOpen) {
                setIsOpen(true)
                setActiveIndex(0)
                return
              }
              setActiveIndex((prev) => {
                const max = filteredOptions.length - 1
                let next = prev + 1
                while (next <= max && filteredOptions[next]?.disabled) next++
                return next > max ? prev : next
              })
              break
            }
            case 'ArrowUp': {
              e.preventDefault()
              if (!isOpen) {
                setIsOpen(true)
                setActiveIndex(filteredOptions.length - 1)
                return
              }
              setActiveIndex((prev) => {
                let next = prev - 1
                while (next >= 0 && filteredOptions[next]?.disabled) next--
                return next < 0 ? prev : next
              })
              break
            }
            case 'Enter':
            case ' ': {
              if (!isOpen) {
                e.preventDefault()
                setIsOpen(true)
                setActiveIndex(0)
                return
              }
              // Allow space in search input
              if (e.key === ' ' && searchable && document.activeElement === searchRef.current) {
                return
              }
              e.preventDefault()
              if (activeIndex >= 0 && filteredOptions[activeIndex] && !filteredOptions[activeIndex].disabled) {
                select(filteredOptions[activeIndex].value)
              }
              break
            }
            case 'Escape': {
              e.preventDefault()
              close()
              break
            }
            case 'Home': {
              if (isOpen) {
                e.preventDefault()
                const first = filteredOptions.findIndex((o) => !o.disabled)
                if (first >= 0) setActiveIndex(first)
              }
              break
            }
            case 'End': {
              if (isOpen) {
                e.preventDefault()
                for (let i = filteredOptions.length - 1; i >= 0; i--) {
                  if (!filteredOptions[i].disabled) {
                    setActiveIndex(i)
                    break
                  }
                }
              }
              break
            }
            case 'Tab': {
              if (isOpen) close()
              break
            }
            default: {
              // Type-ahead: single character jumps to matching option
              if (!searchable && e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
                e.preventDefault()
                if (!isOpen) setIsOpen(true)
                const char = e.key.toLowerCase()
                const startIndex = activeIndex + 1
                const reordered = [
                  ...filteredOptions.slice(startIndex),
                  ...filteredOptions.slice(0, startIndex),
                ]
                const match = reordered.findIndex(
                  (o) => !o.disabled && o.label.toLowerCase().startsWith(char)
                )
                if (match >= 0) {
                  setActiveIndex((match + startIndex) % filteredOptions.length)
                }
              }
            }
          }
        },
        [disabled, isOpen, filteredOptions, activeIndex, searchable, select, close]
      )

      // Scroll active item into view
      useEffect(() => {
        if (!isOpen || activeIndex < 0 || !menuRef.current) return
        const activeEl = menuRef.current.querySelector(`[data-index="${activeIndex}"]`)
        activeEl?.scrollIntoView({ block: 'nearest' })
      }, [isOpen, activeIndex])

      // Size styles
      const triggerSizes = {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-5 text-base',
      }

      const itemSizes = {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-4 py-2 text-sm',
        lg: 'px-5 py-2.5 text-base',
      }

      // Variant styles
      const triggerVariants = {
        default: [
          'bg-transparent',
          'border-[var(--glass-border)]',
          'hover:border-[var(--glass-highlight)]',
        ],
        glass: [
          'bg-[var(--glass-bg)]',
          'backdrop-blur-lg',
          'border-[var(--glass-border)]',
          'hover:bg-[rgba(255,255,255,0.08)]',
        ],
      }

      // Display value
      const displayValue = useMemo(() => {
        if (multi) {
          if (selectedMultiValues.length === 0) return null
          const labels = selectedMultiValues
            .map((v) => options.find((o) => o.value === v)?.label ?? v)
          if (labels.length <= 2) return labels.join(', ')
          return `${labels[0]}, ${labels[1]} +${labels.length - 2}`
        }
        if (!selectedValue) return null
        return options.find((o) => o.value === selectedValue)?.label ?? selectedValue
      }, [multi, selectedMultiValues, selectedValue, options])

      // Active descendant
      const activeDescendant =
        isOpen && activeIndex >= 0
          ? `${listboxId}-option-${activeIndex}`
          : undefined

      // Context value
      const contextValue: DropdownContextValue = {
        isOpen,
        activeIndex,
        selectedValues: selectedSet,
        multi,
        listboxId,
        triggerId,
        toggle,
        close,
        select,
        setActiveIndex,
        registerItem,
      }

      // If children are provided, use compound API
      if (children) {
        return (
          <DropdownContext.Provider value={contextValue}>
            <div ref={ref} onKeyDown={handleKeyDown}>
              {children}
            </div>
          </DropdownContext.Provider>
        )
      }

      // Options-based rendering
      const menuContent = (
        <ul
          ref={menuRef}
          id={listboxId}
          role="listbox"
          aria-multiselectable={multi || undefined}
          aria-label="Options"
          tabIndex={-1}
          className={cn(
            'py-1 max-h-60 overflow-y-auto',
            'bg-[var(--glass-bg)] backdrop-blur-xl',
            'border border-[var(--glass-border)]',
            'rounded-xl',
            'scrollbar-hidden',
            'animate-in',
            menuClassName
          )}
          style={portal ? portalStyle : undefined}
        >
          {searchable && (
            <li role="presentation" className="px-2 py-1.5 sticky top-0 bg-[var(--glass-bg)] backdrop-blur-xl z-10">
              <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg border border-[var(--glass-border)] bg-transparent">
                <span className="text-[var(--color-grey-400)]">
                  <SearchIcon />
                </span>
                <input
                  ref={searchRef}
                  type="text"
                  role="searchbox"
                  aria-label="Filter options"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value)
                    setActiveIndex(0)
                  }}
                  placeholder={searchPlaceholder}
                  className={cn(
                    'w-full bg-transparent',
                    'text-[var(--color-white)]',
                    'placeholder:text-[var(--color-grey-600)]',
                    'focus:outline-none',
                    'text-xs'
                  )}
                />
              </div>
            </li>
          )}
          {filteredOptions.length === 0 && (
            <li
              role="presentation"
              className="px-4 py-3 text-center text-xs text-[var(--color-grey-600)]"
            >
              No options found
            </li>
          )}
          {filteredOptions.map((option, index) => {
            const isSelected = selectedSet.has(option.value)
            const isActive = index === activeIndex

            return (
              <li
                key={option.value}
                id={`${listboxId}-option-${index}`}
                role="option"
                aria-selected={isSelected}
                aria-disabled={option.disabled || undefined}
                data-index={index}
                data-value={option.value}
                className={cn(
                  'flex items-center gap-2 cursor-pointer',
                  'transition-[background-color,color] duration-150',
                  itemSizes[size],
                  isActive && 'bg-[var(--glass-highlight)]',
                  isSelected && !isActive && 'text-[var(--color-white)]',
                  !isSelected && !isActive && 'text-[var(--color-grey-300)]',
                  option.disabled && 'opacity-40 cursor-not-allowed pointer-events-none',
                  !option.disabled && !isActive && 'hover:bg-[var(--glass-bg)]'
                )}
                onClick={() => {
                  if (!option.disabled) select(option.value)
                }}
                onMouseEnter={() => setActiveIndex(index)}
              >
                {multi && (
                  <span
                    className={cn(
                      'w-4 h-4 rounded border flex items-center justify-center shrink-0',
                      'transition-[background-color,border-color] duration-150',
                      isSelected
                        ? 'bg-[var(--color-white)] border-[var(--color-white)] text-[var(--color-bg)]'
                        : 'border-[var(--glass-border)]'
                    )}
                  >
                    {isSelected && <CheckIcon />}
                  </span>
                )}
                <span className="truncate">{option.label}</span>
                {!multi && isSelected && (
                  <span className="ml-auto text-[var(--color-white)]">
                    <CheckIcon />
                  </span>
                )}
              </li>
            )
          })}
        </ul>
      )

      return (
        <div
          ref={(node) => {
            // Merge refs
            ;(containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node
            if (typeof ref === 'function') ref(node)
            else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
          }}
          className="relative inline-block w-full"
          onKeyDown={handleKeyDown}
        >
          {/* Trigger */}
          <button
            ref={triggerRef}
            id={triggerId}
            type="button"
            role="combobox"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-controls={isOpen ? listboxId : undefined}
            aria-activedescendant={activeDescendant}
            aria-label={displayValue || placeholder || 'Select option'}
            disabled={disabled}
            className={cn(
              'w-full inline-flex items-center justify-between gap-2',
              'border rounded-xl',
              'transition-[border-color,background-color] duration-200',
              'focus-ring',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              triggerSizes[size],
              triggerVariants[variant],
              isOpen && 'border-[var(--color-white)]',
              className
            )}
            onClick={toggle}
          >
            <span
              className={cn(
                'truncate text-left',
                displayValue
                  ? 'text-[var(--color-white)]'
                  : 'text-[var(--color-grey-600)]'
              )}
            >
              {displayValue ?? placeholder}
            </span>
            <ChevronIcon open={isOpen} className="text-[var(--color-grey-400)]" />
          </button>

          {/* Menu */}
          {isOpen && (
            portal
              ? createPortal(menuContent, document.body)
              : <div className="absolute left-0 right-0 mt-1 z-50">{menuContent}</div>
          )}
        </div>
      )
    }
  ),
  {
    Trigger: DropdownTrigger,
    Menu: DropdownMenu,
    Item: DropdownItem,
  }
)

Dropdown.displayName = 'Dropdown'
