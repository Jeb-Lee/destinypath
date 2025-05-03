import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
      babel: {
        babelrc: false, // Explicitly ignore .babelrc files
        configFile: false // Don't use babel.config.js
      }
    })
  ],
  esbuild: {
    loader: 'jsx', // Force ESBuild to handle JSX
  }
})