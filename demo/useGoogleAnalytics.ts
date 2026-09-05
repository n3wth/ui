import { useEffect } from 'react'
import { useLocation } from 'react-router'

declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js',
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void
  }
}

const GA_MEASUREMENT_ID = 'G-4QRMSG5HXK'

export function useGoogleAnalytics(): void {
  const location = useLocation()

  useEffect(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: location.pathname + location.search,
      })
    }
  }, [location.pathname, location.search])
}
