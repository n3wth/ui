import '@testing-library/jest-dom/vitest'

// Mock matchMedia for hooks that use it
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  configurable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
})

// Mock scrollTo
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  configurable: true,
  value: () => {},
})

// Mock clipboard API (configurable so user-event can override)
Object.defineProperty(navigator, 'clipboard', {
  writable: true,
  configurable: true,
  value: {
    writeText: async () => {},
    readText: async () => '',
  },
})
