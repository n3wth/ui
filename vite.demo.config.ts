import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { resolve } from 'path'

export default defineConfig(({ command }) => ({
  plugins: [
    mdx({
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeHighlight],
    }),
    react(),
    tailwindcss(),
  ],
  root: 'demo',
  publicDir: resolve(__dirname, 'public'),
  build: {
    outDir: resolve(__dirname, 'dist-demo'),
    emptyOutDir: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      // Astryx's dist imports react/jsx-dev-runtime, which React 19 strips
      // from production bundles. Build-only alias to a shim that forwards to
      // the real jsx-runtime; `vite dev` keeps using React's dev runtime.
      ...(command === 'build'
        ? { 'react/jsx-dev-runtime': resolve(__dirname, 'demo/jsx-dev-runtime-shim.js') }
        : {}),
    }
  },
  server: {
    port: 3333,
    open: true
  }
}))
