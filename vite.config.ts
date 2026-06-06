import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src'],
      outDir: 'dist',
      // Generate declaration files alongside modules for better tree-shaking
      rollupTypes: false,
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        // Mark gsap as external since it's an optional peer dependency
        'gsap',
        'gsap/ScrollTrigger',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          gsap: 'gsap',
        },
        // Preserve per-component module structure so consumers tree-shake
        // unused components (and their deps, e.g. gsap) instead of pulling
        // the whole barrel. preserveModulesRoot keeps the dist layout flat
        // (dist/atoms/... not dist/src/atoms/...) so the exports map resolves.
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
        // Ensure proper ESM output
        format: 'es',
        // Add banner for proper module resolution
        banner: '/* @n3wth/ui - Atomic design system */',
      },
      // Ensure external modules aren't bundled
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
      },
    },
    cssCodeSplit: false,
    // Minify for production
    minify: 'esbuild',
    // Generate sourcemaps for debugging
    sourcemap: true,
    // Target modern browsers only
    target: 'es2020',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  // Optimize dependency pre-bundling
  optimizeDeps: {
    include: ['clsx', 'tailwind-merge'],
  },
})
