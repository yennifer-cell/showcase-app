import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isDocs = process.env.BUILD_TARGET === 'docs'

  return {
    base: isDocs ? '/showcase-app/docs/' : '/',
    publicDir: 'public',
    plugins: [react()],
    build: {
      outDir: isDocs ? 'docs' : 'dist',
      emptyOutDir: true,
    },
  }
})
