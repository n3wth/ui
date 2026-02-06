import {
  useState,
  useCallback,
  useRef,
  createContext,
  useContext,
  type ReactNode,
} from 'react'
import { createElement } from 'react'
import type { ToastVariant, ToastData, ToastPosition } from '../molecules/Toast/Toast'
import { Toast, ToastContainer } from '../molecules/Toast/Toast'

export interface ToastOptions {
  title?: string
  description?: string
  variant?: ToastVariant
  duration?: number
  icon?: ReactNode
}

export interface UseToastReturn {
  toasts: ToastData[]
  toast: ToastFn
  dismiss: (id: string) => void
  dismissAll: () => void
}

export interface ToastFn {
  (options: ToastOptions): string
  success: (options: Omit<ToastOptions, 'variant'>) => string
  error: (options: Omit<ToastOptions, 'variant'>) => string
  warning: (options: Omit<ToastOptions, 'variant'>) => string
  info: (options: Omit<ToastOptions, 'variant'>) => string
}

export interface ToastProviderProps {
  children: ReactNode
  maxToasts?: number
  position?: ToastPosition
}

let idCounter = 0

function generateId(): string {
  return `toast-${++idCounter}-${Date.now()}`
}

const ToastContext = createContext<UseToastReturn | null>(null)

function useToastState(maxToasts = 5): UseToastReturn {
  const [toasts, setToasts] = useState<ToastData[]>([])
  const toastsRef = useRef(toasts)
  toastsRef.current = toasts

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const dismissAll = useCallback(() => {
    setToasts([])
  }, [])

  const addToast = useCallback(
    (options: ToastOptions): string => {
      const id = generateId()
      const newToast: ToastData = {
        id,
        variant: options.variant ?? 'default',
        title: options.title,
        description: options.description,
        duration: options.duration ?? 5000,
        icon: options.icon,
      }

      setToasts((prev) => {
        const next = [...prev, newToast]
        if (next.length > maxToasts) {
          return next.slice(next.length - maxToasts)
        }
        return next
      })

      return id
    },
    [maxToasts]
  )

  const toast = useCallback(
    (options: ToastOptions) => addToast(options),
    [addToast]
  ) as ToastFn

  toast.success = useCallback(
    (options: Omit<ToastOptions, 'variant'>) =>
      addToast({ ...options, variant: 'success' }),
    [addToast]
  )

  toast.error = useCallback(
    (options: Omit<ToastOptions, 'variant'>) =>
      addToast({ ...options, variant: 'error' }),
    [addToast]
  )

  toast.warning = useCallback(
    (options: Omit<ToastOptions, 'variant'>) =>
      addToast({ ...options, variant: 'warning' }),
    [addToast]
  )

  toast.info = useCallback(
    (options: Omit<ToastOptions, 'variant'>) =>
      addToast({ ...options, variant: 'info' }),
    [addToast]
  )

  return { toasts, toast, dismiss, dismissAll }
}

export function ToastProvider({
  children,
  maxToasts = 5,
  position = 'top-right',
}: ToastProviderProps) {
  const state = useToastState(maxToasts)

  return createElement(
    ToastContext.Provider,
    { value: state },
    children,
    createElement(
      ToastContainer,
      { position },
      ...state.toasts.map((t) =>
        createElement(Toast, {
          key: t.id,
          variant: t.variant,
          title: t.title,
          description: t.description,
          duration: t.duration,
          icon: t.icon,
          onDismiss: () => state.dismiss(t.id),
        })
      )
    )
  )
}

export function useToast(maxToasts?: number): UseToastReturn {
  const context = useContext(ToastContext)
  if (context) return context

  // Fallback: standalone usage without provider
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useToastState(maxToasts)
}
