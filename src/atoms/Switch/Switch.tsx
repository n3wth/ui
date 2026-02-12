import { forwardRef, useCallback, useRef, useState, type KeyboardEvent } from 'react'
import { cn } from '../../utils/cn'

export interface SwitchProps {
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  label?: string
  className?: string
}

const trackSizes = {
  sm: 'w-8 h-[18px]',
  md: 'w-10 h-[22px]',
  lg: 'w-12 h-[26px]',
}

const thumbSizes = {
  sm: 'w-3.5 h-3.5',
  md: 'w-[18px] h-[18px]',
  lg: 'w-[22px] h-[22px]',
}

const thumbTranslate = {
  sm: 'translate-x-[14px]',
  md: 'translate-x-[18px]',
  lg: 'translate-x-[22px]',
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      checked: controlledChecked,
      defaultChecked = false,
      onChange,
      disabled = false,
      size = 'md',
      label,
      className,
    },
    ref
  ) => {
    const isControlled = controlledChecked !== undefined
    const [internalChecked, setInternalChecked] = useState(defaultChecked)
    const isChecked = isControlled ? controlledChecked : internalChecked
    const internalRef = useRef<HTMLButtonElement>(null)

    const toggle = useCallback(() => {
      if (disabled) return
      const next = !isChecked
      if (!isControlled) {
        setInternalChecked(next)
      }
      onChange?.(next)
    }, [disabled, isChecked, isControlled, onChange])

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === 'Enter') {
          e.preventDefault()
          toggle()
        }
      },
      [toggle]
    )

    return (
      <button
        ref={ref ?? internalRef}
        type="button"
        role="switch"
        aria-checked={isChecked}
        aria-label={label}
        disabled={disabled}
        onClick={toggle}
        onKeyDown={handleKeyDown}
        className={cn(
          'relative inline-flex shrink-0 cursor-pointer items-center rounded-full',
          'border border-transparent',
          'transition-colors duration-200 ease-out',
          'focus-ring',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          isChecked
            ? 'bg-[var(--color-sage)]'
            : 'bg-[var(--glass-border)]',
          trackSizes[size],
          className
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            'pointer-events-none inline-block rounded-full',
            'bg-[var(--color-white)]',
            'transition-transform duration-200 ease-out',
            thumbSizes[size],
            isChecked ? thumbTranslate[size] : 'translate-x-0.5'
          )}
        />
      </button>
    )
  }
)

Switch.displayName = 'Switch'
