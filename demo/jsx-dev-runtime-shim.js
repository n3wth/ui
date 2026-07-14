// React 19 strips `react/jsx-dev-runtime` from production bundles, but
// Astryx's dist still imports it. This shim forwards jsxDEV calls to the
// production jsx-runtime so the demo/docs site's production build resolves
// cleanly. Only aliased in for `vite build` (see vite.demo.config.ts) —
// `vite dev` uses React's real dev runtime.
import * as runtime from 'react/jsx-runtime'

export const Fragment = runtime.Fragment
export function jsxDEV(type, props, key, isStaticChildren) {
  return isStaticChildren ? runtime.jsxs(type, props, key) : runtime.jsx(type, props, key)
}
