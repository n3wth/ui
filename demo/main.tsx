import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import posthog from 'posthog-js'
import { N3wthProvider } from '../src/theme/N3wthProvider'
import { App } from './App'
import './demo.css'

posthog.init('phc_q39ZGuvXLQuwCgCkHZYAeaUlWm5bIhx2XKMCtTdhJ7o', {
  api_host: 'https://p.n3wth.com',
  ui_host: 'https://us.posthog.com',
  person_profiles: 'identified_only',
  capture_pageview: true,
  capture_pageleave: true,
  capture_performance: { web_vitals: true },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <N3wthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </N3wthProvider>
  </StrictMode>
)
