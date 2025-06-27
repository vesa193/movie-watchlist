import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@mw': '/src',
      '@mw-ui-components': '/src/ui-components/index.tsx',
      '@mw-hooks': '/src/hooks/index.tsx',
    },
  },
})
